import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('occurrences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.occurrencesService.create(req.user.id, req.user.role, body);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.occurrencesService.resolve(id, req.user.id, req.user.role, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.occurrencesService.findByContract(contractId, req.user.id, req.user.role);
  }
}
