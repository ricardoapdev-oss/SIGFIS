import { CommunicationsService } from './communications.service';
export declare class CommunicationsController {
    private readonly communicationsService;
    constructor(communicationsService: CommunicationsService);
    findAll(req: any): Promise<({
        contract: {
            id: string;
            contractNumber: string;
        };
        sender: {
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        recipient: {
            id: string;
            name: string;
        };
        replies: ({
            sender: {
                id: string;
                name: string;
                role: import(".prisma/client").$Enums.UserRole;
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
    })[]>;
    findByContract(contractId: string, req: any): Promise<({
        sender: {
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        recipient: {
            id: string;
            name: string;
        };
        replies: ({
            sender: {
                id: string;
                name: string;
                role: import(".prisma/client").$Enums.UserRole;
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
    })[]>;
    create(req: any, body: any): Promise<{
        sender: {
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        recipient: {
            id: string;
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
    }>;
    complete(id: string): Promise<{
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
    }>;
}
