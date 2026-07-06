import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

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

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.contractsService.findOne(id, req.user.id, req.user.role);
  }

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.contractsService.create(body, req.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  update(@Param('id') id: string, @Body() body: any) {
    return this.contractsService.update(id, body);
  }

  @Post(':id/assign-fiscal')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  assignFiscal(@Param('id') id: string, @Body() body: any) {
    return this.contractsService.assignFiscalSafe(id, body);
  }

  @Patch(':id/assignments/:assignmentId/deactivate')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  deactivateAssignment(@Param('id') id: string, @Param('assignmentId') assignmentId: string) {
    return this.contractsService.deactivateAssignment(id, assignmentId);
  }
}
