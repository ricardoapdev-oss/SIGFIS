import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractStatus, FiscalRole, MeasurementStatus, OccurrenceStatus, UserRole } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    if (role === 'FISCAL') {
      return this.prisma.contract.findMany({
        where: {
          fiscalAssignments: {
            some: {
              fiscalId: userId,
              isActive: true,
            },
          },
        },
        include: {
          contractor: true,
          fiscalAssignments: {
            include: {
              fiscal: {
                select: { id: true, name: true, email: true, role: true, registrationNumber: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.contract.findMany({
      include: {
        contractor: true,
        fiscalAssignments: {
          include: {
            fiscal: {
              select: { id: true, name: true, email: true, role: true, registrationNumber: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        contractor: true,
        process: true,
        fiscalAssignments: {
          include: {
            fiscal: {
              select: { id: true, name: true, email: true, role: true, registrationNumber: true },
            },
          },
        },
        occurrences: {
          include: {
            fiscal: { select: { name: true } },
            resolver: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        measurements: {
          include: {
            fiscal: { select: { name: true } },
            approver: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        alterations: {
          include: {
            requester: { select: { name: true } },
            reviewer: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        documents: true,
        communications: {
          include: {
            sender: { select: { name: true, role: true } },
            recipient: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    if (role === 'FISCAL') {
      const isAssigned = contract.fiscalAssignments.some(
        (assignment) => assignment.fiscalId === userId && assignment.isActive
      );
      if (!isAssigned) {
        throw new ForbiddenException('Você não tem permissão para visualizar este contrato');
      }
    }

    return contract;
  }

  async create(data: any) {
    return this.prisma.contract.create({
      data: {
        contractNumber: data.contractNumber,
        processId: data.processId || null,
        contractorId: data.contractorId,
        objectDescription: data.objectDescription,
        initialValue: data.initialValue,
        currentValue: data.initialValue,
        signingDate: new Date(data.signingDate),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: ContractStatus.ACTIVE,
        managerId: data.managerId || null,
        department: data.department || null,
        observations: data.observations || null,
      },
    });
  }

  async update(id: string, data: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundException('Contrato não encontrado');

    const updateData: any = {};
    if (data.currentValue !== undefined) updateData.currentValue = data.currentValue;
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.status) updateData.status = data.status as ContractStatus;
    if (data.observations !== undefined) updateData.observations = data.observations;
    if (data.department !== undefined) updateData.department = data.department;
    if (data.objectDescription) updateData.objectDescription = data.objectDescription;

    return this.prisma.contract.update({ where: { id }, data: updateData });
  }

  async deactivateAssignment(contractId: string, assignmentId: string) {
    return this.prisma.fiscalAssignment.update({
      where: { id: assignmentId },
      data: { isActive: false, endDate: new Date() },
    });
  }

  async assignFiscal(contractId: string, data: any) {
    // Verificar se contrato existe
    const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    // Desativar atribuições anteriores para o mesmo papel se for o caso
    if (data.role === FiscalRole.TITULAR || data.role === FiscalRole.SUBSTITUTO) {
      await this.prisma.fiscalAssignment.updateMany({
        where: {
          contractId,
          role: data.role,
          isActive: true,
        },
        data: { isActive: false },
      });
    }

    return this.prisma.fiscalAssignment.create({
      data: {
        contractId,
        fiscalId: data.fiscalId,
        role: data.role,
        designationAct: data.designationAct,
        designationDate: new Date(data.designationDate),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isActive: true,
      },
    });
  }

  async getDashboardStats(userId: string, role: string) {
    // Dashboard consolidado
    let contractWhereClause = {};
    if (role === 'FISCAL') {
      contractWhereClause = {
        fiscalAssignments: {
          some: { fiscalId: userId, isActive: true }
        }
      };
    }

    const contracts = await this.prisma.contract.findMany({
      where: contractWhereClause,
      include: {
        measurements: true,
        occurrences: true,
        alterations: true,
      }
    });

    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(c => c.status === ContractStatus.ACTIVE).length;
    
    let totalValue = 0;
    let totalMeasured = 0;
    let openOccurrences = 0;

    contracts.forEach(c => {
      totalValue += Number(c.currentValue);
      c.measurements.forEach(m => {
        if (m.status === MeasurementStatus.APPROVED) {
          totalMeasured += Number(m.measurementValue);
        }
      });
      openOccurrences += c.occurrences.filter(o => o.status === OccurrenceStatus.OPEN).length;
    });

    // Buscar últimos alertas se for GESTOR ou FISCAL
    let alerts: any[] = [];
    if (role !== UserRole.ADMIN) {
      alerts = await this.prisma.systemAlert.findMany({
        where: {
          targetRole: role as any,
          isRead: false,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
    }

    return {
      totalContracts,
      activeContracts,
      totalValue,
      totalMeasured,
      openOccurrences,
      alerts,
    };
  }
}
