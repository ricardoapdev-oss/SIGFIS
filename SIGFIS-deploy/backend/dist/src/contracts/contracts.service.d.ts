import { PrismaService } from '../prisma/prisma.service';
export declare class ContractsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, role: string): Promise<any[]>;
    findOne(id: string, userId: string, role: string): Promise<{
        fiscalAssignments: ({
            fiscal: {
                id: string;
                name: string;
                email: string;
                role: import(".prisma/client").$Enums.UserRole;
                registrationNumber: string;
            };
        } & {
            id: string;
            role: import(".prisma/client").$Enums.FiscalRole;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date | null;
            designationAct: string;
            designationDate: Date;
            isActive: boolean;
            contractId: string;
            fiscalId: string;
        })[];
        occurrences: ({
            fiscal: {
                name: string;
            };
            resolver: {
                name: string;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OccurrenceStatus;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            contractId: string;
            fiscalId: string;
            resolutionDescription: string | null;
            resolvedById: string | null;
            resolvedAt: Date | null;
            title: string;
            severity: import(".prisma/client").$Enums.OccurrenceSeverity;
        })[];
        measurements: ({
            fiscal: {
                name: string;
            };
            approver: {
                name: string;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.MeasurementStatus;
            createdAt: Date;
            updatedAt: Date;
            contractId: string;
            fiscalId: string;
            approvedById: string | null;
            approvalDate: Date | null;
            periodStart: Date;
            periodEnd: Date;
            measurementValue: import("@prisma/client/runtime/library").Decimal;
            reportDescription: string;
            rejectionReason: string | null;
        })[];
        documents: {
            id: string;
            createdAt: Date;
            processId: string | null;
            contractId: string | null;
            occurrenceId: string | null;
            measurementId: string | null;
            category: import(".prisma/client").$Enums.DocumentCategory;
            title: string;
            fileKey: string;
            fileSize: number;
            mimeType: string;
            uploadedById: string;
        }[];
        contractor: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            corporateName: string;
            cnpjCpf: string;
            phone: string | null;
            addressCity: string | null;
            addressState: string | null;
            tradeName: string | null;
            postalCode: string | null;
            addressStreet: string | null;
            addressNumber: string | null;
            addressNeighborhood: string | null;
            stateInscription: string | null;
            municipalInscription: string | null;
        };
        process: {
            id: string;
            status: import(".prisma/client").$Enums.ProcessStatus;
            createdAt: Date;
            updatedAt: Date;
            processNumber: string;
            subject: string;
            description: string | null;
            modality: import(".prisma/client").$Enums.BiddingModality;
            estimatedValue: import("@prisma/client/runtime/library").Decimal;
            requesterDepartment: string;
            tipoContratacao: string | null;
            fundamentoLegalPreliminar: string | null;
            dataSolicitacao: Date | null;
            responsavelDemanda: string | null;
            prioridade: string | null;
            possuiPrazoCritico: boolean;
            dataLimiteProcesso: Date | null;
            justificativaUrgencia: string | null;
            exigeTR: boolean;
            exigeParecerJuridico: boolean;
            exigeRatificacaoAutoridade: boolean;
            exigeContratoFormal: boolean;
            exigePublicacaoDivulgacao: boolean;
            fiscalDefinido: boolean;
            observacoesGerenciais: string | null;
            requesterId: string;
        };
        alterations: ({
            requester: {
                name: string;
            };
            reviewer: {
                name: string;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.AlterationStatus;
            createdAt: Date;
            updatedAt: Date;
            contractId: string;
            type: import(".prisma/client").$Enums.AlterationType;
            alterationNumber: string | null;
            valueChange: import("@prisma/client/runtime/library").Decimal;
            newEndDate: Date | null;
            justification: string;
            reviewDate: Date | null;
            reviewNotes: string | null;
            requestedById: string;
            reviewedById: string | null;
        })[];
        communications: ({
            sender: {
                name: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
            recipient: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            subject: string;
            contractId: string;
            senderId: string;
            recipientId: string | null;
            message: string;
            parentId: string | null;
            readAt: Date | null;
            isCompleted: boolean;
            completedAt: Date | null;
        })[];
        payments: ({
            registeredBy: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            description: string;
            contractId: string;
            paymentDate: Date;
            registeredById: string;
            value: import("@prisma/client/runtime/library").Decimal;
            invoiceNumber: string | null;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ContractStatus;
        createdAt: Date;
        updatedAt: Date;
        contractNumber: string;
        objectDescription: string;
        initialValue: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        signingDate: Date;
        startDate: Date;
        endDate: Date;
        department: string | null;
        observations: string | null;
        processId: string | null;
        contractorId: string;
        managerId: string | null;
    }>;
    create(data: any, requesterId?: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ContractStatus;
        createdAt: Date;
        updatedAt: Date;
        contractNumber: string;
        objectDescription: string;
        initialValue: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        signingDate: Date;
        startDate: Date;
        endDate: Date;
        department: string | null;
        observations: string | null;
        processId: string | null;
        contractorId: string;
        managerId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ContractStatus;
        createdAt: Date;
        updatedAt: Date;
        contractNumber: string;
        objectDescription: string;
        initialValue: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        signingDate: Date;
        startDate: Date;
        endDate: Date;
        department: string | null;
        observations: string | null;
        processId: string | null;
        contractorId: string;
        managerId: string | null;
    }>;
    deactivateAssignment(contractId: string, assignmentId: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.FiscalRole;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date | null;
        designationAct: string;
        designationDate: Date;
        isActive: boolean;
        contractId: string;
        fiscalId: string;
    }>;
    assignFiscal(contractId: string, data: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.FiscalRole;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date | null;
        designationAct: string;
        designationDate: Date;
        isActive: boolean;
        contractId: string;
        fiscalId: string;
    }>;
    assignFiscalSafe(contractId: string, data: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.FiscalRole;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date | null;
        designationAct: string;
        designationDate: Date;
        isActive: boolean;
        contractId: string;
        fiscalId: string;
    }>;
    getDashboardStats(userId: string, role: string): Promise<{
        totalContracts: number;
        activeContracts: number;
        totalValue: number;
        totalMeasured: number;
        openOccurrences: number;
        alerts: any[];
    }>;
    findReport(role: string): Promise<{
        totalMeasured: number;
        balance: number;
        durationMonths: number;
        monthlyValue: number;
        aditivoCount: number;
        titular: {
            designationAct: string;
            designationDate: Date;
            id: string;
            name: string;
            email: string;
        };
        substituto: {
            designationAct: string;
            id: string;
            name: string;
            email: string;
        };
        contractor: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            corporateName: string;
            cnpjCpf: string;
            phone: string | null;
            addressCity: string | null;
            addressState: string | null;
            tradeName: string | null;
            postalCode: string | null;
            addressStreet: string | null;
            addressNumber: string | null;
            addressNeighborhood: string | null;
            stateInscription: string | null;
            municipalInscription: string | null;
        };
        process: {
            id: string;
            status: import(".prisma/client").$Enums.ProcessStatus;
            createdAt: Date;
            updatedAt: Date;
            processNumber: string;
            subject: string;
            description: string | null;
            modality: import(".prisma/client").$Enums.BiddingModality;
            estimatedValue: import("@prisma/client/runtime/library").Decimal;
            requesterDepartment: string;
            tipoContratacao: string | null;
            fundamentoLegalPreliminar: string | null;
            dataSolicitacao: Date | null;
            responsavelDemanda: string | null;
            prioridade: string | null;
            possuiPrazoCritico: boolean;
            dataLimiteProcesso: Date | null;
            justificativaUrgencia: string | null;
            exigeTR: boolean;
            exigeParecerJuridico: boolean;
            exigeRatificacaoAutoridade: boolean;
            exigeContratoFormal: boolean;
            exigePublicacaoDivulgacao: boolean;
            fiscalDefinido: boolean;
            observacoesGerenciais: string | null;
            requesterId: string;
        };
        id: string;
        status: import(".prisma/client").$Enums.ContractStatus;
        createdAt: Date;
        updatedAt: Date;
        contractNumber: string;
        objectDescription: string;
        initialValue: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        signingDate: Date;
        startDate: Date;
        endDate: Date;
        department: string | null;
        observations: string | null;
        processId: string | null;
        contractorId: string;
        managerId: string | null;
    }[]>;
}
