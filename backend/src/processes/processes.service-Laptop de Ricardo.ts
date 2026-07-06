import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhaseStatus, ProcessStatus, UserRole, WorkflowItemStatus } from '@prisma/client';
import { buildDefaultPhases, buildDefaultWorkflowItems } from './process-workflow';

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      return this.prisma.procurementProcess.findMany({
        where: {
          OR: [{ requesterId: userId }, { responsibleFiscalId: userId }],
        },
        include: {
          requester: { select: { id: true, name: true, registrationNumber: true } },
          responsibleFiscal: { select: { id: true, name: true, email: true, registrationNumber: true } },
          contracts: { select: { id: true, contractNumber: true, status: true } },
          phases: { orderBy: { phaseNumber: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.procurementProcess.findMany({
      include: {
        requester: { select: { id: true, name: true, registrationNumber: true } },
        responsibleFiscal: { select: { id: true, name: true, email: true, registrationNumber: true } },
        contracts: { select: { id: true, contractNumber: true, status: true } },
        phases: { orderBy: { phaseNumber: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const process = await this.prisma.procurementProcess.findUnique({
      where: { id },
      include: {
        requester: { select: { id: true, name: true, registrationNumber: true } },
        responsibleFiscal: { select: { id: true, name: true, email: true, registrationNumber: true } },
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
        phases: {
          include: {
            responsible: { select: { id: true, name: true, email: true, registrationNumber: true } },
            workflowItems: {
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { phaseNumber: 'asc' },
        },
        workflowItems: {
          where: { phaseId: null },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!process) throw new NotFoundException('Processo não encontrado');

    if (
      role === UserRole.FISCAL &&
      process.requesterId !== userId &&
      process.responsibleFiscalId !== userId
    ) {
      throw new ForbiddenException('Você não tem permissão para visualizar este processo');
    }

    return process;
  }

  async create(userId: string, data: any) {
    return this.prisma.$transaction(async (tx) => {
      const process = await tx.procurementProcess.create({
        data: {
          processNumber: data.processNumber,
          subject: data.subject,
          description: data.description || null,
          status: ProcessStatus.PLANNING,
          modality: data.modality,
          estimatedValue: data.estimatedValue,
          requesterDepartment: data.requesterDepartment,
          requesterId: userId,
          responsibleFiscalId: data.responsibleFiscalId || null,
          relatedProcessNumbers: data.relatedProcessNumbers || [],
          legalBasis: data.legalBasis || null,
          contractReference: data.contractReference || null,
          currentAddendum: data.currentAddendum || null,
          fiscalOrdinance: data.fiscalOrdinance || null,
          observation: data.observation || null,
        },
      });

      const phases = buildDefaultPhases(process.id, data.responsibleFiscalId || null, 'planning');
      const createdPhases: Array<{ id: string; phaseNumber: number }> = [];

      for (const phase of phases) {
        const created = await tx.processPhase.create({ data: phase });
        createdPhases.push({ id: created.id, phaseNumber: created.phaseNumber });
      }

      const workflowItems = buildDefaultWorkflowItems(process.id, createdPhases, 'planning');
      await tx.processWorkflowItem.createMany({ data: workflowItems });

      return process;
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

  async findPhases(processId: string, userId: string, role: string) {
    await this.findOne(processId, userId, role);

    return this.prisma.processPhase.findMany({
      where: { processId },
      include: {
        responsible: { select: { id: true, name: true, email: true, registrationNumber: true } },
        workflowItems: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { phaseNumber: 'asc' },
    });
  }

  async updatePhase(processId: string, phaseId: string, userId: string, role: string, data: any) {
    await this.findOne(processId, userId, role);

    const phase = await this.prisma.processPhase.findFirst({
      where: { id: phaseId, processId },
    });

    if (!phase) {
      throw new NotFoundException('Fase não encontrada');
    }

    return this.prisma.processPhase.update({
      where: { id: phaseId },
      data: {
        status: data.status ? (data.status as PhaseStatus) : undefined,
        plannedStart: data.plannedStart ? new Date(data.plannedStart) : data.plannedStart === null ? null : undefined,
        plannedEnd: data.plannedEnd ? new Date(data.plannedEnd) : data.plannedEnd === null ? null : undefined,
        actualStart: data.actualStart ? new Date(data.actualStart) : data.actualStart === null ? null : undefined,
        actualEnd: data.actualEnd ? new Date(data.actualEnd) : data.actualEnd === null ? null : undefined,
        responsibleId: data.responsibleId !== undefined ? data.responsibleId || null : undefined,
        observations: data.observations !== undefined ? data.observations || null : undefined,
      },
      include: {
        responsible: { select: { id: true, name: true, email: true, registrationNumber: true } },
        workflowItems: { orderBy: { createdAt: 'asc' } },
      },
    });
  }

  async updateWorkflowItem(processId: string, itemId: string, userId: string, role: string, data: any) {
    await this.findOne(processId, userId, role);

    const item = await this.prisma.processWorkflowItem.findFirst({
      where: { id: itemId, processId },
    });

    if (!item) {
      throw new NotFoundException('Checklist não encontrado');
    }

    return this.prisma.processWorkflowItem.update({
      where: { id: itemId },
      data: {
        status: data.status ? (data.status as WorkflowItemStatus) : undefined,
        description: data.description !== undefined ? data.description || null : undefined,
        dueDate: data.dueDate ? new Date(data.dueDate) : data.dueDate === null ? null : undefined,
      },
    });
  }
}
