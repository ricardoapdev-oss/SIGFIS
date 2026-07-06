import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, role: string, data: any) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: data.contractId },
    });
    if (!contract) throw new NotFoundException('Contrato não encontrado');

    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId: data.contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) throw new ForbiddenException('Acesso negado a este contrato');
    }

    return this.prisma.contractPayment.create({
      data: {
        contractId: data.contractId,
        registeredById: userId,
        paymentDate: new Date(data.paymentDate),
        value: data.value,
        invoiceNumber: data.invoiceNumber || null,
        description: data.description,
      },
      include: {
        registeredBy: { select: { id: true, name: true } },
      },
    });
  }

  async findByContract(contractId: string, userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      const isAssigned = await this.prisma.fiscalAssignment.findFirst({
        where: { contractId, fiscalId: userId, isActive: true },
      });
      if (!isAssigned) throw new ForbiddenException('Acesso negado a este contrato');
    }

    return this.prisma.contractPayment.findMany({
      where: { contractId },
      include: { registeredBy: { select: { id: true, name: true } } },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async delete(id: string, role: string) {
    if (role !== UserRole.ADMIN && role !== UserRole.GESTOR) {
      throw new ForbiddenException('Sem permissão para excluir pagamentos');
    }
    const payment = await this.prisma.contractPayment.findUnique({ where: { id } });
    if (!payment) throw new NotFoundException('Pagamento não encontrado');
    await this.prisma.contractPayment.delete({ where: { id } });
    return { ok: true };
  }
}
