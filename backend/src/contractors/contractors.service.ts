import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContractorsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.contractor.findMany({
      orderBy: { corporateName: 'asc' },
    });
  }

  async findOne(id: string) {
    const contractor = await this.prisma.contractor.findUnique({ where: { id } });
    if (!contractor) throw new NotFoundException('Fornecedor não encontrado');
    return contractor;
  }

  async create(data: any) {
    const existing = await this.prisma.contractor.findUnique({ where: { cnpjCpf: data.cnpjCpf } });
    if (existing) throw new ConflictException('Já existe um fornecedor com este CNPJ/CPF');
    return this.prisma.contractor.create({ data });
  }

  async update(id: string, data: any) {
    const contractor = await this.prisma.contractor.findUnique({ where: { id } });
    if (!contractor) throw new NotFoundException('Fornecedor não encontrado');
    const { id: _id, createdAt, updatedAt, ...updateData } = data;
    return this.prisma.contractor.update({ where: { id }, data: updateData });
  }
}
