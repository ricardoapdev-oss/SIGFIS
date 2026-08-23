import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditInterceptor } from './audit.interceptor';

// @Global(): qualquer módulo pode injetar AuditService diretamente (ex.:
// UsersService, ContractsService, para registrar oldValues/newValues em
// operações sensíveis) sem precisar importar AuditModule explicitamente.
@Global()
@Module({
  controllers: [AuditController],
  providers: [AuditService, AuditInterceptor],
  exports: [AuditService, AuditInterceptor],
})
export class AuditModule {}
