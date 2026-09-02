export const contractStatusLabel: Record<string, string> = {
  DRAFT: 'Minuta',
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  CONCLUDED: 'Encerrado',
  RESCINDED: 'Rescindido',
};

export const contractStatusColor: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-300',
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  SUSPENDED: 'bg-amber-50 text-amber-700 border-amber-200',
  CONCLUDED: 'bg-blue-50 text-blue-700 border-blue-200',
  RESCINDED: 'bg-red-50 text-red-700 border-red-200',
};

export const processStatusLabel: Record<string, string> = {
  PLANNING: 'Planejamento',
  LEGAL_REVIEW: 'Análise Jurídica',
  BIDDING: 'Licitação',
  CONTRACT_PREP: 'Elaboração Contratual',
  CONCLUDED: 'Concluído',
  CANCELED: 'Cancelado',
};

export const processStatusColor: Record<string, string> = {
  PLANNING: 'bg-slate-100 text-slate-700 border-slate-300',
  LEGAL_REVIEW: 'bg-purple-50 text-purple-700 border-purple-200',
  BIDDING: 'bg-blue-50 text-blue-700 border-blue-200',
  CONTRACT_PREP: 'bg-amber-50 text-amber-700 border-amber-200',
  CONCLUDED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELED: 'bg-red-50 text-red-700 border-red-200',
};

export const modalityLabel: Record<string, string> = {
  // ── Modalidades vigentes (Lei 14.133/2021 e Regulamento de Licitações) ──
  INAPLICABILIDADE_ART28: 'Inaplicabilidade de Licitação - Oportunidade de Negócio / Atividade-Fim (Art. 28, § 3º)',
  DISPENSA_ART29_VALOR: 'Dispensa de Licitação - Em Razão do Valor (Art. 29, I e II)',
  DISPENSA_ART29_MATERIA: 'Dispensa de Licitação - Em Razão da Matéria (Art. 29, III a XVI)',
  INEXIGIBILIDADE_ART30: 'Inexigibilidade de Licitação (Art. 30)',
  LICITACAO_INTEGRADA_ART32_I: 'Licitação - Regime de Contratação Integrada (Art. 32, I)',
  LICITACAO_SEMI_INTEGRADA_ART32_II: 'Licitação - Regime de Contratação Semi-Integrada (Art. 32, II)',
  LICITACAO_LEILAO_ART32_III: 'Licitação - Leilão (Art. 32, III)',
  LICITACAO_PREGAO_ART32_IV: 'Licitação - Pregão (Art. 32, IV)',
  LICITACAO_PREGAO_SRP_ART32_IV: 'Licitação - Pregão Eletrônico / Sistema de Registro de Preços (Art. 32, IV, c/c Arts. 36 a 39)',
  // ── Legado (Lei 13.303/2016) — só para exibir registros antigos ──
  LICITACAO_13303: 'Licitação 13.303/2016 (legado)',
  DISPENSA_13303: 'Dispensa 13.303/2016 (legado)',
  INEXIGIBILIDADE: 'Inexigibilidade (13.303/2016 — legado)',
  PREGAO_ELETRONICO: 'Pregão Eletrônico (13.303/2016 — legado)',
  OUTROS: 'Outros',
};

// Modalidades oferecidas nas telas de cadastro/edição (as vigentes). Os
// valores legado continuam em `modalityLabel` apenas para exibição.
export const MODALITY_OPTIONS: string[] = [
  'INAPLICABILIDADE_ART28',
  'DISPENSA_ART29_VALOR',
  'DISPENSA_ART29_MATERIA',
  'INEXIGIBILIDADE_ART30',
  'LICITACAO_INTEGRADA_ART32_I',
  'LICITACAO_SEMI_INTEGRADA_ART32_II',
  'LICITACAO_LEILAO_ART32_III',
  'LICITACAO_PREGAO_ART32_IV',
  'LICITACAO_PREGAO_SRP_ART32_IV',
];

export const measurementStatusLabel: Record<string, string> = {
  PENDING_FISCAL: 'Pendente Fiscal',
  PENDING_GESTOR: 'Aguard. Homologação',
  APPROVED: 'Aprovado',
  REJECTED: 'Devolvido',
};

export const measurementStatusColor: Record<string, string> = {
  PENDING_FISCAL: 'bg-slate-100 text-slate-700 border-slate-300',
  PENDING_GESTOR: 'bg-amber-50 text-amber-700 border-amber-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-200',
};

export const occurrenceSeverityLabel: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  CRITICAL: 'Crítica',
};

export const occurrenceSeverityColor: Record<string, string> = {
  LOW: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  HIGH: 'bg-orange-50 text-orange-700 border-orange-200',
  CRITICAL: 'bg-red-50 text-red-700 border-red-200',
};

export const occurrenceStatusLabel: Record<string, string> = {
  OPEN: 'Em Aberto',
  UNDER_REVIEW: 'Em Análise',
  RESOLVED: 'Resolvida',
  REJECTED: 'Rejeitada',
};

export const occurrenceStatusColor: Record<string, string> = {
  OPEN: 'bg-red-50 text-red-700 border-red-200',
  UNDER_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  RESOLVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-slate-100 text-slate-700 border-slate-300',
};

export const alterationTypeLabel: Record<string, string> = {
  ADDENDUM_VALUE_INCREASE: 'Acréscimo de Valor',
  ADDENDUM_VALUE_DECREASE: 'Supressão de Valor',
  ADDENDUM_TIME_EXTENSION: 'Prorrogação de Prazo',
  PRICE_REAJUSTE: 'Reajuste de Preço',
  PRICE_REPACTUACAO: 'Repactuação',
  PRICE_REEQUILIBRIO: 'Reequilíbrio Econômico',
};

export const alterationStatusLabel: Record<string, string> = {
  DRAFT: 'Rascunho',
  PENDING_APPROVAL: 'Aguard. Aprovação',
  APPROVED: 'Aprovado',
  REJECTED: 'Recusado',
};

export const alterationStatusColor: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-300',
  PENDING_APPROVAL: 'bg-amber-50 text-amber-700 border-amber-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-200',
};

export const fiscalRoleLabel: Record<string, string> = {
  TITULAR: 'Titular',
  SUBSTITUTO: 'Substituto',
  SUPLENTE: 'Suplente',
};

export const userRoleLabel: Record<string, string> = {
  ADMIN: 'Auditor/Admin',
  GESTOR: 'Gestor de Contratos',
  FISCAL: 'Fiscal de Contrato',
  ALTA_GESTAO: 'Alta Gestão',
};

export function formatCurrency(value: number | string): string {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDate(dateStr: string | Date): string {
  if (!dateStr) return '—';
  // Colunas de calendário (Postgres `date`) chegam como 'YYYY-MM-DD' ou
  // 'YYYY-MM-DDT00:00:00.000Z'. Renderizar isso com o fuso local (Brasil,
  // UTC-3) recua um dia, porque a meia-noite UTC vira 21h do dia anterior.
  // Para essas datas, formatamos a partir dos componentes Y-M-D literais,
  // sem qualquer conversão de fuso — assim a data exibida é exatamente a
  // data cadastrada. Timestamps com hora do dia (ex.: createdAt) seguem o
  // caminho normal e respeitam o fuso.
  if (typeof dateStr === 'string') {
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:T00:00(?::00)?(?:\.0+)?Z?)?$/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('pt-BR');
}

export function formatDateTime(dateStr: string | Date): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('pt-BR');
}
