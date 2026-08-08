import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';
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

export interface CreateNestAppOptions {
  /**
   * Prefixo global aplicado a todas as rotas (ex: "api" → "/contracts" vira "/api/contracts").
   * Só é usado pelo entrypoint serverless da Vercel (api/index.ts): no projeto "Services"
   * da Vercel, o rewrite de nível superior que expõe o backend preserva o path original da
   * requisição (ex: uma chamada pública a "/api/contracts" chega ao serviço exatamente como
   * "/api/contracts", sem remover o prefixo) — então o próprio Nest precisa responder nesse
   * prefixo. Local/Docker (main.ts) não usa esta opção: lá o proxy do Next.js já remove o
   * "/api" antes de encaminhar, então o Nest continua respondendo sem prefixo, como sempre.
   */
  globalPrefix?: string;
}

/**
 * Cria e configura a aplicação Nest (módulos, CORS, prefixo global) sem chamar `listen()`.
 * Usado tanto pelo bootstrap local/Docker (src/main.ts) quanto pelo handler
 * serverless da Vercel (api/index.ts), para que as duas formas de execução
 * fiquem sempre com a mesma configuração base.
 */
export async function createNestApp(
  expressInstance?: Express,
  options: CreateNestAppOptions = {},
): Promise<INestApplication> {
  const app = expressInstance
    ? await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
    : await NestFactory.create(AppModule);

  if (options.globalPrefix) {
    app.setGlobalPrefix(options.globalPrefix);
  }

  app.enableCors({
    origin: resolveCorsOrigins(),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  return app;
}
