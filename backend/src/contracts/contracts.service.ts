import { BadRequestException, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { AlterationStatus, ContractStatus, FiscalRole, MeasurementStatus, OccurrenceStatus, UserRole } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService, private auditService: AuditService) {}

  async findAll(userId: string, role: string) {
    const sharedInclude = {
      contractor: true,
      fiscalAssignments: {
        include: {
          fiscal: {
            select: { id: true, name: true, email: true, role: true, registrationNumber: true },
          },
        },
      },
      measurements: { orderBy: { createdAt: 'desc' as const } },
      occurrences: { orderBy: { createdAt: 'desc' as const } },
      alterations: { orderBy: { createdAt: 'desc' as const } },
      communications: { orderBy: { createdAt: 'desc' as const } },
    };

    const sortContracts = (contracts: any[]) => {
      return contracts.sort((a, b) => {
        const parse = (str: string) => {
          if (!str) return { n: 0, y: 0 };
          const p = str.split('/');
          return p.length === 2 ? { n: parseInt(p[0]) || 0, y: parseInt(p[1]) || 0 } : { n: 0, y: 0 };
        };
        const pA = parse(a.contractNumber);
        const pB = parse(b.contractNumber);
        if (pA.y !== pB.y) return pB.y - pA.y;
        return pB.n - pA.n;
      });
    };

    const addComputedFields = (contracts: any[]) =>
      sortContracts(contracts).map((c) => ({
        ...c,
        hasPendingMeasurements: c.measurements?.some(
          (m: any) => m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL',
        ) ?? false,
        hasOpenOccurrences: c.occurrences?.some(
          (o: any) => o.status !== 'RESOLVED',
        ) ?? false,
      }));

    if (role === 'FISCAL') {
      const contracts = await this.prisma.contract.findMany({
        where: {
          fiscalAssignments: {
            some: { fiscalId: userId, isActive: true },
          },
        },
        include: sharedInclude,
      });
      return addComputedFields(contracts);
    }

    const contracts = await this.prisma.contract.findMany({
      include: sharedInclude,
    });
    return addComputedFields(contracts);
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
        payments: {
          include: {
            registeredBy: { select: { id: true, name: true } },
          },
          orderBy: { paymentDate: 'desc' },
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

  async create(data: any, requesterId?: string) {
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
        managerId: data.managerId || requesterId || null,
        department: data.department || null,
        observations: data.observations || null,
      },
    });
  }

  async update(id: string, data: any, caller?: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundException('Contrato não encontrado');

    const updateData: any = {};
    if (data.currentValue !== undefined) updateData.currentValue = data.currentValue;
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.status) updateData.status = data.status as ContractStatus;
    if (data.observations !== undefined) updateData.observations = data.observations;
    if (data.department !== undefined) updateData.department = data.department;
    if (data.objectDescription) updateData.objectDescription = data.objectDescription;

    const updated = await this.prisma.contract.update({ where: { id }, data: updateData });

    const oldValues: Record<string, any> = {};
    const newValues: Record<string, any> = {};
    for (const key of Object.keys(updateData)) {
      oldValues[key] = (contract as any)[key];
      newValues[key] = (updated as any)[key];
    }

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'UPDATE', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Contrato ${contract.contractNumber} atualizado`,
      oldValues, newValues,
    });

    return updated;
  }

  async deactivateAssignment(contractId: string, assignmentId: string) {
    return this.prisma.fiscalAssignment.update({
      where: { id: assignmentId },
      data: { isActive: false, endDate: new Date() },
    });
  }

  /**
   * Remove definitivamente uma designação da comissão de fiscalização
   * (exclusão real, não soft-delete). Usado pela tela de Contratos quando o
   * gestor remove um fiscal — diferente de deactivateAssignment (que apenas
   * marca isActive: false e é usado internamente quando um novo fiscal
   * substitui outro no mesmo papel, preservando o histórico).
   */
  async removeAssignment(contractId: string, assignmentId: string) {
    const assignment = await this.prisma.fiscalAssignment.findUnique({ where: { id: assignmentId } });
    if (!assignment || assignment.contractId !== contractId) {
      throw new NotFoundException('Designação não encontrada neste contrato.');
    }
    if (assignment.isActive) {
      const activeCount = await this.prisma.fiscalAssignment.count({
        where: { contractId, isActive: true },
      });
      if (activeCount <= 1) {
        throw new BadRequestException('Não é possível remover o último fiscal ativo do contrato.');
      }
    }
    await this.prisma.fiscalAssignment.delete({ where: { id: assignmentId } });
    return { ok: true };
  }

  /**
   * Designa um fiscal ao contrato. Não desativa outras designações do mesmo
   * papel — a comissão de fiscalização é uma equipe: pode haver mais de um
   * Titular (ou Substituto/Suplente) simultaneamente. Se o mesmo fiscal já
   * tiver uma designação para esse papel neste contrato, ela é atualizada
   * (reativada/renovada) em vez de duplicada.
   */
  async assignFiscalSafe(contractId: string, data: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
    if (!contract) {
      throw new NotFoundException('Contrato não encontrado');
    }

    if (!data.fiscalId || !data.role || !data.designationAct || !data.designationDate || !data.startDate) {
      throw new BadRequestException('Preencha todos os campos obrigatórios da designação.');
    }

    const normalizedRole = data.role as FiscalRole;
    if (!Object.values(FiscalRole).includes(normalizedRole)) {
      throw new BadRequestException('Função de fiscal inválida.');
    }

    const fiscal = await this.prisma.user.findFirst({
      where: { id: data.fiscalId, role: UserRole.FISCAL, status: 'ACTIVE' },
      select: { id: true },
    });
    if (!fiscal) {
      throw new BadRequestException('Fiscal não encontrado ou inativo.');
    }

    const payload = {
      designationAct: data.designationAct,
      designationDate: new Date(data.designationDate),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      isActive: true,
    };

    const existing = await this.prisma.fiscalAssignment.findFirst({
      where: { contractId, fiscalId: data.fiscalId, role: normalizedRole },
    });

    if (existing) {
      return this.prisma.fiscalAssignment.update({
        where: { id: existing.id },
        data: payload,
      });
    }

    return this.prisma.fiscalAssignment.create({
      data: {
        contractId,
        fiscalId: data.fiscalId,
        role: normalizedRole,
        ...payload,
      },
    });
  }

  /** Muda o papel (Titular/Substituto/Suplente) de uma designação já existente. */
  async updateAssignmentRole(contractId: string, assignmentId: string, role: string) {
    const normalizedRole = role as FiscalRole;
    if (!Object.values(FiscalRole).includes(normalizedRole)) {
      throw new BadRequestException('Função de fiscal inválida.');
    }

    const assignment = await this.prisma.fiscalAssignment.findUnique({ where: { id: assignmentId } });
    if (!assignment || assignment.contractId !== contractId) {
      throw new NotFoundException('Designação não encontrada neste contrato.');
    }

    if (assignment.role === normalizedRole) {
      return assignment;
    }

    const conflict = await this.prisma.fiscalAssignment.findFirst({
      where: { contractId, fiscalId: assignment.fiscalId, role: normalizedRole },
    });
    if (conflict) {
      throw new BadRequestException('Este fiscal já possui uma designação com essa função neste contrato.');
    }

    return this.prisma.fiscalAssignment.update({
      where: { id: assignmentId },
      data: { role: normalizedRole },
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

  async findReport(role: string) {
    if (role !== UserRole.ADMIN && role !== UserRole.GESTOR && role !== UserRole.ALTA_GESTAO) {
      throw new ForbiddenException('Acesso negado');
    }

    const contracts = await this.prisma.contract.findMany({
      where: { NOT: { status: ContractStatus.DRAFT } },
      include: {
        contractor: true,
        process: true,
        fiscalAssignments: {
          where: { isActive: true },
          include: {
            fiscal: { select: { id: true, name: true, email: true } },
          },
        },
        measurements: {
          where: { status: MeasurementStatus.APPROVED },
          select: { measurementValue: true },
        },
        alterations: {
          where: { status: AlterationStatus.APPROVED },
          select: { id: true },
        },
      },
      orderBy: { contractNumber: 'asc' },
    });

    return contracts.map((c) => {
      const totalMeasured = c.measurements.reduce(
        (sum, m) => sum + Number(m.measurementValue),
        0,
      );
      const currentValue = Number(c.currentValue);
      const balance = Math.max(0, currentValue - totalMeasured);

      const start = new Date(c.startDate || c.signingDate);
      const end = c.endDate ? new Date(c.endDate) : new Date();
      const durationMonths = Math.max(
        1,
        Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)),
      );
      const monthlyValue = currentValue / durationMonths;

      const titularAsg = c.fiscalAssignments.find((a) => a.role === FiscalRole.TITULAR);
      const substitutoAsg = c.fiscalAssignments.find((a) => a.role === FiscalRole.SUBSTITUTO);

      const { measurements, alterations, fiscalAssignments, ...rest } = c;

      return {
        ...rest,
        totalMeasured,
        balance,
        durationMonths,
        monthlyValue,
        aditivoCount: alterations.length,
        titular: titularAsg
          ? { ...titularAsg.fiscal, designationAct: titularAsg.designationAct, designationDate: titularAsg.designationDate }
          : null,
        substituto: substitutoAsg
          ? { ...substitutoAsg.fiscal, designationAct: substitutoAsg.designationAct }
          : null,
      };
    });
  }
}
