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
  LICITACAO_13303: 'Licitação 13.303/2016',
  DISPENSA_13303: 'Dispensa 13.303/2016',
  INEXIGIBILIDADE: 'Inexigibilidade',
  PREGAO_ELETRONICO: 'Pregão Eletrônico',
  OUTROS: 'Outros',
};

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
  // Datas "puras" (YYYY-MM-DD) são interpretadas pelo JS como meia-noite UTC;
  // em fusos negativos (Brasil, UTC-3) isso recuava o dia exibido. Fixa ao
  // meio-dia local para exibir sempre a data cadastrada.
  if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString('pt-BR');
  }
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export function formatDateTime(dateStr: string | Date): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('pt-BR');
}
