"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const contractors_module_1 = require("./contractors/contractors.module");
const processes_module_1 = require("./processes/processes.module");
const contracts_module_1 = require("./contracts/contracts.module");
const occurrences_module_1 = require("./occurrences/occurrences.module");
const measurements_module_1 = require("./measurements/measurements.module");
const alterations_module_1 = require("./alterations/alterations.module");
const communications_module_1 = require("./communications/communications.module");
const payments_module_1 = require("./payments/payments.module");
const backup_module_1 = require("./backup/backup.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            contractors_module_1.ContractorsModule,
            processes_module_1.ProcessesModule,
            contracts_module_1.ContractsModule,
            occurrences_module_1.OccurrencesModule,
            measurements_module_1.MeasurementsModule,
            alterations_module_1.AlterationsModule,
            communications_module_1.CommunicationsModule,
            payments_module_1.PaymentsModule,
            backup_module_1.BackupModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map