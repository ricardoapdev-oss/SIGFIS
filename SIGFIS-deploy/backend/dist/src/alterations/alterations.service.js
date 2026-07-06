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
exports.AlterationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AlterationsService = class AlterationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, role, data) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: data.contractId },
            include: { alterations: true },
        });
        if (!contract) {
            throw new common_1.NotFoundException('Contrato não encontrado');
        }
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId: data.contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Acesso negado a este contrato');
            }
        }
        else if (role === client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Perfil administrativo não pode propor alterações.');
        }
        const valueChange = Number(data.valueChange || 0);
        if (data.type === client_1.AlterationType.ADDENDUM_VALUE_INCREASE) {
            const isReform = contract.objectDescription.toLowerCase().includes('reforma') ||
                contract.objectDescription.toLowerCase().includes('retrofit') ||
                contract.objectDescription.toLowerCase().includes('readequação de espaço');
            const limitPercentage = isReform ? 0.50 : 0.25;
            const limitValue = Number(contract.initialValue) * limitPercentage;
            const approvedValueIncreases = contract.alterations
                .filter(alt => alt.type === client_1.AlterationType.ADDENDUM_VALUE_INCREASE && alt.status === client_1.AlterationStatus.APPROVED)
                .reduce((sum, alt) => sum + Number(alt.valueChange), 0);
            const totalProjectedIncrease = approvedValueIncreases + valueChange;
            if (totalProjectedIncrease > limitValue) {
                throw new common_1.BadRequestException(`Limite de aditivo de valor excedido. O limite acumulado permitido para este contrato é de R$ ${limitValue.toFixed(2)} (${limitPercentage * 100}%). Projetado: R$ ${totalProjectedIncrease.toFixed(2)}`);
            }
        }
        const alteration = await this.prisma.contractAlteration.create({
            data: {
                contractId: data.contractId,
                type: data.type,
                alterationNumber: data.alterationNumber || null,
                valueChange: valueChange,
                newEndDate: data.newEndDate ? new Date(data.newEndDate) : null,
                justification: data.justification,
                status: client_1.AlterationStatus.PENDING_APPROVAL,
                requestedById: userId,
            },
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: data.contractId,
                type: client_1.AlertType.CONTRACT_LIMIT_WARNING,
                message: `Solicitação de alteração contratual (${data.type}) pendente de aprovação para o contrato ${contract.contractNumber}.`,
                targetRole: client_1.UserRole.GESTOR,
            },
        });
        return alteration;
    }
    async approve(id, userId) {
        const alteration = await this.prisma.contractAlteration.findUnique({
            where: { id },
            include: { contract: true },
        });
        if (!alteration) {
            throw new common_1.NotFoundException('Alteração contratual não encontrada');
        }
        if (alteration.status !== client_1.AlterationStatus.PENDING_APPROVAL) {
            throw new common_1.BadRequestException('Esta solicitação já foi processada.');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const approvedAlt = await tx.contractAlteration.update({
                where: { id },
                data: {
                    status: client_1.AlterationStatus.APPROVED,
                    reviewedById: userId,
                    reviewDate: new Date(),
                },
            });
            const newCurrentValue = Number(alteration.contract.currentValue) + Number(alteration.valueChange);
            const updateData = {
                currentValue: newCurrentValue,
            };
            if (alteration.newEndDate) {
                updateData.endDate = alteration.newEndDate;
            }
            await tx.contract.update({
                where: { id: alteration.contractId },
                data: updateData,
            });
            return approvedAlt;
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: alteration.contractId,
                type: client_1.AlertType.CONTRACT_LIMIT_WARNING,
                message: `A solicitação de alteração contratual "${alteration.alterationNumber || alteration.type}" foi APROVADA pelo Gestor.`,
                targetRole: client_1.UserRole.FISCAL,
            },
        });
        return result;
    }
    async reject(id, userId, data) {
        const alteration = await this.prisma.contractAlteration.findUnique({
            where: { id },
        });
        if (!alteration) {
            throw new common_1.NotFoundException('Alteração contratual não encontrada');
        }
        const updated = await this.prisma.contractAlteration.update({
            where: { id },
            data: {
                status: client_1.AlterationStatus.REJECTED,
                reviewedById: userId,
                reviewDate: new Date(),
                reviewNotes: data.reason,
            },
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: alteration.contractId,
                type: client_1.AlertType.CONTRACT_LIMIT_WARNING,
                message: `A solicitação de alteração contratual foi REJEITADA pelo Gestor. Motivo: ${data.reason}`,
                targetRole: client_1.UserRole.FISCAL,
            },
        });
        return updated;
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
        return this.prisma.contractAlteration.findMany({
            where: { contractId },
            include: {
                requester: { select: { name: true } },
                reviewer: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, data) {
        const alt = await this.prisma.contractAlteration.findUnique({ where: { id } });
        if (!alt)
            throw new common_1.NotFoundException('Aditivo não encontrado');
        const { id: _id, contractId: _cid, requesterId: _rid, reviewerId: _rvid, createdAt, updatedAt, ...updateData } = data;
        return this.prisma.contractAlteration.update({ where: { id }, data: updateData });
    }
    async delete(id) {
        const alt = await this.prisma.contractAlteration.findUnique({ where: { id } });
        if (!alt)
            throw new common_1.NotFoundException('Aditivo não encontrado');
        await this.prisma.contractAlteration.delete({ where: { id } });
        return { ok: true };
    }
};
exports.AlterationsService = AlterationsService;
exports.AlterationsService = AlterationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlterationsService);
//# sourceMappingURL=alterations.service.js.map