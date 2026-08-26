import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasurementStatus, UserRole, AlertType } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import {
  checkMeasurementApproval,
  sumApprovedMeasurements,
} from '../contracts/financial-calculations';

@Injectable()
export class MeasurementsService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(userId: string, role: string, data: any) {
    // Verificar se o contrato existe
    const contract = await this.prisma.contract.findUnique({
      where: { id: data.contractId },
    });
    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    // Se o usuário for FISCAL, verificar se ele está designado
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: {
          contractId: data.contractId,
          fiscalId: userId,
          isActive: true,
        },
      });
      if (!isAssigned) {
        throw new ForbiddenException(
          'Você não é fiscal designado para este contrato e não pode registrar medições.',
        );
      }
    } else if (role !== UserRole.GESTOR && role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Apenas Fiscais, Gestores ou Administradores podem criar medições.',
      );
    }

    const measurement = await this.prisma.inspectionMeasurement.create({
      data: {
        contractId: data.contractId,
        fiscalId: userId,
        periodStart: new Date(data.periodStart),
        periodEnd: new Date(data.periodEnd),
        measurementValue: data.measurementValue,
        reportDescription: data.reportDescription,
        status: MeasurementStatus.PENDING_GESTOR,
      },
    });

    // Criar alerta para o Gestor
    await this.prisma.systemAlert.create({
      data: {
        contractId: data.contractId,
        type: AlertType.MEASUREMENT_PENDING,
        message: `Nova medição pendente de aprovação no valor de R$ ${data.measurementValue} para o contrato ${contract.contractNumber}.`,
        targetRole: UserRole.GESTOR,
      },
    });

    return measurement;
  }

  /**
   * Aprova uma medição. Antes de aprovar, verifica se o total de medições
   * aprovadas do contrato passaria a superar o valor contratual atual
   * (`checkMeasurementApproval`, em financial-calculations.ts) — regras
   * "impedir saldo negativo sem justificativa" e "alertar medição superior
   * ao valor contratual". Sem `justification`, a aprovação é recusada;
   * com justificativa, é aprovada e o excedente fica registrado em
   * auditoria para rastreabilidade.
   */
  async approve(id: string, userId: string, data?: { justification?: string }) {
    const measurement = await this.prisma.inspectionMeasurement.findUnique({
      where: { id },
      include: { contract: true },
    });
    if (!measurement) {
      throw new NotFoundException('Medição não encontrada');
    }
    if (measurement.status === MeasurementStatus.APPROVED) {
      throw new BadRequestException('Esta medição já foi aprovada.');
    }

    const alreadyApproved = await this.prisma.inspectionMeasurement.findMany({
      where: {
        contractId: measurement.contractId,
        status: MeasurementStatus.APPROVED,
      },
      select: { status: true, measurementValue: true },
    });
    const check = checkMeasurementApproval(
      measurement.contract.currentValue,
      sumApprovedMeasurements(alreadyApproved),
      measurement.measurementValue,
    );

    const justification = data?.justification?.trim();
    if (check.exceedsContractValue && !justification) {
      throw new BadRequestException(
        `Aprovar esta medição levaria o total de medições aprovadas a R$ ${check.projectedTotal.toFixed(2)}, acima do valor contratual atual (R$ ${check.currentValue.toFixed(2)}) em R$ ${check.excessAmount.toFixed(2)}. Informe uma justificativa para aprovar mesmo assim.`,
      );
    }

    const updated = await this.prisma.inspectionMeasurement.update({
      where: { id },
      data: {
        status: MeasurementStatus.APPROVED,
        approvedById: userId,
        approvalDate: new Date(),
      },
    });

    if (check.exceedsContractValue) {
      await this.auditService.log({
        userId,
        action: 'MEDICAO_APROVADA_ACIMA_DO_VALOR_CONTRATUAL',
        module: 'Fiscalizações',
        entity: 'InspectionMeasurement',
        entityId: id,
        detail: `Medição do contrato ${measurement.contract.contractNumber} aprovada acima do valor contratual (excedente de R$ ${check.excessAmount.toFixed(2)}). Justificativa: ${justification}`,
      });
    }

    // Gerar alerta para o Fiscal informando a aprovação
    await this.prisma.systemAlert.create({
      data: {
        contractId: measurement.contractId,
        type: AlertType.MEASUREMENT_PENDING,
        message: `Sua medição no período ${measurement.periodStart.toLocaleDateString()} a ${measurement.periodEnd.toLocaleDateString()} foi APROVADA pelo Gestor.`,
        targetRole: UserRole.FISCAL,
      },
    });

    return updated;
  }

  async reject(id: string, userId: string, data: any) {
    const measurement = await this.prisma.inspectionMeasurement.findUnique({
      where: { id },
    });
    if (!measurement) {
      throw new NotFoundException('Medição não encontrada');
    }

    const updated = await this.prisma.inspectionMeasurement.update({
      where: { id },
      data: {
        status: MeasurementStatus.REJECTED,
        rejectionReason: data.reason,
      },
    });

    // Gerar alerta para o Fiscal informando a rejeição
    await this.prisma.systemAlert.create({
      data: {
        contractId: measurement.contractId,
        type: AlertType.MEASUREMENT_PENDING,
        message: `Sua medição foi REJEITADA pelo Gestor. Motivo: ${data.reason}`,
        targetRole: UserRole.FISCAL,
      },
    });

    return updated;
  }

  async findByContract(contractId: string, userId: string, role: string) {
    // Validação de acesso
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    }

    return this.prisma.inspectionMeasurement.findMany({
      where: { contractId },
      include: {
        fiscal: { select: { name: true } },
        approver: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    const m = await this.prisma.inspectionMeasurement.findUnique({
      where: { id },
    });
    if (!m) throw new NotFoundException('Medição não encontrada');
    await this.prisma.inspectionMeasurement.delete({ where: { id } });
    return { ok: true };
  }
}
