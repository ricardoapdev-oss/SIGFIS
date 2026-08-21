#!/usr/bin/env node
'use strict';

// ─────────────────────────────────────────────────────────────────────────
// Verificação de integridade de @nestjs/common antes da compilação.
//
// Por quê: builds de produção na Vercel já produziram, de forma
// não-determinística, uma instalação parcial deste pacote (a subpasta
// decorators/core ausente, mesmo com index.js/index.d.ts corretos e
// integridade do tarball validada) — o que gerava dezenas de erros
// TS2305 confusos ("has no exported member 'Controller'" etc.) em vez
// de apontar a causa real. Ver MIGRATION-PRODUCTION.md para o histórico
// completo da investigação.
//
// O que este script faz: verifica se os arquivos e exports essenciais do
// pacote estão presentes. Se não estiverem, tenta UMA reinstalação limpa
// (`npm ci`) e verifica de novo. Se ainda assim faltar algo, falha com uma
// mensagem explícita — em vez de deixar o tsc gerar uma cascata de erros
// que parecem (e não são) problemas de código.
//
// O que este script NÃO faz: não cria, edita ou substitui nenhum arquivo
// dentro de node_modules. A única ação corretiva é reinstalar via npm.
// ─────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REQUIRED_FILES = [
  'index.js',
  'index.d.ts',
  'decorators/index.js',
  'decorators/core/index.js',
  'decorators/core/controller.decorator.js',
  'decorators/core/injectable.decorator.js',
  'decorators/modules/module.decorator.js',
  'decorators/http/request-mapping.decorator.js',
];

const REQUIRED_EXPORTS = [
  'Controller', 'Module', 'Injectable', 'Get', 'Post', 'Patch', 'Delete',
  'Body', 'Param', 'Req', 'UseGuards', 'SetMetadata', 'Global',
];

function packageRoot() {
  try {
    return path.dirname(require.resolve('@nestjs/common/package.json'));
  } catch {
    return null;
  }
}

function check() {
  const root = packageRoot();
  if (!root) {
    return { ok: false, reason: "require.resolve('@nestjs/common/package.json') falhou" };
  }

  const missingFiles = REQUIRED_FILES.filter((f) => !fs.existsSync(path.join(root, f)));
  if (missingFiles.length > 0) {
    return { ok: false, reason: `arquivos ausentes em ${root}: ${missingFiles.join(', ')}` };
  }

  let exportsObj;
  try {
    delete require.cache[require.resolve('@nestjs/common')];
    exportsObj = require('@nestjs/common');
  } catch (e) {
    return { ok: false, reason: `require('@nestjs/common') lançou erro: ${e.message}` };
  }

  const missingExports = REQUIRED_EXPORTS.filter((name) => typeof exportsObj[name] !== 'function');
  if (missingExports.length > 0) {
    return { ok: false, reason: `exports ausentes ou incorretos: ${missingExports.join(', ')}` };
  }

  return { ok: true };
}

let result = check();

if (!result.ok) {
  console.warn(`[verify-nest-common] instalação incompleta detectada (${result.reason}).`);
  console.warn('[verify-nest-common] tentando uma reinstalação limpa (npm ci) antes de falhar...');
  try {
    execSync('npm ci', { stdio: 'inherit' });
  } catch (e) {
    console.error('[verify-nest-common] npm ci de recuperação retornou erro:', e.message);
  }
  result = check();
}

if (!result.ok) {
  console.error('');
  console.error('============================================================');
  console.error(' INSTALAÇÃO INCOMPLETA DE @nestjs/common');
  console.error('============================================================');
  console.error(`Motivo: ${result.reason}`);
  console.error('A reinstalação automática (npm ci) não corrigiu o problema.');
  console.error('Isto não é um erro no código-fonte do projeto — é uma falha');
  console.error('na instalação de dependências deste ambiente de build.');
  console.error('Os erros TS2305 que apareceriam a seguir seriam consequência');
  console.error('disto, não causas independentes. Não tente corrigi-los.');
  console.error('============================================================');
  console.error('');
  process.exit(1);
}

console.log('[verify-nest-common] @nestjs/common instalado corretamente.');
