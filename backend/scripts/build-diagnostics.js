#!/usr/bin/env node
'use strict';

// ─────────────────────────────────────────────────────────────────────────
// DIAGNÓSTICO TEMPORÁRIO DE BUILD
// Investiga por que o build da Vercel apresenta TS2305 em '@nestjs/common'
// enquanto uma instalação Linux/Node 24 limpa reproduzida localmente não
// apresenta o mesmo erro. Roda ANTES do tsc, no mesmo processo/ambiente
// que ele vai usar. Não imprime nenhum segredo (sem DATABASE_URL,
// JWT_SECRET, tokens etc.) — apenas versões, caminhos e hashes de arquivo.
//
// Remover este arquivo e a chamada em package.json assim que o diagnóstico
// terminar.
// ─────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

function sha256(filePath) {
  try {
    return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
  } catch (e) {
    return `ERRO: ${e.message}`;
  }
}

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return `ERRO: ${e.message}`;
  }
}

console.log('\n========== DIAGNÓSTICO DE BUILD (temporário) ==========');
console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('node -v:', process.version);
console.log('npm -v:', run('npm -v'));
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('npm config get registry:', run('npm config get registry'));
console.log('npm config get omit:', run('npm config get omit'));
console.log('npm config get production:', run('npm config get production'));

let commonResolved;
try {
  commonResolved = require.resolve('@nestjs/common');
  console.log("\nrequire.resolve('@nestjs/common'):", commonResolved);
} catch (e) {
  console.log("\nrequire.resolve('@nestjs/common'): ERRO ->", e.message);
}

let tsResolved;
try {
  tsResolved = require.resolve('typescript');
  console.log("require.resolve('typescript'):", tsResolved);
} catch (e) {
  console.log("require.resolve('typescript'): ERRO ->", e.message);
}

if (commonResolved) {
  const pkgDir = path.dirname(commonResolved);
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    console.log('\n@nestjs/common version:', pkg.version);
    console.log('@nestjs/common package.json (campos não sensíveis):');
    console.log(JSON.stringify({
      name: pkg.name,
      version: pkg.version,
      main: pkg.main,
      types: pkg.types,
      exports: pkg.exports,
      dependencies: pkg.dependencies,
      peerDependencies: pkg.peerDependencies,
    }, null, 2));
  } catch (e) {
    console.log('Erro lendo package.json do @nestjs/common:', e.message);
  }

  console.log('\nrealpath(@nestjs/common index.js):', fs.realpathSync(commonResolved));
  console.log('tamanho index.js (bytes):', fs.statSync(commonResolved).size);
  console.log('sha256 index.js:', sha256(commonResolved));

  const dtsPath = path.join(pkgDir, 'index.d.ts');
  if (fs.existsSync(dtsPath)) {
    console.log('tamanho index.d.ts (bytes):', fs.statSync(dtsPath).size);
    console.log('sha256 index.d.ts:', sha256(dtsPath));
  } else {
    console.log('index.d.ts NÃO ENCONTRADO em', dtsPath);
  }

  try {
    const c = require('@nestjs/common');
    const names = ['Controller', 'Module', 'Injectable', 'Get', 'Post', 'Body', 'Param', 'Delete', 'UseGuards', 'Req'];
    console.log('\ntypeof exports em @nestjs/common:');
    console.log(JSON.stringify(Object.fromEntries(names.map((n) => [n, typeof c[n]])), null, 2));
  } catch (e) {
    console.log('Erro ao fazer require("@nestjs/common"):', e.message);
  }
}

if (tsResolved) {
  try {
    const ts = require('typescript');
    console.log('\ntypescript version:', ts.version);
    console.log('ts.sys.getCurrentDirectory():', ts.sys.getCurrentDirectory());

    if (commonResolved) {
      const dtsPath = path.join(path.dirname(commonResolved), 'index.d.ts');
      console.log('ts.sys.fileExists(index.js):', ts.sys.fileExists(commonResolved));
      console.log('ts.sys.fileExists(index.d.ts):', ts.sys.fileExists(dtsPath));
    }

    // Resolve '@nestjs/common' exatamente como o compilador resolveria a
    // partir de um arquivo real do projeto, usando as mesmas opções do
    // tsconfig.build.json.
    const configPath = path.resolve(__dirname, '..', 'tsconfig.build.json');
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
    const fromFile = path.join(path.dirname(configPath), 'src', 'app.controller.ts');
    const resolution = ts.resolveModuleName('@nestjs/common', fromFile, parsed.options, ts.sys);
    console.log('\nts.resolveModuleName("@nestjs/common") a partir de', fromFile, ':');
    console.log(JSON.stringify(resolution.resolvedModule, null, 2));
  } catch (e) {
    console.log('Erro ao inspecionar TypeScript:', e.message);
  }
}

console.log('========== FIM DO DIAGNÓSTICO ==========\n');
