import * as fs from 'fs';
import * as path from 'path';
import {
  computePortfolioFinancials,
  MinimalContract,
  MinimalMeasurement,
} from './financial-calculations';

/**
 * Teste de paridade backend × frontend (Etapa 3, Ponto 3).
 *
 * Lê os casos de `test-fixtures/financial-portfolio-cases.json` (fixtures
 * sintéticas, na raiz do repositório, compartilhadas com
 * `frontend/scripts/verify-financial-parity.cjs`) e confere que o módulo
 * do BACKEND reproduz exatamente o `expected` gravado no fixture.
 *
 * O `expected` foi gerado a partir deste mesmo módulo backend (fonte de
 * verdade) — este teste também serve como regressão: se alguém alterar a
 * fórmula aqui sem atualizar o fixture, o teste falha, sinalizando que o
 * fixture (e portanto a garantia de paridade com o frontend) ficou
 * desatualizado.
 *
 * Para conferir paridade com o frontend, rode:
 *   node frontend/scripts/verify-financial-parity.cjs
 * (lê o mesmo fixture, calcula com o módulo do frontend e compara).
 */

interface FixtureCase {
  name: string;
  contracts: (MinimalContract & { measurements: MinimalMeasurement[] })[];
  expected: Record<string, unknown>;
}

interface Fixture {
  cases: FixtureCase[];
}

function loadFixture(): Fixture {
  const fixturePath = path.resolve(
    __dirname,
    '../../../test-fixtures/financial-portfolio-cases.json',
  );
  const raw = fs.readFileSync(fixturePath, 'utf8');
  return JSON.parse(raw) as Fixture;
}

describe('financial-calculations — paridade backend/frontend (fixture compartilhado)', () => {
  const { cases } = loadFixture();

  it('o fixture tem ao menos um caso', () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  for (const testCase of cases) {
    it(`caso: ${testCase.name}`, () => {
      const result = computePortfolioFinancials(testCase.contracts);
      expect(result).toEqual(testCase.expected);
    });
  }
});
