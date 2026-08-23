import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Audit } from '../audit/audit-log.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Audit({ module: 'Pagamentos', action: 'CREATE', entity: 'ContractPayment' })
  create(@Req() req, @Body() body: any) {
    return this.paymentsService.create(req.user.id, req.user.role, body);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId') contractId: string, @Req() req) {
    return this.paymentsService.findByContract(contractId, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Audit({ module: 'Pagamentos', action: 'DELETE', entity: 'ContractPayment' })
  delete(@Param('id') id: string, @Req() req) {
    return this.paymentsService.delete(id, req.user.role);
  }
}
