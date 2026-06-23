import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('fiscais')
  listFiscais() {
    return this.usersService.listFiscais();
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  listAll() {
    return this.usersService.listAll();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  toggleStatus(@Param('id') id: string, @Body() body: { status: 'ACTIVE' | 'INACTIVE' }) {
    return this.usersService.toggleStatus(id, body.status);
  }
}
