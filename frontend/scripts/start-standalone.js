#!/usr/bin/env node
/**
 * Sobe o build de produção do frontend localmente.
 *
 * O projeto usa `output: "standalone"` no next.config.ts fora da Vercel
 * (necessário para o Docker da intranet) — nesse modo, `next start` NÃO
 * funciona (o próprio Next avisa e sai sem servir a aplicação), porque o
 * build standalone não inclui `public/` nem `.next/static/` por padrão
 * (comportamento documentado do Next.js: é responsabilidade de quem faz o
 * deploy copiar essas duas pastas para dentro de `.next/standalone/` antes
 * de rodar `node .next/standalone/server.js`).
 *
 * Este script automatiza exatamente essa cópia e sobe o servidor, sem
 * mudar nada na estratégia de deploy (Vercel/Docker continuam como estão)
 * e sem alterar o comportamento de produção — só remove o passo manual do
 * fluxo local.
 *
 * Uso:
 *   npm run build            # gera .next/standalone (obrigatório antes)
 *   npm run start:standalone # copia os assets e sobe o servidor
 *   PORT=4000 npm run start:standalone   # porta customizada
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STANDALONE_DIR = path.join(ROOT, '.next', 'standalone');
const SERVER_FILE = path.join(STANDALONE_DIR, 'server.js');
const PUBLIC_SRC = path.join(ROOT, 'public');
const PUBLIC_DEST = path.join(STANDALONE_DIR, 'public');
const STATIC_SRC = path.join(ROOT, '.next', 'static');
const STATIC_DEST = path.join(STANDALONE_DIR, '.next', 'static');

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

// 1. .next/standalone existe?
if (!fs.existsSync(STANDALONE_DIR) || !fs.existsSync(SERVER_FILE)) {
  fail(
    '.next/standalone não encontrado (ou incompleto).\n' +
      '  Rode "npm run build" primeiro — este script só sobe um build já gerado, não cria um novo.',
  );
}

// 2. public existe?
if (!fs.existsSync(PUBLIC_SRC)) {
  fail(`Pasta "public/" não encontrada em ${PUBLIC_SRC}. Verifique se está rodando este script de dentro de frontend/.`);
}

// 3 e 4. copia public/ e .next/static/ para dentro do standalone (idempotente — sobrescreve).
try {
  fs.cpSync(PUBLIC_SRC, PUBLIC_DEST, { recursive: true });
  console.log('✓ public/ copiada para .next/standalone/public');
} catch (e) {
  fail(`Falha ao copiar public/ para .next/standalone/public: ${e.message}`);
}

if (fs.existsSync(STATIC_SRC)) {
  try {
    fs.mkdirSync(path.join(STANDALONE_DIR, '.next'), { recursive: true });
    fs.cpSync(STATIC_SRC, STATIC_DEST, { recursive: true });
    console.log('✓ .next/static copiada para .next/standalone/.next/static');
  } catch (e) {
    fail(`Falha ao copiar .next/static para .next/standalone/.next/static: ${e.message}`);
  }
} else {
  console.warn('⚠ .next/static não encontrada — build sem assets estáticos gerados? Rode "npm run build" novamente se a página aparecer sem estilo.');
}

// 6. PORT configurável, com fallback para 3000.
const port = process.env.PORT || '3000';

// 8. Alerta de segurança — mesmo texto do README, repetido aqui porque é o
// último ponto de atenção antes de subir algo que fala com um banco real.
console.log('\n⚠ Verifique DATABASE_URL/DIRECT_URL em backend/.env antes de testar qualquer ação de escrita:');
console.log('  este ambiente local não aponta para um banco de staging isolado por padrão.\n');

console.log(`Iniciando SIGFIS (build standalone) em http://localhost:${port} ...\n`);

const { spawn } = require('child_process');
const child = spawn(process.execPath, [SERVER_FILE], {
  cwd: STANDALONE_DIR,
  stdio: 'inherit',
  env: { ...process.env, PORT: port },
});

child.on('exit', (code) => process.exit(code ?? 0));
child.on('error', (e) => fail(`Não foi possível iniciar .next/standalone/server.js: ${e.message}`));
