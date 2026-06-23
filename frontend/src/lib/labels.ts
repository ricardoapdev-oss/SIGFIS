export const contractStatusLabel: Record<string, string> = {
  DRAFT: 'Minuta',
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  CONCLUDED: 'Encerrado',
  RESCINDED: 'Rescindido',
};

export const contractStatusColor: Record<string, string> = {
  DRAFT: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  SUSPENDED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  CONCLUDED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  RESCINDED: 'bg-red-500/10 text-red-400 border-red-500/20',
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
  PLANNING: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  LEGAL_REVIEW: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  BIDDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONTRACT_PREP: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  CONCLUDED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  CANCELED: 'bg-red-500/10 text-red-400 border-red-500/20',
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
  PENDING_FISCAL: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  PENDING_GESTOR: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const occurrenceSeverityLabel: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  CRITICAL: 'Crítica',
};

export const occurrenceSeverityColor: Record<string, string> = {
  LOW: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  CRITICAL: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const occurrenceStatusLabel: Record<string, string> = {
  OPEN: 'Em Aberto',
  UNDER_REVIEW: 'Em Análise',
  RESOLVED: 'Resolvida',
  REJECTED: 'Rejeitada',
};

export const occurrenceStatusColor: Record<string, string> = {
  OPEN: 'bg-red-500/10 text-red-400 border-red-500/20',
  UNDER_REVIEW: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  REJECTED: 'bg-zinc-800 text-zinc-400 border-zinc-700',
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
  DRAFT: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  PENDING_APPROVAL: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const fiscalRoleLabel: Record<string, string> = {
  TITULAR: 'Titular',
  SUBSTITUTO: 'Substituto',
  TECNICO: 'Técnico',
  ADMINISTRATIVO: 'Administrativo',
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
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export function formatDateTime(dateStr: string | Date): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('pt-BR');
}
