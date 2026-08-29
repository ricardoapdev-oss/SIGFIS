'use client';

import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle, Clock, FileText, CheckCircle, Bell, ChevronRight, ChevronDown,
  TrendingUp, Activity, Shield, MessageSquare, ChevronUp, X, DollarSign,
  CalendarClock, UserCog, RefreshCcw, Filter, Info,
} from 'lucide-react';
import { api, User, ContractAlert } from '@/lib/api';
import type {
  FiscalPendingItem, FiscalPriority, FiscalCategory, FiscalizacaoSummary,
} from '@/lib/fiscalizacao-engine';
import { PRIORITY_LABEL, CATEGORY_LABEL } from '@/lib/fiscalizacao-engine';
import { formatDateTime } from '@/lib/labels';

interface PendingDashboardProps {
  user: User;
  onNavigate: (view: any, contractId?: string, processId?: string) => void;
}

// ── Estilos por prioridade (identidade visual SIGFIS preservada) ────────────
const priorityAccent: Record<FiscalPriority, string> = {
  CRITICA: 'bg-red-500/10 border-red-500/30 text-red-500',
  ALTA: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
  MEDIA: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
  BAIXA: 'bg-slate-100 border-slate-300 text-slate-500',
  INFORMATIVA: 'bg-slate-50 border-slate-200 text-slate-400',
};
const priorityDot: Record<FiscalPriority, string> = {
  CRITICA: 'bg-red-500', ALTA: 'bg-amber-500', MEDIA: 'bg-blue-500',
  BAIXA: 'bg-slate-400', INFORMATIVA: 'bg-slate-300',
};
const priorityText: Record<FiscalPriority, string> = {
  CRITICA: 'text-red-500', ALTA: 'text-amber-600', MEDIA: 'text-blue-500',
  BAIXA: 'text-slate-500', INFORMATIVA: 'text-slate-400',
};

const categoryIcon: Record<FiscalCategory, React.ReactNode> = {
  PRAZO: <CalendarClock className="h-4 w-4" />,
  FINANCEIRO: <DollarSign className="h-4 w-4" />,
  MEDICAO: <CheckCircle className="h-4 w-4" />,
  OCORRENCIA: <AlertTriangle className="h-4 w-4" />,
  ADITIVO: <FileText className="h-4 w-4" />,
  FISCAL_DESIGNACAO: <UserCog className="h-4 w-4" />,
  REAJUSTE: <TrendingUp className="h-4 w-4" />,
  PROCESSO: <Activity className="h-4 w-4" />,
};

// ── Painel de Mensagens Enviadas (exclusivo Gestor) — inalterado ────────────
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

// ── Central de Fiscalização ────────────────────────────────────────────────────
export function PendingDashboard({ user, onNavigate }: PendingDashboardProps) {
  const [onlyMine, setOnlyMine] = useState(false);
  const [fPriority, setFPriority] = useState<FiscalPriority | 'ALL'>('ALL');
  const [fCategory, setFCategory] = useState<FiscalCategory | 'ALL'>('ALL');
  const [contractQuery, setContractQuery] = useState('');

  const { data: dashboard, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['pending-dashboard', user.id],
    queryFn: () => api.pendingDashboard.get() as Promise<{ alerts: ContractAlert[]; items: FiscalPendingItem[]; summary: FiscalizacaoSummary }>,
    enabled: !!user,
    staleTime: 300_000,
  });

  const { data: pendingAlerts = [] } = useQuery<ContractAlert[]>({
    queryKey: ['alerts-pending', user.id],
    queryFn: () => api.alerts.list(),
    enabled: !!user,
    staleTime: 300_000,
  });

  const allItems: FiscalPendingItem[] = useMemo(() => dashboard?.items ?? [], [dashboard]);

  const items = useMemo(() => {
    let list = allItems;
    if (onlyMine) list = list.filter(i => !i.fiscalId || i.fiscalId === user.id);
    if (fPriority !== 'ALL') list = list.filter(i => i.priority === fPriority);
    if (fCategory !== 'ALL') list = list.filter(i => i.category === fCategory);
    if (contractQuery.trim()) {
      const q = contractQuery.trim().toLowerCase();
      list = list.filter(i => (i.contractNumber ?? '').toLowerCase().includes(q));
    }
    return list;
  }, [allItems, onlyMine, fPriority, fCategory, contractQuery, user.id]);

  const summary = dashboard?.summary;
  const critical = items.filter(i => i.priority === 'CRITICA');
  const alta = items.filter(i => i.priority === 'ALTA');
  const media = items.filter(i => i.priority === 'MEDIA' || i.priority === 'BAIXA');
  const informativa = items.filter(i => i.priority === 'INFORMATIVA');

  const filtersActive = onlyMine || fPriority !== 'ALL' || fCategory !== 'ALL' || contractQuery.trim() !== '';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Central de Fiscalização</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle da execução contratual — o que precisa de ação, o que está em risco e o que providenciar preventivamente. Cada pendência traz o motivo da prioridade.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 bg-gray-100/40 px-3 py-1.5 text-[10px] font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-60"
        >
          <RefreshCcw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} /> Atualizar
        </button>
      </div>

      {/* Resumo numérico */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <SummaryCard label="Alertas Ativos" value={pendingAlerts.length} tone="amber" icon={<Bell className="h-4 w-4" />} onClick={() => { setFPriority('ALL'); setFCategory('ALL'); }} />
        <SummaryCard label="Prioridade Crítica" value={summary?.CRITICA ?? critical.length} tone="red" icon={<AlertTriangle className="h-4 w-4" />} active={fPriority === 'CRITICA'} onClick={() => setFPriority(p => p === 'CRITICA' ? 'ALL' : 'CRITICA')} />
        <SummaryCard label="Prioridade Alta" value={summary?.ALTA ?? alta.length} tone="amber" icon={<Shield className="h-4 w-4" />} active={fPriority === 'ALTA'} onClick={() => setFPriority(p => p === 'ALTA' ? 'ALL' : 'ALTA')} />
        <SummaryCard label="Prioridade Média" value={summary?.MEDIA ?? 0} tone="blue" icon={<TrendingUp className="h-4 w-4" />} active={fPriority === 'MEDIA'} onClick={() => setFPriority(p => p === 'MEDIA' ? 'ALL' : 'MEDIA')} />
        <SummaryCard label="Prioridade Baixa" value={summary?.BAIXA ?? 0} tone="slate" icon={<Clock className="h-4 w-4" />} active={fPriority === 'BAIXA'} onClick={() => setFPriority(p => p === 'BAIXA' ? 'ALL' : 'BAIXA')} />
        <SummaryCard label="Informativas" value={summary?.INFORMATIVA ?? informativa.length} tone="slate" icon={<Info className="h-4 w-4" />} active={fPriority === 'INFORMATIVA'} onClick={() => setFPriority(p => p === 'INFORMATIVA' ? 'ALL' : 'INFORMATIVA')} />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-100/20 p-3">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500"><Filter className="h-3 w-3" /> Filtros</span>
        <select value={fCategory} onChange={e => setFCategory(e.target.value as FiscalCategory | 'ALL')}
          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-[11px] text-gray-700 cursor-pointer">
          <option value="ALL">Todos os tipos</option>
          {(Object.keys(CATEGORY_LABEL) as FiscalCategory[]).map(c => (
            <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
          ))}
        </select>
        <select value={fPriority} onChange={e => setFPriority(e.target.value as FiscalPriority | 'ALL')}
          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-[11px] text-gray-700 cursor-pointer">
          <option value="ALL">Todas as prioridades</option>
          {(['CRITICA', 'ALTA', 'MEDIA', 'BAIXA', 'INFORMATIVA'] as FiscalPriority[]).map(p => (
            <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
          ))}
        </select>
        <input value={contractQuery} onChange={e => setContractQuery(e.target.value)}
          placeholder="Contrato nº…"
          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-[11px] text-gray-700 placeholder-gray-400 w-32" />
        <label className="flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer select-none">
          <input type="checkbox" checked={onlyMine} onChange={e => setOnlyMine(e.target.checked)} className="cursor-pointer" />
          Somente minhas pendências
        </label>
        {filtersActive && (
          <button onClick={() => { setOnlyMine(false); setFPriority('ALL'); setFCategory('ALL'); setContractQuery(''); }}
            className="text-[10px] font-semibold text-blue-500 hover:text-blue-700 cursor-pointer">Limpar</button>
        )}
        <span className="ml-auto text-[10px] text-gray-400">{items.length} de {allItems.length} pendência(s)</span>
      </div>

      {user.role === 'GESTOR' && <GestorMessagesPanel user={user} />}

      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Ação imediata (alertas + críticas) */}
          <div className="space-y-4">
            <BlockTitle dot="bg-red-500" pulse>Ação Imediata</BlockTitle>
            {pendingAlerts.length === 0 && critical.length === 0 ? (
              <EmptyState icon={<CheckCircle className="h-8 w-8" />} text="Nada para ação imediata" sub="Sem alertas nem pendências críticas" />
            ) : (
              <div className="space-y-3">
                {pendingAlerts.slice(0, 4).map(alert => <AlertCard key={alert.id} alert={alert} />)}
                {pendingAlerts.length > 4 && (
                  <p className="text-[10px] text-gray-500 text-center py-1">+{pendingAlerts.length - 4} alerta(s) adicionais</p>
                )}
                {critical.map(item => <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} />)}
              </div>
            )}
          </div>

          {/* Coluna 2: Prioridade alta */}
          <div className="space-y-4">
            <BlockTitle dot="bg-amber-500">Prioridade Alta</BlockTitle>
            {alta.length > 0 ? (
              <div className="space-y-3">{alta.map(item => <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
            ) : (
              <EmptyState icon={<Shield className="h-8 w-8" />} text="Nenhuma pendência alta" sub="Situação sob controle" />
            )}
          </div>

          {/* Coluna 3: Acompanhamento + informativo */}
          <div className="space-y-4">
            <BlockTitle dot="bg-blue-500">Acompanhamento Geral</BlockTitle>
            {media.length > 0 ? (
              <div className="space-y-3">{media.map(item => <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} compact />)}</div>
            ) : (
              <EmptyState icon={<TrendingUp className="h-8 w-8" />} text="Sem pendências gerais" sub="Prazos em dia" />
            )}

            {informativa.length > 0 && (
              <>
                <BlockTitle dot="bg-slate-400">Preventivo / Informativo</BlockTitle>
                <div className="space-y-3">{informativa.map(item => <PendingItemCard key={item.id} item={item} onNavigate={onNavigate} compact />)}</div>
              </>
            )}

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

      {!isLoading && allItems.length === 0 && pendingAlerts.length === 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Tudo em dia</h3>
          <p className="text-xs text-gray-500">Nenhuma pendência de fiscalização identificada no momento.</p>
        </div>
      )}
    </div>
  );
}

// ── Auxiliares ─────────────────────────────────────────────────────────────────

function BlockTitle({ dot, pulse, children }: { dot: string; pulse?: boolean; children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full inline-block ${dot} ${pulse ? 'animate-pulse' : ''}`} />
      {children}
    </h3>
  );
}

const toneMap: Record<string, { wrap: string; text: string }> = {
  red: { wrap: 'bg-red-500/10 border-red-500/20', text: 'text-red-500' },
  amber: { wrap: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-600' },
  blue: { wrap: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-500' },
  slate: { wrap: 'bg-slate-100 border-slate-200', text: 'text-slate-500' },
};

function SummaryCard({ label, value, tone, icon, onClick, active }: {
  label: string; value: number; tone: string; icon: React.ReactNode; onClick?: () => void; active?: boolean;
}) {
  const c = toneMap[tone] ?? toneMap.slate;
  return (
    <button onClick={onClick} disabled={!onClick}
      className={`bg-gray-100/30 border p-4 rounded-xl flex items-center gap-3 text-left transition-all ${onClick ? 'cursor-pointer hover:border-gray-300' : 'cursor-default'} ${active ? 'border-gray-400 ring-1 ring-gray-300' : 'border-gray-200'}`}>
      <div className={`p-2 rounded-lg border ${c.wrap} ${c.text}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-2xl font-bold leading-tight ${c.text}`}>{value}</p>
      </div>
    </button>
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

function PendingItemCard({ item, onNavigate, compact }: {
  item: FiscalPendingItem; onNavigate: (view: any, cId?: string, pId?: string) => void; compact?: boolean;
}) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const isAditivo = item.category === 'ADITIVO' && !!item.originId;

  const approveMutation = useMutation({
    mutationFn: () => api.alterations.approve(item.originId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-dashboard'] }),
    onError: (err: any) => alert(`Erro ao aprovar: ${err.message}`),
  });
  const rejectMutation = useMutation({
    mutationFn: () => api.alterations.reject(item.originId!, rejectReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-dashboard'] });
      setShowRejectForm(false); setRejectReason(''); setExpanded(false);
    },
    onError: (err: any) => alert(`Erro ao reprovar: ${err.message}`),
  });

  const handleClick = () => {
    if (isAditivo) { setExpanded(e => !e); return; }
    if (item.contractId) onNavigate('details', item.contractId);
    else if (item.processId) onNavigate('processes');
  };

  const urgencyText = () => {
    if (item.daysReference === undefined) return null;
    if (item.daysReference < 0) return `${Math.abs(item.daysReference)}d em atraso`;
    return `${item.daysReference}d restantes`;
  };

  return (
    <div className={`bg-gray-100/20 border rounded-xl overflow-hidden transition-colors ${expanded ? 'border-blue-500/30' : 'border-gray-200 hover:border-gray-300'}`}>
      <button onClick={handleClick}
        className={`w-full text-left p-3 hover:bg-gray-100/30 transition-colors group cursor-pointer ${compact ? 'py-2.5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-lg border shrink-0 ${priorityAccent[item.priority]}`}>
            {categoryIcon[item.category]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className={`text-[9px] font-bold uppercase tracking-wider ${priorityText[item.priority]}`}>
                {CATEGORY_LABEL[item.category]}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${priorityDot[item.priority]}`} />
              <span className="text-[9px] text-gray-500">{PRIORITY_LABEL[item.priority]}</span>
            </div>
            <p className={`text-gray-800 font-medium leading-snug ${compact ? 'text-[10px]' : 'text-[11px]'}`}>{item.title}</p>
            {/* Explicação do porquê da prioridade (spec §3) */}
            <p className="text-[10px] text-gray-500 mt-1 leading-snug">{item.reason}</p>
            {item.contractNumber && <p className="text-[10px] text-gray-400 mt-0.5">Contrato {item.contractNumber}</p>}
          </div>
          <div className="shrink-0 text-right">
            {urgencyText() && (
              <span className={`text-[9px] font-bold block ${priorityText[item.priority]}`}>{urgencyText()}</span>
            )}
            {isAditivo ? (
              <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform mt-1 ml-auto ${expanded ? 'rotate-180' : ''}`} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-500 transition-colors mt-1 ml-auto" />
            )}
          </div>
        </div>
      </button>

      {expanded && isAditivo && (
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
              {item.contractId && (
                <button onClick={() => onNavigate('details', item.contractId)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 rounded-lg py-1.5 text-[10px] font-semibold transition-colors cursor-pointer">
                  Ver Contrato
                </button>
              )}
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
