import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Audit } from '../audit/audit-log.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('fiscais')
  listFiscais() {
    return this.usersService.listFiscais();
  }

  @Get('gestores')
  listGestores() {
    return this.usersService.listGestores();
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.ALTA_GESTAO)
  listAll() {
    return this.usersService.listAll();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.GESTOR, UserRole.ALTA_GESTAO)
  @Audit({ module: 'Usuários', action: 'CREATE', entity: 'User' })
  create(@Body() body: any, @Req() req) {
    return this.usersService.create(body, req.user.role);
  }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.usersService.updateProfile(id, body, req.user);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  toggleStatus(@Param('id') id: string, @Body() body: { status: 'ACTIVE' | 'INACTIVE' }, @Req() req) {
    return this.usersService.toggleStatus(id, body.status, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.ALTA_GESTAO)
  delete(@Param('id') id: string, @Req() req) {
    return this.usersService.delete(id, req.user);
  }
}
