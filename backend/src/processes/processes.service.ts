import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProcessStatus, UserRole } from '@prisma/client';

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      return this.prisma.procurementProcess.findMany({
        where: { requesterId: userId },
        include: {
          requester: { select: { id: true, name: true, registrationNumber: true } },
          contracts: { select: { id: true, contractNumber: true, status: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.procurementProcess.findMany({
      include: {
        requester: { select: { id: true, name: true, registrationNumber: true } },
        contracts: { select: { id: true, contractNumber: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const process = await this.prisma.procurementProcess.findUnique({
      where: { id },
      include: {
        requester: { select: { id: true, name: true, registrationNumber: true } },
        contracts: {
          include: {
            contractor: true,
            fiscalAssignments: {
              include: { fiscal: { select: { id: true, name: true } } },
              where: { isActive: true },
            },
          },
        },
        documents: true,
      },
    });

    if (!process) throw new NotFoundException('Processo não encontrado');

    if (role === UserRole.FISCAL && process.requesterId !== userId) {
      throw new ForbiddenException('Você não tem permissão para visualizar este processo');
    }

    return process;
  }

  async create(userId: string, data: any) {
    return this.prisma.procurementProcess.create({
      data: {
        processNumber: data.processNumber,
        subject: data.subject,
        description: data.description || null,
        status: ProcessStatus.PLANNING,
        modality: data.modality,
        estimatedValue: data.estimatedValue,
        requesterDepartment: data.requesterDepartment,
        requesterId: userId,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');

    return this.prisma.procurementProcess.update({
      where: { id },
      data: { status: status as ProcessStatus },
    });
  }
}
