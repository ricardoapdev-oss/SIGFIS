#!/usr/bin/env node
/**
 * Verificação de paridade backend × frontend (Etapa 3, Ponto 3).
 *
 * Lê os mesmos casos de `test-fixtures/financial-portfolio-cases.json`
 * (fixtures sintéticas na raiz do repositório, cujo `expected` foi gerado
 * pelo módulo do BACKEND — ver backend/src/contracts/financial-calculations.parity.spec.ts)
 * e confere que o módulo do FRONTEND (`src/lib/financial-calculations.ts`)
 * produz exatamente os mesmos números. Roda sem dependências novas: usa o
 * suporte nativo do Node a `require()` de arquivos `.ts` simples (sem
 * decorators/enums) — disponível a partir do Node 22.6+/23+. Não faz parte
 * de `npm run build`/`lint` (o frontend não tem test runner configurado
 * hoje) — rode manualmente após alterar financial-calculations.ts:
 *
 *   node scripts/verify-financial-parity.cjs
 */
const fs = require('fs');
const path = require('path');

const fixturePath = path.resolve(__dirname, '../../test-fixtures/financial-portfolio-cases.json');
const { cases } = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

let fc;
try {
  fc = require('../src/lib/financial-calculations.ts');
} catch (e) {
  console.error('Não foi possível carregar financial-calculations.ts diretamente com require().');
  console.error('Este Node não suporta require() nativo de .ts (precisa Node 22.6+ com type stripping).');
  console.error('Alternativa: compile o arquivo com `npx tsc src/lib/financial-calculations.ts --outDir /tmp/fc --module commonjs` e ajuste o require() acima para o .js gerado.');
  console.error(e.message);
  process.exit(2);
}

let failures = 0;
for (const testCase of cases) {
  const result = fc.computePortfolioFinancials(testCase.contracts);
  const expectedKeys = Object.keys(testCase.expected);
  const mismatches = [];
  for (const key of expectedKeys) {
    const expected = testCase.expected[key];
    const actual = result[key];
    const same = Array.isArray(expected)
      ? JSON.stringify(expected) === JSON.stringify(actual)
      : typeof expected === 'number'
        ? Math.abs(expected - actual) < 1e-9
        : expected === actual;
    if (!same) mismatches.push(`  ${key}: esperado=${JSON.stringify(expected)} obtido=${JSON.stringify(actual)}`);
  }
  if (mismatches.length > 0) {
    failures++;
    console.error(`✗ FALHA — ${testCase.name}`);
    mismatches.forEach((m) => console.error(m));
  } else {
    console.log(`✓ ${testCase.name}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures}/${cases.length} caso(s) divergem entre backend e frontend — corrigir financial-calculations.ts do frontend para casar com o backend.`);
  process.exit(1);
}
console.log(`\nParidade confirmada: ${cases.length}/${cases.length} casos idênticos entre backend e frontend.`);
