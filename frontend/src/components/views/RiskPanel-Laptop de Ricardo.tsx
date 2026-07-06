'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight,
  RefreshCw, TrendingUp, BarChart2,
} from 'lucide-react';
import { api, User, RiskItem, RiskLevel } from '@/lib/api';
import { CHART_COLORS } from '@/components/charts/ChartCards';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string) => void;
}

const riskConfig: Record<RiskLevel, {
  label: string; color: string; bg: string; border: string;
  icon: React.ReactNode; dot: string; barColor: string;
}> = {
  RED:    {
    label: 'RISCO ALTO',   color: 'text-red-400',
    bg: 'bg-red-500/10',   border: 'border-red-500/30',
    icon: <ShieldAlert className="h-5 w-5" />, dot: 'bg-red-500 animate-pulse',
    barColor: '#ef4444',
  },
  YELLOW: {
    label: 'RISCO MÉDIO',  color: 'text-amber-400',
    bg: 'bg-amber-500/10', border: 'border-amber-500/30',
    icon: <AlertTriangle className="h-5 w-5" />, dot: 'bg-amber-500',
    barColor: '#f59e0b',
  },
  GREEN:  {
    label: 'BAIXO RISCO',  color: 'text-emerald-400',
    bg: 'bg-emerald-500/10', border: 'border-emerald-500/30',
    icon: <ShieldCheck className="h-5 w-5" />, dot: 'bg-emerald-500',
    barColor: '#10b981',
  },
};

function Semaphore({ level }: { level: RiskLevel }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      {(['RED', 'YELLOW', 'GREEN'] as RiskLevel[]).map((l) => (
        <div
          key={l}
          className={`h-3.5 w-3.5 rounded-full border transition-all
            ${l === level
              ? riskConfig[l].dot + ' border-transparent shadow-lg'
              : 'bg-zinc-800 border-zinc-700'}`}
        />
      ))}
    </div>
  );
}

function RiskCard({ item, onNavigate }: { item: RiskItem; onNavigate: Props['onNavigate'] }) {
  const cfg = riskConfig[item.riskLevel];
  return (
    <button
      onClick={() => onNavigate('details', item.contractId)}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group cursor-pointer
        hover:scale-[1.003] hover:shadow-lg ${cfg.bg} ${cfg.border}`}
    >
      <div className="flex items-start gap-4">
        <Semaphore level={item.riskLevel} />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${cfg.color}`}>
                {cfg.label}
              </span>
              <p className="text-xs font-bold text-zinc-200 mt-0.5">{item.contractNumber}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                Score {item.riskScore}/100
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Score bar melhorada */}
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${item.riskScore}%`,
                background: `linear-gradient(to right, ${cfg.barColor}aa, ${cfg.barColor})`,
              }}
            />
          </div>

          {/* Fatores */}
          <div className="flex flex-wrap gap-1.5">
            {item.factors.map((f, i) => (
              <span
                key={i}
                className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${cfg.color} ${cfg.bg} ${cfg.border}`}
              >
                {f}
              </span>
            ))}
          </div>

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

// ── Score Chart visual (barras horizontais inline) ────────────────────────────
function ScoreChart({ items }: { items: RiskItem[] }) {
  if (!items.length) return null;
  const sorted = [...items].sort((a, b) => b.riskScore - a.riskScore).slice(0, 8);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5">
      <h4 className="text-xs font-semibold text-zinc-200 mb-0.5 flex items-center gap-2">
        <BarChart2 className="h-3.5 w-3.5 text-emerald-500/70" />
        Score de Risco por Contrato
      </h4>
      <p className="text-[10px] text-zinc-500 mb-4">Ordenado por risco decrescente</p>
      <div className="space-y-2.5">
        {sorted.map((item) => {
          const cfg = riskConfig[item.riskLevel];
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span className="text-[9px] text-zinc-400 w-28 truncate shrink-0">
                {item.contractNumber}
              </span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.riskScore}%`,
                    background: cfg.barColor,
                  }}
                />
              </div>
              <span className={`text-[9px] font-bold tabular-nums w-12 text-right ${cfg.color}`}>
                {item.riskScore}/100
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Distribuição Radial ────────────────────────────────────────────────────────
function RiskDistribution({ summary, total }: { summary: { red: number; yellow: number; green: number }; total: number }) {
  const levels = [
    { key: 'red', label: 'Alto Risco', count: summary.red, cfg: riskConfig['RED'] },
    { key: 'yellow', label: 'Risco Médio', count: summary.yellow, cfg: riskConfig['YELLOW'] },
    { key: 'green', label: 'Baixo Risco', count: summary.green, cfg: riskConfig['GREEN'] },
  ];

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5">
      <h4 className="text-xs font-semibold text-zinc-200 mb-0.5">Distribuição de Risco</h4>
      <p className="text-[10px] text-zinc-500 mb-4">Proporção por nível</p>

      <div className="space-y-3">
        {levels.map(({ key, label, count, cfg }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-semibold ${cfg.color}`}>{label}</span>
                <span className={`text-[10px] tabular-nums font-bold ${cfg.color}`}>
                  {count} <span className="text-zinc-600 font-normal">({pct}%)</span>
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: cfg.barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800/60 flex justify-between text-[10px]">
        <span className="text-zinc-500">Total de contratos avaliados</span>
        <span className="font-bold text-white">{total}</span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function RiskPanel({ user, onNavigate }: Props) {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['risk-panel', user.id],
    queryFn: () => api.risk.panel(),
    enabled: !!user,
    staleTime: 60_000,
  });

  const items: RiskItem[] = (data as any)?.items ?? [];
  const summary = (data as any)?.summary ?? { red: 0, yellow: 0, green: 0 };
  const total = summary.red + summary.yellow + summary.green;
  const red = items.filter((i) => i.riskLevel === 'RED');
  const yellow = items.filter((i) => i.riskLevel === 'YELLOW');
  const green = items.filter((i) => i.riskLevel === 'GREEN');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-white">Painel de Risco</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Semáforo de risco contratual baseado em prazo, ocorrências e pendências
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300
            border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 rounded-lg transition-colors
            cursor-pointer hover:border-zinc-700"
        >
          <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
          Recalcular
        </button>
      </div>

      {/* Sumário semáforo */}
      <div className="grid grid-cols-3 gap-4">
        {(['RED', 'YELLOW', 'GREEN'] as RiskLevel[]).map((level) => {
          const cfg = riskConfig[level];
          const count = level === 'RED' ? summary.red : level === 'YELLOW' ? summary.yellow : summary.green;
          const label = level === 'RED' ? 'Alto Risco' : level === 'YELLOW' ? 'Risco Médio' : 'Baixo Risco';
          return (
            <div key={level}
              className={`p-5 rounded-2xl border ${cfg.bg} ${cfg.border}
                flex items-center gap-4 transition-all hover:scale-[1.02]`}
            >
              <div className={`p-3 rounded-xl border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                {cfg.icon}
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{label}</p>
                <p className={`text-3xl font-bold tabular-nums ${cfg.color}`}>{count}</p>
                <p className="text-[9px] text-zinc-500">
                  {count === 1 ? 'contrato' : 'contratos'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos de risco */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ScoreChart items={items} />
        <RiskDistribution summary={summary} total={total} />
      </div>

      {/* Metodologia */}
      <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-5">
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
        <div className="flex gap-5 mt-3 text-[10px]">
          <span><span className="text-red-400 font-bold">VERMELHO</span> ≥ 40 pts</span>
          <span><span className="text-amber-400 font-bold">AMARELO</span> ≥ 20 pts</span>
          <span><span className="text-emerald-400 font-bold">VERDE</span> &lt; 20 pts</span>
        </div>
      </div>

      {/* Lista por nível */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-zinc-900/40 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {red.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                Atenção Imediata — {red.length} contrato(s)
              </h3>
              <div className="space-y-3">
                {red.map((item) => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}
              </div>
            </div>
          )}
          {yellow.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Monitoramento — {yellow.length} contrato(s)
              </h3>
              <div className="space-y-3">
                {yellow.map((item) => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}
              </div>
            </div>
          )}
          {green.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Situação Regular — {green.length} contrato(s)
              </h3>
              <div className="space-y-3">
                {green.map((item) => <RiskCard key={item.id} item={item} onNavigate={onNavigate} />)}
              </div>
            </div>
          )}
          {items.length === 0 && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-10 text-center">
              <ShieldCheck className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <p className="text-sm font-semibold text-white">Nenhum contrato cadastrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
