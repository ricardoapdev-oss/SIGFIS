import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get('contracts/:contractId/communications')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.communicationsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Post('communications')
  create(@Req() req, @Body() body: any) {
    return this.communicationsService.create(req.user.id, req.user.role, body);
  }
}
