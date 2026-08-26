import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller('measurements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  @Audit({
    module: 'Fiscalização',
    action: 'CREATE',
    entity: 'InspectionMeasurement',
  })
  create(@Req() req, @Body() body: any) {
    return this.measurementsService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/approve')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({
    module: 'Fiscalização',
    action: 'APPROVE',
    entity: 'InspectionMeasurement',
  })
  approve(
    @Param('id') id: string,
    @Req() req,
    @Body() body?: { justification?: string },
  ) {
    return this.measurementsService.approve(id, req.user.id, body);
  }

  @Post(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({
    module: 'Fiscalização',
    action: 'REJECT',
    entity: 'InspectionMeasurement',
  })
  reject(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.measurementsService.reject(id, req.user.id, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.measurementsService.findByContract(
      contractId,
      req.user.id,
      req.user.role,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @Audit({
    module: 'Fiscalização',
    action: 'DELETE',
    entity: 'InspectionMeasurement',
  })
  delete(@Param('id') id: string) {
    return this.measurementsService.delete(id);
  }
}
