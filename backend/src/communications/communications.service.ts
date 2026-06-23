import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class CommunicationsService {
  constructor(private prisma: PrismaService) {}

  async findByContract(contractId: string, userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Acesso negado a este contrato');
      }
    }

    return this.prisma.communication.findMany({
      where: { contractId },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        recipient: { select: { id: true, name: true } },
        replies: {
          include: {
            sender: { select: { id: true, name: true, role: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, role: string, data: any) {
    if (role === UserRole.ADMIN) {
      throw new ForbiddenException('Perfil administrativo não pode enviar comunicados');
    }

    const contract = await this.prisma.contract.findUnique({ where: { id: data.contractId } });
    if (!contract) throw new NotFoundException('Contrato não encontrado');

    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId: data.contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) {
        throw new ForbiddenException('Você não é fiscal designado para este contrato');
      }
    }

    const communication = await this.prisma.communication.create({
      data: {
        contractId: data.contractId,
        senderId: userId,
        recipientId: data.recipientId || null,
        subject: data.subject,
        message: data.message,
        parentId: data.parentId || null,
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        recipient: { select: { id: true, name: true } },
      },
    });

    // Marcar como lida se o próprio usuário a enviou
    return communication;
  }
}
