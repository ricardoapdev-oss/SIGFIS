import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('measurements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.measurementsService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/approve')
  @Roles(UserRole.GESTOR)
  approve(@Param('id') id: string, @Req() req) {
    return this.measurementsService.approve(id, req.user.id);
  }

  @Post(':id/reject')
  @Roles(UserRole.GESTOR)
  reject(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.measurementsService.reject(id, req.user.id, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.measurementsService.findByContract(contractId, req.user.id, req.user.role);
  }
}
