'use client';

import { useQuery } from '@tanstack/react-query';
import {
  FileText, Clock, AlertTriangle, CheckCircle, TrendingUp, Activity,
  Bell, MessageSquare, RefreshCw, Layers, BarChart2, Target,
} from 'lucide-react';
import { api, User, GestorDashboard as GestorDashboardType } from '@/lib/api';
import { formatCurrency } from '@/lib/labels';
import {
  BarChartCard, PieChartCard, AreaChartCard, MultiBarChartCard,
  RadialChartCard, HorizontalBarChartCard, CHART_COLORS,
} from '@/components/charts/ChartCards';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string) => void;
}

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({
  label, value, icon, accent = 'zinc', sub, onClick, pulse,
}: {
  label: string; value: number | string; icon: React.ReactNode;
  accent?: 'emerald' | 'amber' | 'red' | 'blue' | 'zinc';
  sub?: string; onClick?: () => void; pulse?: boolean;
}) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber:   'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red:     'text-red-400 bg-red-500/10 border-red-500/20',
    blue:    'text-blue-400 bg-blue-500/10 border-blue-500/20',
    zinc:    'text-zinc-400 bg-zinc-800/40 border-zinc-700',
  };
  const textColor: Record<string, string> = {
    emerald: 'text-emerald-400', amber: 'text-amber-400',
    red: 'text-red-400', blue: 'text-blue-400', zinc: 'text-white',
  };
  const glowColor: Record<string, string> = {
    emerald: 'hover:shadow-emerald-500/10', amber: 'hover:shadow-amber-500/10',
    red: 'hover:shadow-red-500/10', blue: 'hover:shadow-blue-500/10', zinc: '',
  };

  return (
    <button
      onClick={onClick}
      className={`relative bg-zinc-900/30 border border-zinc-800/60 p-5 rounded-2xl text-left w-full
        transition-all duration-300 overflow-hidden group
        ${onClick ? `hover:border-zinc-700/80 hover:shadow-lg ${glowColor[accent]} cursor-pointer hover:-translate-y-0.5` : 'cursor-default'}
      `}
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${colors[accent]}`}>
          {icon}
        </div>
        {pulse && typeof value === 'number' && value > 0 && (
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
        )}
      </div>
      <p className="relative text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-1.5">{label}</p>
      <p className={`relative text-3xl font-bold leading-none tabular-nums ${textColor[accent]}`}>
        {value}
      </p>
      {sub && <p className="relative text-[10px] text-zinc-500 mt-2">{sub}</p>}
    </button>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-emerald-500/70">{icon}</span>
      <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{title}</h3>
      <div className="flex-1 h-px bg-zinc-800/60" />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function GestorDashboard({ user, onNavigate }: Props) {
  const { data, isLoading, refetch, isFetching } = useQuery<GestorDashboardType>({
    queryKey: ['dashboard-gestor', user.id],
    queryFn: () => api.dashboard.gestor(),
    enabled: !!user,
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-28 bg-zinc-900/40 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-zinc-900/40 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const k = data?.kpis;
  const c = data?.charts;

  // Evolução mensal com valores em R$ mil
  const monthlyData = (c?.monthlyEvolution || []).map((m) => ({
    ...m,
    valueK: Math.round(m.value / 1000),
    measuredK: Math.round(m.measured / 1000),
  }));

  // Dados para radial de execução
  const totalValue = monthlyData.reduce((s, m) => s + m.valueK, 0);
  const totalMeasured = monthlyData.reduce((s, m) => s + m.measuredK, 0);
  const execPct = totalValue > 0 ? Math.round((totalMeasured / totalValue) * 100) : 0;

  const radialExecData = [
    { name: 'Executado', value: execPct, fill: CHART_COLORS[0] },
    { name: 'Pendente', value: 100 - execPct, fill: '#27272a' },
  ];

  // Dados de byFiscal para barra horizontal
  const fiscalData = (c?.byFiscal || []).slice(0, 6);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-white">Dashboard Executivo</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Visão gerencial consolidada — Lei 13.303/2016 · RILC IQUEGO
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300
            border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 rounded-lg transition-colors
            cursor-pointer disabled:opacity-50 hover:border-zinc-700"
        >
          <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* ── KPIs ── */}
      <div>
        <SectionHeader title="Indicadores Estratégicos" icon={<Activity className="h-3.5 w-3.5" />} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <KpiCard
            label="Contratos Vigentes" value={k?.activeContracts ?? 0}
            icon={<FileText className="h-4 w-4" />} accent="emerald"
            sub="em execução" onClick={() => onNavigate('contracts')}
          />
          <KpiCard
            label="Enc. em 180 dias" value={k?.expiringIn180 ?? 0}
            icon={<Clock className="h-4 w-4" />} accent="amber"
            sub="dentro da janela" pulse onClick={() => onNavigate('contracts')}
          />
          <KpiCard
            label="Enc. em 90 dias" value={k?.expiringIn90 ?? 0}
            icon={<AlertTriangle className="h-4 w-4" />} accent="red"
            sub="atenção urgente" pulse onClick={() => onNavigate('contracts')}
          />
          <KpiCard
            label="Contratos Vencidos" value={k?.expiredContracts ?? 0}
            icon={<AlertTriangle className="h-4 w-4" />} accent="red"
            sub="providências"
          />
          <KpiCard
            label="Proc. em Andamento" value={k?.processesInProgress ?? 0}
            icon={<Layers className="h-4 w-4" />} accent="blue"
            sub="processos ativos" onClick={() => onNavigate('processes')}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <KpiCard
            label="Processos Atrasados" value={k?.delayedProcesses ?? 0}
            icon={<TrendingUp className="h-4 w-4" />} accent="red"
            pulse onClick={() => onNavigate('processes')}
          />
          <KpiCard
            label="Fiscalizações Pend." value={k?.pendingFiscalizacoes ?? 0}
            icon={<CheckCircle className="h-4 w-4" />} accent="amber"
            pulse onClick={() => onNavigate('contracts')}
          />
          <KpiCard
            label="Prorrogações Pend." value={k?.pendingRenewals ?? 0}
            icon={<RefreshCw className="h-4 w-4" />} accent="amber"
            pulse onClick={() => onNavigate('pending')}
          />
          <KpiCard
            label="Comunicados s/ Resp." value={k?.communicationsPendingReply ?? 0}
            icon={<MessageSquare className="h-4 w-4" />} accent="blue"
            onClick={() => onNavigate('communications')}
          />
        </div>
      </div>

      {/* ── Charts Row 1: Distribuição ── */}
      <div>
        <SectionHeader
          title="Análise Gráfica — Distribuição de Contratos"
          icon={<BarChart2 className="h-3.5 w-3.5" />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <PieChartCard
            title="Contratos por Modalidade"
            subtitle="Distribuição por tipo licitatório"
            data={c?.byModality ?? []}
            centerLabel="total"
          />
          <PieChartCard
            title="Contratos por Situação"
            subtitle="Status atual dos contratos"
            data={c?.byStatus ?? []}
            centerLabel="contratos"
          />
          <HorizontalBarChartCard
            title="Contratos por Fiscal"
            subtitle="Titular designado (últimos ativos)"
            data={fiscalData}
            dataKey="value"
            nameKey="name"
          />
        </div>
      </div>

      {/* ── Charts Row 2: Evolução + Execução ── */}
      <div>
        <SectionHeader
          title="Análise Gráfica — Evolução e Execução"
          icon={<TrendingUp className="h-3.5 w-3.5" />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Radial de execução financeira */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 p-5 rounded-2xl hover:border-zinc-700/60 transition-all">
            <h4 className="text-xs font-semibold text-zinc-200 mb-0.5">Taxa de Execução</h4>
            <p className="text-[10px] text-zinc-500 mb-4">Valor executado vs. contratado</p>
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#27272a" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="48" fill="none"
                    stroke="#10b981" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(execPct / 100) * 301.6} 301.6`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400 tabular-nums">{execPct}%</span>
                  <span className="text-[9px] text-zinc-500">executado</span>
                </div>
              </div>
              <div className="w-full space-y-2 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                    Executado
                  </span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    R$ {totalMeasured.toLocaleString('pt-BR')}k
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 inline-block" />
                    Contratado
                  </span>
                  <span className="font-bold text-zinc-300 tabular-nums">
                    R$ {totalValue.toLocaleString('pt-BR')}k
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Evolução mensal — área */}
          <AreaChartCard
            title="Evolução Mensal (R$ mil)"
            subtitle="Valor contratado vs. executado"
            data={monthlyData}
            nameKey="name"
            lines={[
              { key: 'valueK', label: 'Contratado (R$ mil)', color: CHART_COLORS[1] },
              { key: 'measuredK', label: 'Executado (R$ mil)', color: CHART_COLORS[0] },
            ]}
            className="lg:col-span-1"
          />

          {/* Processos por fase — pie */}
          <PieChartCard
            title="Processos por Etapa"
            subtitle="Fases dos processos em andamento"
            data={c?.processesByPhase ?? []}
            centerLabel="processos"
          />
        </div>
      </div>

      {/* ── Footer legal ── */}
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5
        flex flex-wrap gap-6 text-[10px] text-zinc-400">
        <span>
          <strong className="text-emerald-400">Lei 13.303/2016</strong> — Contratos de empresas estatais
        </span>
        <span>
          <strong className="text-zinc-300">Aditivo máx.:</strong> 25% serviços · 50% reformas
        </span>
        <span>
          <strong className="text-zinc-300">Alerta 180d:</strong> vencimento contratual
        </span>
        <span>
          <strong className="text-zinc-300">RILC IQUEGO</strong> — Regulamento Interno de Licitações
        </span>
      </div>
    </div>
  );
}
