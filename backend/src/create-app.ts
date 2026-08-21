import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Resolve as origens permitidas para CORS a partir de CORS_ORIGINS
 * (lista separada por vírgula, ex: "https://sigfis.vercel.app,http://localhost:3000").
 *
 * Se a variável não estiver definida, mantém o comportamento histórico do sistema
 * (reflete a origem da requisição) para não quebrar ambientes já rodando sem ela.
 */
export function resolveCorsOrigins(): string[] | boolean {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || !raw.trim()) {
    return true;
  }
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/**
 * Cria e configura a aplicação Nest (módulos, CORS) sem chamar `listen()`.
 * Usado pelo bootstrap local/Docker/Vercel (src/main.ts) — a Vercel detecta o
 * projeto nativamente como NestJS (Framework Preset) e empacota o resultado
 * de `dist/main.js` como Function automaticamente, sem entrypoint customizado.
 */
export async function createNestApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: resolveCorsOrigins(),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  return app;
}
