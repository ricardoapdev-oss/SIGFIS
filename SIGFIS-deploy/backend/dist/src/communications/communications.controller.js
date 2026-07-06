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
exports.CommunicationsController = void 0;
const common_1 = require("@nestjs/common");
const communications_service_1 = require("./communications.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let CommunicationsController = class CommunicationsController {
    communicationsService;
    constructor(communicationsService) {
        this.communicationsService = communicationsService;
    }
    findAll(req) {
        return this.communicationsService.findAll(req.user.id, req.user.role);
    }
    findByContract(contractId, req) {
        return this.communicationsService.findByContract(contractId, req.user.id, req.user.role);
    }
    create(req, body) {
        return this.communicationsService.create(req.user.id, req.user.role, body);
    }
    complete(id) {
        return this.communicationsService.complete(id);
    }
};
exports.CommunicationsController = CommunicationsController;
__decorate([
    (0, common_1.Get)('communications/all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('contracts/:contractId/communications'),
    __param(0, (0, common_1.Param)('contractId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "findByContract", null);
__decorate([
    (0, common_1.Post)('communications'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('communications/:id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "complete", null);
exports.CommunicationsController = CommunicationsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [communications_service_1.CommunicationsService])
], CommunicationsController);
//# sourceMappingURL=communications.controller.js.map