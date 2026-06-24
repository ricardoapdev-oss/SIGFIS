import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const SELECT_USER = { id: true, name: true, email: true, role: true, registrationNumber: true, status: true };

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.user.findMany({
      select: { ...SELECT_USER, createdAt: true },
      orderBy: { name: 'asc' },
    });
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
    // Só o próprio usuário ou ADMIN pode atualizar perfil
    if (caller.role !== 'ADMIN' && caller.id !== id) {
      throw new ForbiddenException('Sem permissão para editar este perfil');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.registrationNumber !== undefined) updateData.registrationNumber = data.registrationNumber || null;
    if (data.password) updateData.passwordHash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: { ...SELECT_USER },
    });
  }

  async toggleStatus(id: string, status: string, caller: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('Usuário não encontrado');
    // Apenas ADMIN pode alterar status de outro ADMIN
    if (target.role === UserRole.ADMIN && caller.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas o ADMIN pode alterar o status de outro ADMIN');
    }
    return this.prisma.user.update({
      where: { id },
      data: { status: status as UserStatus },
      select: { ...SELECT_USER },
    });
  }

  async delete(id: string, caller: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('Usuário não encontrado');
    // Apenas ADMIN pode excluir outro ADMIN
    if (target.role === UserRole.ADMIN && caller.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas o ADMIN pode excluir outro ADMIN');
    }
    await this.prisma.user.delete({ where: { id } });
    return { ok: true };
  }
}
