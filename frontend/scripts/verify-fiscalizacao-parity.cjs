#!/usr/bin/env node
/**
 * Verificação de paridade backend × frontend do motor da Central de
 * Fiscalização.
 *
 * Lê `test-fixtures/fiscalizacao-cases.json` (fixtures sintéticas na raiz,
 * cujo `expected` foi gerado pelo módulo do BACKEND — ver
 * backend/src/contracts/fiscalizacao-engine.parity.spec.ts) e confere que
 * `frontend/src/lib/fiscalizacao-engine.ts` produz o mesmo `summary` e a
 * mesma sequência de itens (id + category + priority).
 *
 * Usa o suporte nativo do Node (22.6+) a require() de .ts simples (sem
 * decorators/enums). Não faz parte de build/lint (o frontend não tem test
 * runner). Rode manualmente após alterar fiscalizacao-engine.ts:
 *
 *   node scripts/verify-fiscalizacao-parity.cjs
 */
const fs = require('fs');
const path = require('path');

const fixturePath = path.resolve(
  __dirname,
  '../../test-fixtures/fiscalizacao-cases.json',
);
const fx = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

let engine;
try {
  engine = require('../src/lib/fiscalizacao-engine.ts');
} catch (e) {
  console.error(
    'Não foi possível carregar fiscalizacao-engine.ts diretamente com require().',
  );
  console.error(
    'Este Node não suporta require() nativo de .ts (precisa Node 22.6+ com type stripping).',
  );
  console.error(e.message);
  process.exit(2);
}

let failures = 0;
for (const testCase of fx.cases) {
  const result = engine.deriveFiscalizacaoCentral(
    Object.assign({}, testCase.input, testCase.viewer),
    { now: fx.now },
  );
  const gotSummary = JSON.stringify(result.summary);
  const wantSummary = JSON.stringify(testCase.expected.summary);
  const gotItems = JSON.stringify(
    result.items.map((i) => ({
      id: i.id,
      category: i.category,
      priority: i.priority,
    })),
  );
  const wantItems = JSON.stringify(testCase.expected.items);

  const mismatches = [];
  if (gotSummary !== wantSummary)
    mismatches.push(`  summary: esperado=${wantSummary} obtido=${gotSummary}`);
  if (gotItems !== wantItems)
    mismatches.push(`  items:   esperado=${wantItems} obtido=${gotItems}`);

  if (mismatches.length > 0) {
    failures++;
    console.error(`✗ FALHA — ${testCase.name}`);
    mismatches.forEach((m) => console.error(m));
  } else {
    console.log(`✓ ${testCase.name}`);
  }
}

if (failures > 0) {
  console.error(
    `\n${failures}/${fx.cases.length} caso(s) divergem — corrigir fiscalizacao-engine.ts do frontend para casar com o backend.`,
  );
  process.exit(1);
}
console.log(
  `\nParidade confirmada: ${fx.cases.length}/${fx.cases.length} casos idênticos entre backend e frontend.`,
);
