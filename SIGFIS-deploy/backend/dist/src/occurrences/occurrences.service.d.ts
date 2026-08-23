import { PrismaService } from '../prisma/prisma.service';
export declare class OccurrencesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, role: string, data: any): Promise<{
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
    }>;
    resolve(id: string, userId: string, role: string, data: any): Promise<{
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
    }>;
    findByContract(contractId: string, userId: string, role: string): Promise<({
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
    })[]>;
    delete(id: string): Promise<{
        ok: boolean;
    }>;
}
