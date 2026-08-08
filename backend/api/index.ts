import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import type { Request, Response } from 'express';
import express from 'express';
import { createNestApp } from '../src/create-app';

// Entrypoint serverless para a Vercel. Cada invocação (fria ou quente) passa
// por aqui — a aplicação Nest é criada uma única vez por instância da função
// (cachedApp/bootstrapPromise) e reaproveitada entre requisições, evitando
// recriar módulos/conexões a cada chamada.
//
// Projeto Vercel "Services" (ver vercel.json na raiz do repositório): o
// rewrite de nível superior "/api/(.*)" → serviço "backend" preserva o path
// original da requisição — uma chamada pública a /api/contracts chega aqui
// como /api/contracts, não como /contracts. Por isso (e só aqui — main.ts
// local/Docker continua sem prefixo) o Nest responde com prefixo "api":
// /api/auth/login, /api/contracts, /api/users, etc.

const server = express();
let bootstrapPromise: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  const app = await createNestApp(server, { globalPrefix: 'api' });
  await app.init();
}

export default async function handler(req: Request, res: Response) {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap().catch((err) => {
      // Permite nova tentativa de bootstrap na próxima invocação em caso de falha
      bootstrapPromise = null;
      throw err;
    });
  }
  await bootstrapPromise;
  server(req, res);
}
