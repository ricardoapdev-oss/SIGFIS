import * as dotenv from 'dotenv';
import * as path from 'path';
// Carrega .env do diretório de trabalho (onde o processo é iniciado)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Resolve as origens permitidas para CORS a partir de CORS_ORIGINS
 * (lista separada por vírgula, ex: "https://sigfis.vercel.app,http://localhost:3000").
 *
 * Se a variável não estiver definida, mantém o comportamento histórico do sistema
 * (reflete a origem da requisição) para não quebrar ambientes já rodando sem ela.
 */
function resolveCorsOrigins(): string[] | boolean {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || !raw.trim()) {
    return true;
  }
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

// Entrypoint NestJS padrão (local, Docker e Vercel). A Vercel detecta este
// projeto nativamente como NestJS (Framework Preset) procurando por este
// exato formato em src/main.ts: import direto de @nestjs/core,
// NestFactory.create(AppModule) e app.listen() — por isso a criação da
// aplicação fica aqui, sem indireção por outro módulo/arquivo.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: resolveCorsOrigins(),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`SIGFIS Backend rodando na porta ${port}`);
}
bootstrap();
