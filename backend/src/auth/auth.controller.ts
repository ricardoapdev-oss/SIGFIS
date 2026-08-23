import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Audit } from '../audit/audit-log.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Audit({ module: 'Autenticação', action: 'LOGIN', entity: 'User' })
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }
    return this.authService.login(user);
  }

  // Sessão é stateless (JWT) — este endpoint não invalida token nenhum, ele
  // existe exclusivamente para que o encerramento de sessão gere um registro
  // real de auditoria no backend (antes, "logout" só existia no navegador).
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @Audit({ module: 'Autenticação', action: 'LOGOUT', entity: 'User' })
  logout() {
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
