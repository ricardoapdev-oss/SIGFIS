import { PrismaService } from '../prisma/prisma.service';
export declare class CommunicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, role: string): Promise<({
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
    findByContract(contractId: string, userId: string, role: string): Promise<({
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
    create(userId: string, role: string, data: any): Promise<{
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
