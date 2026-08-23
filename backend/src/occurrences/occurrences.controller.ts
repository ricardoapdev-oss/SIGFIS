import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller('occurrences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  @Audit({ module: 'Fiscalização', action: 'CREATE', entity: 'Occurrence' })
  create(@Req() req, @Body() body: any) {
    return this.occurrencesService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/resolve')
  @Audit({ module: 'Fiscalização', action: 'RESOLVE', entity: 'Occurrence' })
  resolve(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.occurrencesService.resolve(id, req.user.id, req.user.role, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.occurrencesService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({ module: 'Fiscalização', action: 'DELETE', entity: 'Occurrence' })
  delete(@Param('id') id: string) {
    return this.occurrencesService.delete(id);
  }
}
