import { Controller, Get, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from './audit-log.decorator';

// Mesma regra de acesso já usada em toda a aplicação para telas
// administrativas (Usuários, Relatório de Contratos, Backup): FISCAL não
// tem acesso — nunca visualiza registros de auditoria só porque a rota existe.
@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.ALTA_GESTAO)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('userId') userId?: string,
    @Query('module') module?: string,
    @Query('action') action?: string,
    @Query('entity') entity?: string,
    @Query('search') search?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('sortDir') sortDir?: 'asc' | 'desc',
  ) {
    return this.auditService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      userId, module, action, entity, search, dateFrom, dateTo, sortDir,
    });
  }

  @Get('summary')
  getSummary() {
    return this.auditService.getSummary();
  }

  @Get('filters')
  getFilterOptions() {
    return this.auditService.getFilterOptions();
  }

  // Exclusão definitiva de um registro — restrita ao ADMIN (o auditor do
  // sistema). Não existe endpoint de PATCH/edição: um registro só pode ser
  // removido por inteiro, nunca alterado — a exclusão em si fica registrada
  // como um novo evento de auditoria.
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @Audit({ module: 'Auditoria', action: 'DELETE', entity: 'AuditLog' })
  remove(@Param('id') id: string) {
    return this.auditService.remove(id);
  }
}
