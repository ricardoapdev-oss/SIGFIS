import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listFiscais(): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
    }[]>;
    listGestores(): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
    }[]>;
    listAll(): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
        createdAt: Date;
    }[]>;
    create(body: any, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
    }>;
    updateProfile(id: string, body: any, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
    }>;
    toggleStatus(id: string, body: {
        status: 'ACTIVE' | 'INACTIVE';
    }, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        registrationNumber: string;
    }>;
    delete(id: string, req: any): Promise<{
        ok: boolean;
    }>;
}
