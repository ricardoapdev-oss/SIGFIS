'use client';

import { useQuery } from '@tanstack/react-query';
import { ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight, RefreshCw, TrendingUp } from 'lucide-react';
import { api, User, RiskItem, RiskLevel } from '@/lib/api';
import { formatDate } from '@/lib/labels';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string) => void;
}

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; border: string; icon: React.ReactNode; dot: string }> = {
  RED:    { label: 'RISCO ALTO',   color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30',    icon: <ShieldAlert className="h-5 w-5" />,  dot: 'bg-red-500 animate-pulse' },
  YELLOW: { label: 'RISCO MÉDIO',  color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  icon: <AlertTriangle className="h-5 w-5" />, dot: 'bg-amber-500' },
  GREEN:  { label: 'BAIXO RISCO',  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: <ShieldCheck className="h-5 w-5" />,  dot: 'bg-emerald-500' },
};

function Semaphore({ level }: { level: RiskLevel }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      {(['RED', 'YELLOW', 'GREEN'] as RiskLevel[]).map(l => (
        <div key={l} className={`h-3.5 w-3.5 rounded-full border ${l === level ? riskConfig[l].dot + ' border-transparent' : 'bg-zinc-800 border-zinc-700'}`} />
      ))}
    </div>
  );
}

function RiskCard({ item, onNavigate }: { item: RiskItem; onNavigate: Props['onNavigate'] }) {
  const cfg = riskConfig[item.riskLevel];
  return (
    <button onClick={() => onNavigate('details', item.contractId)}
      className={`w-full text-left p-4 rounded-xl border transition-all group cursor-pointer hover:scale-[1.005] ${cfg.bg} ${cfg.border}`}>
      <div className="flex items-start gap-4">

        {/* Semáforo */}
        <Semaphore level={item.riskLevel} />

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
              <p className="text-xs font-bold text-zinc-200 mt-0.5">{item.contractNumber}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                Score {item.riskScore}/100
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Score bar */}
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all" style={{
              width: `${item.riskScore}%`,
              background: item.riskLevel === 'RED' ? '#ef4444' : item.riskLevel === 'YELLOW' ? '#f59e0b' : '#10b981',
            }} />
          </div>

          {/* Fatores */}
          <div className="flex flex-wrap gap-1.5">
            {item.factors.map((f, i) => (
              <span key={i} className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${cfg.color} ${cfg.bg} ${cfg.border}`}>{f}</span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex gap-4 mt-3 text-[10px] text-zinc-500">
            {item.daysUntilExpiry !== undefined && (
              <span>Vence em <strong className={cfg.color}>{item.daysUntilExpiry} dias</strong></span>
            )}
            <span>{item.pendingItems} pend.</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function RiskPanel({ user, onNavigate }: Props) {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['risk-panel', user.id],
    queryFn: () => api.risk.panel(),
    enabled: !!user,
    staleTime: 60_000,
  });

  const items: RiskItem[] = (data as any)?.items ?? [];
  const summary = (data as any)?.summary ?? { red: 0, yellow: 0, green: 0 };
  const red = items.filter(i => i.riskLevel === 'RED');
  const yellow = items.filter(i => i.riskLevel === 'YELLOW');
  const green = items.filter(i => i.riskLevel === 'GREEN');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-white">Painel de Risco</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Semáforo de risco contratual baseado em prazo, ocorrências e pendências</p>
        </div>
        <button onClick={() => refetch()} disabled={isFetching}
          className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
          <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
          Recalcular
        </button>
      </div>

      {/* Sumário semáforo */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { level: 'RED' as RiskLevel, count: summary.red, label: 'Alto Risco' },
          { level: 'YELLOW' as RiskLevel, count: summary.yellow, label: 'Risco Médio' },
          { level: 'GREEN' as RiskLevel, count: summary.green, label: 'Baixo Risco' },
        ].map(({ level, count, label }) => {
          const cfg = riskConfig[level];
          return (
            <div key={level} className={`p-5 rounded-xl border ${cfg.bg} ${cfg.border} flex items-center gap-4`}>
              <div className={`p-3 rounded-xl border ${cfg.bg} ${cfg.border} ${cfg.color}`}>{cfg.icon}</div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{label}</p>
                <p className={`text-3xl font-bold ${cfg.color}`}>{count}</p>
                <p className="text-[9px] text-zinc-500">{count === 1 ? 'contrato' : 'contratos'}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda da metodologia */}
      <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" /> Metodologia de Cálculo
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] text-zinc-400">
          <div><strong className="text-red-400">+40 pts</strong> — Contrato vencido</div>
          <div><strong className="text-amber-400">+35 pts</strong> — Vence em ≤ 30 dias</div>
          <div><strong className="text-amber-400">+30 pts</strong> — Ocorrência crítica aberta</div>
          <div><strong className="text-blue-400">+20 pts</strong> — Vence em ≤ 90 dias</div>
          <div><strong className="text-blue-400">+10 pts</strong> — Vence em ≤ 180 dias</div>
          <div><strong className="text-zinc-300">+15 pts</strong> — Ocorrência alta aberta</div>
          <div><strong className="text-zinc-300">+10 pts</strong> — Medição pendente</div>
          <div><strong className="text-zinc-300">+8 pts</strong> — Alerta ativo</div>
        </div>
        <div className="flex gap-4 mt-3 text-[10px]">
          <span><span className="text-red-400 font-bold">VERMELHO</span> ≥ 40 pts</span>
          <span><span className="text-amber-400 font-bold">AMARELO</span> ≥ 20 pts</span>
          <span><span className="text-emerald-400 font-bold">VERDE</span> &lt; 20 pts</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-zinc-900/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-6">
          {/* RED */}
          {red.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                Atenção Imediata — {red.length} contrato(s)
              </h3>
              <div className="space-y-3">{red.map(item => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
            </div>
          )}
          {/* YELLOW */}
          {yellow.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Monitoramento — {yellow.length} contrato(s)
              </h3>
              <div className="space-y-3">{yellow.map(item => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
            </div>
          )}
          {/* GREEN */}
          {green.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Situação Regular — {green.length} contrato(s)
              </h3>
              <div className="space-y-3">{green.map(item => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}</div>
            </div>
          )}
          {items.length === 0 && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center">
              <ShieldCheck className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <p className="text-sm font-semibold text-white">Nenhum contrato cadastrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
