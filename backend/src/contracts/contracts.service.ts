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
          archived: false,
          fiscalAssignments: {
            some: { fiscalId: userId, isActive: true },
          },
        },
        include: sharedInclude,
      });
      return addComputedFields(contracts);
    }

    // Listagem operacional principal: nunca inclui contratos arquivados —
    // esses só aparecem em findArchived(), para os perfis autorizados.
    const contracts = await this.prisma.contract.findMany({
      where: { archived: false },
      include: sharedInclude,
    });
    return addComputedFields(contracts);
  }

  /**
   * Contratos arquivados — visão histórica resumida, restrita a
   * ADMIN/GESTOR/ALTA_GESTAO (o único outro papel existente, FISCAL, nunca
   * tem acesso a esta lista, independentemente de ter sido designado no
   * passado). A checagem de papel também é feita no controller (@Roles),
   * mas é repetida aqui como segunda camada de defesa.
   */
  async findArchived(role: string) {
    if (role !== UserRole.ADMIN && role !== UserRole.GESTOR && role !== UserRole.ALTA_GESTAO) {
      throw new ForbiddenException('Acesso negado.');
    }

    const contracts = await this.prisma.contract.findMany({
      where: { archived: true },
      include: {
        contractor: true,
        process: { select: { processNumber: true, modality: true } },
        fiscalAssignments: {
          where: { isActive: true },
          include: { fiscal: { select: { id: true, name: true, registrationNumber: true } } },
        },
        alterations: { select: { id: true } },
        occurrences: { select: { id: true } },
        payments: { select: { value: true } },
        archivedBy: { select: { id: true, name: true } },
        restoredBy: { select: { id: true, name: true } },
      },
      orderBy: { archivedAt: 'desc' },
    });

    return contracts.map((c) => {
      const { alterations, occurrences, payments, ...rest } = c;
      return {
        ...rest,
        aditivoCount: alterations.length,
        occurrenceCount: occurrences.length,
        totalPaid: payments.reduce((sum, p) => sum + Number(p.value), 0),
      };
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
      // Contratos arquivados saem da operação — FISCAL nunca os visualiza,
      // mesmo tendo sido designado no passado (único papel sem acesso a
      // Contratos Arquivados; os demais três papéis existentes têm acesso).
      if (contract.archived) {
        throw new ForbiddenException('Este contrato foi arquivado e não está mais disponível para este perfil.');
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

    // Encerramento e rescisão do contrato: além de mudar a situação, arquivam
    // automaticamente (saem da listagem operacional, mas o histórico é
    // preservado em Contratos Arquivados) — regra de negócio explícita,
    // separada da ação manual de "Arquivar". Suspensão, ao contrário,
    // permanece na listagem principal — só muda o status.
    const isConcluding = data.status === ContractStatus.CONCLUDED && contract.status !== ContractStatus.CONCLUDED;
    const isRescinding = data.status === ContractStatus.RESCINDED && contract.status !== ContractStatus.RESCINDED;
    if (isConcluding) {
      updateData.archived = true;
      updateData.archivedAt = new Date();
      updateData.archivedById = caller?.id || null;
      updateData.archiveReason = 'Encerramento do contrato';
    } else if (isRescinding) {
      updateData.archived = true;
      updateData.archivedAt = new Date();
      updateData.archivedById = caller?.id || null;
      updateData.archiveReason = data.archiveReason?.trim()
        ? `Rescisão do contrato — ${data.archiveReason.trim()}`
        : 'Rescisão do contrato';
    }

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

    if (isConcluding) {
      this.auditService.log({
        userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
        action: 'CONTRATO_ARQUIVADO', module: 'Contratos', entity: 'Contract', entityId: id,
        detail: `Contrato ${contract.contractNumber} encerrado e arquivado automaticamente`,
      });
    } else if (isRescinding) {
      this.auditService.log({
        userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
        action: 'CONTRATO_ARQUIVADO', module: 'Contratos', entity: 'Contract', entityId: id,
        detail: `Contrato ${contract.contractNumber} rescindido e arquivado automaticamente${data.archiveReason?.trim() ? ` — motivo: ${data.archiveReason.trim()}` : ''}`,
      });
    }

    return updated;
  }

  /**
   * Arquivamento manual (soft delete) — a ação de "Excluir" na tela de
   * Contratos para usuários autorizados (GESTOR/ADMIN). Nunca apaga o
   * registro: apenas o marca como arquivado e o retira da listagem
   * operacional principal, preservando todos os dados e relacionamentos.
   */
  async archive(id: string, caller: any, reason?: string) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');
    if (contract.archived) {
      throw new BadRequestException('Este contrato já está arquivado.');
    }

    const updated = await this.prisma.contract.update({
      where: { id },
      data: {
        archived: true,
        archivedAt: new Date(),
        archivedById: caller?.id || null,
        archiveReason: reason?.trim() || 'Arquivamento solicitado pelo usuário',
      },
    });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'CONTRATO_ARQUIVADO', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Contrato ${contract.contractNumber} arquivado por ${caller?.name || 'usuário'}`,
    });

    return updated;
  }

  /**
   * Restaura um contrato arquivado de volta à listagem operacional.
   * Não altera a "situação" contratual (status) — um contrato Encerrado
   * restaurado continua Encerrado; a coerência com a realidade contratual
   * é responsabilidade de quem restaura, não uma inferência automática.
   */
  async restore(id: string, caller: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');
    if (!contract.archived) {
      throw new BadRequestException('Este contrato não está arquivado.');
    }

    const updated = await this.prisma.contract.update({
      where: { id },
      data: {
        archived: false,
        restoredAt: new Date(),
        restoredById: caller?.id || null,
      },
    });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'CONTRATO_RESTAURADO', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Contrato ${contract.contractNumber} restaurado por ${caller?.name || 'usuário'}`,
    });

    return updated;
  }

  /**
   * Exclusão definitiva — exclusiva do ADMIN (ver @Roles no controller).
   * Diferente do arquivamento: remove o registro do contrato de fato. Os
   * relacionamentos dependentes (designações de fiscais, ocorrências,
   * medições, aditivos, documentos, comunicados, pagamentos, alertas) têm
   * onDelete: Cascade no schema e são removidos automaticamente pelo
   * banco — não há registros órfãos. O AuditLog não tem FK para Contract
   * (entityId é apenas um identificador solto), então o histórico de
   * auditoria do contrato sobrevive à exclusão do próprio contrato.
   */
  async hardDelete(id: string, caller: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');

    await this.prisma.contract.delete({ where: { id } });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'CONTRATO_EXCLUIDO_DEFINITIVAMENTE', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Contrato ${contract.contractNumber} excluído definitivamente por ${caller?.name || 'usuário'} — operação irreversível`,
    });

    return { ok: true };
  }

  /**
   * Painel "Gerenciar dados históricos" (ADMIN) — contagens dos dados
   * vinculados ao contrato que podem ser apagados individualmente, sem
   * apagar o contrato inteiro.
   */
  async getHistoricalDataSummary(id: string) {
    const contract = await this.prisma.contract.findUnique({ where: { id }, select: { id: true, contractNumber: true } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');

    const [auditCount, alertsCount, occurrencesCount] = await Promise.all([
      this.prisma.auditLog.count({ where: { entityId: id } }),
      this.prisma.systemAlert.count({ where: { contractId: id } }),
      this.prisma.occurrence.count({ where: { contractId: id } }),
    ]);

    return { auditCount, alertsCount, occurrencesCount };
  }

  /**
   * Exclui definitivamente os registros de auditoria deste contrato
   * (entityId = id do contrato). Separado da exclusão do contrato em si —
   * excluir histórico não exclui o contrato. A própria exclusão gera um
   * novo registro de auditoria, gravado depois de apagar os antigos, para
   * que ele não seja apagado junto.
   */
  async deleteContractHistory(id: string, caller: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id }, select: { id: true, contractNumber: true } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');

    const { count } = await this.prisma.auditLog.deleteMany({ where: { entityId: id } });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'HISTORICO_EXCLUIDO', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Histórico de auditoria do contrato ${contract.contractNumber} excluído (${count} registro(s)) por ${caller?.name || 'usuário'}`,
    });

    return { ok: true, count };
  }

  /** Exclui definitivamente os alertas vinculados ao contrato. Não exclui o contrato. */
  async deleteContractAlerts(id: string, caller: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id }, select: { id: true, contractNumber: true } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');

    const { count } = await this.prisma.systemAlert.deleteMany({ where: { contractId: id } });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'ALERTAS_EXCLUIDOS', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Alertas do contrato ${contract.contractNumber} excluídos (${count} registro(s)) por ${caller?.name || 'usuário'}`,
    });

    return { ok: true, count };
  }

  /**
   * Exclui definitivamente as ocorrências vinculadas ao contrato (e seus
   * documentos, via onDelete: Cascade). Não exclui o contrato.
   */
  async deleteContractOccurrences(id: string, caller: any) {
    const contract = await this.prisma.contract.findUnique({ where: { id }, select: { id: true, contractNumber: true } });
    if (!contract) throw new NotFoundException('Contrato não encontrado.');

    const { count } = await this.prisma.occurrence.deleteMany({ where: { contractId: id } });

    this.auditService.log({
      userId: caller?.id, userEmail: caller?.email, userName: caller?.name, userRole: caller?.role,
      action: 'OCORRENCIAS_EXCLUIDAS', module: 'Contratos', entity: 'Contract', entityId: id,
      detail: `Ocorrências do contrato ${contract.contractNumber} excluídas (${count} registro(s)) por ${caller?.name || 'usuário'}`,
    });

    return { ok: true, count };
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
    // Dashboard consolidado — nunca mistura contratos arquivados nos
    // indicadores de operação corrente.
    let contractWhereClause: any = { archived: false };
    if (role === 'FISCAL') {
      contractWhereClause = {
        archived: false,
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
      where: { NOT: { status: ContractStatus.DRAFT }, archived: false },
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
