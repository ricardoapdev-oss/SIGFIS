"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContractorsService = class ContractorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.contractor.findMany({
            orderBy: { corporateName: 'asc' },
        });
    }
    async findOne(id) {
        const contractor = await this.prisma.contractor.findUnique({ where: { id } });
        if (!contractor)
            throw new common_1.NotFoundException('Fornecedor não encontrado');
        return contractor;
    }
    async create(data) {
        const existing = await this.prisma.contractor.findUnique({ where: { cnpjCpf: data.cnpjCpf } });
        if (existing)
            throw new common_1.ConflictException('Já existe um fornecedor com este CNPJ/CPF');
        return this.prisma.contractor.create({ data });
    }
    async update(id, data) {
        const contractor = await this.prisma.contractor.findUnique({ where: { id } });
        if (!contractor)
            throw new common_1.NotFoundException('Fornecedor não encontrado');
        const { id: _id, createdAt, updatedAt, ...updateData } = data;
        return this.prisma.contractor.update({ where: { id }, data: updateData });
    }
};
exports.ContractorsService = ContractorsService;
exports.ContractorsService = ContractorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContractorsService);
//# sourceMappingURL=contractors.service.js.map