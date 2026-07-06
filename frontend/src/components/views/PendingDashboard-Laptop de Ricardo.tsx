'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Clock, FileText, CheckCircle, Bell, ChevronRight, TrendingUp, Activity, Shield } from 'lucide-react';
import { api, User, ContractAlert } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/labels';

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
  LOW: 'bg-zinc-800 border-zinc-700 text-zinc-400',
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

export function PendingDashboard({ user, onNavigate }: PendingDashboardProps) {
  const queryClient = useQueryClient();

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['pending-dashboard', user.id],
    queryFn: () => api.pendingDashboard.get(),
    enabled: !!user,
    refetchInterval: 30_000,
  });

  const { data: pendingAlerts = [] } = useQuery<ContractAlert[]>({
    queryKey: ['alerts-pending', user.id],
    queryFn: () => api.alerts.list(),
    enabled: !!user,
  });

  const items: PendingItem[] = dashboard?.items ?? [];
  const critical = items.filter(i => i.priority === 'CRITICAL');
  const high = items.filter(i => i.priority === 'HIGH');
  const medium = items.filter(i => i.priority === 'MEDIUM' || i.priority === 'LOW');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-base font-semibold text-white">Central de Pendências</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Visão consolidada de todos os itens que requerem ação imediata</p>
      </div>

      {/* Resumo numérico */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Alertas Ativos" value={pendingAlerts.length} color="text-amber-400" icon={<Bell className="h-4 w-4" />} accent="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Prioridade Crítica" value={critical.length} color="text-red-400" icon={<AlertTriangle className="h-4 w-4" />} accent="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Prioridade Alta" value={high.length} color="text-amber-400" icon={<Shield className="h-4 w-4" />} accent="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Demais Pendências" value={medium.length} color="text-blue-400" icon={<TrendingUp className="h-4 w-4" />} accent="bg-blue-500/10 border-blue-500/20" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-zinc-900/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Alertas obrigatórios */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse" />
              Para Ação Imediata
            </h3>
            {pendingAlerts.length > 0 ? (
              <div className="space-y-3">
                {pendingAlerts.slice(0, 5).map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
                {pendingAlerts.length > 5 && (
                  <p className="text-[10px] text-zinc-500 text-center py-2">+{pendingAlerts.length - 5} alertas adicionais pendentes</p>
                )}
              </div>
            ) : (
              <EmptyState icon={<Bell className="h-8 w-8" />} text="Nenhum alerta pendente" sub="Todos os itens foram tratados" />
            )}
          </div>

          {/* Coluna 2: Pendências críticas/altas */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
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
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
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
              <div className="space-y-1 text-[10px] text-zinc-400">
                <div className="flex justify-between"><span>Termos aditivos (compras/serviços)</span><strong className="text-zinc-300">25%</strong></div>
                <div className="flex justify-between"><span>Termos aditivos (obras/reformas)</span><strong className="text-zinc-300">50%</strong></div>
                <div className="flex justify-between"><span>Alerta de vencimento</span><strong className="text-zinc-300">180 dias</strong></div>
                <div className="flex justify-between"><span>Prorrogação urgente</span><strong className="text-zinc-300">90 dias</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sem nada pendente */}
      {!isLoading && items.length === 0 && pendingAlerts.length === 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-white mb-1">Tudo em dia</h3>
          <p className="text-xs text-zinc-500">Nenhuma pendência crítica identificada no momento.</p>
        </div>
      )}
    </div>
  );
}

// ── Cards auxiliares ───────────────────────────────────────────────────────────

function SummaryCard({ label, value, color, icon, accent }: { label: string; value: number; color: string; icon: React.ReactNode; accent: string }) {
  return (
    <div className="relative bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-2xl flex items-center gap-3 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className={`relative p-2 rounded-xl border ${accent} ${color}`}>{icon}</div>
      <div className="relative">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className={`text-2xl font-bold leading-tight tabular-nums ${color}`}>{value}</p>
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
    <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl hover:border-amber-500/40 transition-colors">
      <div className="flex items-start gap-2.5">
        <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5 animate-pulse" />
        <div className="min-w-0">
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">{typeLabel[alert.type] || alert.type}</span>
          <p className="text-[11px] text-zinc-300 leading-snug mt-0.5">{alert.title}</p>
        </div>
      </div>
    </div>
  );
}

function PendingItemCard({ item, onNavigate, compact }: { item: PendingItem; onNavigate: (view: any, cId?: string, pId?: string) => void; compact?: boolean }) {
  const handleClick = () => {
    if (item.contractId) onNavigate('details', item.contractId);
    else if (item.processId) onNavigate('processes');
    else if (item.type === 'MEASUREMENT' || item.type === 'ALTERATION' || item.type === 'OCCURRENCE') onNavigate('contracts');
    else onNavigate('processes');
  };

  const urgencyText = () => {
    if (item.daysLate) return `${item.daysLate}d em atraso`;
    if (item.daysPending) return `${item.daysPending}d pendente`;
    if (item.daysOpen) return `${item.daysOpen}d em aberto`;
    if (item.daysUntil !== undefined) return `${item.daysUntil}d restantes`;
    return null;
  };

  return (
    <button onClick={handleClick}
      className={`w-full text-left bg-zinc-900/20 border border-zinc-800/60 hover:border-zinc-700/80
        p-3 rounded-2xl transition-all duration-200 group cursor-pointer hover:-translate-y-0.5
        hover:shadow-md ${compact ? 'py-2.5' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-xl border text-[11px] shrink-0 ${priorityColor[item.priority]}`}>
          {itemIcon[item.type]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[9px] font-bold uppercase tracking-wider ${priorityColor[item.priority].split(' ').pop()}`}>
              {itemLabel[item.type]}
            </span>
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${priorityDot[item.priority]}`} />
            <span className="text-[9px] text-zinc-500">{priorityLabel[item.priority]}</span>
          </div>
          <p className={`text-zinc-300 font-medium leading-snug truncate ${compact ? 'text-[10px]' : 'text-[11px]'}`}>{item.title}</p>
          {item.detail && <p className="text-[10px] text-zinc-500 mt-0.5">{item.detail}</p>}
        </div>
        <div className="shrink-0 text-right">
          {urgencyText() && (
            <span className={`text-[9px] font-bold block ${item.priority === 'CRITICAL' ? 'text-red-400' : item.priority === 'HIGH' ? 'text-amber-400' : 'text-blue-400'}`}>
              {urgencyText()}
            </span>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors mt-1 ml-auto" />
        </div>
      </div>
    </button>
  );
}

function EmptyState({ icon, text, sub }: { icon: React.ReactNode; text: string; sub: string }) {
  return (
    <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-2xl p-6 text-center">
      <div className="text-zinc-600 flex justify-center mb-2">{icon}</div>
      <p className="text-xs font-semibold text-zinc-400">{text}</p>
      <p className="text-[10px] text-zinc-600 mt-0.5">{sub}</p>
    </div>
  );
}
