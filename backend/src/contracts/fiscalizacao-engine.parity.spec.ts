import * as fs from 'fs';
import * as path from 'path';
import { deriveFiscalizacaoCentral, CentralInput } from './fiscalizacao-engine';

/**
 * Teste de paridade backend × frontend do motor da Central de Fiscalização.
 *
 * Lê os casos de `test-fixtures/fiscalizacao-cases.json` (fixtures sintéticas
 * na raiz do repositório) e confere que o módulo do BACKEND reproduz o
 * `expected` gravado (gerado por `backend/scripts/gen-fisc-fixture.ts` a
 * partir deste mesmo módulo — fonte de verdade).
 *
 * Para conferir a paridade com o frontend, rode:
 *   node frontend/scripts/verify-fiscalizacao-parity.cjs
 */

interface Fixture {
  now: number;
  cases: {
    name: string;
    viewer: { viewerId: string; viewerRole: string };
    input: Omit<CentralInput, 'viewerId' | 'viewerRole'>;
    expected: {
      summary: Record<string, number>;
      items: { id: string; category: string; priority: string }[];
    };
  }[];
}

function loadFixture(): Fixture {
  const p = path.resolve(
    __dirname,
    '../../../test-fixtures/fiscalizacao-cases.json',
  );
  return JSON.parse(fs.readFileSync(p, 'utf8')) as Fixture;
}

describe('fiscalizacao-engine — paridade backend/frontend (fixture compartilhado)', () => {
  const fx = loadFixture();

  it('o fixture tem ao menos um caso', () => {
    expect(fx.cases.length).toBeGreaterThan(0);
  });

  for (const testCase of fx.cases) {
    it(`caso: ${testCase.name}`, () => {
      const result = deriveFiscalizacaoCentral(
        { ...testCase.input, ...testCase.viewer },
        { now: fx.now },
      );
      expect(result.summary).toEqual(testCase.expected.summary);
      expect(
        result.items.map((i) => ({
          id: i.id,
          category: i.category,
          priority: i.priority,
        })),
      ).toEqual(testCase.expected.items);
    });
  }
});
