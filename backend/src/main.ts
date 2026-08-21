import * as dotenv from 'dotenv';
import * as path from 'path';
// Carrega .env do diretório de trabalho (onde o processo é iniciado)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { createNestApp } from './create-app';

// Bootstrap padrão do NestJS — usado local (nest start), Docker (node dist/main)
// e também na Vercel: o Framework Preset "NestJS" detecta este projeto
// nativamente e empacota dist/main.js como Function automaticamente,
// sem precisar de um entrypoint/handler customizado.
async function bootstrap() {
  const app = await createNestApp();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`SIGFIS Backend rodando na porta ${port}`);
}
bootstrap();
