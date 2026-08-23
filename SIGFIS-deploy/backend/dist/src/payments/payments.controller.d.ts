import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(req: any, body: any): Promise<{
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
    findByContract(contractId: string, req: any): Promise<({
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
    delete(id: string, req: any): Promise<{
        ok: boolean;
    }>;
}
