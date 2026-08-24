import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateAuditLogInput {
  userId?: string | null;
  userEmail?: string | null;
  userName?: string | null;
  userRole?: string | null;
  action: string;
  module?: string | null;
  entity: string;
  entityId?: string | null;
  detail?: string | null;
  oldValues?: Record<string, any> | null;
  newValues?: Record<string, any> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface FindAuditLogsQuery {
  page?: number;
  pageSize?: number;
  userId?: string;
  module?: string;
  action?: string;
  entity?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt';
  sortDir?: 'asc' | 'desc';
}

const SENSITIVE_KEYS = ['passwordHash', 'password', 'access_token'];

function sanitize(value: any): any {
  if (!value || typeof value !== 'object') return value;
  const clone: Record<string, any> = Array.isArray(value) ? [...value] : { ...value };
  for (const key of SENSITIVE_KEYS) delete clone[key];
  return clone;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  /**
   * Grava um registro de auditoria. Nunca lança para o chamador — uma falha
   * ao auditar não pode derrubar a operação de negócio real. Também nunca
   * atualiza ou apaga um registro existente: cada chamada é sempre um INSERT.
   */
  async log(input: CreateAuditLogInput): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: input.userId || null,
          userEmail: input.userEmail || null,
          userName: input.userName || null,
          userRole: input.userRole || null,
          action: input.action,
          module: input.module || null,
          entity: input.entity,
          entityId: input.entityId || null,
          detail: input.detail || null,
          oldValues: input.oldValues ? sanitize(input.oldValues) : undefined,
          newValues: input.newValues ? sanitize(input.newValues) : undefined,
          ipAddress: input.ipAddress || null,
          userAgent: input.userAgent ? input.userAgent.slice(0, 255) : null,
        },
      });
    } catch (err) {
      // Log em stderr para não perder o rastro do problema, mas nunca propaga.
      // eslint-disable-next-line no-console
      console.error('[AuditService] Falha ao gravar log de auditoria:', err);
    }
  }

  async findAll(query: FindAuditLogsQuery) {
    const page = Math.max(1, query.page || 1);
    const pageSize = Math.min(100, Math.max(1, query.pageSize || 25));

    const where: any = {};
    if (query.userId) where.userId = query.userId;
    if (query.module) where.module = query.module;
    if (query.action) where.action = query.action;
    if (query.entity) where.entity = query.entity;
    if (query.dateFrom || query.dateTo) {
      where.createdAt = {};
      if (query.dateFrom) where.createdAt.gte = new Date(query.dateFrom);
      if (query.dateTo) where.createdAt.lte = new Date(query.dateTo + 'T23:59:59.999Z');
    }
    if (query.search) {
      where.OR = [
        { userName: { contains: query.search, mode: 'insensitive' } },
        { userEmail: { contains: query.search, mode: 'insensitive' } },
        { entity: { contains: query.search, mode: 'insensitive' } },
        { entityId: { contains: query.search, mode: 'insensitive' } },
        { detail: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await this.prisma.$transaction([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: query.sortDir === 'asc' ? 'asc' : 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async getSummary() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [eventsToday, eventsLast7Days, criticalActions, distinctUsers] = await Promise.all([
      this.prisma.auditLog.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.auditLog.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      this.prisma.auditLog.count({
        where: {
          createdAt: { gte: sevenDaysAgo },
          action: {
            in: [
              'DELETE', 'STATUS_CHANGE',
              'CONTRATO_EXCLUIDO_DEFINITIVAMENTE', 'HISTORICO_EXCLUIDO', 'ALERTAS_EXCLUIDOS', 'OCORRENCIAS_EXCLUIDAS',
            ],
          },
        },
      }),
      this.prisma.auditLog.findMany({
        where: { createdAt: { gte: sevenDaysAgo }, userId: { not: null } },
        distinct: ['userId'],
        select: { userId: true },
      }),
    ]);

    return {
      eventsToday,
      eventsLast7Days,
      activeUsers: distinctUsers.length,
      criticalActions,
    };
  }

  async getFilterOptions() {
    const [modules, actions, entities] = await Promise.all([
      this.prisma.auditLog.findMany({ distinct: ['module'], select: { module: true }, where: { module: { not: null } } }),
      this.prisma.auditLog.findMany({ distinct: ['action'], select: { action: true } }),
      this.prisma.auditLog.findMany({ distinct: ['entity'], select: { entity: true } }),
    ]);
    return {
      modules: modules.map((m) => m.module).filter(Boolean),
      actions: actions.map((a) => a.action),
      entities: entities.map((e) => e.entity),
    };
  }

  /** Exclusão definitiva de um registro de auditoria — restrita ao ADMIN
   *  (ver controller). A própria exclusão gera um novo registro de auditoria. */
  async remove(id: string) {
    const log = await this.prisma.auditLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Registro de auditoria não encontrado.');
    await this.prisma.auditLog.delete({ where: { id } });
    return { ok: true };
  }
}
