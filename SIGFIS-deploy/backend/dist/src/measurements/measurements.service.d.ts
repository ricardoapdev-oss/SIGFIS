import { PrismaService } from '../prisma/prisma.service';
export declare class MeasurementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, role: string, data: any): Promise<{
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
    }>;
    approve(id: string, userId: string): Promise<{
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
    }>;
    reject(id: string, userId: string, data: any): Promise<{
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
    }>;
    findByContract(contractId: string, userId: string, role: string): Promise<({
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
    })[]>;
    delete(id: string): Promise<{
        ok: boolean;
    }>;
}
