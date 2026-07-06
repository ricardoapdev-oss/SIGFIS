import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OccurrenceSeverity, OccurrenceStatus, UserRole, AlertType } from '@prisma/client';

@Injectable()
export class OccurrencesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, role: string, data: any) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: data.contractId },
    });
    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    // FISCAL: verifica se está designado ao contrato
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId: data.contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    }
    // GESTOR e ADMIN podem registrar em qualquer contrato

    const occurrence = await this.prisma.occurrence.create({
      data: {
        contractId: data.contractId,
        fiscalId: userId,
        title: data.title,
        description: data.description,
        severity: data.severity || OccurrenceSeverity.MEDIUM,
        status: OccurrenceStatus.OPEN,
      },
    });

    // Se for uma ocorrência HIGH ou CRITICAL, gerar alerta para o GESTOR
    if (data.severity === OccurrenceSeverity.HIGH || data.severity === OccurrenceSeverity.CRITICAL) {
      await this.prisma.systemAlert.create({
        data: {
          contractId: data.contractId,
          type: AlertType.OCCURRENCE_CRITICAL,
          message: `Alerta Crítico: Ocorrência grave de nível ${data.severity} registrada para o contrato ${contract.contractNumber}: "${data.title}"`,
          targetRole: UserRole.GESTOR,
        },
      });
    }

    return occurrence;
  }

  async resolve(id: string, userId: string, role: string, data: any) {
    const occurrence = await this.prisma.occurrence.findUnique({
      where: { id },
      include: { contract: true },
    });
    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada');
    }

    // FISCAL: verifica se está designado ao contrato
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId: occurrence.contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    }
    // GESTOR e ADMIN podem resolver qualquer ocorrência

    return this.prisma.occurrence.update({
      where: { id },
      data: {
        status: OccurrenceStatus.RESOLVED,
        resolutionDescription: data.resolutionDescription,
        resolvedById: userId,
        resolvedAt: new Date(),
      },
    });
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

    return this.prisma.occurrence.findMany({
      where: { contractId },
      include: {
        fiscal: { select: { name: true } },
        resolver: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    const occ = await this.prisma.occurrence.findUnique({ where: { id } });
    if (!occ) throw new NotFoundException('Ocorrência não encontrada');
    await this.prisma.occurrence.delete({ where: { id } });
    return { ok: true };
  }
}
