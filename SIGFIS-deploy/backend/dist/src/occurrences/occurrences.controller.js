"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccurrencesController = void 0;
const common_1 = require("@nestjs/common");
const occurrences_service_1 = require("./occurrences.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
let OccurrencesController = class OccurrencesController {
    occurrencesService;
    constructor(occurrencesService) {
        this.occurrencesService = occurrencesService;
    }
    create(req, body) {
        return this.occurrencesService.create(req.user.id, req.user.role, body);
    }
    resolve(id, req, body) {
        return this.occurrencesService.resolve(id, req.user.id, req.user.role, body);
    }
    findByContract(contractId, req) {
        return this.occurrencesService.findByContract(contractId, req.user.id, req.user.role);
    }
    delete(id) {
        return this.occurrencesService.delete(id);
    }
};
exports.OccurrencesController = OccurrencesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OccurrencesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OccurrencesController.prototype, "resolve", null);
__decorate([
    (0, common_1.Get)('contract/:contractId'),
    __param(0, (0, common_1.Param)('contractId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OccurrencesController.prototype, "findByContract", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.GESTOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OccurrencesController.prototype, "delete", null);
exports.OccurrencesController = OccurrencesController = __decorate([
    (0, common_1.Controller)('occurrences'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [occurrences_service_1.OccurrencesService])
], OccurrencesController);
//# sourceMappingURL=occurrences.controller.js.map