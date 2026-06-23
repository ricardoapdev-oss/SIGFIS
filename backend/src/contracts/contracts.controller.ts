import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.contractsService.findOne(id, req.user.id, req.user.role);
  }

  @Post()
  @Roles(UserRole.GESTOR)
  create(@Body() body: any) {
    return this.contractsService.create(body);
  }

  @Post(':id/assign-fiscal')
  @Roles(UserRole.GESTOR)
  assignFiscal(@Param('id') id: string, @Body() body: any) {
    return this.contractsService.assignFiscal(id, body);
  }
}
