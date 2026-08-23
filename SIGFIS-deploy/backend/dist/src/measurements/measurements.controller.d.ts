import { MeasurementsService } from './measurements.service';
export declare class MeasurementsController {
    private readonly measurementsService;
    constructor(measurementsService: MeasurementsService);
    create(req: any, body: any): Promise<{
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
    approve(id: string, req: any): Promise<{
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
    reject(id: string, req: any, body: any): Promise<{
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
    findByContract(contractId: string, req: any): Promise<({
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
