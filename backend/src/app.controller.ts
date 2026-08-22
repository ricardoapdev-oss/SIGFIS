import { Controller, Get } from '@nestjs/common';
import { AppService, ApiStatus } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Raiz da API — usada como verificação simples de que o backend está no ar
  // (não é uma tela do sistema; o SIGFIS é consumido pelo frontend via /auth,
  // /contracts, /users etc.).
  @Get()
  getStatus(): ApiStatus {
    return this.appService.getStatus();
  }
}
