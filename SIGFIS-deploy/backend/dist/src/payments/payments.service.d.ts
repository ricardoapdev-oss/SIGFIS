import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, role: string, data: any): Promise<{
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
    }>;
    findByContract(contractId: string, userId: string, role: string): Promise<({
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
    })[]>;
    delete(id: string, role: string): Promise<{
        ok: boolean;
    }>;
}
