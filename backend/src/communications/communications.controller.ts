import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get('communications/all')
  findAll(@Req() req) {
    return this.communicationsService.findAll(req.user.id, req.user.role);
  }

  @Get('contracts/:contractId/communications')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.communicationsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Post('communications')
  @Audit({ module: 'Comunicações', action: 'CREATE', entity: 'Communication' })
  create(@Req() req, @Body() body: any) {
    return this.communicationsService.create(req.user.id, req.user.role, body);
  }

  @Post('communications/:id/complete')
  @Audit({ module: 'Comunicações', action: 'UPDATE', entity: 'Communication' })
  complete(@Param('id') id: string) {
    return this.communicationsService.complete(id);
  }

  // Exclusão definitiva de comunicados — restrita ao ADMIN (o auditor do
  // sistema), que precisa poder remover qualquer registro de comunicação
  // entre as partes.
  @Delete('communications/:id')
  @Roles(UserRole.ADMIN)
  @Audit({ module: 'Comunicações', action: 'DELETE', entity: 'Communication' })
  remove(@Param('id') id: string) {
    return this.communicationsService.remove(id);
  }
}
