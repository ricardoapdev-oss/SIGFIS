import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const SELECT_USER = { id: true, name: true, email: true, role: true, registrationNumber: true, status: true };

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private auditService: AuditService) {}

  async listFiscais() {
    return this.prisma.user.findMany({
      where: { role: UserRole.FISCAL, status: UserStatus.ACTIVE },
      select: { ...SELECT_USER },
      orderBy: { name: 'asc' },
    });
  }

  async listGestores() {
    return this.prisma.user.findMany({
      where: { role: UserRole.GESTOR, status: UserStatus.ACTIVE },
      select: { ...SELECT_USER },
      orderBy: { name: 'asc' },
    });
  }

  async listAll() {
    const users = await this.prisma.user.findMany({
      select: { ...SELECT_USER, createdAt: true },
      orderBy: { name: 'asc' },
    });

    // "Último acesso" real, derivado da trilha de auditoria (evento LOGIN),
    // nunca inventado. Uma única consulta agregada — independe da quantidade
    // de usuários, sem N+1.
    const lastLogins = await this.prisma.auditLog.groupBy({
      by: ['userId'],
      where: { action: 'LOGIN', userId: { not: null } },
      _max: { createdAt: true },
    });
    const lastLoginByUserId = new Map(lastLogins.map((l) => [l.userId, l._max.createdAt]));

    return users.map((u) => ({ ...u, lastLoginAt: lastLoginByUserId.get(u.id) ?? null }));
  }

  async create(data: any, callerRole: string) {
    // ALTA_GESTAO não pode criar ADMIN
    if (callerRole === 'ALTA_GESTAO' && data.role === 'ADMIN') {
      throw new ForbiddenException('Alta Gestão não pode cadastrar usuários ADMIN');
    }
    // GESTOR só pode criar GESTOR e FISCAL
    if (callerRole === 'GESTOR' && data.role !== 'GESTOR' && data.role !== 'FISCAL') {
      throw new ForbiddenException('Gestor pode cadastrar apenas Gestores e Fiscais');
    }

    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictException('Já existe um usuário com este e-mail');

    const passwordHash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role as UserRole,
        registrationNumber: data.registrationNumber || null,
        status: UserStatus.ACTIVE,
      },
      select: { ...SELECT_USER },
    });
  }

  async updateProfile(id: string, data: any, caller: any) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const isSelf = caller.id === id;
    const isAdmin = caller.role === 'ADMIN';
    const isGestor = caller.role === 'GESTOR';

    // Quem pode editar este perfil:
    //  - o próprio usuário (dados pessoais / senha)
    //  - ADMIN: qualquer usuário
    //  - GESTOR: qualquer usuário, EXCETO usuários com perfil ADMIN
    const canManageTarget = isAdmin || (isGestor && user.role !== 'ADMIN');
    if (!isSelf && !canManageTarget) {
      throw new ForbiddenException(
        isGestor
          ? 'O Gestor não pode editar o perfil de um Administrador.'
          : 'Sem permissão para editar este perfil',
      );
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.registrationNumber !== undefined) updateData.registrationNumber = data.registrationNumber || null;
    // Redefinição de senha: só o próprio usuário ou um ADMIN.
    if (data.password && (isSelf || isAdmin)) updateData.passwordHash = await bcrypt.hash(data.password, 10);

    // E-mail é único — valida antes para devolver mensagem clara.
    if (updateData.email && updateData.email !== user.email) {
      const dup = await this.prisma.user.findUnique({ where: { email: updateData.email } });
      if (dup) throw new ConflictException('Já existe um usuário com este e-mail');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: { ...SELECT_USER },
    });

    this.auditService.log({
      userId: caller.id, userEmail: caller.email, userName: caller.name, userRole: caller.role,
      action: 'UPDATE', module: 'Usuários', entity: 'User', entityId: id,
      detail: `Perfil atualizado (${caller.id === id ? 'próprio usuário' : 'por ' + caller.name})`,
      oldValues: { name: user.name, email: user.email, registrationNumber: user.registrationNumber },
      newValues: { name: updated.name, email: updated.email, registrationNumber: updated.registrationNumber },
    });

    return updated;
  }

  async toggleStatus(id: string, status: string, caller: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('Usuário não encontrado');
    // Apenas ADMIN pode alterar status de outro ADMIN
    if (target.role === UserRole.ADMIN && caller.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas o ADMIN pode alterar o status de outro ADMIN');
    }
    const updated = await this.prisma.user.update({
      where: { id },
      data: { status: status as UserStatus },
      select: { ...SELECT_USER },
    });

    this.auditService.log({
      userId: caller.id, userEmail: caller.email, userName: caller.name, userRole: caller.role,
      action: 'STATUS_CHANGE', module: 'Usuários', entity: 'User', entityId: id,
      detail: `Status de ${target.name} alterado: ${target.status} → ${status}`,
      oldValues: { status: target.status },
      newValues: { status },
    });

    return updated;
  }

  async delete(id: string, caller: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('Usuário não encontrado');
    // Apenas ADMIN pode excluir outro ADMIN
    if (target.role === UserRole.ADMIN && caller.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas o ADMIN pode excluir outro ADMIN');
    }
    await this.prisma.user.delete({ where: { id } });

    this.auditService.log({
      userId: caller.id, userEmail: caller.email, userName: caller.name, userRole: caller.role,
      action: 'DELETE', module: 'Usuários', entity: 'User', entityId: id,
      detail: `Usuário ${target.name} (${target.email}) excluído por ${caller.name}`,
      oldValues: { name: target.name, email: target.email, role: target.role, status: target.status },
    });

    return { ok: true };
  }
}
