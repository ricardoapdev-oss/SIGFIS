import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller('contracts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('stats')
  getStats(@Req() req) {
    return this.contractsService.getDashboardStats(req.user.id, req.user.role);
  }

  @Get()
  findAll(@Req() req) {
    return this.contractsService.findAll(req.user.id, req.user.role);
  }

  @Get('report')
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.ALTA_GESTAO)
  getReport(@Req() req) {
    return this.contractsService.findReport(req.user.role);
  }

  // Rota estática 'archived' precisa vir antes de ':id' — caso contrário o
  // Nest tentaria resolvê-la como um id de contrato.
  @Get('archived')
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.ALTA_GESTAO)
  findArchived(@Req() req) {
    return this.contractsService.findArchived(req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.contractsService.findOne(id, req.user.id, req.user.role);
  }

  @Post()
  @Audit({ module: 'Contratos', action: 'CREATE', entity: 'Contract' })
  create(@Req() req, @Body() body: any) {
    return this.contractsService.create(body, req.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  update(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.contractsService.update(id, body, req.user);
  }

  @Post(':id/assign-fiscal')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'ASSIGN_FISCAL', entity: 'FiscalAssignment' })
  assignFiscal(@Param('id') id: string, @Body() body: any) {
    return this.contractsService.assignFiscalSafe(id, body);
  }

  @Patch(':id/assignments/:assignmentId/deactivate')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'UPDATE', entity: 'FiscalAssignment' })
  deactivateAssignment(@Param('id') id: string, @Param('assignmentId') assignmentId: string) {
    return this.contractsService.deactivateAssignment(id, assignmentId);
  }

  @Delete(':id/assignments/:assignmentId')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'DELETE', entity: 'FiscalAssignment' })
  removeAssignment(@Param('id') id: string, @Param('assignmentId') assignmentId: string) {
    return this.contractsService.removeAssignment(id, assignmentId);
  }

  @Patch(':id/assignments/:assignmentId/role')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'UPDATE', entity: 'FiscalAssignment' })
  updateAssignmentRole(@Param('id') id: string, @Param('assignmentId') assignmentId: string, @Body() body: { role: string }) {
    return this.contractsService.updateAssignmentRole(id, assignmentId, body.role);
  }

  // ── Arquivamento (soft delete) e restauração ──────────────────────────────
  // Auditoria própria dentro do service (ações com nomes específicos:
  // CONTRATO_ARQUIVADO/CONTRATO_RESTAURADO) — sem @Audit aqui, para não
  // duplicar o registro.
  @Patch(':id/archive')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  archive(@Param('id') id: string, @Body() body: { reason?: string }, @Req() req) {
    return this.contractsService.archive(id, req.user, body?.reason);
  }

  @Patch(':id/restore')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  restore(@Param('id') id: string, @Req() req) {
    return this.contractsService.restore(id, req.user);
  }

  // ── Exclusão definitiva — exclusiva do ADMIN ──────────────────────────────
  @Delete(':id/permanent')
  @Roles(UserRole.ADMIN)
  hardDelete(@Param('id') id: string, @Req() req) {
    return this.contractsService.hardDelete(id, req.user);
  }

  // ── Gerenciar dados históricos — exclusivo do ADMIN ───────────────────────
  @Get(':id/historical-data')
  @Roles(UserRole.ADMIN)
  getHistoricalDataSummary(@Param('id') id: string) {
    return this.contractsService.getHistoricalDataSummary(id);
  }

  @Delete(':id/history')
  @Roles(UserRole.ADMIN)
  deleteContractHistory(@Param('id') id: string, @Req() req) {
    return this.contractsService.deleteContractHistory(id, req.user);
  }

  @Delete(':id/alerts')
  @Roles(UserRole.ADMIN)
  deleteContractAlerts(@Param('id') id: string, @Req() req) {
    return this.contractsService.deleteContractAlerts(id, req.user);
  }

  @Delete(':id/occurrences')
  @Roles(UserRole.ADMIN)
  deleteContractOccurrences(@Param('id') id: string, @Req() req) {
    return this.contractsService.deleteContractOccurrences(id, req.user);
  }
}
