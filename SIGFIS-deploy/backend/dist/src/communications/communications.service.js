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
exports.CommunicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CommunicationsService = class CommunicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, role) {
        const where = role === client_1.UserRole.FISCAL
            ? { contract: { fiscalAssignments: { some: { fiscalId: userId, isActive: true } } } }
            : {};
        return this.prisma.communication.findMany({
            where,
            include: {
                sender: { select: { id: true, name: true, role: true } },
                recipient: { select: { id: true, name: true } },
                contract: { select: { id: true, contractNumber: true } },
                replies: {
                    include: { sender: { select: { id: true, name: true, role: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByContract(contractId, userId, role) {
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Acesso negado a este contrato');
            }
        }
        return this.prisma.communication.findMany({
            where: { contractId },
            include: {
                sender: { select: { id: true, name: true, role: true } },
                recipient: { select: { id: true, name: true } },
                replies: {
                    include: {
                        sender: { select: { id: true, name: true, role: true } },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(userId, role, data) {
        const contract = await this.prisma.contract.findUnique({ where: { id: data.contractId } });
        if (!contract)
            throw new common_1.NotFoundException('Contrato não encontrado');
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId: data.contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Você não é fiscal designado para este contrato');
            }
        }
        const communication = await this.prisma.communication.create({
            data: {
                contractId: data.contractId,
                senderId: userId,
                recipientId: data.recipientId || null,
                subject: data.subject,
                message: data.message,
                parentId: data.parentId || null,
            },
            include: {
                sender: { select: { id: true, name: true, role: true } },
                recipient: { select: { id: true, name: true } },
            },
        });
        return communication;
    }
    async complete(id) {
        const comm = await this.prisma.communication.findUnique({ where: { id } });
        if (!comm)
            throw new common_1.NotFoundException('Comunicado não encontrado');
        return this.prisma.communication.update({
            where: { id },
            data: { isCompleted: true, completedAt: new Date() },
        });
    }
};
exports.CommunicationsService = CommunicationsService;
exports.CommunicationsService = CommunicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunicationsService);
//# sourceMappingURL=communications.service.js.map