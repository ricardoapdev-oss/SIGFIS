import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AlterationStatus,
  AlterationType,
  UserRole,
  AlertType,
} from '@prisma/client';
import { sumDecimal } from '../contracts/financial-calculations';

@Injectable()
export class AlterationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, role: string, data: any) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: data.contractId },
      include: { alterations: true },
    });
    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    // Apenas FISCAL designado ou GESTOR pode solicitar
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: {
          contractId: data.contractId,
          fiscalId: userId,
          isActive: true,
        },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    } else if (role === UserRole.ADMIN) {
      throw new ForbiddenException(
        'Perfil administrativo não pode propor alterações.',
      );
    }

    const valueChange = Number(data.valueChange || 0);

    // Validação da Regra R01 (Limite de Aditivos de Valor) para acréscimos
    if (data.type === AlterationType.ADDENDUM_VALUE_INCREASE) {
      const isReform =
        contract.objectDescription.toLowerCase().includes('reforma') ||
        contract.objectDescription.toLowerCase().includes('retrofit') ||
        contract.objectDescription
          .toLowerCase()
          .includes('readequação de espaço');

      const limitPercentage = isReform ? 0.5 : 0.25;
      const limitValue = Number(contract.initialValue) * limitPercentage;

      // Somar alterações de acréscimo já aprovadas
      const approvedValueIncreases = contract.alterations
        .filter(
          (alt) =>
            alt.type === AlterationType.ADDENDUM_VALUE_INCREASE &&
            alt.status === AlterationStatus.APPROVED,
        )
        .reduce((sum, alt) => sum + Number(alt.valueChange), 0);

      const totalProjectedIncrease = approvedValueIncreases + valueChange;

      if (totalProjectedIncrease > limitValue) {
        throw new BadRequestException(
          `Limite de aditivo de valor excedido. O limite acumulado permitido para este contrato é de R$ ${limitValue.toFixed(2)} (${limitPercentage * 100}%). Projetado: R$ ${totalProjectedIncrease.toFixed(2)}`,
        );
      }
    }

    const alteration = await this.prisma.contractAlteration.create({
      data: {
        contractId: data.contractId,
        type: data.type,
        alterationNumber: data.alterationNumber || null,
        valueChange: valueChange,
        newEndDate: data.newEndDate ? new Date(data.newEndDate) : null,
        justification: data.justification,
        status: AlterationStatus.PENDING_APPROVAL,
        requestedById: userId,
      },
    });

    // Criar alerta para o Gestor
    await this.prisma.systemAlert.create({
      data: {
        contractId: data.contractId,
        type: AlertType.CONTRACT_LIMIT_WARNING,
        message: `Solicitação de alteração contratual (${data.type}) pendente de aprovação para o contrato ${contract.contractNumber}.`,
        targetRole: UserRole.GESTOR,
      },
    });

    return alteration;
  }

  async approve(id: string, userId: string) {
    const alteration = await this.prisma.contractAlteration.findUnique({
      where: { id },
      include: { contract: true },
    });
    if (!alteration) {
      throw new NotFoundException('Alteração contratual não encontrada');
    }

    if (alteration.status !== AlterationStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Esta solicitação já foi processada.');
    }

    // Iniciar transação para aprovar aditivo e atualizar contrato
    const result = await this.prisma.$transaction(async (tx) => {
      const approvedAlt = await tx.contractAlteration.update({
        where: { id },
        data: {
          status: AlterationStatus.APPROVED,
          reviewedById: userId,
          reviewDate: new Date(),
        },
      });

      // Atualizar dados no Contrato — precisão decimal, sem passar por
      // Number() intermediário (ver financial-calculations.ts).
      const newCurrentValue = sumDecimal([
        alteration.contract.currentValue,
        alteration.valueChange,
      ]);

      const updateData: any = {
        currentValue: newCurrentValue,
      };

      // Se houver alteração de vigência, atualizar data final
      if (alteration.newEndDate) {
        updateData.endDate = alteration.newEndDate;
      }

      await tx.contract.update({
        where: { id: alteration.contractId },
        data: updateData,
      });

      return approvedAlt;
    });

    // Gerar alerta para o Fiscal informando a aprovação
    await this.prisma.systemAlert.create({
      data: {
        contractId: alteration.contractId,
        type: AlertType.CONTRACT_LIMIT_WARNING,
        message: `A solicitação de alteração contratual "${alteration.alterationNumber || alteration.type}" foi APROVADA pelo Gestor.`,
        targetRole: UserRole.FISCAL,
      },
    });

    return result;
  }

  async reject(id: string, userId: string, data: any) {
    const alteration = await this.prisma.contractAlteration.findUnique({
      where: { id },
    });
    if (!alteration) {
      throw new NotFoundException('Alteração contratual não encontrada');
    }

    const updated = await this.prisma.contractAlteration.update({
      where: { id },
      data: {
        status: AlterationStatus.REJECTED,
        reviewedById: userId,
        reviewDate: new Date(),
        reviewNotes: data.reason,
      },
    });

    // Gerar alerta para o Fiscal informando a rejeição
    await this.prisma.systemAlert.create({
      data: {
        contractId: alteration.contractId,
        type: AlertType.CONTRACT_LIMIT_WARNING,
        message: `A solicitação de alteração contratual foi REJEITADA pelo Gestor. Motivo: ${data.reason}`,
        targetRole: UserRole.FISCAL,
      },
    });

    return updated;
  }

  async findByContract(contractId: string, userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    }

    return this.prisma.contractAlteration.findMany({
      where: { contractId },
      include: {
        requester: { select: { name: true } },
        reviewer: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: any) {
    const alt = await this.prisma.contractAlteration.findUnique({
      where: { id },
    });
    if (!alt) throw new NotFoundException('Aditivo não encontrado');
    const {
      id: _id,
      contractId: _cid,
      requesterId: _rid,
      reviewerId: _rvid,
      createdAt,
      updatedAt,
      ...updateData
    } = data;
    return this.prisma.contractAlteration.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    const alt = await this.prisma.contractAlteration.findUnique({
      where: { id },
    });
    if (!alt) throw new NotFoundException('Aditivo não encontrado');
    await this.prisma.contractAlteration.delete({ where: { id } });
    return { ok: true };
  }
}
