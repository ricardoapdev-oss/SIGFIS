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
exports.MeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MeasurementsService = class MeasurementsService {
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
                where: {
                    contractId: data.contractId,
                    fiscalId: userId,
                    isActive: true,
                },
            });
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Você não é fiscal designado para este contrato e não pode registrar medições.');
            }
        }
        else if (role !== client_1.UserRole.GESTOR && role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Apenas Fiscais, Gestores ou Administradores podem criar medições.');
        }
        const measurement = await this.prisma.inspectionMeasurement.create({
            data: {
                contractId: data.contractId,
                fiscalId: userId,
                periodStart: new Date(data.periodStart),
                periodEnd: new Date(data.periodEnd),
                measurementValue: data.measurementValue,
                reportDescription: data.reportDescription,
                status: client_1.MeasurementStatus.PENDING_GESTOR,
            },
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: data.contractId,
                type: client_1.AlertType.MEASUREMENT_PENDING,
                message: `Nova medição pendente de aprovação no valor de R$ ${data.measurementValue} para o contrato ${contract.contractNumber}.`,
                targetRole: client_1.UserRole.GESTOR,
            },
        });
        return measurement;
    }
    async approve(id, userId) {
        const measurement = await this.prisma.inspectionMeasurement.findUnique({
            where: { id },
            include: { contract: true },
        });
        if (!measurement) {
            throw new common_1.NotFoundException('Medição não encontrada');
        }
        const updated = await this.prisma.inspectionMeasurement.update({
            where: { id },
            data: {
                status: client_1.MeasurementStatus.APPROVED,
                approvedById: userId,
                approvalDate: new Date(),
            },
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: measurement.contractId,
                type: client_1.AlertType.MEASUREMENT_PENDING,
                message: `Sua medição no período ${measurement.periodStart.toLocaleDateString()} a ${measurement.periodEnd.toLocaleDateString()} foi APROVADA pelo Gestor.`,
                targetRole: client_1.UserRole.FISCAL,
            },
        });
        return updated;
    }
    async reject(id, userId, data) {
        const measurement = await this.prisma.inspectionMeasurement.findUnique({
            where: { id },
        });
        if (!measurement) {
            throw new common_1.NotFoundException('Medição não encontrada');
        }
        const updated = await this.prisma.inspectionMeasurement.update({
            where: { id },
            data: {
                status: client_1.MeasurementStatus.REJECTED,
                rejectionReason: data.reason,
            },
        });
        await this.prisma.systemAlert.create({
            data: {
                contractId: measurement.contractId,
                type: client_1.AlertType.MEASUREMENT_PENDING,
                message: `Sua medição foi REJEITADA pelo Gestor. Motivo: ${data.reason}`,
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
        return this.prisma.inspectionMeasurement.findMany({
            where: { contractId },
            include: {
                fiscal: { select: { name: true } },
                approver: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id) {
        const m = await this.prisma.inspectionMeasurement.findUnique({ where: { id } });
        if (!m)
            throw new common_1.NotFoundException('Medição não encontrada');
        await this.prisma.inspectionMeasurement.delete({ where: { id } });
        return { ok: true };
    }
};
exports.MeasurementsService = MeasurementsService;
exports.MeasurementsService = MeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeasurementsService);
//# sourceMappingURL=measurements.service.js.map