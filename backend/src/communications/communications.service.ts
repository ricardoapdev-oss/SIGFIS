import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class CommunicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    const where = role === UserRole.FISCAL
      ? { contract: { fiscalAssignments: { some: { fiscalId: userId, isActive: true } } } }
      : {};
    return this.prisma.communication.findMany({
      where,
      include: {
        sender: { select: { id: true, name: true, role: true } },
        recipient: { select: { id: true, name: true } },
        contract: { select: { id: true, contractNumber: true } },
        replies: {
          include: { sender: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
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
    // Contrato de referência "ALL" — comunicado de difusão (broadcast) para
    // mais de um contrato de uma só vez. Como Communication exige um
    // contractId real (FK obrigatória), cria-se uma cópia da mensagem em
    // cada contrato de destino, dentro de uma única transação.
    if (data.contractId === 'ALL') {
      if (role === UserRole.FISCAL) {
        throw new ForbiddenException('Fiscais não podem enviar comunicados para todos os contratos.');
      }

      let targetContractIds: string[];
      if (data.recipientId) {
        const assignments = await this.prisma.fiscalAssignment.findMany({
          where: { fiscalId: data.recipientId, isActive: true },
          select: { contractId: true },
        });
        if (assignments.length === 0) {
          throw new NotFoundException('Este fiscal não possui contratos vinculados.');
        }
        targetContractIds = assignments.map((a) => a.contractId);
      } else {
        const contracts = await this.prisma.contract.findMany({
          where: { fiscalAssignments: { some: { isActive: true } } },
          select: { id: true },
        });
        targetContractIds = contracts.map((c) => c.id);
      }

      return this.prisma.$transaction(
        targetContractIds.map((contractId) =>
          this.prisma.communication.create({
            data: {
              contractId,
              senderId: userId,
              recipientId: data.recipientId || null,
              subject: data.subject,
              message: data.message,
              parentId: data.parentId || null,
            },
          }),
        ),
      );
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

    return communication;
  }

  async complete(id: string) {
    const comm = await this.prisma.communication.findUnique({ where: { id } });
    if (!comm) throw new NotFoundException('Comunicado não encontrado');
    return this.prisma.communication.update({
      where: { id },
      data: { isCompleted: true, completedAt: new Date() },
    });
  }

  /** Exclusão definitiva de um comunicado — restrita ao ADMIN (ver controller).
   *  Remove também as respostas encadeadas (parentId) antes do registro principal. */
  async remove(id: string) {
    const comm = await this.prisma.communication.findUnique({ where: { id } });
    if (!comm) throw new NotFoundException('Comunicado não encontrado');
    await this.prisma.$transaction([
      this.prisma.communication.deleteMany({ where: { parentId: id } }),
      this.prisma.communication.delete({ where: { id } }),
    ]);
    return { ok: true };
  }
}
