import { Controller, Post, Get, Delete, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AlterationsService } from './alterations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('alterations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlterationsController {
  constructor(private readonly alterationsService: AlterationsService) {}

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.alterationsService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/approve')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  approve(@Param('id') id: string, @Req() req) {
    return this.alterationsService.approve(id, req.user.id);
  }

  @Post(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  reject(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.alterationsService.reject(id, req.user.id, body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.FISCAL)
  update(@Param('id') id: string, @Body() body: any) {
    return this.alterationsService.update(id, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.alterationsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  delete(@Param('id') id: string) {
    return this.alterationsService.delete(id);
  }
}
