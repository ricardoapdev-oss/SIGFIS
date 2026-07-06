import { AlterationsService } from './alterations.service';
export declare class AlterationsController {
    private readonly alterationsService;
    constructor(alterationsService: AlterationsService);
    create(req: any, body: any): Promise<{
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
    }>;
    approve(id: string, req: any): Promise<{
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
    }>;
    reject(id: string, req: any, body: any): Promise<{
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
    }>;
    update(id: string, body: any): Promise<{
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
    }>;
    findByContract(contractId: string, req: any): Promise<({
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
    })[]>;
    delete(id: string): Promise<{
        ok: boolean;
    }>;
}
