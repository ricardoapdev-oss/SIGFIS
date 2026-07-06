import { Controller, Get, Post, Body, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get('communications/all')
  findAll(@Req() req) {
    return this.communicationsService.findAll(req.user.id, req.user.role);
  }

  @Get('contracts/:contractId/communications')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.communicationsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Post('communications')
  create(@Req() req, @Body() body: any) {
    return this.communicationsService.create(req.user.id, req.user.role, body);
  }

  @Post('communications/:id/complete')
  complete(@Param('id') id: string) {
    return this.communicationsService.complete(id);
  }
}
