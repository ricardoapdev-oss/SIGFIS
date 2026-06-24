import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('contractors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @Get()
  findAll() {
    return this.contractorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractorsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  create(@Body() body: any) {
    return this.contractorsService.create(body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  update(@Param('id') id: string, @Body() body: any) {
    return this.contractorsService.update(id, body);
  }
}
