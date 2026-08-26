/**
 * Classificação de intenção financeira do Assistente de IA (Inteligência
 * Contratual). Isolado de `AIInsightsPanel.tsx` para ser testável sem
 * precisar montar o componente React — ver `frontend/scripts/verify-ai-intent.cjs`.
 *
 * Correção de bug (revisão funcional local): a pergunta "Qual o saldo
 * financeiro a pagar?" caía no handler genérico de valor/financeiro (regex
 * `/valor|financ|dinheiro|r\$/`, testado antes de qualquer coisa) e nunca
 * chegava ao handler dedicado de saldo — o assistente respondia com taxa de
 * execução em vez de saldo. A ordem AQUI é a fonte única de prioridade:
 *
 *   1. saldo       (mais específico — sempre checado primeiro)
 *   2. pagamento
 *   3. medições aprovadas
 *   4. execução/valor genérico (menos específico — checado por último)
 *
 * Nunca confundir os conceitos (mesmo princípio das Etapas 2/3):
 *  - "saldo contratual não executado" (valor contratual atual − medições
 *    aprovadas) NUNCA é o mesmo que "saldo financeiro a pagar" (que
 *    dependeria de liquidação e pagamento, dados que o SIGFIS não tem hoje).
 *  - "medição aprovada" NUNCA é "pagamento realizado".
 */

export type FinancialIntent = 'saldo' | 'pagamento' | 'medicoes_aprovadas' | 'execucao_valor' | null;

// 1. Saldo — checado primeiro, é o mais específico dos quatro.
const SALDO_RE = /\bsaldo\b|\ba pagar\b|n[ãa]o executad[ao]|quanto falta executar|quanto (resta|falta) (do|no) contrato|quanto resta executar/i;

// 2. Pagamento — checado depois de saldo (uma pergunta pode conter "pago"
// sem ser sobre saldo, mas nunca o contrário nesta ordem).
const PAGAMENTO_RE = /\bpago\b|\bpagamentos?\b|valor pago|pagamento realizado|liquida[çc][ãa]o|\bliquidado\b/i;

// 3. Medições aprovadas — pergunta pelo total/valor medido, não pela
// quantidade de medições pendentes (isso continua tratado à parte, no
// handler genérico de medições do AIInsightsPanel).
const MEDICOES_APROVADAS_RE = /medi[çc][õo]es? aprovadas?|total (de |da )?medi[çc][õo]es?|quanto foi medido|valor medido/i;

// 4. Execução/valor genérico — deliberadamente SEM a palavra solta "valor"
// (ela colidiria com perguntas já tratadas antes, como "maior valor" e
// "valor médio"/"ticket médio"); usa apenas termos que seriam mesmo sobre
// execução financeira da carteira como um todo.
const EXECUCAO_VALOR_RE = /financ|dinheiro|r\$|execu[çc][ãa]o|percentual executado/i;

export function classifyFinancialIntent(question: string): FinancialIntent {
  const q = question.toLowerCase();
  if (SALDO_RE.test(q)) return 'saldo';
  if (PAGAMENTO_RE.test(q)) return 'pagamento';
  if (MEDICOES_APROVADAS_RE.test(q)) return 'medicoes_aprovadas';
  if (EXECUCAO_VALOR_RE.test(q)) return 'execucao_valor';
  return null;
}

/** Subconjunto de GestorDashboard['financial'] usado nas respostas — ver frontend/src/lib/api.ts. */
export interface FinancialAnswerData {
  valorContratualAtual?: number;
  medicoesAprovadas?: number;
  saldoContratualNaoExecutado?: number;
  taxaExecucaoMedicoes?: number;
}

const fmt = (v?: number) => (v != null ? v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-');

/**
 * Monta a resposta textual para uma intenção financeira já classificada.
 * Retorna `null` quando `intent` é `null` (pergunta não é sobre finanças —
 * quem chama deve cair no restante das regras do assistente).
 */
export function buildFinancialAnswer(intent: FinancialIntent, fin: FinancialAnswerData | undefined | null): string | null {
  switch (intent) {
    case 'saldo':
      // Sempre em dois blocos, nunca um substituindo o outro — ver regras
      // semânticas no cabeçalho do arquivo.
      return [
        'Saldo financeiro a pagar: não informado, pois não há dados completos de liquidação e pagamento.',
        `Saldo contratual não executado: R$ ${fmt(fin?.saldoContratualNaoExecutado)} (valor contratual atual menos medições aprovadas — nunca deve ser tratado como saldo financeiro a pagar).`,
      ].join('\n');
    case 'pagamento':
      return [
        'Valor pago: não informado — o SIGFIS não possui hoje dados completos de status, estorno, glosa, retenção ou liquidação de pagamentos.',
        `Medições aprovadas: R$ ${fmt(fin?.medicoesAprovadas)} (nunca deve ser tratada como pagamento realizado).`,
      ].join('\n');
    case 'medicoes_aprovadas':
      return `Medições aprovadas: R$ ${fmt(fin?.medicoesAprovadas)} de R$ ${fmt(fin?.valorContratualAtual)} (valor contratual atual).\n(Medições aprovadas não equivalem necessariamente a pagamentos realizados.)`;
    case 'execucao_valor':
      return `Carteira (valor contratual atual): R$ ${fmt(fin?.valorContratualAtual)}\nMedições aprovadas: R$ ${fmt(fin?.medicoesAprovadas)}\nTaxa de execução por medições: ${fin?.taxaExecucaoMedicoes?.toFixed(1) ?? '-'}%\nSaldo contratual não executado: R$ ${fmt(fin?.saldoContratualNaoExecutado)}\n(Medições aprovadas não equivalem necessariamente a pagamentos realizados.)`;
    case null:
    default:
      return null;
  }
}
