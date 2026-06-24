import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhaseStatus, ProcessStatus, UserRole } from '@prisma/client';

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  private withPhases = {
    requester: { select: { id: true, name: true, registrationNumber: true } },
    contracts: { select: { id: true, contractNumber: true, status: true } },
    phases: {
      orderBy: { phaseNumber: 'asc' as const },
      include: { responsible: { select: { id: true, name: true } } },
    },
  };

  async findAll(userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      return this.prisma.procurementProcess.findMany({
        where: { requesterId: userId },
        include: this.withPhases,
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.prisma.procurementProcess.findMany({
      include: this.withPhases,
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
        phases: {
          orderBy: { phaseNumber: 'asc' },
          include: { responsible: { select: { id: true, name: true } } },
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
        status: (data.status as ProcessStatus) || ProcessStatus.PLANNING,
        modality: data.modality,
        estimatedValue: data.estimatedValue,
        requesterDepartment: data.requesterDepartment,
        requesterId: userId,
      },
    });
  }

  async update(id: string, data: any) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');

    const updateData: any = {};
    if (data.subject) updateData.subject = data.subject;
    if (data.status) updateData.status = data.status as ProcessStatus;
    if (data.estimatedValue !== undefined) updateData.estimatedValue = data.estimatedValue;
    if (data.requesterDepartment) updateData.requesterDepartment = data.requesterDepartment;

    return this.prisma.procurementProcess.update({ where: { id }, data: updateData });
  }

  async updateStatus(id: string, status: string) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');
    return this.prisma.procurementProcess.update({
      where: { id },
      data: { status: status as ProcessStatus },
    });
  }

  async delete(id: string) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');
    await this.prisma.procurementProcess.delete({ where: { id } });
    return { ok: true };
  }

  async getPhases(processId: string) {
    return this.prisma.procurementPhase.findMany({
      where: { processId },
      orderBy: { phaseNumber: 'asc' },
      include: { responsible: { select: { id: true, name: true } } },
    });
  }

  async addPhase(processId: string, data: any) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id: processId } });
    if (!process) throw new NotFoundException('Processo não encontrado');

    return this.prisma.procurementPhase.create({
      data: {
        processId,
        phaseNumber: data.phaseNumber,
        name: data.name,
        status: (data.status as PhaseStatus) || PhaseStatus.PENDING,
        plannedStart: data.plannedStart ? new Date(data.plannedStart) : null,
        plannedEnd: data.plannedEnd ? new Date(data.plannedEnd) : null,
        actualStart: data.actualStart ? new Date(data.actualStart) : null,
        actualEnd: data.actualEnd ? new Date(data.actualEnd) : null,
        responsibleId: data.responsibleId || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updatePhase(processId: string, phaseId: string, data: any) {
    const phase = await this.prisma.procurementPhase.findUnique({ where: { id: phaseId } });
    if (!phase || phase.processId !== processId) throw new NotFoundException('Fase não encontrada');

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.status) updateData.status = data.status as PhaseStatus;
    if (data.plannedStart !== undefined) updateData.plannedStart = data.plannedStart ? new Date(data.plannedStart) : null;
    if (data.plannedEnd !== undefined) updateData.plannedEnd = data.plannedEnd ? new Date(data.plannedEnd) : null;
    if (data.actualStart !== undefined) updateData.actualStart = data.actualStart ? new Date(data.actualStart) : null;
    if (data.actualEnd !== undefined) updateData.actualEnd = data.actualEnd ? new Date(data.actualEnd) : null;
    if (data.responsibleId !== undefined) updateData.responsibleId = data.responsibleId || null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return this.prisma.procurementPhase.update({ where: { id: phaseId }, data: updateData });
  }
}
