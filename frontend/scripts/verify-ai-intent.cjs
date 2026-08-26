#!/usr/bin/env node
/**
 * Testes da classificação de intenção financeira do Assistente de IA
 * (frontend/src/lib/ai-financial-intent.ts). Sem framework novo — mesma
 * abordagem de frontend/scripts/verify-financial-parity.cjs: usa o suporte
 * nativo do Node (22.6+) a `require()` de `.ts` simples.
 *
 *   node scripts/verify-ai-intent.cjs
 *
 * Cobre o bug relatado (regressão local): "Qual o saldo financeiro a pagar?"
 * caindo no handler genérico de valor/financeiro em vez do handler de saldo.
 */
let mod;
try {
  mod = require('../src/lib/ai-financial-intent.ts');
} catch (e) {
  console.error('Não foi possível carregar ai-financial-intent.ts diretamente com require().');
  console.error('Este Node não suporta require() nativo de .ts (precisa Node 22.6+ com type stripping).');
  console.error(e.message);
  process.exit(2);
}
const { classifyFinancialIntent, buildFinancialAnswer } = mod;

const FIN = {
  valorContratualAtual: 15008205.71,
  medicoesAprovadas: 713881.73,
  saldoContratualNaoExecutado: 14294323.98,
  taxaExecucaoMedicoes: 4.756609442821929,
};

// [pergunta, intenção esperada, trechos que a resposta final DEVE conter, trechos que NÃO pode conter]
const cases = [
  {
    q: 'Qual o saldo financeiro a pagar?',
    expectIntent: 'saldo',
    mustInclude: ['Saldo financeiro a pagar: não informado', 'Saldo contratual não executado: R$ 14.294.323,98'],
    mustNotInclude: ['Taxa de execução'],
  },
  {
    q: 'Qual o saldo a pagar?',
    expectIntent: 'saldo',
    mustInclude: ['Saldo financeiro a pagar: não informado', 'Saldo contratual não executado: R$ 14.294.323,98'],
    mustNotInclude: ['Taxa de execução'],
  },
  {
    q: 'Qual o saldo contratual?',
    expectIntent: 'saldo',
    mustInclude: ['Saldo contratual não executado: R$ 14.294.323,98'],
    mustNotInclude: [],
  },
  {
    q: 'Quanto resta do contrato?',
    expectIntent: 'saldo',
    mustInclude: ['Saldo contratual não executado: R$ 14.294.323,98'],
    mustNotInclude: [],
  },
  {
    q: 'Qual o valor pago?',
    expectIntent: 'pagamento',
    mustInclude: ['Valor pago: não informado', 'Medições aprovadas: R$ 713.881,73'],
    mustNotInclude: ['Saldo financeiro a pagar'],
  },
  {
    q: 'Qual a taxa de execução financeira?',
    expectIntent: 'execucao_valor',
    mustInclude: ['Taxa de execução por medições: 4.8%', 'Carteira (valor contratual atual): R$ 15.008.205,71'],
    mustNotInclude: ['não informado'],
  },
  {
    q: 'Qual o total de medições aprovadas?',
    expectIntent: 'medicoes_aprovadas',
    mustInclude: ['Medições aprovadas: R$ 713.881,73 de R$ 15.008.205,71'],
    mustNotInclude: ['pendente'],
  },
  // Guarda de regressão: perguntas que mencionam "valor" mas são sobre outra
  // coisa (tratadas em AIInsightsPanel.tsx, fora deste módulo) não podem ser
  // capturadas pelo classificador financeiro — ver comentário no regex
  // EXECUCAO_VALOR_RE sobre por que "valor" sozinho foi excluído.
  { q: 'Qual contrato tem o maior valor?', expectIntent: null },
  { q: 'Qual o valor médio dos contratos ativos?', expectIntent: null },
  // Perguntas sem nenhuma relação financeira continuam fora do classificador.
  { q: 'Quantos contratos vencem em 90 dias?', expectIntent: null },
];

let failures = 0;
for (const c of cases) {
  const intent = classifyFinancialIntent(c.q);
  const answer = buildFinancialAnswer(intent, FIN);
  let ok = true;
  const problems = [];

  if (intent !== c.expectIntent) {
    ok = false;
    problems.push(`intenção esperada="${c.expectIntent}" obtida="${intent}"`);
  }
  for (const frag of c.mustInclude || []) {
    if (!answer || !answer.includes(frag)) { ok = false; problems.push(`resposta deveria conter "${frag}"`); }
  }
  for (const frag of c.mustNotInclude || []) {
    if (answer && answer.includes(frag)) { ok = false; problems.push(`resposta NÃO deveria conter "${frag}"`); }
  }

  if (ok) {
    console.log(`✓ "${c.q}" → ${intent ?? '(nenhuma intenção financeira — cai no restante do assistente)'}`);
  } else {
    failures++;
    console.error(`✗ "${c.q}"`);
    problems.forEach((p) => console.error(`    ${p}`));
    if (answer) console.error(`    resposta obtida:\n      ${answer.split('\n').join('\n      ')}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures}/${cases.length} caso(s) falharam.`);
  process.exit(1);
}
console.log(`\nTodos os ${cases.length} casos passaram.`);
