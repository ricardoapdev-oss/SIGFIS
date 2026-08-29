/**
 * Módulo central de cálculos financeiros do SIGFIS (frontend).
 *
 * Espelha `backend/src/contracts/financial-calculations.ts` — mesmas
 * fórmulas, mesmos nomes de função, mesmos conceitos. Usado por tudo que
 * ainda calcula indicadores financeiros no cliente (Painel Geral em
 * `lib/api.ts`, Contratos em `ContractTabs.tsx`, agregação de carteira em
 * `ContractReport.tsx`). Nenhum componente deve reimplementar estas somas
 * ou fórmulas por conta própria — importe daqui.
 *
 * (backend/ e frontend/ são projetos Node separados — sem um pacote
 * compartilhado, a garantia de equivalência entre os dois arquivos é:
 * mesma fórmula, mesmo nome, mesmo comentário. Qualquer divergência entre
 * os dois é bug.)
 *
 * Conceitos — NUNCA confundir um pelo outro:
 *  1. valor contratual atual   → Contract.currentValue
 *  2. medições aprovadas       → Σ InspectionMeasurement.measurementValue, status APPROVED
 *  3. valor liquidado          → não suportado hoje (ver LIQUIDACAO_NAO_DISPONIVEL)
 *  4. valor pago                → Σ ContractPayment.value
 *  5. saldo contratual não executado = (1) − (2)
 *  6. saldo liquidado a pagar   = (3) − (4)  → indisponível (ver LIQUIDACAO_NAO_DISPONIVEL)
 *
 * "Medições aprovadas" (2) nunca deve ser exibido ou tratado como "pago".
 */

export const LIQUIDACAO_NAO_DISPONIVEL =
  'Não informado — a integração financeira de liquidação ainda não está disponível no SIGFIS.';

/**
 * Revisão técnica (Etapa 3, Ponto 1): auditado o schema real de produção
 * (supabase/migrations/20260823134034_remote_schema.sql) — "contracts" não
 * tem nenhum campo de valor mensal cadastrado. Sem campo cadastrado, o valor
 * mensal continua sendo CALCULADO a partir do valor contratual atual dividido
 * pela duração — ver ESTIMATIVA_MENSAL_TOOLTIP, mesmo texto do backend.
 */
export const CAMPO_MENSAL_CADASTRADO_EXISTE = false;
export const ESTIMATIVA_MENSAL_TOOLTIP =
  'Estimativa obtida pela divisão do valor contratual atual pela duração contratual cadastrada. Pode divergir do consumo mensal efetivo ou da previsão contratual.';

/** Textos-padrão de tooltip — usar estes textos (não parafrasear) em qualquer lugar que exiba os indicadores abaixo. */
export const FINANCIAL_TOOLTIPS = {
  medicoesAprovadas: 'Soma de tudo o que já foi medido e aprovado nos contratos ativos, considerando todo o histórico e não apenas o período mostrado no gráfico. A medição aprovada confirma que o serviço foi entregue e aceito, mas ainda não quer dizer que o pagamento foi feito.',
  saldoContratualNaoExecutado: 'Parte do contrato que ainda não foi executada, ou seja, quanto ainda pode ser gasto até o fim do contrato. É o valor contratual atual menos o total de medições aprovadas.',
  valorMensalEstimadoCarteira: `Estimativa de quanto todos os contratos ativos, somados, custam por mês. Cada contrato entra com o seu valor mensal calculado. ${ESTIMATIVA_MENSAL_TOOLTIP}`,
  mediaMensalPorContrato: `Quanto um contrato custa por mês, em média. É a estimativa mensal de toda a carteira dividida pelo número de contratos com prazo cadastrado. ${ESTIMATIVA_MENSAL_TOOLTIP}`,
  taxaExecucaoMedicoes: 'Quanto do contrato já foi executado, em percentual. É o total de medições aprovadas dividido pelo valor contratual atual: 100% significa que todo o valor previsto já foi medido e aprovado.',
  saldoLiquidadoAPagar: LIQUIDACAO_NAO_DISPONIVEL,
} as const;

const MS_PER_DAY = 1000 * 60 * 60 * 24;
// Mês comercial de 30 dias — ver mesma constante e nota de validação em
// backend/src/contracts/financial-calculations.ts (paridade obrigatória).
const CALENDAR_MONTH_DAYS = 30;

/**
 * Soma valores monetários evitando o erro clássico de ponto flutuante
 * (0.1 + 0.2 !== 0.3) sem depender de uma lib de decimal — os valores já
 * chegam do backend com 2 casas decimais, então somamos em centavos
 * (inteiros) e convertemos de volta ao final. Nunca arredonda um valor já
 * "limpo": `Math.round(v * 100)` apenas recupera o centavo exato que já
 * existia no valor de origem.
 */
export function sumMoney(values: (number | null | undefined)[]): number {
  const totalCents = values.reduce<number>((acc, v) => acc + Math.round((v ?? 0) * 100), 0);
  return totalCents / 100;
}

export interface MinimalMeasurement {
  status: string;
  measurementValue: number;
}
export interface MinimalPayment {
  value: number;
}
export interface MinimalContract {
  id: string;
  contractNumber: string;
  initialValue: number;
  currentValue: number;
  startDate: string | Date;
  endDate: string | Date;
}

/** 2. Medições aprovadas — soma das medições com status APPROVED. */
export function sumApprovedMeasurements(measurements: MinimalMeasurement[]): number {
  return sumMoney(measurements.filter((m) => m.status === 'APPROVED').map((m) => m.measurementValue));
}

/** 4. Valor pago — soma dos registros de pagamento (ContractPayment). Nunca deve ser confundido com medição aprovada. */
export function sumPayments(payments: MinimalPayment[]): number {
  return sumMoney(payments.map((p) => p.value));
}

/**
 * 5. Saldo contratual não executado = valor contratual atual − medições aprovadas.
 * Pode ser negativo — sinal de medição aprovada acima do valor contratual,
 * que o backend já impede sem justificativa (ver MeasurementsService.approve).
 */
export function contractualBalanceNotExecuted(currentValue: number, approvedMeasured: number): number {
  return sumMoney([currentValue, -approvedMeasured]);
}

/** 6. Saldo liquidado a pagar — indisponível: o SIGFIS não modela liquidação hoje. */
export function outstandingLiquidatedBalance(): null {
  return null;
}

/** Taxa de execução por medição = medições aprovadas / valor contratual atual × 100. Sem valor contratual, retorna 0. */
export function executionRateByMeasurement(currentValue: number, approvedMeasured: number): number {
  if (!currentValue || currentValue <= 0) return 0;
  return (approvedMeasured / currentValue) * 100;
}

/**
 * Duração do contrato em meses (mês comercial de 30 dias, fracionário — sem
 * arredondar para mês inteiro). null quando as datas são inválidas ou
 * término ≤ início. Nunca menor que 1 mês (piso de segurança). Para exibição
 * (coluna "Xm"), arredonde no ponto de exibição — este valor é a base de
 * cálculo, não o texto final.
 */
export function contractDurationMonths(startDate: string | Date, endDate: string | Date): number | null {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end.getTime() <= start.getTime()) return null;
  const days = (end.getTime() - start.getTime()) / MS_PER_DAY;
  return Math.max(days / CALENDAR_MONTH_DAYS, 1);
}

/** Valor mensal estimado de UM contrato = valor contratual atual / duração em meses. null se as datas forem inválidas. */
export function contractMonthlyValue(currentValue: number, startDate: string | Date, endDate: string | Date): number | null {
  const months = contractDurationMonths(startDate, endDate);
  if (months === null) return null;
  return currentValue / months;
}

export interface PortfolioFinancials {
  valorContratualAtual: number;
  medicoesAprovadas: number;
  saldoContratualNaoExecutado: number;
  taxaExecucaoMedicoes: number;
  valorMensalEstimadoCarteira: number;
  mediaMensalPorContrato: number;
  contratosComValorMensalValido: number;
  contratosComValorMensalInvalido: string[];
}

/**
 * Agregação de carteira — usada pelo Painel Geral (`lib/api.ts`) e pela
 * agregação de totais do Relatório PDF (`ContractReport.tsx`).
 */
export function computePortfolioFinancials(
  contracts: (MinimalContract & { measurements: MinimalMeasurement[] })[],
): PortfolioFinancials {
  const valorContratualAtual = sumMoney(contracts.map((c) => c.currentValue));
  const medicoesAprovadas = sumApprovedMeasurements(contracts.flatMap((c) => c.measurements));
  const saldoContratualNaoExecutado = sumMoney([valorContratualAtual, -medicoesAprovadas]);
  const taxaExecucaoMedicoes = executionRateByMeasurement(valorContratualAtual, medicoesAprovadas);

  const contratosComValorMensalInvalido: string[] = [];
  const monthlyValues: number[] = [];
  for (const c of contracts) {
    const monthly = contractMonthlyValue(c.currentValue, c.startDate, c.endDate);
    if (monthly === null) {
      contratosComValorMensalInvalido.push(c.contractNumber);
      continue;
    }
    monthlyValues.push(monthly);
  }
  // Paridade com o backend (Etapa 3, Ponto 3): valor mensal por contrato é um
  // resultado de DIVISÃO (currentValue/duração), não um valor monetário
  // "limpo" de 2 casas — somar em centavos via sumMoney() arredondaria cada
  // termo antes de somar e divergiria do backend (que soma em Decimal de
  // precisão arbitrária e só converte para number ao final). Soma direta em
  // ponto flutuante aqui replica o mesmo comportamento (arredondar apenas na
  // exibição, nunca antes de somar).
  const valorMensalEstimadoCarteira = monthlyValues.reduce((a, b) => a + b, 0);
  const contratosComValorMensalValido = monthlyValues.length;
  const mediaMensalPorContrato = contratosComValorMensalValido > 0 ? valorMensalEstimadoCarteira / contratosComValorMensalValido : 0;

  return {
    valorContratualAtual,
    medicoesAprovadas,
    saldoContratualNaoExecutado,
    taxaExecucaoMedicoes,
    valorMensalEstimadoCarteira,
    mediaMensalPorContrato,
    contratosComValorMensalValido,
    contratosComValorMensalInvalido,
  };
}

/**
 * Agregação de carteira a partir de contratos já enriquecidos pelo backend
 * (ex.: resposta de `/contracts/report`, que já traz `medicoesAprovadas`,
 * `saldoContratualNaoExecutado` e `monthlyValue` por contrato — ver
 * `ContractsService.findReport`). Evita recalcular medições aprovadas no
 * cliente quando o backend já fez a soma por contrato; soma apenas os
 * totais de carteira a partir desses campos já centralizados.
 */
export function summarizeReportContracts(
  contracts: { currentValue: number; medicoesAprovadas: number; saldoContratualNaoExecutado: number; monthlyValue: number | null; contractNumber: string }[],
): PortfolioFinancials {
  const valorContratualAtual = sumMoney(contracts.map((c) => c.currentValue));
  const medicoesAprovadas = sumMoney(contracts.map((c) => c.medicoesAprovadas));
  const saldoContratualNaoExecutado = sumMoney(contracts.map((c) => c.saldoContratualNaoExecutado));
  const taxaExecucaoMedicoes = executionRateByMeasurement(valorContratualAtual, medicoesAprovadas);

  const validMonthly = contracts.filter((c) => c.monthlyValue !== null);
  const contratosComValorMensalInvalido = contracts.filter((c) => c.monthlyValue === null).map((c) => c.contractNumber);
  // Mesma ressalva de precisão de computePortfolioFinancials acima: soma
  // direta, sem arredondar cada monthlyValue a centavos antes de somar.
  const valorMensalEstimadoCarteira = validMonthly.reduce((s, c) => s + (c.monthlyValue as number), 0);
  const contratosComValorMensalValido = validMonthly.length;
  const mediaMensalPorContrato = contratosComValorMensalValido > 0 ? valorMensalEstimadoCarteira / contratosComValorMensalValido : 0;

  return {
    valorContratualAtual,
    medicoesAprovadas,
    saldoContratualNaoExecutado,
    taxaExecucaoMedicoes,
    valorMensalEstimadoCarteira,
    mediaMensalPorContrato,
    contratosComValorMensalValido,
    contratosComValorMensalInvalido,
  };
}
