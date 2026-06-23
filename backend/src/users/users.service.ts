import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listFiscais() {
    return this.prisma.user.findMany({
      where: { role: UserRole.FISCAL, status: UserStatus.ACTIVE },
      select: { id: true, name: true, email: true, role: true, registrationNumber: true, status: true },
      orderBy: { name: 'asc' },
    });
  }

  async listAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, registrationNumber: true, status: true, createdAt: true },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: any) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('Já existe um usuário com este e-mail');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
        registrationNumber: data.registrationNumber || null,
        status: UserStatus.ACTIVE,
      },
      select: { id: true, name: true, email: true, role: true, registrationNumber: true, status: true },
    });
  }

  async toggleStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.prisma.user.update({
      where: { id },
      data: { status: status as UserStatus },
      select: { id: true, name: true, email: true, role: true, registrationNumber: true, status: true },
    });
  }
}
