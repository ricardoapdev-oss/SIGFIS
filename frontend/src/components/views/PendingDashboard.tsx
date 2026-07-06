'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Clock, FileText, CheckCircle, Bell, ChevronRight, ChevronDown, TrendingUp, Activity, Shield, MessageSquare, ChevronUp, X } from 'lucide-react';
import { api, User, ContractAlert } from '@/lib/api';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/labels';

interface PendingDashboardProps {
  user: User;
  onNavigate: (view: any, contractId?: string, processId?: string) => void;
}

type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type PendingItemType = 'MEASUREMENT' | 'ALTERATION' | 'OCCURRENCE' | 'CONTRACT_EXPIRY' | 'PHASE' | 'COMMUNICATION';

interface PendingItem {
  type: PendingItemType;
  priority: PriorityLevel;
  title: string;
  detail?: string;
  daysPending?: number;
  daysOpen?: number;
  daysLate?: number;
  daysUntil?: number;
  id: string;
  contractId?: string;
  processId?: string;
}

const priorityColor: Record<PriorityLevel, string> = {
  CRITICAL: 'bg-red-500/10 border-red-500/30 text-red-400',
  HIGH: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  MEDIUM: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  LOW: 'bg-gray-100 border-gray-300 text-gray-500',
};

const priorityLabel: Record<PriorityLevel, string> = {
  CRITICAL: 'Crítico', HIGH: 'Alto', MEDIUM: 'Médio', LOW: 'Baixo',
};

const priorityDot: Record<PriorityLevel, string> = {
  CRITICAL: 'bg-red-500', HIGH: 'bg-amber-500', MEDIUM: 'bg-blue-500', LOW: 'bg-zinc-500',
};

const itemIcon: Record<PendingItemType, React.ReactNode> = {
  MEASUREMENT: <CheckCircle className="h-4 w-4" />,
  ALTERATION: <FileText className="h-4 w-4" />,
  OCCURRENCE: <AlertTriangle className="h-4 w-4" />,
  CONTRACT_EXPIRY: <Clock className="h-4 w-4" />,
  PHASE: <Activity className="h-4 w-4" />,
  COMMUNICATION: <Bell className="h-4 w-4" />,
};

const itemLabel: Record<PendingItemType, string> = {
  MEASUREMENT: 'Medição', ALTERATION: 'Aditivo', OCCURRENCE: 'Ocorrência',
  CONTRACT_EXPIRY: 'Vencimento', PHASE: 'Fase', COMMUNICATION: 'Comunicado',
};

// ── Painel de Mensagens Enviadas (exclusivo Gestor) ─────────────────────────
function GestorMessagesPanel({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'replied' | 'archived'>('pending');

  const { data: sentAlerts = [], isLoading } = useQuery<any[]>({
    queryKey: ['alerts-sent-by-gestor', user.id],
    queryFn: () => api.alerts.sentByGestor(),
    enabled: user.role === 'GESTOR',
    staleTime: 300_000,
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) => api.alerts.confirmReceipt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts-sent-by-gestor'] });
      queryClient.invalidateQueries({ queryKey: ['alerts-pending'] });
      queryClient.invalidateQueries({ queryKey: ['alerts-all'] });
    },
  });

  const closeMutation = useMutation({
    mutationFn: (id: string) => api.alerts.closeNotSent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts-sent-by-gestor'] });
      queryClient.invalidateQueries({ queryKey: ['alerts-pending'] });
      queryClient.invalidateQueries({ queryKey: ['alerts-all'] });
    },
  });

  const pendingAlerts = sentAlerts.filter((a: any) => a.status === 'PENDING');
  const repliedAlerts = sentAlerts.filter((a: any) => a.status === 'RESPONDED' || a.status === 'DISMISSED');
  const archivedAlerts = sentAlerts.filter((a: any) => a.status === 'CONFIRMED' || a.status === 'CLOSED_NOT_SENT');

  const currentList = activeTab === 'pending' ? pendingAlerts : activeTab === 'replied' ? repliedAlerts : archivedAlerts;

  const typeLabel: Record<string, string> = {
    DATA_CHANGE_REQUEST: 'Solicitação de Alteração', REPORT_REQUEST: 'Solicitação de Relatório',
    DEADLINE_NOTICE: 'Notificação de Prazo', COMPLIANCE_NOTICE: 'Inconformidade',
    GENERAL_NOTICE: 'Comunicado Geral', COMMUNICATION_MANDATORY: 'Comunicado Obrigatório',
  };

  if (isLoading) return null;

  return (
    <div className="bg-gray-100/20 border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-100/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="text-xs font-bold text-gray-900">Mensagens Enviadas ao Fiscal</h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Alertas e comunicados enviados — monitoramento de resposta</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {pendingAlerts.length > 0 && (
              <span className="text-[9px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                {pendingAlerts.length} sem resposta
              </span>
            )}
            {repliedAlerts.length > 0 && (
              <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                {repliedAlerts.length} respondido{repliedAlerts.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-200">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-4">
            <TabBtn active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} count={pendingAlerts.length} color="amber">
              Não Respondidas
            </TabBtn>
            <TabBtn active={activeTab === 'replied'} onClick={() => setActiveTab('replied')} count={repliedAlerts.length} color="emerald">
              Respondidas
            </TabBtn>
            <TabBtn active={activeTab === 'archived'} onClick={() => setActiveTab('archived')} count={archivedAlerts.length} color="zinc">
              Arquivadas
            </TabBtn>
          </div>

          {/* Lista */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {currentList.length === 0 ? (
              <div className="bg-gray-100/10 border border-gray-200 rounded-xl p-6 text-center">
                <MessageSquare className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-[11px] text-gray-500">Nenhuma mensagem nesta categoria</p>
              </div>
            ) : currentList.map((alert: any) => (
              <div key={alert.id} className={`border rounded-xl p-3 space-y-2 transition-all ${
                alert.status === 'PENDING' ? 'bg-amber-500/5 border-amber-500/20' :
                alert.status === 'RESPONDED' || alert.status === 'DISMISSED' ? 'bg-emerald-500/5 border-emerald-500/20' :
                'bg-gray-100/20 border-gray-300'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        alert.status === 'PENDING' ? 'text-amber-400' :
                        alert.status === 'RESPONDED' || alert.status === 'DISMISSED' ? 'text-emerald-400' :
                        alert.status === 'CONFIRMED' ? 'text-blue-400' : 'text-gray-500'
                      }`}>
                        {alert.status === 'PENDING' ? '● Aguardando Resposta' :
                         alert.status === 'RESPONDED' || alert.status === 'DISMISSED' ? '✓ Respondida' :
                         alert.status === 'CONFIRMED' ? '✓ Confirmada' : '× Encerrada — Não Enviada'}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        {typeLabel[alert.metadata?.alertType || alert.type] || alert.type}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-gray-700 mt-0.5">{alert.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                      {alert.targetUser && <span>Para: <strong className="text-gray-500">{alert.targetUser.name}</strong></span>}
                      {alert.contract && <span>Contrato: <strong className="text-gray-500">{alert.contract.contractNumber}</strong></span>}
                      <span>{formatDateTime(alert.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Ações para alertas PENDING */}
                {alert.status === 'PENDING' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => confirmMutation.mutate(alert.id)}
                      disabled={confirmMutation.isPending}
                      title="Confirmar que a mensagem foi recebida e o assunto tratado"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Confirmar Resposta
                    </button>
                    <button
                      onClick={() => closeMutation.mutate(alert.id)}
                      disabled={closeMutation.isPending}
                      title="Encerrar este alerta indicando que não foi efetivamente enviado"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-500 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <X className="h-3 w-3" />
                      Encerrar — Não Enviado
                    </button>
                  </div>
                )}

                {/* Ações para alertas RESPONDED/DISMISSED */}
                {(alert.status === 'RESPONDED' || alert.status === 'DISMISSED') && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => confirmMutation.mutate(alert.id)}
                      disabled={confirmMutation.isPending}
                      className="flex items-center gap-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Arquivar como Concluída
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, count, color, children }: { active: boolean; onClick: () => void; count: number; color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    amber: 'border-amber-500 text-amber-400',
    emerald: 'border-emerald-500 text-emerald-400',
    zinc: 'border-zinc-500 text-gray-500',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-semibold border-b-2 transition-all cursor-pointer ${
        active ? colors[color] : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
      {count > 0 && (
        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${
          color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
          color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
          'bg-gray-100 text-gray-500'
        }`}>{count}</span>
      )}
    </button>
  );
}

// ── Dashboard Principal ────────────────────────────────────────────────────────
export function PendingDashboard({ user, onNavigate }: PendingDashboardProps) {
  const queryClient = useQueryClient();

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['pending-dashboard', user.id],
    queryFn: () => api.pendingDashboard.get(),
    enabled: !!user,
    staleTime: 300_000,
  });

  const { data: pendingAlerts = [] } = useQuery<ContractAlert[]>({
    queryKey: ['alerts-pending', user.id],
    queryFn: () => api.alerts.list(),
    enabled: !!user,
    staleTime: 300_000,
  });

  const items: PendingItem[] = dashboard?.items ?? [];
  const critical = items.filter(i => i.priority === 'CRITICAL');
  const high = items.filter(i => i.priority === 'HIGH');
  const medium = items.filter(i => i.priority === 'MEDIUM' || i.priority === 'LOW');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Central de Pendências</h2>
        <p className="text-xs text-gray-500 mt-0.5">Visão consolidada de todos os itens que requerem ação imediata</p>
      </div>

      {/* Resumo numérico */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Alertas Ativos" value={pendingAlerts.length} color="text-amber-400" icon={<Bell className="h-4 w-4" />} accent="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Prioridade Crítica" value={critical.length} color="text-red-400" icon={<AlertTriangle className="h-4 w-4" />} accent="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Prioridade Alta" value={high.length} color="text-amber-400" icon={<Shield className="h-4 w-4" />} accent="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Demais Pendências" value={medium.length} color="text-blue-400" icon={<TrendingUp className="h-4 w-4" />} accent="bg-blue-500/10 border-blue-500/20" />
      </div>

      {/* Painel de mensagens enviadas — exclusivo para Gestor */}
      {user.role === 'GESTOR' && <GestorMessagesPanel user={user} />}

      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Alertas obrigatórios */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse" />
              Para Ação Imediata
            </h3>
            {pendingAlerts.length > 0 ? (
              <div className="space-y-3">
                {pendingAlerts.slice(0, 5).map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
                {pendingAlerts.length > 5 && (
                  <p className="text-[10px] text-gray-500 text-center py-2">+{pendingAlerts.length - 5} alertas adicionais pendentes</p>
                )}
              </div>
            ) : (
              <EmptyState icon={<Bell className="h-8 w-8" />} text="Nenhum alerta pendente" sub="Todos os itens foram tratados" />
            )}
          </div>

          {/* Coluna 2: Pendências críticas/altas */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
              Pendências Críticas e Altas
            </h3>
            {[...critical, ...high].length > 0 ? (
              <div className="space-y-3">
                {[...critical, ...high].map(item => (
                  <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              <EmptyState icon={<CheckCircle className="h-8 w-8" />} text="Nenhuma pendência crítica" sub="Situação sob controle" />
            )}
          </div>

          {/* Coluna 3: Demais pendências + indicadores */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
              Acompanhamento Geral
            </h3>
            {medium.length > 0 ? (
              <div className="space-y-3">
                {medium.map(item => (
                  <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} compact />
                ))}
              </div>
            ) : (
              <EmptyState icon={<TrendingUp className="h-8 w-8" />} text="Sem pendências gerais" sub="Todos os prazos em dia" />
            )}

            {/* Legenda Lei 13.303 */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl mt-4">
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Lei 13.303/2016 — Limites Legais</p>
              <div className="space-y-1 text-[10px] text-gray-500">
                <div className="flex justify-between"><span>Termos aditivos (compras/serviços)</span><strong className="text-gray-700">25%</strong></div>
                <div className="flex justify-between"><span>Termos aditivos (obras/reformas)</span><strong className="text-gray-700">50%</strong></div>
                <div className="flex justify-between"><span>Alerta de vencimento</span><strong className="text-gray-700">180 dias</strong></div>
                <div className="flex justify-between"><span>Prorrogação urgente</span><strong className="text-gray-700">90 dias</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sem nada pendente */}
      {!isLoading && items.length === 0 && pendingAlerts.length === 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Tudo em dia</h3>
          <p className="text-xs text-gray-500">Nenhuma pendência crítica identificada no momento.</p>
        </div>
      )}
    </div>
  );
}

// ── Cards auxiliares ───────────────────────────────────────────────────────────

function SummaryCard({ label, value, color, icon, accent }: { label: string; value: number; color: string; icon: React.ReactNode; accent: string }) {
  return (
    <div className="bg-gray-100/30 border border-gray-200 p-4 rounded-xl flex items-center gap-3">
      <div className={`p-2 rounded-lg border ${accent} ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-2xl font-bold leading-tight ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: ContractAlert }) {
  const typeLabel: Partial<Record<string, string>> = {
    CONTRACT_EXPIRING_180: 'Vencimento 180d', RENEWAL_REQUESTED: 'Prorrogação', CONTRACT_EXPIRING_90: 'Vencimento 90d',
    MEASUREMENT_OVERDUE: 'Medição', ALTERATION_OVERDUE: 'Aditivo', OCCURRENCE_CRITICAL_OPEN: 'Ocorrência',
    PROCESS_PHASE_OVERDUE: 'Fase atrasada', COMMUNICATION_MANDATORY: 'Comunicado', NEW_PROCESS_AUTO_CREATED: 'Novo Processo',
    RENEWAL_APPROVED: 'Prorrogação OK', RENEWAL_REJECTED: 'Prorrogação Negada',
  };
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl">
      <div className="flex items-start gap-2.5">
        <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5 animate-pulse" />
        <div className="min-w-0">
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">{typeLabel[alert.type] || alert.type}</span>
          <p className="text-[11px] text-gray-700 leading-snug mt-0.5">{alert.title}</p>
        </div>
      </div>
    </div>
  );
}

function PendingItemCard({ item, onNavigate, compact }: { item: PendingItem; onNavigate: (view: any, cId?: string, pId?: string) => void; compact?: boolean }) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const approveMutation = useMutation({
    mutationFn: () => api.alterations.approve(item.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-dashboard'] }),
    onError: (err: any) => alert(`Erro ao aprovar: ${err.message}`),
  });

  const rejectMutation = useMutation({
    mutationFn: () => api.alterations.reject(item.id, rejectReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-dashboard'] });
      setShowRejectForm(false);
      setRejectReason('');
      setExpanded(false);
    },
    onError: (err: any) => alert(`Erro ao reprovar: ${err.message}`),
  });

  const handleClick = () => {
    if (item.type === 'ALTERATION') {
      setExpanded(e => !e);
    } else if (item.contractId) {
      onNavigate('details', item.contractId);
    } else if (item.processId) {
      onNavigate('processes');
    } else if (item.type === 'MEASUREMENT' || item.type === 'OCCURRENCE') {
      onNavigate('contracts');
    } else {
      onNavigate('processes');
    }
  };

  const urgencyText = () => {
    if (item.daysLate) return `${item.daysLate}d em atraso`;
    if (item.daysPending) return `${item.daysPending}d pendente`;
    if (item.daysOpen) return `${item.daysOpen}d em aberto`;
    if (item.daysUntil !== undefined) return `${item.daysUntil}d restantes`;
    return null;
  };

  return (
    <div className={`bg-gray-100/20 border rounded-xl overflow-hidden transition-colors ${expanded ? 'border-blue-500/30' : 'border-gray-200 hover:border-gray-300'}`}>
      <button onClick={handleClick}
        className={`w-full text-left p-3 hover:bg-gray-100/30 transition-colors group cursor-pointer ${compact ? 'py-2.5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-lg border text-[11px] shrink-0 ${priorityColor[item.priority]}`}>
            {itemIcon[item.type]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[9px] font-bold uppercase tracking-wider ${priorityColor[item.priority].split(' ').pop()}`}>
                {itemLabel[item.type]}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${priorityDot[item.priority]}`} />
              <span className="text-[9px] text-gray-500">{priorityLabel[item.priority]}</span>
            </div>
            <p className={`text-gray-700 font-medium leading-snug truncate ${compact ? 'text-[10px]' : 'text-[11px]'}`}>{item.title}</p>
            {item.detail && <p className="text-[10px] text-gray-500 mt-0.5">{item.detail}</p>}
          </div>
          <div className="shrink-0 text-right">
            {urgencyText() && (
              <span className={`text-[9px] font-bold block ${item.priority === 'CRITICAL' ? 'text-red-400' : item.priority === 'HIGH' ? 'text-amber-400' : 'text-blue-400'}`}>
                {urgencyText()}
              </span>
            )}
            {item.type === 'ALTERATION' ? (
              <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform mt-1 ml-auto ${expanded ? 'rotate-180' : ''}`} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-500 transition-colors mt-1 ml-auto" />
            )}
          </div>
        </div>
      </button>

      {expanded && item.type === 'ALTERATION' && (
        <div className="border-t border-gray-200 p-3 space-y-2">
          {!showRejectForm ? (
            <div className="flex gap-2">
              <button onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}
                className="flex-1 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                {approveMutation.isPending ? 'Aprovando...' : 'Aprovar'}
              </button>
              <button onClick={() => setShowRejectForm(true)}
                className="flex-1 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer">
                Reprovar
              </button>
              <button onClick={() => onNavigate('details', item.contractId)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer">
                Ver Contrato
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                placeholder="Motivo da reprovação..." rows={2}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none" />
              <div className="flex gap-2">
                <button onClick={() => { setShowRejectForm(false); setRejectReason(''); }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer">
                  Cancelar
                </button>
                <button onClick={() => rejectMutation.mutate()} disabled={!rejectReason.trim() || rejectMutation.isPending}
                  className="flex-1 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                  {rejectMutation.isPending ? 'Reprovando...' : 'Confirmar Reprovação'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, text, sub }: { icon: React.ReactNode; text: string; sub: string }) {
  return (
    <div className="bg-gray-100/10 border border-gray-200 rounded-xl p-6 text-center">
      <div className="text-gray-400 flex justify-center mb-2">{icon}</div>
      <p className="text-xs font-semibold text-gray-500">{text}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}
