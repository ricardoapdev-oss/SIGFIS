import { Controller, Post, Get, Delete, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AlterationsService } from './alterations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller('alterations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlterationsController {
  constructor(private readonly alterationsService: AlterationsService) {}

  @Post()
  @Audit({ module: 'Fiscalização', action: 'CREATE', entity: 'ContractAlteration' })
  create(@Req() req, @Body() body: any) {
    return this.alterationsService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/approve')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'APPROVE', entity: 'ContractAlteration' })
  approve(@Param('id') id: string, @Req() req) {
    return this.alterationsService.approve(id, req.user.id);
  }

  @Post(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'REJECT', entity: 'ContractAlteration' })
  reject(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.alterationsService.reject(id, req.user.id, body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.FISCAL)
  @Audit({ module: 'Fiscalização', action: 'UPDATE', entity: 'ContractAlteration' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.alterationsService.update(id, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.alterationsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'DELETE', entity: 'ContractAlteration' })
  delete(@Param('id') id: string) {
    return this.alterationsService.delete(id);
  }
}
