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
exports.OccurrencesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OccurrencesService = class OccurrencesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, role, data) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: data.contractId },
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
        const occurrence = await this.prisma.occurrence.create({
            data: {
                contractId: data.contractId,
                fiscalId: userId,
                title: data.title,
                description: data.description,
                severity: data.severity || client_1.OccurrenceSeverity.MEDIUM,
                status: client_1.OccurrenceStatus.OPEN,
            },
        });
        if (data.severity === client_1.OccurrenceSeverity.HIGH || data.severity === client_1.OccurrenceSeverity.CRITICAL) {
            await this.prisma.systemAlert.create({
                data: {
                    contractId: data.contractId,
                    type: client_1.AlertType.OCCURRENCE_CRITICAL,
                    message: `Alerta Crítico: Ocorrência grave de nível ${data.severity} registrada para o contrato ${contract.contractNumber}: "${data.title}"`,
                    targetRole: client_1.UserRole.GESTOR,
                },
            });
        }
        return occurrence;
    }
    async resolve(id, userId, role, data) {
        const occurrence = await this.prisma.occurrence.findUnique({
            where: { id },
            include: { contract: true },
        });
        if (!occurrence) {
            throw new common_1.NotFoundException('Ocorrência não encontrada');
        }
        if (role === client_1.UserRole.FISCAL) {
            const isAssigned = await this.prisma.fiscalAssignment.findFirst({
                where: { contractId: occurrence.contractId, fiscalId: userId, isActive: true },
            });
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Acesso negado a este contrato');
            }
        }
        return this.prisma.occurrence.update({
            where: { id },
            data: {
                status: client_1.OccurrenceStatus.RESOLVED,
                resolutionDescription: data.resolutionDescription,
                resolvedById: userId,
                resolvedAt: new Date(),
            },
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
        return this.prisma.occurrence.findMany({
            where: { contractId },
            include: {
                fiscal: { select: { name: true } },
                resolver: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id) {
        const occ = await this.prisma.occurrence.findUnique({ where: { id } });
        if (!occ)
            throw new common_1.NotFoundException('Ocorrência não encontrada');
        await this.prisma.occurrence.delete({ where: { id } });
        return { ok: true };
    }
};
exports.OccurrencesService = OccurrencesService;
exports.OccurrencesService = OccurrencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OccurrencesService);
//# sourceMappingURL=occurrences.service.js.map