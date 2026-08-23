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
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ContractsService = class ContractsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, role) {
        const sharedInclude = {
            contractor: true,
            fiscalAssignments: {
                include: {
                    fiscal: {
                        select: { id: true, name: true, email: true, role: true, registrationNumber: true },
                    },
                },
            },
            measurements: { orderBy: { createdAt: 'desc' } },
            occurrences: { orderBy: { createdAt: 'desc' } },
            alterations: { orderBy: { createdAt: 'desc' } },
            communications: { orderBy: { createdAt: 'desc' } },
        };
        const sortContracts = (contracts) => {
            return contracts.sort((a, b) => {
                const parse = (str) => {
                    if (!str)
                        return { n: 0, y: 0 };
                    const p = str.split('/');
                    return p.length === 2 ? { n: parseInt(p[0]) || 0, y: parseInt(p[1]) || 0 } : { n: 0, y: 0 };
                };
                const pA = parse(a.contractNumber);
                const pB = parse(b.contractNumber);
                if (pA.y !== pB.y)
                    return pB.y - pA.y;
                return pB.n - pA.n;
            });
        };
        const addComputedFields = (contracts) => sortContracts(contracts).map((c) => ({
            ...c,
            hasPendingMeasurements: c.measurements?.some((m) => m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') ?? false,
            hasOpenOccurrences: c.occurrences?.some((o) => o.status !== 'RESOLVED') ?? false,
        }));
        if (role === 'FISCAL') {
            const contracts = await this.prisma.contract.findMany({
                where: {
                    fiscalAssignments: {
                        some: { fiscalId: userId, isActive: true },
                    },
                },
                include: sharedInclude,
            });
            return addComputedFields(contracts);
        }
        const contracts = await this.prisma.contract.findMany({
            include: sharedInclude,
        });
        return addComputedFields(contracts);
    }
    async findOne(id, userId, role) {
        const contract = await this.prisma.contract.findUnique({
            where: { id },
            include: {
                contractor: true,
                process: true,
                fiscalAssignments: {
                    include: {
                        fiscal: {
                            select: { id: true, name: true, email: true, role: true, registrationNumber: true },
                        },
                    },
                },
                occurrences: {
                    include: {
                        fiscal: { select: { name: true } },
                        resolver: { select: { name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                measurements: {
                    include: {
                        fiscal: { select: { name: true } },
                        approver: { select: { name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                alterations: {
                    include: {
                        requester: { select: { name: true } },
                        reviewer: { select: { name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                documents: true,
                communications: {
                    include: {
                        sender: { select: { name: true, role: true } },
                        recipient: { select: { name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                payments: {
                    include: {
                        registeredBy: { select: { id: true, name: true } },
                    },
                    orderBy: { paymentDate: 'desc' },
                },
            },
        });
        if (!contract) {
            throw new common_1.NotFoundException('Contrato não encontrado');
        }
        if (role === 'FISCAL') {
            const isAssigned = contract.fiscalAssignments.some((assignment) => assignment.fiscalId === userId && assignment.isActive);
            if (!isAssigned) {
                throw new common_1.ForbiddenException('Você não tem permissão para visualizar este contrato');
            }
        }
        return contract;
    }
    async create(data, requesterId) {
        return this.prisma.contract.create({
            data: {
                contractNumber: data.contractNumber,
                processId: data.processId || null,
                contractorId: data.contractorId,
                objectDescription: data.objectDescription,
                initialValue: data.initialValue,
                currentValue: data.initialValue,
                signingDate: new Date(data.signingDate),
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                status: client_1.ContractStatus.ACTIVE,
                managerId: data.managerId || requesterId || null,
                department: data.department || null,
                observations: data.observations || null,
            },
        });
    }
    async update(id, data) {
        const contract = await this.prisma.contract.findUnique({ where: { id } });
        if (!contract)
            throw new common_1.NotFoundException('Contrato não encontrado');
        const updateData = {};
        if (data.currentValue !== undefined)
            updateData.currentValue = data.currentValue;
        if (data.endDate)
            updateData.endDate = new Date(data.endDate);
        if (data.status)
            updateData.status = data.status;
        if (data.observations !== undefined)
            updateData.observations = data.observations;
        if (data.department !== undefined)
            updateData.department = data.department;
        if (data.objectDescription)
            updateData.objectDescription = data.objectDescription;
        return this.prisma.contract.update({ where: { id }, data: updateData });
    }
    async deactivateAssignment(contractId, assignmentId) {
        return this.prisma.fiscalAssignment.update({
            where: { id: assignmentId },
            data: { isActive: false, endDate: new Date() },
        });
    }
    async assignFiscal(contractId, data) {
        const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
        if (!contract) {
            throw new common_1.NotFoundException('Contrato não encontrado');
        }
        await this.prisma.fiscalAssignment.updateMany({
            where: {
                contractId,
                role: data.role,
                isActive: true,
            },
            data: { isActive: false },
        });
        return this.prisma.fiscalAssignment.create({
            data: {
                contractId,
                fiscalId: data.fiscalId,
                role: data.role,
                designationAct: data.designationAct,
                designationDate: new Date(data.designationDate),
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                isActive: true,
            },
        });
    }
    async assignFiscalSafe(contractId, data) {
        const contract = await this.prisma.contract.findUnique({ where: { id: contractId } });
        if (!contract) {
            throw new common_1.NotFoundException('Contrato não encontrado');
        }
        if (!data.fiscalId || !data.role || !data.designationAct || !data.designationDate || !data.startDate) {
            throw new common_1.BadRequestException('Preencha todos os campos obrigatórios da designação.');
        }
        const normalizedRole = data.role;
        if (!Object.values(client_1.FiscalRole).includes(normalizedRole)) {
            throw new common_1.BadRequestException('Função de fiscal inválida.');
        }
        const fiscal = await this.prisma.user.findFirst({
            where: { id: data.fiscalId, role: client_1.UserRole.FISCAL, status: 'ACTIVE' },
            select: { id: true },
        });
        if (!fiscal) {
            throw new common_1.BadRequestException('Fiscal não encontrado ou inativo.');
        }
        await this.prisma.fiscalAssignment.updateMany({
            where: {
                contractId,
                role: normalizedRole,
                isActive: true,
            },
            data: { isActive: false, endDate: new Date() },
        });
        const payload = {
            designationAct: data.designationAct,
            designationDate: new Date(data.designationDate),
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            isActive: true,
        };
        const existing = await this.prisma.fiscalAssignment.findFirst({
            where: { contractId, fiscalId: data.fiscalId, role: normalizedRole },
        });
        if (existing) {
            return this.prisma.fiscalAssignment.update({
                where: { id: existing.id },
                data: payload,
            });
        }
        return this.prisma.fiscalAssignment.create({
            data: {
                contractId,
                fiscalId: data.fiscalId,
                role: normalizedRole,
                ...payload,
            },
        });
    }
    async getDashboardStats(userId, role) {
        let contractWhereClause = {};
        if (role === 'FISCAL') {
            contractWhereClause = {
                fiscalAssignments: {
                    some: { fiscalId: userId, isActive: true }
                }
            };
        }
        const contracts = await this.prisma.contract.findMany({
            where: contractWhereClause,
            include: {
                measurements: true,
                occurrences: true,
                alterations: true,
            }
        });
        const totalContracts = contracts.length;
        const activeContracts = contracts.filter(c => c.status === client_1.ContractStatus.ACTIVE).length;
        let totalValue = 0;
        let totalMeasured = 0;
        let openOccurrences = 0;
        contracts.forEach(c => {
            totalValue += Number(c.currentValue);
            c.measurements.forEach(m => {
                if (m.status === client_1.MeasurementStatus.APPROVED) {
                    totalMeasured += Number(m.measurementValue);
                }
            });
            openOccurrences += c.occurrences.filter(o => o.status === client_1.OccurrenceStatus.OPEN).length;
        });
        let alerts = [];
        if (role !== client_1.UserRole.ADMIN) {
            alerts = await this.prisma.systemAlert.findMany({
                where: {
                    targetRole: role,
                    isRead: false,
                },
                orderBy: { createdAt: 'desc' },
                take: 5,
            });
        }
        return {
            totalContracts,
            activeContracts,
            totalValue,
            totalMeasured,
            openOccurrences,
            alerts,
        };
    }
    async findReport(role) {
        if (role !== client_1.UserRole.ADMIN && role !== client_1.UserRole.GESTOR && role !== client_1.UserRole.ALTA_GESTAO) {
            throw new common_1.ForbiddenException('Acesso negado');
        }
        const contracts = await this.prisma.contract.findMany({
            where: { NOT: { status: client_1.ContractStatus.DRAFT } },
            include: {
                contractor: true,
                process: true,
                fiscalAssignments: {
                    where: { isActive: true },
                    include: {
                        fiscal: { select: { id: true, name: true, email: true } },
                    },
                },
                measurements: {
                    where: { status: client_1.MeasurementStatus.APPROVED },
                    select: { measurementValue: true },
                },
                alterations: {
                    where: { status: client_1.AlterationStatus.APPROVED },
                    select: { id: true },
                },
            },
            orderBy: { contractNumber: 'asc' },
        });
        return contracts.map((c) => {
            const totalMeasured = c.measurements.reduce((sum, m) => sum + Number(m.measurementValue), 0);
            const currentValue = Number(c.currentValue);
            const balance = Math.max(0, currentValue - totalMeasured);
            const start = new Date(c.startDate || c.signingDate);
            const end = c.endDate ? new Date(c.endDate) : new Date();
            const durationMonths = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
            const monthlyValue = currentValue / durationMonths;
            const titularAsg = c.fiscalAssignments.find((a) => a.role === client_1.FiscalRole.TITULAR);
            const substitutoAsg = c.fiscalAssignments.find((a) => a.role === client_1.FiscalRole.SUBSTITUTO);
            const { measurements, alterations, fiscalAssignments, ...rest } = c;
            return {
                ...rest,
                totalMeasured,
                balance,
                durationMonths,
                monthlyValue,
                aditivoCount: alterations.length,
                titular: titularAsg
                    ? { ...titularAsg.fiscal, designationAct: titularAsg.designationAct, designationDate: titularAsg.designationDate }
                    : null,
                substituto: substitutoAsg
                    ? { ...substitutoAsg.fiscal, designationAct: substitutoAsg.designationAct }
                    : null,
            };
        });
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map