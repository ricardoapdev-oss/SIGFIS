import { Prisma } from '@prisma/client';

/**
 * Módulo central de cálculos financeiros do SIGFIS.
 *
 * Fonte única de verdade para os indicadores financeiros do backend — usada
 * por ContractsService (Painel Geral / `/contracts/stats`, Relatório PDF /
 * `/contracts/report`) e por MeasurementsService (validação na aprovação de
 * medições). Nenhum outro ponto do backend deve recalcular estes números de
 * forma independente; ao alterar uma fórmula aqui, todos os consumidores são
 * corrigidos juntos.
 *
 * No frontend, `frontend/src/lib/financial-calculations.ts` espelha estas
 * mesmas fórmulas (mesmos nomes, mesma lógica) para os cálculos que ainda são
 * feitos no cliente (Painel Geral, Contratos) — os dois arquivos formam,
 * juntos, a fonte única do sistema. Um monorepo com pacote compartilhado
 * eliminaria a duplicação de arquivo; hoje backend/ e frontend/ são projetos
 * Node separados, então a garantia de equivalência é: mesma fórmula, mesmo
 * nome de função, mesmo comentário — qualquer divergência entre os dois
 * arquivos é bug.
 *
 * Conceitos — NUNCA confundir um pelo outro:
 *  1. valor contratual atual   → Contract.currentValue
 *  2. medições aprovadas       → Σ InspectionMeasurement.measurementValue, status APPROVED
 *  3. valor liquidado          → não suportado hoje (ver LIQUIDACAO_NAO_DISPONIVEL)
 *  4. valor pago                → Σ ContractPayment.value
 *  5. saldo contratual não executado = (1) − (2)
 *  6. saldo liquidado a pagar   = (3) − (4)  → indisponível (ver LIQUIDACAO_NAO_DISPONIVEL)
 *
 * "Medições aprovadas" (2) nunca deve ser exibido ou tratado como "pago" —
 * liquidação e pagamento seguem um fluxo próprio (nota fiscal → liquidação →
 * pagamento) que o SIGFIS ainda não modela.
 */

export const LIQUIDACAO_NAO_DISPONIVEL =
  'Não informado — a integração financeira de liquidação ainda não está disponível no SIGFIS.';

/**
 * Revisão técnica (Etapa 3, Ponto 1): auditado o schema real de produção
 * (supabase/migrations/20260823134034_remote_schema.sql) — a tabela
 * "contracts" não tem nenhum campo de valor mensal cadastrado (monthlyValue/
 * estimatedMonthlyValue/valorMensal ou equivalente). Não existindo campo
 * cadastrado, "valor mensal estimado" continua sendo CALCULADO a partir do
 * valor contratual atual dividido pela duração contratual — nunca deve ser
 * apresentado como um dado oficial/cadastrado, ver ESTIMATIVA_MENSAL_TOOLTIP.
 */
export const CAMPO_MENSAL_CADASTRADO_EXISTE = false;
export const ESTIMATIVA_MENSAL_TOOLTIP =
  'Estimativa obtida pela divisão do valor contratual atual pela duração contratual cadastrada. Pode divergir do consumo mensal efetivo ou da previsão contratual.';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
// Mês comercial de 30 dias — validado contra o relatório de referência de
// 25/08/2026 (36 contratos ativos reais): a média de 30,44 dias/mês com
// arredondamento para mês inteiro (fórmula anterior) produzia R$ 504.919,06
// para a carteira, 1,4% acima do valor de referência (R$ 497.985,73); dias
// corridos / 30, sem arredondar a duração para inteiro, produz R$ 497.831,29
// — 0,03% de diferença residual (ver ETAPA3_REVISAO_TECNICA.md).
const CALENDAR_MONTH_DAYS = 30;

export type DecimalInput = Prisma.Decimal | number | string | null | undefined;

function toDecimal(value: DecimalInput): Prisma.Decimal {
  if (value === null || value === undefined || value === '')
    return new Prisma.Decimal(0);
  return value instanceof Prisma.Decimal
    ? value
    : new Prisma.Decimal(value.toString());
}

/** Soma uma lista de valores monetários com precisão decimal, sem arredondar termos intermediários. */
export function sumDecimal(values: DecimalInput[]): Prisma.Decimal {
  return values.reduce<Prisma.Decimal>(
    (acc, v) => acc.plus(toDecimal(v)),
    new Prisma.Decimal(0),
  );
}

export interface MinimalMeasurement {
  status: string;
  measurementValue: DecimalInput;
}
export interface MinimalPayment {
  value: DecimalInput;
}
export interface MinimalContract {
  id: string;
  contractNumber: string;
  initialValue: DecimalInput;
  currentValue: DecimalInput;
  startDate: Date | string;
  endDate: Date | string;
}

/** 2. Medições aprovadas — soma das medições com status APPROVED. */
export function sumApprovedMeasurements(
  measurements: MinimalMeasurement[],
): Prisma.Decimal {
  return sumDecimal(
    measurements
      .filter((m) => m.status === 'APPROVED')
      .map((m) => m.measurementValue),
  );
}

/** 4. Valor pago — soma dos registros de pagamento (ContractPayment). Dado real, nunca deve ser confundido com medição aprovada. */
export function sumPayments(payments: MinimalPayment[]): Prisma.Decimal {
  return sumDecimal(payments.map((p) => p.value));
}

/**
 * 5. Saldo contratual não executado = valor contratual atual − medições aprovadas.
 * Pode ser negativo quando há medição aprovada acima do valor contratual —
 * ver `checkMeasurementApproval`, que existe justamente para impedir que
 * isso aconteça sem justificativa registrada.
 */
export function contractualBalanceNotExecuted(
  currentValue: DecimalInput,
  approvedMeasured: DecimalInput,
): Prisma.Decimal {
  return toDecimal(currentValue).minus(toDecimal(approvedMeasured));
}

/** 6. Saldo liquidado a pagar — indisponível: o SIGFIS não modela liquidação hoje. */
export function outstandingLiquidatedBalance(): null {
  return null;
}

/** Taxa de execução por medição = medições aprovadas / valor contratual atual × 100. Sem valor contratual, retorna 0. */
export function executionRateByMeasurement(
  currentValue: DecimalInput,
  approvedMeasured: DecimalInput,
): number {
  const cv = toDecimal(currentValue);
  if (cv.lessThanOrEqualTo(0)) return 0;
  return toDecimal(approvedMeasured).dividedBy(cv).times(100).toNumber();
}

/**
 * Duração do contrato em meses (mês comercial de 30 dias, fracionário — sem
 * arredondar para mês inteiro). null quando as datas são inválidas ou
 * término ≤ início — usado para excluir o contrato do valor mensal da
 * carteira. Nunca menor que 1 mês (piso de segurança para contratos muito
 * curtos, evita explodir o valor mensal por divisão por fração de mês).
 * Para exibição (ex.: coluna "Xm" do Relatório PDF), arredonde no ponto de
 * exibição — este valor fracionário é a base de cálculo, não o texto final.
 */
export function contractDurationMonths(
  startDate: Date | string,
  endDate: Date | string,
): number | null {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (
    isNaN(start.getTime()) ||
    isNaN(end.getTime()) ||
    end.getTime() <= start.getTime()
  )
    return null;
  const days = (end.getTime() - start.getTime()) / MS_PER_DAY;
  return Math.max(days / CALENDAR_MONTH_DAYS, 1);
}

/** Valor mensal estimado de UM contrato = valor contratual atual / duração em meses. null se as datas forem inválidas (contrato excluído das médias da carteira). */
export function contractMonthlyValue(
  currentValue: DecimalInput,
  startDate: Date | string,
  endDate: Date | string,
): Prisma.Decimal | null {
  const months = contractDurationMonths(startDate, endDate);
  if (months === null) return null;
  return toDecimal(currentValue).dividedBy(months);
}

export interface PortfolioFinancials {
  /** 1. Soma dos valores atuais dos contratos considerados na carteira. */
  valorContratualAtual: number;
  /** 2. Soma acumulada das medições aprovadas. */
  medicoesAprovadas: number;
  /** 5. valorContratualAtual − medicoesAprovadas. Não é limitado a zero — negativo é sinal de inconsistência, ver warnings dos serviços que escrevem medição. */
  saldoContratualNaoExecutado: number;
  /** medicoesAprovadas / valorContratualAtual × 100. */
  taxaExecucaoMedicoes: number;
  /** 7. Soma dos valores mensais estimados (valor contratual atual / duração) de cada contrato com datas válidas. */
  valorMensalEstimadoCarteira: number;
  /** 8. valorMensalEstimadoCarteira / contratosComValorMensalValido — NUNCA chamar de "desembolso mensal": é uma média por contrato, não uma previsão de caixa. */
  mediaMensalPorContrato: number;
  contratosComValorMensalValido: number;
  /** Números dos contratos alertados por datas inválidas (endDate ausente/anterior ao startDate) — excluídos do cálculo mensal. */
  contratosComValorMensalInvalido: string[];
}

/**
 * Agregação de carteira — usada por `ContractsService.getDashboardStats`
 * (Painel Geral) e `ContractsService.findReport` (Relatório PDF).
 * `contracts` deve trazer as `measurements` de cada contrato já incluídas.
 */
export function computePortfolioFinancials(
  contracts: (MinimalContract & { measurements: MinimalMeasurement[] })[],
): PortfolioFinancials {
  const valorContratualAtualDec = sumDecimal(
    contracts.map((c) => c.currentValue),
  );
  const medicoesAprovadasDec = sumDecimal(
    contracts
      .flatMap((c) => c.measurements)
      .filter((m) => m.status === 'APPROVED')
      .map((m) => m.measurementValue),
  );
  const saldoDec = valorContratualAtualDec.minus(medicoesAprovadasDec);
  const taxaExecucaoMedicoes = executionRateByMeasurement(
    valorContratualAtualDec,
    medicoesAprovadasDec,
  );

  const contratosComValorMensalInvalido: string[] = [];
  let valorMensalEstimadoCarteiraDec = new Prisma.Decimal(0);
  let contratosComValorMensalValido = 0;
  for (const c of contracts) {
    const monthly = contractMonthlyValue(
      c.currentValue,
      c.startDate,
      c.endDate,
    );
    if (monthly === null) {
      contratosComValorMensalInvalido.push(c.contractNumber);
      continue;
    }
    valorMensalEstimadoCarteiraDec =
      valorMensalEstimadoCarteiraDec.plus(monthly);
    contratosComValorMensalValido++;
  }
  const mediaMensalPorContrato =
    contratosComValorMensalValido > 0
      ? valorMensalEstimadoCarteiraDec
          .dividedBy(contratosComValorMensalValido)
          .toNumber()
      : 0;

  return {
    valorContratualAtual: valorContratualAtualDec.toNumber(),
    medicoesAprovadas: medicoesAprovadasDec.toNumber(),
    saldoContratualNaoExecutado: saldoDec.toNumber(),
    taxaExecucaoMedicoes,
    valorMensalEstimadoCarteira: valorMensalEstimadoCarteiraDec.toNumber(),
    mediaMensalPorContrato,
    contratosComValorMensalValido,
    contratosComValorMensalInvalido,
  };
}

/**
 * Invariante de consistência: saldo + medido deve sempre igualar o valor
 * contratual atual (dentro de 1 centavo, para absorver a conversão final
 * Decimal → number). Usada em testes e como checagem de sanidade.
 */
export function assertsBalancePlusMeasuredEqualsContractValue(
  f: PortfolioFinancials,
): boolean {
  return (
    Math.abs(
      f.saldoContratualNaoExecutado +
        f.medicoesAprovadas -
        f.valorContratualAtual,
    ) < 0.01
  );
}

// ── Validações usadas nos serviços de escrita ───────────────────────────────

export interface MeasurementApprovalCheck {
  exceedsContractValue: boolean;
  projectedTotal: number;
  currentValue: number;
  excessAmount: number;
}

/**
 * Verifica se aprovar uma medição faria o total de medições aprovadas do
 * contrato superar o valor contratual atual. Usada por
 * `MeasurementsService.approve` para IMPEDIR a aprovação sem justificativa
 * (regra: "impedir saldo negativo sem justificativa" / "alertar medição
 * superior ao valor contratual").
 */
export function checkMeasurementApproval(
  currentValue: DecimalInput,
  alreadyApprovedForContract: DecimalInput,
  newMeasurementValue: DecimalInput,
): MeasurementApprovalCheck {
  const cv = toDecimal(currentValue);
  const projected = toDecimal(alreadyApprovedForContract).plus(
    toDecimal(newMeasurementValue),
  );
  const exceeds = projected.greaterThan(cv);
  return {
    exceedsContractValue: exceeds,
    projectedTotal: projected.toNumber(),
    currentValue: cv.toNumber(),
    excessAmount: exceeds ? projected.minus(cv).toNumber() : 0,
  };
}

/**
 * Verifica se o valor atual do contrato está abaixo do valor original sem
 * que haja aditivo(s) de supressão (ADDENDUM_VALUE_DECREASE) aprovado(s)
 * que cubram a diferença. Retorna true quando há inconsistência a alertar
 * (regra: "alertar contrato com valor atual inferior ao valor original sem
 * registro de supressão"). Não bloqueia — apenas sinaliza; quem chama decide
 * o que fazer (hoje: registrar em auditoria).
 */
export function checkSuppressionWithoutRecord(
  initialValue: DecimalInput,
  currentValue: DecimalInput,
  approvedDecreaseAlterations: DecimalInput[],
): boolean {
  const iv = toDecimal(initialValue);
  const cv = toDecimal(currentValue);
  if (cv.greaterThanOrEqualTo(iv)) return false;
  const totalDecrease = sumDecimal(approvedDecreaseAlterations).abs();
  return iv.minus(cv).greaterThan(totalDecrease);
}
