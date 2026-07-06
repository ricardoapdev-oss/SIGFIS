import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
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

  @Patch(':id/status')
  @Roles(UserRole.GESTOR)
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.processesService.updateStatus(id, body.status);
  }

  @Get(':id/phases')
  findPhases(@Param('id') id: string, @Req() req) {
    return this.processesService.findPhases(id, req.user.id, req.user.role);
  }

  @Patch(':id/phases/:phaseId')
  updatePhase(@Param('id') id: string, @Param('phaseId') phaseId: string, @Req() req, @Body() body: any) {
    return this.processesService.updatePhase(id, phaseId, req.user.id, req.user.role, body);
  }

  @Patch(':id/workflow-items/:itemId')
  updateWorkflowItem(@Param('id') id: string, @Param('itemId') itemId: string, @Req() req, @Body() body: any) {
    return this.processesService.updateWorkflowItem(id, itemId, req.user.id, req.user.role, body);
  }
}
