'use client';

import { useQuery } from '@tanstack/react-query';
import {
  FileText, Clock, AlertTriangle, CheckCircle, MessageSquare,
  ChevronRight, Bell, Activity, Layers, BarChart2,
} from 'lucide-react';
import { api, User, FiscalDashboard as FiscalDashboardType, ContractAlert } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/labels';
import { CHART_COLORS } from '@/components/charts/ChartCards';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string) => void;
}

const alertTypeLabel: Partial<Record<string, string>> = {
  CONTRACT_EXPIRING_180: 'Vencimento 180d', CONTRACT_EXPIRING_90: 'Vencimento 90d',
  RENEWAL_REQUESTED: 'Prorrogação', MEASUREMENT_OVERDUE: 'Medição',
  ALTERATION_OVERDUE: 'Aditivo', OCCURRENCE_CRITICAL_OPEN: 'Ocorrência',
  PROCESS_PHASE_OVERDUE: 'Fase atrasada', COMMUNICATION_MANDATORY: 'Comunicado obrigatório',
  NEW_PROCESS_AUTO_CREATED: 'Novo Processo',
};

function CountCard({
  label, value, icon, accent, onClick, sub,
}: {
  label: string; value: number; icon: React.ReactNode;
  accent: 'emerald' | 'amber' | 'red' | 'blue';
  onClick?: () => void; sub?: string;
}) {
  const colors = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };
  const text = {
    emerald: 'text-emerald-400', amber: 'text-amber-400',
    red: 'text-red-400', blue: 'text-blue-400',
  };
  const glow = {
    emerald: 'hover:shadow-emerald-500/10', amber: 'hover:shadow-amber-500/10',
    red: 'hover:shadow-red-500/10', blue: 'hover:shadow-blue-500/10',
  };

  return (
    <button
      onClick={onClick}
      className={`relative bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-2xl text-left w-full
        overflow-hidden transition-all duration-200
        ${onClick ? `hover:border-zinc-700/80 hover:shadow-lg ${glow[accent]} hover:-translate-y-0.5 cursor-pointer` : 'cursor-default'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className={`relative p-2 rounded-xl border w-max mb-2 ${colors[accent]}`}>{icon}</div>
      <p className="relative text-[10px] text-zinc-500 uppercase tracking-widest">{label}</p>
      <p className={`relative text-2xl font-bold mt-1 tabular-nums ${text[accent]}`}>{value}</p>
      {sub && <p className="relative text-[9px] text-zinc-600 mt-0.5">{sub}</p>}
    </button>
  );
}

// ── Gráfico de pendências inline ───────────────────────────────────────────────
function PendenciasChart({ measurements, occurrences, alterations }: {
  measurements: number; occurrences: number; alterations: number;
}) {
  const items = [
    { label: 'Medições', value: measurements, color: CHART_COLORS[1] },
    { label: 'Ocorrências', value: occurrences, color: CHART_COLORS[3] },
    { label: 'Aditivos', value: alterations, color: CHART_COLORS[2] },
  ];
  const max = Math.max(...items.map((i) => i.value), 1);
  const total = measurements + occurrences + alterations;

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5">
      <h4 className="text-xs font-semibold text-zinc-200 mb-0.5 flex items-center gap-2">
        <BarChart2 className="h-3.5 w-3.5 text-emerald-500/70" />
        Minhas Pendências
      </h4>
      <p className="text-[10px] text-zinc-500 mb-4">
        {total > 0 ? `${total} item${total !== 1 ? 's' : ''} aguardando ação` : 'Nenhuma pendência'}
      </p>
      <div className="space-y-3">
        {items.map((item) => {
          const pct = (item.value / max) * 100;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-400 w-20 shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: item.color }}
                />
              </div>
              <span className="text-[10px] font-bold tabular-nums w-4 text-right"
                style={{ color: item.color }}>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Gráfico de dias restantes por contrato ─────────────────────────────────────
function VencimentosChart({ contracts }: { contracts: any[] }) {
  if (!contracts.length) return null;

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5">
      <h4 className="text-xs font-semibold text-zinc-200 mb-0.5 flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-emerald-500/70" />
        Vigência dos Contratos
      </h4>
      <p className="text-[10px] text-zinc-500 mb-4">Dias restantes por contrato</p>
      <div className="space-y-3">
        {contracts.map((c: any) => {
          const dExp = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000);
          const maxDays = 365;
          const pct = Math.max(0, Math.min(100, (dExp / maxDays) * 100));
          const color = dExp <= 90 ? CHART_COLORS[3] : dExp <= 180 ? CHART_COLORS[2] : CHART_COLORS[0];
          return (
            <div key={c.id} className="flex items-center gap-3">
              <span className="text-[9px] text-zinc-400 w-24 truncate shrink-0">{c.contractNumber}</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
              <span className="text-[9px] font-bold tabular-nums shrink-0" style={{ color }}>
                {dExp > 0 ? `${dExp}d` : 'Venc.'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function FiscalDashboard({ user, onNavigate }: Props) {
  const { data, isLoading } = useQuery<FiscalDashboardType>({
    queryKey: ['dashboard-fiscal', user.id],
    queryFn: () => api.dashboard.fiscal(),
    enabled: !!user,
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-zinc-900/40 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const d = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Greeting */}
      <div>
        <h2 className="text-base font-semibold text-white">
          Meu Painel — {user.name.split(' ')[1] || user.name}
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Resumo pessoal de fiscalização · {user.registrationNumber}
        </p>
      </div>

      {/* Pendências rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CountCard
          label="Meus Contratos" value={d?.myContracts?.length ?? 0}
          icon={<FileText className="h-4 w-4" />} accent="emerald"
          sub="em fiscalização" onClick={() => onNavigate('contracts')}
        />
        <CountCard
          label="Alertas Ativos" value={d?.pendingAlerts?.length ?? 0}
          icon={<Bell className="h-4 w-4" />} accent="amber"
          sub="aguardam ação" onClick={() => onNavigate('pending')}
        />
        <CountCard
          label="Ocorrências Abertas" value={d?.pendingItems?.occurrences ?? 0}
          icon={<AlertTriangle className="h-4 w-4" />} accent="red"
          sub="para resolver" onClick={() => onNavigate('contracts')}
        />
        <CountCard
          label="Medições Pendentes" value={d?.pendingItems?.measurements ?? 0}
          icon={<CheckCircle className="h-4 w-4" />} accent="blue"
          sub="aguardando" onClick={() => onNavigate('contracts')}
        />
      </div>

      {/* Gráficos de resumo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PendenciasChart
          measurements={d?.pendingItems?.measurements ?? 0}
          occurrences={d?.pendingItems?.occurrences ?? 0}
          alterations={d?.pendingItems?.alterations ?? 0}
        />
        <VencimentosChart contracts={d?.myContracts ?? []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Meus Contratos */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-emerald-500/70" />
            Meus Contratos
            <div className="flex-1 h-px bg-zinc-800/60" />
          </h3>
          {(d?.myContracts ?? []).length > 0 ? (
            <div className="space-y-3">
              {(d?.myContracts ?? []).map((c: any) => {
                const dExp = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000);
                const expColor = dExp <= 90 ? 'text-red-400' : dExp <= 180 ? 'text-amber-400' : 'text-emerald-400';
                const expBg = dExp <= 90
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : dExp <= 180
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                return (
                  <div
                    key={c.id}
                    className="bg-zinc-900/20 border border-zinc-800/60 hover:border-zinc-700/80
                      p-4 rounded-2xl transition-all duration-200 group cursor-pointer hover:-translate-y-0.5
                      hover:shadow-lg"
                    onClick={() => onNavigate('details', c.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 block">{c.contractNumber}</span>
                        <p className="text-xs font-semibold text-white mt-0.5 line-clamp-1">{c.objectDescription}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          {(c.contractor as any)?.tradeName || (c.contractor as any)?.corporateName}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs font-bold text-zinc-300">{formatCurrency(c.currentValue)}</p>
                        <p className={`text-[10px] font-semibold mt-0.5 ${expColor}`}>
                          {dExp > 0 ? `${dExp}d restantes` : 'Vencido'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${expBg}`}>
                          Vence {formatDate(c.endDate)}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-400 font-semibold">
                          {c.status}
                        </span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-2xl p-8 text-center">
              <FileText className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhum contrato designado</p>
            </div>
          )}

          {/* Meus Processos */}
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mt-6">
            <Layers className="h-3.5 w-3.5 text-emerald-500/70" />
            Meus Processos
            <div className="flex-1 h-px bg-zinc-800/60" />
          </h3>
          {(d?.myProcesses ?? []).length > 0 ? (
            <div className="space-y-2">
              {(d?.myProcesses ?? []).map((p: any) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate('processes')}
                  className="w-full text-left bg-zinc-900/20 border border-zinc-800/60
                    hover:border-zinc-700/80 p-3 rounded-2xl transition-all duration-200
                    flex justify-between items-center group cursor-pointer hover:-translate-y-0.5"
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 block">{p.processNumber}</span>
                    <p className="text-xs font-semibold text-zinc-300 line-clamp-1">{p.subject}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold
                      ${p.status === 'PLANNING' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : p.status === 'CONCLUDED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                      {p.status}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-2xl p-6 text-center">
              <p className="text-xs text-zinc-500">Nenhum processo alocado</p>
            </div>
          )}
        </div>

        {/* Coluna direita */}
        <div className="space-y-5">

          {/* Alertas ativos */}
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-emerald-500/70" />
            Alertas Ativos
            <div className="flex-1 h-px bg-zinc-800/60" />
          </h3>
          {(d?.pendingAlerts ?? []).length > 0 ? (
            <div className="space-y-2">
              {(d?.pendingAlerts ?? []).map((a: ContractAlert) => (
                <div key={a.id} className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                    {alertTypeLabel[a.type] || a.type}
                  </span>
                  <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">{a.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-center">
              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
              <p className="text-[11px] text-emerald-400 font-semibold">Nenhum alerta pendente</p>
            </div>
          )}

          {/* Próximos vencimentos */}
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mt-2">
            <Clock className="h-3.5 w-3.5 text-emerald-500/70" />
            Próximos Vencimentos
            <div className="flex-1 h-px bg-zinc-800/60" />
          </h3>
          {(d?.upcomingExpirations ?? []).length > 0 ? (
            <div className="space-y-2">
              {(d?.upcomingExpirations ?? []).map((e: any) => (
                <button
                  key={e.contractId}
                  onClick={() => onNavigate('details', e.contractId)}
                  className="w-full text-left bg-zinc-900/20 border border-zinc-800/60
                    hover:border-zinc-700/80 p-3 rounded-xl transition-all cursor-pointer"
                >
                  <p className="text-[10px] font-bold text-zinc-400">{e.contractNumber}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-xs font-semibold
                      ${e.daysUntil <= 90 ? 'text-red-400' : e.daysUntil <= 180 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {e.daysUntil} dias restantes
                    </p>
                    <ChevronRight className="h-3 w-3 text-zinc-600" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-zinc-500 text-center py-3">
              Nenhum contrato encerrando em breve
            </p>
          )}

          {/* Comunicados do Gestor */}
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mt-2">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-500/70" />
            Comunicados
            <div className="flex-1 h-px bg-zinc-800/60" />
          </h3>
          {(d?.gestorCommunications ?? []).length > 0 ? (
            <div className="space-y-2">
              {(d?.gestorCommunications ?? []).map((c: any) => (
                <button
                  key={c.id}
                  onClick={() => onNavigate('communications')}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer
                    ${c.isMandatory
                      ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                      : 'bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700/80'}`}
                >
                  {c.isMandatory && (
                    <span className="text-[9px] font-bold text-red-400 uppercase block mb-1">Obrigatório</span>
                  )}
                  <p className="text-[11px] font-semibold text-zinc-300 line-clamp-1">{c.subject}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{(c.sender as any)?.name}</p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-zinc-500 text-center py-3">Nenhum comunicado recente</p>
          )}
        </div>
      </div>
    </div>
  );
}
