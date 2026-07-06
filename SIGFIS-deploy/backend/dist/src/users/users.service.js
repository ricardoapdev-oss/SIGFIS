"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const SELECT_USER = { id: true, name: true, email: true, role: true, registrationNumber: true, status: true };
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listFiscais() {
        return this.prisma.user.findMany({
            where: { role: client_1.UserRole.FISCAL, status: client_1.UserStatus.ACTIVE },
            select: { ...SELECT_USER },
            orderBy: { name: 'asc' },
        });
    }
    async listGestores() {
        return this.prisma.user.findMany({
            where: { role: client_1.UserRole.GESTOR, status: client_1.UserStatus.ACTIVE },
            select: { ...SELECT_USER },
            orderBy: { name: 'asc' },
        });
    }
    async listAll() {
        return this.prisma.user.findMany({
            select: { ...SELECT_USER, createdAt: true },
            orderBy: { name: 'asc' },
        });
    }
    async create(data, callerRole) {
        if (callerRole === 'ALTA_GESTAO' && data.role === 'ADMIN') {
            throw new common_1.ForbiddenException('Alta Gestão não pode cadastrar usuários ADMIN');
        }
        if (callerRole === 'GESTOR' && data.role !== 'GESTOR' && data.role !== 'FISCAL') {
            throw new common_1.ForbiddenException('Gestor pode cadastrar apenas Gestores e Fiscais');
        }
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing)
            throw new common_1.ConflictException('Já existe um usuário com este e-mail');
        const passwordHash = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash,
                role: data.role,
                registrationNumber: data.registrationNumber || null,
                status: client_1.UserStatus.ACTIVE,
            },
            select: { ...SELECT_USER },
        });
    }
    async updateProfile(id, data, caller) {
        if (caller.role !== 'ADMIN' && caller.id !== id) {
            throw new common_1.ForbiddenException('Sem permissão para editar este perfil');
        }
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.email)
            updateData.email = data.email;
        if (data.registrationNumber !== undefined)
            updateData.registrationNumber = data.registrationNumber || null;
        if (data.password)
            updateData.passwordHash = await bcrypt.hash(data.password, 10);
        return this.prisma.user.update({
            where: { id },
            data: updateData,
            select: { ...SELECT_USER },
        });
    }
    async toggleStatus(id, status, caller) {
        const target = await this.prisma.user.findUnique({ where: { id } });
        if (!target)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (target.role === client_1.UserRole.ADMIN && caller.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Apenas o ADMIN pode alterar o status de outro ADMIN');
        }
        return this.prisma.user.update({
            where: { id },
            data: { status: status },
            select: { ...SELECT_USER },
        });
    }
    async delete(id, caller) {
        const target = await this.prisma.user.findUnique({ where: { id } });
        if (!target)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (target.role === client_1.UserRole.ADMIN && caller.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Apenas o ADMIN pode excluir outro ADMIN');
        }
        await this.prisma.user.delete({ where: { id } });
        return { ok: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map