import * as dotenv from 'dotenv';
import * as path from 'path';
// Carrega .env do diretório de trabalho (onde o processo é iniciado)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { createNestApp } from './create-app';

// Bootstrap para execução local (nest start) e Docker (node dist/main).
// Não é usado na Vercel — lá o entrypoint é api/index.ts.
async function bootstrap() {
  const app = await createNestApp();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`SIGFIS Backend rodando na porta ${port}`);
}
bootstrap();
