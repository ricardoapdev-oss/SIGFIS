import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('processes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Get()
  findAll(@Req() req) {
    return this.processesService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.processesService.findOne(id, req.user.id, req.user.role);
  }

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.processesService.create(req.user.id, body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  update(@Param('id') id: string, @Body() body: any) {
    return this.processesService.update(id, body);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.processesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  delete(@Param('id') id: string) {
    return this.processesService.delete(id);
  }

  @Get(':id/phases')
  getPhases(@Param('id') id: string) {
    return this.processesService.getPhases(id);
  }

  @Post(':id/phases')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  addPhase(@Param('id') id: string, @Body() body: any) {
    return this.processesService.addPhase(id, body);
  }

  @Patch(':id/phases/:phaseId')
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.FISCAL)
  updatePhase(@Param('id') id: string, @Param('phaseId') phaseId: string, @Body() body: any) {
    return this.processesService.updatePhase(id, phaseId, body);
  }
}
