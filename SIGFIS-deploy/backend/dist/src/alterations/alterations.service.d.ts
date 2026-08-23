import { PrismaService } from '../prisma/prisma.service';
export declare class AlterationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, role: string, data: any): Promise<{
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
    approve(id: string, userId: string): Promise<{
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
    reject(id: string, userId: string, data: any): Promise<{
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
    findByContract(contractId: string, userId: string, role: string): Promise<({
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
    update(id: string, data: any): Promise<{
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
    delete(id: string): Promise<{
        ok: boolean;
    }>;
}
