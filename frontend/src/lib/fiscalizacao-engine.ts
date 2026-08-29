/**
 * Motor de derivação da Central de Fiscalização do SIGFIS (cópia frontend).
 *
 * Fonte única das regras que transformam os dados JÁ EXISTENTES do sistema
 * (contratos, designações, ocorrências, medições, aditivos e pagamentos) em:
 *   1. uma lista priorizada e EXPLICADA de pendências de execução contratual
 *      (Central de Fiscalização — tela "Fiscalizações"); e
 *   2. um diagnóstico consolidado por contrato (Inteligência Contratual →
 *      Diagnóstico).
 *
 * Espelha `backend/src/contracts/fiscalizacao-engine.ts` — mesmas funções,
 * mesma lógica, mesmos textos. Assim como em `financial-calculations.ts`,
 * backend/ e frontend/ são projetos Node separados: a garantia de
 * equivalência é "mesma fórmula, mesmo nome, mesmo comentário" e há um teste
 * de paridade por fixture (`backend/.../fiscalizacao-engine.parity.spec.ts` +
 * `frontend/scripts/verify-fiscalizacao-parity.cjs`).
 *
 * PRINCÍPIOS (não violar):
 *  - Nunca inventar dados. Só deriva do que existe.
 *  - Medição aprovada NUNCA é tratada como pagamento.
 *  - Obrigações, documentos com validade, garantias e rastreamento de
 *    reajuste ainda não têm tabela — as dimensões correspondentes do
 *    diagnóstico retornam `SEM_DADOS`, nunca um valor fabricado.
 *  - As prioridades decorrem de regras objetivas; cada item carrega o
 *    campo `reason` explicando por que recebeu aquela prioridade.
 *  - Linguagem de recomendação, nunca ordem jurídica ("recomenda-se…",
 *    "convém…"). Não afirma que um contrato pode/não pode ser prorrogado.
 */

// ── Tipos públicos ───────────────────────────────────────────────────────────

export type FiscalPriority =
  | 'CRITICA'
  | 'ALTA'
  | 'MEDIA'
  | 'BAIXA'
  | 'INFORMATIVA';

export const PRIORITY_ORDER: Record<FiscalPriority, number> = {
  CRITICA: 0,
  ALTA: 1,
  MEDIA: 2,
  BAIXA: 3,
  INFORMATIVA: 4,
};

export const PRIORITY_LABEL: Record<FiscalPriority, string> = {
  CRITICA: 'Crítica',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
  INFORMATIVA: 'Informativa',
};

export type FiscalCategory =
  | 'PRAZO'
  | 'FINANCEIRO'
  | 'MEDICAO'
  | 'OCORRENCIA'
  | 'ADITIVO'
  | 'FISCAL_DESIGNACAO'
  | 'REAJUSTE'
  // 'PROCESSO' é emitido apenas por lib/api.ts (prazos de fase do módulo
  // Processos) — este motor não o produz, pois cuida da execução contratual.
  | 'PROCESSO';

export const CATEGORY_LABEL: Record<FiscalCategory, string> = {
  PRAZO: 'Prazo',
  FINANCEIRO: 'Financeiro',
  MEDICAO: 'Medição',
  OCORRENCIA: 'Ocorrência',
  ADITIVO: 'Aditivo',
  FISCAL_DESIGNACAO: 'Designação de fiscal',
  REAJUSTE: 'Reajuste / repactuação',
  PROCESSO: 'Processo',
};

export interface FiscalPendingItem {
  /** id estável para chave de lista (determinístico a partir da origem). */
  id: string;
  category: FiscalCategory;
  priority: FiscalPriority;
  title: string;
  /** Explicação objetiva do porquê da prioridade. */
  reason: string;
  contractId?: string;
  contractNumber?: string;
  /** processo de origem — usado apenas pelos itens de categoria PROCESSO. */
  processId?: string;
  /** id da entidade de origem (ocorrência, medição, aditivo, contrato). */
  originId?: string;
  originType?: 'contract' | 'occurrence' | 'measurement' | 'alteration';
  /** fiscal responsável pela origem, quando aplicável (para "minhas pendências"). */
  fiscalId?: string | null;
  amount?: number;
  /** dias de referência: negativo = vencido/atrasado; positivo = restante. */
  daysReference?: number;
  dueDate?: string;
}

export interface FiscalizacaoSummary {
  CRITICA: number;
  ALTA: number;
  MEDIA: number;
  BAIXA: number;
  INFORMATIVA: number;
  total: number;
}

export interface FiscalizacaoCentral {
  items: FiscalPendingItem[];
  summary: FiscalizacaoSummary;
}

// ── Formas mínimas de entrada (subconjunto do domínio) ───────────────────────

export interface EngineContract {
  id: string;
  contractNumber: string;
  status: string;
  startDate: string;
  endDate: string;
  initialValue: number;
  currentValue: number;
  managerId?: string | null;
}

export interface EngineAssignment {
  id: string;
  contractId: string;
  fiscalId: string;
  role: string;
  isActive: boolean;
  endDate?: string | null;
}

export interface EngineOccurrence {
  id: string;
  contractId: string;
  fiscalId?: string | null;
  title: string;
  severity: string; // LOW | MEDIUM | HIGH | CRITICAL
  status: string; // OPEN | UNDER_REVIEW | RESOLVED | REJECTED
  createdAt: string;
  resolvedAt?: string | null;
}

export interface EngineMeasurement {
  id: string;
  contractId: string;
  fiscalId?: string | null;
  measurementValue: number;
  status: string; // PENDING_FISCAL | PENDING_GESTOR | APPROVED | REJECTED
  createdAt: string;
}

export interface EngineAlteration {
  id: string;
  contractId: string;
  type: string; // ADDENDUM_* | PRICE_*
  status: string; // DRAFT | PENDING_APPROVAL | APPROVED | REJECTED
  newEndDate?: string | null;
  createdAt: string;
}

export interface EnginePayment {
  id: string;
  contractId: string;
  value: number;
  paymentDate: string;
}

export interface EngineData {
  contracts: EngineContract[];
  assignments: EngineAssignment[];
  occurrences: EngineOccurrence[];
  measurements: EngineMeasurement[];
  alterations: EngineAlteration[];
  payments?: EnginePayment[];
}

export interface CentralInput extends EngineData {
  viewerId: string;
  /** FISCAL | GESTOR | ADMIN | ALTA_GESTAO */
  viewerRole: string;
}

export interface EngineOptions {
  /** referência de "agora" (ms). Injetável para testes determinísticos. */
  now?: number;
}

// ── Helpers de data / dinheiro (idênticos aos dois lados) ────────────────────

const DAY_MS = 86400000;
/** Mês comercial de 30 dias — mesma convenção de financial-calculations.ts. */
const MONTH_DAYS = 30;

function parseDate(d: string): number {
  // Datas "YYYY-MM-DD" são ancoradas ao meio-dia UTC para não escorregar de
  // dia por fuso — mesma regra usada em lib/api.ts (daysUntil/fmtDate).
  return new Date(d.length === 10 ? d + 'T12:00:00Z' : d).getTime();
}

export function daysUntil(dateStr: string, now: number): number {
  return Math.ceil((parseDate(dateStr) - now) / DAY_MS);
}

export function daysSince(dateStr: string, now: number): number {
  return Math.ceil((now - parseDate(dateStr)) / DAY_MS);
}

function monthsSince(dateStr: string, now: number): number {
  return Math.floor((now - parseDate(dateStr)) / DAY_MS / MONTH_DAYS);
}

/** Soma segura em centavos (evita 0.1 + 0.2 !== 0.3). */
function sumMoney(values: number[]): number {
  const cents = values.reduce((acc, v) => acc + Math.round((v || 0) * 100), 0);
  return cents / 100;
}

function fmtDate(dateStr: string): string {
  const ms = parseDate(dateStr);
  if (isNaN(ms)) return dateStr;
  const d = new Date(ms);
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

function fmtCur(v: number): string {
  return (
    'R$ ' +
    (v || 0).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// ── Rótulos de domínio usados nos textos ────────────────────────────────────

const SEVERITY_LABEL: Record<string, string> = {
  LOW: 'de baixa gravidade',
  MEDIUM: 'de gravidade média',
  HIGH: 'de gravidade alta',
  CRITICAL: 'crítica',
};

const MEASUREMENT_STATUS_LABEL: Record<string, string> = {
  PENDING_FISCAL: 'aguardando o fiscal',
  PENDING_GESTOR: 'aguardando homologação do gestor',
};

const ALTERATION_TYPE_LABEL: Record<string, string> = {
  ADDENDUM_VALUE_INCREASE: 'acréscimo de valor',
  ADDENDUM_VALUE_DECREASE: 'supressão de valor',
  ADDENDUM_TIME_EXTENSION: 'prorrogação de prazo',
  PRICE_REAJUSTE: 'reajuste de preço',
  PRICE_REPACTUACAO: 'repactuação',
  PRICE_REEQUILIBRIO: 'reequilíbrio econômico',
};

const OPEN_OCCURRENCE = (o: EngineOccurrence): boolean =>
  o.status !== 'RESOLVED' && o.status !== 'REJECTED';

const REAJUSTE_TYPES = ['PRICE_REAJUSTE', 'PRICE_REPACTUACAO'];

function escalate(p: FiscalPriority): FiscalPriority {
  const order: FiscalPriority[] = [
    'INFORMATIVA',
    'BAIXA',
    'MEDIA',
    'ALTA',
    'CRITICA',
  ];
  const i = order.indexOf(p);
  return order[Math.min(order.length - 1, i + 1)];
}

// ── Central de Fiscalização (lista priorizada de pendências) ─────────────────

export function deriveFiscalizacaoCentral(
  input: CentralInput,
  opts?: EngineOptions,
): FiscalizacaoCentral {
  const now = opts?.now ?? Date.now();
  const isManager = input.viewerRole !== 'FISCAL';

  const myContractIds = new Set(
    input.assignments
      .filter((a) => a.isActive && a.fiscalId === input.viewerId)
      .map((a) => a.contractId),
  );

  const scoped = input.contracts.filter((c) => {
    const alive = c.status === 'ACTIVE' || c.status === 'SUSPENDED';
    if (!alive) return false;
    return isManager || myContractIds.has(c.id);
  });
  const scopedIds = new Set(scoped.map((c) => c.id));

  const items: FiscalPendingItem[] = [];
  const byContract = <T extends { contractId: string }>(arr: T[]) => {
    const map = new Map<string, T[]>();
    for (const el of arr) {
      if (!scopedIds.has(el.contractId)) continue;
      const list = map.get(el.contractId) ?? [];
      list.push(el);
      map.set(el.contractId, list);
    }
    return map;
  };

  const occByContract = byContract(input.occurrences);
  const msrByContract = byContract(input.measurements);
  const altByContract = byContract(input.alterations);

  for (const c of scoped) {
    const cOcc = occByContract.get(c.id) ?? [];
    const cMsr = msrByContract.get(c.id) ?? [];
    const cAlt = altByContract.get(c.id) ?? [];

    // ── PRAZO ──────────────────────────────────────────────────────────────
    const d = daysUntil(c.endDate, now);
    const hasExtension = cAlt.some(
      (a) => a.type === 'ADDENDUM_TIME_EXTENSION' && a.status !== 'REJECTED',
    );
    const continuityNote = hasExtension
      ? ''
      : ' Não há registro de aditivo de prorrogação; convém iniciar a análise de continuidade/prorrogação.';

    let prazo: { priority: FiscalPriority; reason: string } | null = null;
    if (d < 0) {
      prazo = {
        priority: 'CRITICA',
        reason: `Contrato vencido há ${Math.abs(d)} dia(s) (encerrou em ${fmtDate(c.endDate)}) e ainda consta como ${c.status === 'ACTIVE' ? 'ativo' : 'suspenso'}.`,
      };
    } else if (d <= 30) {
      prazo = {
        priority: 'CRITICA',
        reason: `Encerra em ${d} dia(s) (${fmtDate(c.endDate)}).${continuityNote}`,
      };
    } else if (d <= 60) {
      prazo = {
        priority: 'ALTA',
        reason: `Encerra em ${d} dia(s) (${fmtDate(c.endDate)}).${continuityNote}`,
      };
    } else if (d <= 90) {
      prazo = {
        priority: 'ALTA',
        reason: `Encerra em ${d} dia(s) (${fmtDate(c.endDate)}).${continuityNote}`,
      };
    } else if (d <= 120) {
      prazo = {
        priority: 'MEDIA',
        reason: `Encerra em ${d} dia(s) (${fmtDate(c.endDate)}).${continuityNote}`,
      };
    } else if (d <= 180) {
      prazo = {
        priority: 'BAIXA',
        reason: `Encerra em ${d} dia(s) (${fmtDate(c.endDate)}).${continuityNote}`,
      };
    }
    if (prazo) {
      items.push({
        id: `prazo:${c.id}`,
        category: 'PRAZO',
        priority: prazo.priority,
        title:
          d < 0
            ? `Contrato ${c.contractNumber} vencido`
            : `Contrato ${c.contractNumber} encerra em ${d} dia(s)`,
        reason: prazo.reason,
        contractId: c.id,
        contractNumber: c.contractNumber,
        originId: c.id,
        originType: 'contract',
        daysReference: d,
        dueDate: c.endDate,
      });
    }

    // ── DESIGNAÇÃO DE FISCAL ───────────────────────────────────────────────
    const activeAssignments = input.assignments.filter(
      (a) => a.contractId === c.id && a.isActive,
    );
    const hasTitular = activeAssignments.some((a) => a.role === 'TITULAR');
    if (!hasTitular && c.status === 'ACTIVE') {
      items.push({
        id: `fiscal:${c.id}`,
        category: 'FISCAL_DESIGNACAO',
        priority: 'ALTA',
        title: `Contrato ${c.contractNumber} sem fiscal titular`,
        reason:
          'Contrato ativo sem designação de fiscal titular vigente registrada no sistema.',
        contractId: c.id,
        contractNumber: c.contractNumber,
        originId: c.id,
        originType: 'contract',
      });
    }
    for (const a of activeAssignments) {
      if (!a.endDate) continue;
      const de = daysUntil(a.endDate, now);
      if (de < 0) {
        items.push({
          id: `fiscal-end:${a.id}`,
          category: 'FISCAL_DESIGNACAO',
          priority: 'MEDIA',
          title: `Designação de fiscal encerrada — ${c.contractNumber}`,
          reason: `A designação do fiscal encerrou em ${fmtDate(a.endDate)} e o contrato segue vigente.`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: a.id,
          fiscalId: a.fiscalId,
          daysReference: de,
          dueDate: a.endDate,
        });
      } else if (de <= 30) {
        items.push({
          id: `fiscal-end:${a.id}`,
          category: 'FISCAL_DESIGNACAO',
          priority: 'BAIXA',
          title: `Designação de fiscal a encerrar — ${c.contractNumber}`,
          reason: `A designação do fiscal encerra em ${de} dia(s) (${fmtDate(a.endDate)}).`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: a.id,
          fiscalId: a.fiscalId,
          daysReference: de,
          dueDate: a.endDate,
        });
      }
    }

    // ── MEDIÇÕES PENDENTES ─────────────────────────────────────────────────
    for (const m of cMsr) {
      if (m.status !== 'PENDING_FISCAL' && m.status !== 'PENDING_GESTOR')
        continue;
      // Fiscal vê as que dependem dele; gestor vê as que dependem de homologação.
      const forViewer = isManager
        ? true
        : m.status === 'PENDING_FISCAL' && m.fiscalId === input.viewerId;
      if (!forViewer) continue;
      const age = daysSince(m.createdAt, now);
      let priority: FiscalPriority;
      if (isManager && m.status === 'PENDING_FISCAL') priority = 'BAIXA';
      else if (age > 30) priority = 'ALTA';
      else if (age > 15) priority = 'MEDIA';
      else priority = 'BAIXA';
      items.push({
        id: `medicao:${m.id}`,
        category: 'MEDICAO',
        priority,
        title: `Medição pendente — ${c.contractNumber}`,
        reason: `Medição de ${fmtCur(m.measurementValue)} ${MEASUREMENT_STATUS_LABEL[m.status] ?? 'pendente'} há ${age} dia(s). Medição pendente não representa pagamento realizado.`,
        contractId: c.id,
        contractNumber: c.contractNumber,
        originId: m.id,
        originType: 'measurement',
        fiscalId: m.fiscalId ?? null,
        amount: m.measurementValue,
        daysReference: -age,
      });
    }

    // ── OCORRÊNCIAS ────────────────────────────────────────────────────────
    const recentOcc = cOcc.filter((o) => daysSince(o.createdAt, now) <= 120);
    const recurrence = recentOcc.length;
    for (const o of cOcc) {
      if (!OPEN_OCCURRENCE(o)) continue;
      let priority: FiscalPriority =
        o.severity === 'CRITICAL'
          ? 'CRITICA'
          : o.severity === 'HIGH'
            ? 'ALTA'
            : 'MEDIA';
      const age = daysSince(o.createdAt, now);
      let reason =
        `Ocorrência ${SEVERITY_LABEL[o.severity] ?? ''} aberta há ${age} dia(s).`.replace(
          '  ',
          ' ',
        );
      if (recurrence >= 3) {
        priority = escalate(priority);
        reason += ` ${recurrence} ocorrências registradas neste contrato nos últimos 120 dias (possível reincidência).`;
      }
      items.push({
        id: `ocorrencia:${o.id}`,
        category: 'OCORRENCIA',
        priority,
        title: `${o.title} — ${c.contractNumber}`,
        reason,
        contractId: c.id,
        contractNumber: c.contractNumber,
        originId: o.id,
        originType: 'occurrence',
        fiscalId: o.fiscalId ?? null,
        daysReference: -age,
      });
    }

    // ── ADITIVOS AGUARDANDO APROVAÇÃO (gestor) ─────────────────────────────
    if (isManager) {
      for (const a of cAlt) {
        if (a.status !== 'PENDING_APPROVAL') continue;
        const age = daysSince(a.createdAt, now);
        items.push({
          id: `aditivo:${a.id}`,
          category: 'ADITIVO',
          priority: age > 20 ? 'ALTA' : 'MEDIA',
          title: `Aditivo aguardando aprovação — ${c.contractNumber}`,
          reason: `Aditivo de ${ALTERATION_TYPE_LABEL[a.type] ?? a.type} aguardando aprovação há ${age} dia(s).`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: a.id,
          originType: 'alteration',
          daysReference: -age,
        });
      }
    }

    // ── FINANCEIRO (execução por medições aprovadas) ───────────────────────
    const approved = sumMoney(
      cMsr
        .filter((m) => m.status === 'APPROVED')
        .map((m) => m.measurementValue),
    );
    if (c.currentValue > 0) {
      const taxa = (approved / c.currentValue) * 100;
      const saldo = c.currentValue - approved;
      if (taxa >= 100) {
        items.push({
          id: `financeiro-exec:${c.id}`,
          category: 'FINANCEIRO',
          priority: 'CRITICA',
          title: `Execução por medições atingiu ${taxa.toFixed(1)}% — ${c.contractNumber}`,
          reason: `Medições aprovadas somam ${fmtCur(approved)} de ${fmtCur(c.currentValue)} contratados (${taxa.toFixed(1)}%). Recomenda-se verificar necessidade de aditivo ou readequação do objeto. Valor aprovado por medição não equivale a valor pago.`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: c.id,
          originType: 'contract',
          amount: approved,
        });
      } else if (taxa >= 90) {
        items.push({
          id: `financeiro-exec:${c.id}`,
          category: 'FINANCEIRO',
          priority: 'ALTA',
          title: `Execução por medições em ${taxa.toFixed(1)}% — ${c.contractNumber}`,
          reason: `Medições aprovadas somam ${fmtCur(approved)} de ${fmtCur(c.currentValue)} contratados (${taxa.toFixed(1)}%) — aproxima-se do limite contratual. Convém acompanhar de perto.`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: c.id,
          originType: 'contract',
          amount: approved,
        });
      } else if (d > 60 && saldo / c.currentValue < 0.1) {
        items.push({
          id: `financeiro-saldo:${c.id}`,
          category: 'FINANCEIRO',
          priority: 'MEDIA',
          title: `Saldo contratual baixo — ${c.contractNumber}`,
          reason: `Saldo não executado de ${fmtCur(saldo)} (${((saldo / c.currentValue) * 100).toFixed(1)}% do valor) com ${d} dia(s) ainda de vigência. Convém avaliar suficiência do saldo.`,
          contractId: c.id,
          contractNumber: c.contractNumber,
          originId: c.id,
          originType: 'contract',
          amount: saldo,
        });
      }
    }

    // ── REAJUSTE / REPACTUAÇÃO (informativo) ───────────────────────────────
    const months = monthsSince(c.startDate, now);
    const hasReajuste = cAlt.some(
      (a) => REAJUSTE_TYPES.includes(a.type) && a.status !== 'REJECTED',
    );
    if (c.status === 'ACTIVE' && months >= 12 && !hasReajuste) {
      items.push({
        id: `reajuste:${c.id}`,
        category: 'REAJUSTE',
        priority: 'INFORMATIVA',
        title: `Sem reajuste registrado — ${c.contractNumber}`,
        reason: `Contrato ativo há cerca de ${months} meses sem registro de reajuste ou repactuação. Convém avaliar se a data-base já autoriza a revisão.`,
        contractId: c.id,
        contractNumber: c.contractNumber,
        originId: c.id,
        originType: 'contract',
      });
    }
  }

  items.sort((a, b) => {
    const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (p !== 0) return p;
    const da = a.daysReference ?? 0;
    const db = b.daysReference ?? 0;
    return da - db;
  });

  const summary: FiscalizacaoSummary = {
    CRITICA: 0,
    ALTA: 0,
    MEDIA: 0,
    BAIXA: 0,
    INFORMATIVA: 0,
    total: items.length,
  };
  for (const it of items) summary[it.priority]++;

  return { items, summary };
}

// ── Diagnóstico consolidado por contrato ────────────────────────────────────

export type DimensionStatus = 'REGULAR' | 'ATENCAO' | 'CRITICO' | 'SEM_DADOS';

export interface DiagnosticDimension {
  key: string;
  label: string;
  status: DimensionStatus;
  note: string;
}

export interface ContractDiagnostic {
  contractId: string;
  contractNumber: string;
  dimensions: DiagnosticDimension[];
  /** 0..100; null quando não há dados suficientes. */
  overallScore: number | null;
  overallLabel: string;
  recommendations: string[];
  /** fração de dimensões avaliáveis (com dado) sobre o total. */
  dataCompleteness: number;
}

const NO_DATA_NOTE =
  'O SIGFIS ainda não possui cadastro estruturado desta dimensão. Cadastro manual pelo gestor/fiscal previsto para a próxima fase.';

export function deriveContractDiagnostic(
  contract: EngineContract,
  data: EngineData,
  opts?: EngineOptions,
): ContractDiagnostic {
  const now = opts?.now ?? Date.now();
  const cOcc = data.occurrences.filter((o) => o.contractId === contract.id);
  const cMsr = data.measurements.filter((m) => m.contractId === contract.id);
  const cAlt = data.alterations.filter((a) => a.contractId === contract.id);
  const cAsg = data.assignments.filter(
    (a) => a.contractId === contract.id && a.isActive,
  );
  const cPay = (data.payments ?? []).filter(
    (p) => p.contractId === contract.id,
  );

  const dimensions: DiagnosticDimension[] = [];

  // Prazo
  const d = daysUntil(contract.endDate, now);
  dimensions.push({
    key: 'prazo',
    label: 'Prazo',
    status: d < 0 || d <= 90 ? 'CRITICO' : d <= 180 ? 'ATENCAO' : 'REGULAR',
    note:
      d < 0
        ? `Contrato vencido há ${Math.abs(d)} dia(s) (${fmtDate(contract.endDate)}).`
        : `Encerra em ${d} dia(s) (${fmtDate(contract.endDate)}).`,
  });

  // Financeiro (execução por medições aprovadas)
  const approved = sumMoney(
    cMsr.filter((m) => m.status === 'APPROVED').map((m) => m.measurementValue),
  );
  if (contract.currentValue > 0) {
    const taxa = (approved / contract.currentValue) * 100;
    dimensions.push({
      key: 'financeiro',
      label: 'Financeiro',
      status: taxa >= 95 ? 'CRITICO' : taxa >= 80 ? 'ATENCAO' : 'REGULAR',
      note: `Execução por medições aprovadas em ${taxa.toFixed(1)}% (${fmtCur(approved)} de ${fmtCur(contract.currentValue)}). ${
        cPay.length > 0
          ? `Pagamentos registrados: ${fmtCur(sumMoney(cPay.map((p) => p.value)))}.`
          : 'Não há dado de pagamento registrado — execução ≠ pagamento.'
      }`,
    });
  } else {
    dimensions.push({
      key: 'financeiro',
      label: 'Financeiro',
      status: 'SEM_DADOS',
      note: 'Valor contratual atual não informado.',
    });
  }

  // Execução (medições)
  const pendingMsr = cMsr.filter(
    (m) => m.status === 'PENDING_FISCAL' || m.status === 'PENDING_GESTOR',
  );
  const oldestPending = pendingMsr.reduce(
    (max, m) => Math.max(max, daysSince(m.createdAt, now)),
    0,
  );
  const hasApproved = cMsr.some((m) => m.status === 'APPROVED');
  const contractAgeDays = daysSince(contract.startDate, now);
  if (cMsr.length === 0 && contractAgeDays < 90) {
    dimensions.push({
      key: 'execucao',
      label: 'Execução',
      status: 'SEM_DADOS',
      note: 'Ainda não há medições registradas para este contrato.',
    });
  } else {
    dimensions.push({
      key: 'execucao',
      label: 'Execução',
      status:
        oldestPending > 30 || (cMsr.length === 0 && contractAgeDays >= 90)
          ? 'CRITICO'
          : pendingMsr.length > 0
            ? 'ATENCAO'
            : 'REGULAR',
      note:
        cMsr.length === 0
          ? `Contrato ativo há ${Math.round(contractAgeDays / MONTH_DAYS)} meses sem nenhuma medição registrada.`
          : `${cMsr.length} medição(ões) registradas; ${pendingMsr.length} pendente(s)${
              pendingMsr.length > 0
                ? ` (mais antiga há ${oldestPending} dia(s))`
                : ''
            }. ${hasApproved ? 'Há medições aprovadas.' : 'Nenhuma medição aprovada até o momento.'}`,
    });
  }

  // Ocorrências
  const openOcc = cOcc.filter(OPEN_OCCURRENCE);
  const recentOcc = cOcc.filter((o) => daysSince(o.createdAt, now) <= 120);
  const critOpen = openOcc.some(
    (o) => o.severity === 'CRITICAL' || o.severity === 'HIGH',
  );
  dimensions.push({
    key: 'ocorrencias',
    label: 'Ocorrências',
    status:
      critOpen || recentOcc.length >= 3
        ? 'CRITICO'
        : openOcc.length > 0
          ? 'ATENCAO'
          : 'REGULAR',
    note:
      openOcc.length === 0
        ? cOcc.length === 0
          ? 'Nenhuma ocorrência registrada.'
          : 'Nenhuma ocorrência em aberto.'
        : `${openOcc.length} ocorrência(s) em aberto${
            critOpen ? ', incluindo grave/crítica' : ''
          }${
            recentOcc.length >= 3
              ? `; ${recentOcc.length} nos últimos 120 dias (possível reincidência)`
              : ''
          }.`,
  });

  // Ocorrências resolvidas informam, mas dimensões sem tabela ficam SEM_DADOS:
  dimensions.push({
    key: 'documentacao',
    label: 'Documentação',
    status: 'SEM_DADOS',
    note: NO_DATA_NOTE,
  });
  dimensions.push({
    key: 'obrigacoes',
    label: 'Obrigações',
    status: 'SEM_DADOS',
    note: NO_DATA_NOTE,
  });
  dimensions.push({
    key: 'garantias',
    label: 'Garantias',
    status: 'SEM_DADOS',
    note: NO_DATA_NOTE,
  });

  // Fiscalização (designação)
  const hasTitular = cAsg.some((a) => a.role === 'TITULAR');
  dimensions.push({
    key: 'fiscalizacao',
    label: 'Fiscalização',
    status: hasTitular
      ? 'REGULAR'
      : contract.status === 'ACTIVE'
        ? 'CRITICO'
        : 'ATENCAO',
    note: hasTitular
      ? `${cAsg.length} designação(ões) ativa(s), com fiscal titular.`
      : 'Sem designação de fiscal titular vigente.',
  });

  // Reajuste
  const months = monthsSince(contract.startDate, now);
  const hasReajuste = cAlt.some(
    (a) => REAJUSTE_TYPES.includes(a.type) && a.status !== 'REJECTED',
  );
  dimensions.push({
    key: 'reajuste',
    label: 'Reajuste',
    status:
      contract.status === 'ACTIVE' && months >= 12 && !hasReajuste
        ? 'ATENCAO'
        : 'REGULAR',
    note: hasReajuste
      ? 'Há registro de reajuste/repactuação para este contrato.'
      : months >= 12
        ? `Sem registro de reajuste após cerca de ${months} meses de vigência. Convém avaliar a data-base.`
        : 'Contrato com menos de 12 meses — reajuste normalmente não aplicável ainda.',
  });

  // Risco (agregado a partir da Central, escopo do próprio contrato)
  const central = deriveFiscalizacaoCentral(
    {
      ...data,
      contracts: [contract],
      viewerId: '__diag__',
      viewerRole: 'GESTOR',
    },
    { now },
  );
  const hasCrit = central.summary.CRITICA > 0;
  const hasAlta = central.summary.ALTA > 0;
  dimensions.push({
    key: 'risco',
    label: 'Risco',
    status: hasCrit ? 'CRITICO' : hasAlta ? 'ATENCAO' : 'REGULAR',
    note: hasCrit
      ? `${central.summary.CRITICA} pendência(s) crítica(s) e ${central.summary.ALTA} alta(s) identificadas.`
      : hasAlta
        ? `${central.summary.ALTA} pendência(s) de prioridade alta identificadas.`
        : 'Nenhuma pendência crítica ou alta identificada.',
  });

  // Score / completude
  const evaluable = dimensions.filter(
    (dim) =>
      dim.status !== 'SEM_DADOS' &&
      [
        'prazo',
        'financeiro',
        'execucao',
        'ocorrencias',
        'fiscalizacao',
      ].includes(dim.key),
  );
  const coreKeys = [
    'prazo',
    'financeiro',
    'execucao',
    'ocorrencias',
    'fiscalizacao',
  ];
  const dataCompleteness = evaluable.length / coreKeys.length;
  const financeiroOk =
    dimensions.find((dim) => dim.key === 'financeiro')?.status !== 'SEM_DADOS';
  const execucaoOk =
    dimensions.find((dim) => dim.key === 'execucao')?.status !== 'SEM_DADOS';

  let overallScore: number | null = null;
  let overallLabel = 'Dados insuficientes para avaliação completa.';
  if (dataCompleteness >= 0.6 && financeiroOk && execucaoOk) {
    const penalty: Record<DimensionStatus, number> = {
      REGULAR: 0,
      ATENCAO: 12,
      CRITICO: 28,
      SEM_DADOS: 0,
    };
    let score = 100;
    for (const dim of evaluable) score -= penalty[dim.status];
    overallScore = Math.max(0, Math.min(100, Math.round(score)));
    overallLabel =
      overallScore >= 85
        ? 'Situação regular'
        : overallScore >= 65
          ? 'Requer atenção'
          : overallScore >= 40
            ? 'Situação preocupante'
            : 'Situação crítica';
  }

  // Recomendações (linguagem de recomendação, nunca ordem)
  const recommendations: string[] = [];
  for (const dim of dimensions) {
    if (dim.status !== 'ATENCAO' && dim.status !== 'CRITICO') continue;
    switch (dim.key) {
      case 'prazo':
        recommendations.push(
          d < 0
            ? 'Recomenda-se regularizar a situação do contrato vencido que permanece ativo.'
            : 'Convém iniciar a análise preventiva da continuidade contratual (prorrogação ou nova contratação).',
        );
        break;
      case 'financeiro':
        recommendations.push(
          'Recomenda-se analisar a execução financeira, que se aproxima ou supera o valor contratado.',
        );
        break;
      case 'execucao':
        recommendations.push(
          pendingMsr.length > 0
            ? 'Recomenda-se verificar as medições pendentes de manifestação.'
            : 'Convém verificar por que não há medições registradas no período.',
        );
        break;
      case 'ocorrencias':
        recommendations.push(
          'Recomenda-se acompanhar as ocorrências ainda sem encerramento formal.',
        );
        break;
      case 'fiscalizacao':
        recommendations.push(
          'Recomenda-se providenciar a designação formal de fiscal titular.',
        );
        break;
      case 'reajuste':
        recommendations.push(
          'Convém avaliar a necessidade de reajuste ou repactuação conforme a data-base.',
        );
        break;
    }
  }

  return {
    contractId: contract.id,
    contractNumber: contract.contractNumber,
    dimensions,
    overallScore,
    overallLabel,
    recommendations,
    dataCompleteness,
  };
}
