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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, role, data) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: data.contractId },
        });
        if (!contract)
            throw new common_1.NotFoundException('Contrato não encontrado');
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId: data.contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned)
                throw new common_1.ForbiddenException('Acesso negado a este contrato');
        }
        return this.prisma.contractPayment.create({
            data: {
                contractId: data.contractId,
                registeredById: userId,
                paymentDate: new Date(data.paymentDate),
                value: data.value,
                invoiceNumber: data.invoiceNumber || null,
                description: data.description,
            },
            include: {
                registeredBy: { select: { id: true, name: true } },
            },
        });
    }
    async findByContract(contractId, userId, role) {
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned)
                throw new common_1.ForbiddenException('Acesso negado a este contrato');
        }
        return this.prisma.contractPayment.findMany({
            where: { contractId },
            include: { registeredBy: { select: { id: true, name: true } } },
            orderBy: { paymentDate: 'desc' },
        });
    }
    async delete(id, role) {
        if (role !== client_1.UserRole.ADMIN && role !== client_1.UserRole.GESTOR) {
            throw new common_1.ForbiddenException('Sem permissão para excluir pagamentos');
        }
        const payment = await this.prisma.contractPayment.findUnique({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException('Pagamento não encontrado');
        await this.prisma.contractPayment.delete({ where: { id } });
        return { ok: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map