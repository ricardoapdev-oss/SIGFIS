import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasurementStatus, UserRole, AlertType } from '@prisma/client';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

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
        throw new ForbiddenException('Você não é fiscal designado para este contrato e não pode registrar medições.');
      }
    } else if (role !== UserRole.GESTOR) {
      throw new ForbiddenException('Apenas Fiscais ou Gestores podem criar medições.');
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

  async approve(id: string, userId: string) {
    const measurement = await this.prisma.inspectionMeasurement.findUnique({
      where: { id },
      include: { contract: true },
    });
    if (!measurement) {
      throw new NotFoundException('Medição não encontrada');
    }

    const updated = await this.prisma.inspectionMeasurement.update({
      where: { id },
      data: {
        status: MeasurementStatus.APPROVED,
        approvedById: userId,
        approvalDate: new Date(),
      },
    });

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
    const m = await this.prisma.inspectionMeasurement.findUnique({ where: { id } });
    if (!m) throw new NotFoundException('Medição não encontrada');
    await this.prisma.inspectionMeasurement.delete({ where: { id } });
    return { ok: true };
  }
}
