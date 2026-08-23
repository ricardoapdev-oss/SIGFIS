import { OccurrencesService } from './occurrences.service';
export declare class OccurrencesController {
    private readonly occurrencesService;
    constructor(occurrencesService: OccurrencesService);
    create(req: any, body: any): Promise<{
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
    resolve(id: string, req: any, body: any): Promise<{
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
    findByContract(contractId: string, req: any): Promise<({
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
