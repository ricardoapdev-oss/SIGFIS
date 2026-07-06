'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock, AlertTriangle, CheckCircle, TrendingUp, Activity,
  MessageSquare, RefreshCw, Users, Shield, DollarSign,
  TrendingDown, Calendar, BarChart2, Building2, AlertOctagon,
  ArrowDown, ArrowUp, Minus, ChevronRight, Info, Printer,
} from 'lucide-react';
import {
  Bar, ComposedChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { api, User, GestorDashboard as GestorDashboardType } from '@/lib/api';
import { formatCurrency } from '@/lib/labels';
import { ContractReport } from './ContractReport';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string, filter?: string) => void;
}

// -- Palette ------------------------------------------------------------------
const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#a1a1aa', '#8b5cf6'];

// -- Info Tooltip --------------------------------------------------------------
function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="relative group inline-flex items-center shrink-0">
      <Info className="h-3 w-3 text-gray-700 group-hover:text-gray-700 cursor-help transition-colors" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-gray-100 border border-gray-300 rounded-xl p-3 text-xs text-gray-700 leading-relaxed shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-left font-normal whitespace-normal">
        {text}
      </div>
    </div>
  );
}

// -- Alert Priority Card -------------------------------------------------------
function AlertCard({
  count, label, subLabel, severity, icon, onClick,
}: {
  count: number; label: string; subLabel?: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'ok';
  icon: React.ReactNode; onClick?: () => void;
}) {
  const cfg = {
    critical: { wrap: 'bg-red-500/8 border-red-500/30 hover:border-red-500/50',   icon: 'bg-red-500/15 border-red-500/25 text-red-400',    num: 'text-red-400',    dot: 'bg-red-500' },
    high:     { wrap: 'bg-orange-500/8 border-orange-500/30 hover:border-orange-500/50', icon: 'bg-orange-500/15 border-orange-500/25 text-orange-400', num: 'text-orange-400', dot: 'bg-orange-500' },
    medium:   { wrap: 'bg-amber-500/8 border-amber-500/30 hover:border-amber-500/50',  icon: 'bg-amber-500/15 border-amber-500/25 text-amber-400',   num: 'text-amber-400',  dot: 'bg-amber-500' },
    low:      { wrap: 'bg-emerald-500/8 border-emerald-500/30 hover:border-emerald-500/50', icon: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400', num: 'text-emerald-400', dot: 'bg-emerald-500' },
    info:     { wrap: 'bg-blue-500/8 border-blue-500/30 hover:border-blue-500/50',   icon: 'bg-blue-500/15 border-blue-500/25 text-blue-400',    num: 'text-blue-400',   dot: 'bg-blue-500' },
    ok:       { wrap: 'bg-gray-100/40 border-gray-300 hover:border-gray-300',        icon: 'bg-gray-100 border-gray-300 text-gray-700',          num: 'text-gray-700',   dot: 'bg-zinc-600' },
  }[severity];

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`flex flex-col gap-2.5 p-4 rounded-xl border transition-all ${cfg.wrap} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg border ${cfg.icon}`}>{icon}</div>
        {count > 0 && <span className={`h-2 w-2 rounded-full ${cfg.dot} animate-pulse mt-0.5`} />}
      </div>
      <div>
        <p className={`text-3xl font-bold leading-none tabular-nums ${cfg.num}`}>{count}</p>
        <p className="text-xs font-semibold text-gray-700 mt-1.5 leading-tight">{label}</p>
        {subLabel && <p className="text-[11px] text-gray-700 mt-0.5">{subLabel}</p>}
      </div>
    </button>
  );
}

// -- Financial KPI Card --------------------------------------------------------
function FinancialCard({ label, value, sub, accent = 'zinc', trend, tooltip }: {
  label: string; value: number; sub?: string;
  accent?: 'emerald' | 'blue' | 'amber' | 'red' | 'zinc'; trend?: number;
  tooltip?: string;
}) {
  const c = { emerald: 'text-emerald-700', blue: 'text-blue-700', amber: 'text-amber-700', red: 'text-red-700', zinc: 'text-slate-900' }[accent];
  return (
    <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-3.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">{label}</p>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      <p className={`text-base font-bold leading-tight ${c} truncate`}>{formatCurrency(value)}</p>
      {sub && <p className="text-xs text-gray-700 mt-1">{sub}</p>}
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-1.5">
          {trend > 0 ? <ArrowUp className="h-3 w-3 text-emerald-400" /> : trend < 0 ? <ArrowDown className="h-3 w-3 text-red-400" /> : <Minus className="h-3 w-3 text-gray-700" />}
          <span className={`text-[11px] font-semibold ${trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-red-400' : 'text-gray-700'}`}>
            {Math.abs(trend)}% vs mês anterior
          </span>
        </div>
      )}
    </div>
  );
}

// -- Risk Count Card -----------------------------------------------------------
function RiskCard({ label, count, variant, onClick, tooltip }: {
  label: string; count: number; variant: 'critical' | 'high' | 'medium' | 'low'; onClick?: () => void; tooltip?: string;
}) {
  const cfg = {
    critical: 'bg-red-500/10 border-red-500/30 text-red-400',
    high:     'bg-orange-500/10 border-orange-500/30 text-orange-400',
    medium:   'bg-amber-500/10 border-amber-500/30 text-amber-400',
    low:      'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  }[variant];
  return (
    <button onClick={onClick} disabled={!onClick}
      className={`${cfg} border rounded-xl p-3.5 text-center w-full transition-opacity ${onClick ? 'cursor-pointer hover:opacity-75' : 'cursor-default'}`}>
      <p className="text-3xl font-bold tabular-nums">{count}</p>
      <div className="flex items-center justify-center gap-1 mt-1">
        <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">{label}</p>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
    </button>
  );
}

// -- Workload Bar Row ----------------------------------------------------------
function WorkloadRow({ name, contracts, max, totalValue, pendingMeasurements, onClick }: {
  name: string; contracts: number; max: number; totalValue: number; pendingMeasurements: number; onClick: () => void;
}) {
  const pct = max > 0 ? (contracts / max) * 100 : 0;
  const overloaded = contracts >= 5;
  const warn = contracts >= 3;
  const barColor = overloaded ? 'from-red-600 to-red-500' : warn ? 'from-amber-600 to-amber-400' : 'from-emerald-600 to-emerald-400';
  return (
    <button onClick={onClick}
      className="w-full text-left bg-gray-100/20 border border-gray-200 hover:border-gray-300 p-3 rounded-xl transition-colors group cursor-pointer">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold text-gray-800 truncate max-w-[55%] group-hover:text-gray-900 transition-colors">{name}</span>
        <div className="flex items-center gap-2 shrink-0">
          {pendingMeasurements > 0 && (
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
              {pendingMeasurements} pend.
            </span>
          )}
          <span className={`text-xs font-bold tabular-nums ${overloaded ? 'text-red-400' : warn ? 'text-amber-400' : 'text-gray-700'}`}>
            {contracts} {contracts === 1 ? 'ctr.' : 'ctrs.'}
          </span>
        </div>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[11px] text-gray-700 mt-1.5 truncate">{formatCurrency(totalValue)} sob fiscalização</p>
    </button>
  );
}

// -- Upcoming Event Row --------------------------------------------------------
function EventRow({ type, contractNumber, description, daysUntil, severity, onClick }: {
  type: string; contractNumber: string; description: string;
  daysUntil: number; severity: string; onClick?: () => void;
}) {
  const cfg = {
    red:   { wrap: 'border-red-500/25 bg-red-500/5 hover:border-red-500/40',      num: 'text-red-400',    dot: 'bg-red-500' },
    amber: { wrap: 'border-amber-500/25 bg-amber-500/5 hover:border-amber-500/40', num: 'text-amber-400',  dot: 'bg-amber-500' },
    green: { wrap: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30', num: 'text-emerald-400', dot: 'bg-emerald-500' },
    blue:  { wrap: 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/30',    num: 'text-blue-400',   dot: 'bg-blue-500' },
  }[severity] ?? { wrap: 'border-gray-300 bg-gray-100/30', num: 'text-gray-700', dot: 'bg-zinc-600' };

  const typeLabel: Record<string, string> = { EXPIRATION: 'Venc.', PROCESS: 'Proc.', RENEWAL: 'Renov.', MEASUREMENT: 'Med.' };
  return (
    <button onClick={onClick} disabled={!onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all ${cfg.wrap} ${onClick ? 'cursor-pointer' : 'cursor-default'} flex items-center gap-3`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px]">{typeLabel[type] || '??'}</span>
          <span className="text-xs font-bold text-gray-700 truncate">{contractNumber}</span>
        </div>
        <p className="text-xs text-gray-700 truncate">{description}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-base font-bold tabular-nums ${cfg.num}`}>{daysUntil}</p>
        <p className="text-[11px] text-gray-700">dias</p>
      </div>
    </button>
  );
}

// -- Section Header ------------------------------------------------------------
function SectionHeader({ title, icon, badge, tooltip }: { title: string; icon: React.ReactNode; badge?: string; tooltip?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-gray-700">{icon}</span>
      <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">{title}</h3>
      {tooltip && <InfoTooltip text={tooltip} />}
      {badge && (
        <span className="text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full animate-pulse">
          {badge}
        </span>
      )}
    </div>
  );
}

// -- Donut with legend ---------------------------------------------------------
function DonutCard({ title, subtitle, data }: { title: string; subtitle: string; data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-0.5">{title}</p>
      <p className="text-xs text-gray-700 mb-4">{subtitle}</p>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={36} outerRadius={55} dataKey="value" paddingAngle={3} startAngle={90} endAngle={-270}>
                {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '11px', color: '#e4e4e7' }}
                itemStyle={{ color: '#a1a1aa' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-gray-900">{total}</span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5 min-w-0">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
              <span className="text-xs text-gray-700 flex-1 truncate">{d.name}</span>
              <span className="text-xs font-bold text-gray-800 tabular-nums">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -- Monthly Evolution Tooltip -------------------------------------------------
function MonthlyChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const bar  = payload.find((p: any) => p.dataKey === 'measuredK');
  const line = payload.find((p: any) => p.dataKey === 'valueM');
  const raw  = payload[0]?.payload;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xl text-xs min-w-[200px]">
      <p className="text-slate-800 font-bold mb-2.5 pb-2 border-b border-slate-200">{label}</p>
      {bar && (
        <div className="flex items-center justify-between gap-6 mb-1.5">
          <span className="flex items-center gap-1.5 text-gray-700">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400 inline-block shrink-0" />
            Executado no mês
          </span>
          <span className="text-emerald-400 font-bold tabular-nums">{formatCurrency(Number(bar.value) * 1000)}</span>
        </div>
      )}
      {line && (
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-gray-700">
            <span className="h-0.5 w-4 bg-indigo-400 inline-block rounded-full shrink-0" />
            Valor da carteira
          </span>
          <span className="text-indigo-700 font-bold tabular-nums">{formatCurrency(Number(line.value) * 1_000_000)}</span>
        </div>
      )}
      {raw?.contracts !== undefined && (
        <div className="flex items-center justify-between gap-6 mt-2.5 pt-2.5 border-t border-gray-300">
          <span className="text-gray-700">Contratos ativos</span>
          <span className="text-gray-800 font-bold">{raw.contracts}</span>
        </div>
      )}
    </div>
  );
}

// -- MAIN COMPONENT ------------------------------------------------------------
export function GestorDashboard({ user, onNavigate }: Props) {
  const [showReport, setShowReport] = useState(false);
  const { data, isLoading, refetch, isFetching } = useQuery<GestorDashboardType>({
    queryKey: ['dashboard-gestor', user.id],
    queryFn: () => api.dashboard.gestor(),
    enabled: !!user,
    staleTime: 300_000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[...Array(8)].map((_, i) => <div key={i} className="h-28 bg-gray-100/40 rounded-xl animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-100/40 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  const k = data?.kpis;
  const c = data?.charts;
  const f = data?.financial;
  const ea = data?.extendedAlerts;
  const rs = data?.riskSummary;
  const fw = data?.fiscalWorkload ?? [];
  const ue = data?.upcomingEvents ?? [];

  const maxFiscalContracts = fw.length > 0 ? Math.max(...fw.map((w: any) => w.contracts)) : 1;

  const monthlyData = (c?.monthlyEvolution ?? []).map(m => ({
    ...m,
    measuredK: Math.round(m.measured / 1000),
    valueM: Number((m.value / 1_000_000).toFixed(3)),
  }));
  const lastMonth = monthlyData[monthlyData.length - 1];
  const totalMeasuredPeriod = monthlyData.reduce((sum, m) => sum + m.measured, 0);
  const avgMeasured = monthlyData.length > 0
    ? totalMeasuredPeriod / monthlyData.length
    : 0;

  const totalAlerts = (k?.expiredContracts ?? 0) + (ea?.expiring30 ?? 0) + (k?.delayedProcesses ?? 0)
    + (k?.pendingFiscalizacoes ?? 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {showReport && <ContractReport user={user} onClose={() => setShowReport(false)} />}

      {/* -- Header -- */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Centro de Gestão Contratual</h2>
          <p className="text-xs text-gray-700 mt-0.5">
            Visão executiva inteligente · Lei 13.303/2016 · RILC IQUEGO
            {user.role === 'ADMIN' && <span className="ml-2 text-emerald-400 font-semibold">· ADMIN</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold">
            <Printer className="h-3 w-3" />
            Imprimir Relatório
          </button>
          <button onClick={() => refetch()} disabled={isFetching}
            className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-700 border border-gray-300 bg-gray-100/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50">
            <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------
          BLOCO 1 — CENTRO DE ALERTAS
      -------------------------------------------------------- */}
      <div>
        <SectionHeader
          title="Centro de Alertas — Ação Imediata"
          icon={<AlertOctagon className="h-3.5 w-3.5 text-red-400" />}
          badge={totalAlerts > 0 ? `${totalAlerts} itens críticos` : undefined}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <AlertCard
            count={k?.expiredContracts ?? 0}
            label="Contratos Vencidos"
            subLabel="Providências urgentes"
            severity="critical"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <AlertCard
            count={ea?.expiring30 ?? 0}
            label="Vencem em 30d"
            subLabel="Risco crítico"
            severity="critical"
            icon={<Clock className="h-4 w-4" />}
            onClick={() => onNavigate('contracts', undefined, 'expiring30')}
          />
          <AlertCard
            count={ea?.expiring60 ?? 0}
            label="Vencem em 60d"
            subLabel="Atenção urgente"
            severity="high"
            icon={<Clock className="h-4 w-4" />}
            onClick={() => onNavigate('contracts', undefined, 'expiring60')}
          />
          <AlertCard
            count={k?.expiringIn90 ?? 0}
            label="Vencem em 90d"
            subLabel="Monitorar"
            severity="medium"
            icon={<Clock className="h-4 w-4" />}
            onClick={() => onNavigate('contracts', undefined, 'expiring90')}
          />
          <AlertCard
            count={k?.pendingFiscalizacoes ?? 0}
            label="Fiscaliz. Pendentes"
            severity="critical"
            icon={<CheckCircle className="h-4 w-4" />}
            onClick={() => onNavigate('contracts', undefined, 'pending_measurements')}
          />
          <AlertCard
            count={k?.communicationsPendingReply ?? 0}
            label="Comun. s/ Resposta"
            severity="info"
            icon={<MessageSquare className="h-4 w-4" />}
            onClick={() => onNavigate('communications')}
          />
          <AlertCard
            count={k?.delayedProcesses ?? 0}
            label="Proc. Atrasados"
            subLabel="Fases vencidas"
            severity="critical"
            icon={<TrendingDown className="h-4 w-4" />}
            onClick={() => onNavigate('processes', undefined, 'DELAYED')}
          />
        </div>
      </div>

      {/* --------------------------------------------------------
          BLOCO 2 — VISÃO FINANCEIRA
      -------------------------------------------------------- */}
      <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
        <SectionHeader title="Visão Financeira Executiva" icon={<DollarSign className="h-3.5 w-3.5" />} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          <FinancialCard label="Total Contratado" value={f?.totalContracted ?? 0} accent="zinc" sub="carteira ativa" />
          <FinancialCard label="Total Executado" value={f?.totalExecuted ?? 0} accent="emerald" sub="medições aprovadas" />
          <FinancialCard label="Saldo Contratual" value={f?.balance ?? 0} accent="blue" sub="disponível" />
          <FinancialCard label="Valor Médio / Contrato" value={f?.avgContractValue ?? 0} accent="zinc" />
          <FinancialCard label="Economia Estimada" value={f?.savingsEstimate ?? 0} accent="emerald" sub="vs valor estimado licitação"
            tooltip="Diferença entre o valor estimado no edital de licitação e o valor efetivamente contratado. Um número positivo significa que as propostas foram competitivas e o IQUEGO pagará menos do que o previsto originalmente — um resultado direto de um processo licitatório bem conduzido." />
          <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-3.5 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">Execução Média</p>
            <p className="text-2xl font-bold text-emerald-400 tabular-nums">{f?.executionPercent ?? 0}%</p>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all"
                style={{ width: `${f?.executionPercent ?? 0}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* --------------------------------------------------------
          BLOCO 4 — MAPA DE RISCOS  +  BLOCO 8 — CALENDÁRIO
      -------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Mapa de Riscos */}
        <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
          <SectionHeader title="Mapa de Riscos Contratuais" icon={<Shield className="h-3.5 w-3.5" />} />
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            <RiskCard label="Crítico" count={rs?.critical ?? 0} variant="critical" onClick={() => onNavigate('risk')}
              tooltip="Contratos que exigem ação imediata. Alta probabilidade de causar prejuízo significativo ao IQUEGO — geralmente contratos vencidos sem renovação, sem fiscal designado, com inadimplência grave da contratada ou processo judicial em aberto." />
            <RiskCard label="Alto" count={rs?.high ?? 0} variant="high" onClick={() => onNavigate('risk')}
              tooltip="Contratos em situação preocupante que pode se agravar rapidamente. Exemplos: vencendo em até 30 dias sem renovação em andamento, medições com grande atraso ou ocorrências críticas sem resposta da contratada. Exigem atenção urgente." />
            <RiskCard label="Médio" count={rs?.medium ?? 0} variant="medium" onClick={() => onNavigate('risk')}
              tooltip="Contratos que precisam de monitoramento ativo. A situação é controlável, mas pode piorar sem acompanhamento. Exemplos: vencendo entre 31 e 90 dias, processos com leve atraso ou pendências administrativas em aberto." />
            <RiskCard label="Baixo" count={rs?.low ?? 0} variant="low" onClick={() => onNavigate('risk')}
              tooltip="Contratos em situação regular, sem irregularidades identificadas no momento. Devem ser acompanhados conforme o cronograma normal de fiscalização, sem necessidade de ação urgente." />
          </div>

          {/* Matriz Probabilidade × Impacto */}
          <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-3 text-center">Matriz de Risco — Probabilidade × Impacto</p>
            <div className="flex gap-2">
              <div className="flex flex-col justify-around text-[8px] text-gray-700 shrink-0 text-right w-10">
                <span>Alta</span><span>Média</span><span>Baixa</span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-1" style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
                  {[
                    { label: 'M', c: 'bg-amber-500/20 text-amber-400 border-amber-500/20' },
                    { label: 'A', c: 'bg-orange-500/20 text-orange-400 border-orange-500/20' },
                    { label: 'C', c: 'bg-red-600/25 text-red-400 border-red-500/25' },
                    { label: 'B', c: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
                    { label: 'M', c: 'bg-amber-500/20 text-amber-400 border-amber-500/20' },
                    { label: 'A', c: 'bg-orange-500/20 text-orange-400 border-orange-500/20' },
                    { label: 'B', c: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
                    { label: 'B', c: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
                    { label: 'M', c: 'bg-amber-500/20 text-amber-400 border-amber-500/20' },
                  ].map((cell, i) => (
                    <div key={i} className={`${cell.c} border rounded-lg h-9 flex items-center justify-center text-xs font-bold`}>
                      {cell.label}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5 text-[8px] text-gray-700">
                  <span>Baixo</span><span className="text-center">Impacto</span><span>Alto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats complementares */}
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-red-400 tabular-nums">{ea?.openCriticalOccurrences ?? 0}</p>
              <p className="text-[11px] text-gray-700 uppercase tracking-wide">Ocorrências Críticas</p>
            </div>
            <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-400 tabular-nums">{ea?.pendingAlterations ?? 0}</p>
              <p className="text-[11px] text-gray-700 uppercase tracking-wide">Aditivos Pendentes</p>
            </div>
          </div>
        </div>

        {/* Calendário de Eventos */}
        <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
          <SectionHeader title="Próximos Eventos Contratuais" icon={<Calendar className="h-3.5 w-3.5" />} />
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {ue.length > 0 ? ue.map((ev, i) => (
              <EventRow
                key={i} type={ev.type} contractNumber={ev.contractNumber}
                description={ev.description} daysUntil={ev.daysUntil} severity={ev.severity}
                onClick={ev.contractId ? () => onNavigate('details', ev.contractId) : undefined}
              />
            )) : (
              <div className="text-center py-10">
                <Calendar className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                <p className="text-xs text-gray-700">Nenhum evento nos próximos 90 dias</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          BLOCO 5 — EVOLUÇÃO CONTRATUAL
      -------------------------------------------------------- */}
      <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
        <SectionHeader title="Evolução Contratual — Mensal" icon={<TrendingUp className="h-3.5 w-3.5" />} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-blue-50/50 border border-gray-200 rounded-xl p-3">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1">Total executado no período</p>
            <p className="text-sm font-bold text-emerald-400">{formatCurrency(totalMeasuredPeriod)}</p>
            <p className="text-xs text-gray-700 mt-0.5">Últimos {monthlyData.length} meses</p>
          </div>
          <div className="bg-blue-50/50 border border-gray-200 rounded-xl p-3">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1">Média mensal executada</p>
            <p className="text-sm font-bold text-indigo-400">{formatCurrency(avgMeasured)}</p>
            <p className="text-xs text-gray-700 mt-0.5">por mês no período</p>
          </div>
          <div className="bg-blue-50/50 border border-gray-200 rounded-xl p-3">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1">Carteira atual</p>
            <p className="text-sm font-bold text-gray-800">
              {lastMonth ? formatCurrency(lastMonth.value) : 'Sem dados'}
            </p>
            <p className="text-xs text-gray-700 mt-0.5">
              {lastMonth ? `${lastMonth.contracts} contratos ativos` : ''}
            </p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={monthlyData} margin={{ top: 8, right: 56, bottom: 4, left: 8 }}>
            <defs>
              <linearGradient id="execBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#34d399" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.75} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#71717a', fontSize: 10 }}
              axisLine={false} tickLine={false} dy={8}
            />
            {/* Left axis — executed in R$ K */}
            <YAxis
              yAxisId="money"
              tick={{ fill: '#52525b', fontSize: 10 }}
              axisLine={false} tickLine={false}
              width={68}
              tickFormatter={(v) => v === 0 ? '0' : `${v} mil`}
            />
            {/* Right axis — portfolio in R$ M */}
            <YAxis
              yAxisId="portfolio"
              orientation="right"
              tick={{ fill: '#6366f1', fontSize: 10 }}
              axisLine={false} tickLine={false}
              width={52}
              tickFormatter={(v) => `${v.toFixed(1)} mi`}
            />
            <Tooltip content={<MonthlyChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              yAxisId="money"
              dataKey="measuredK"
              name="Executado no mês"
              fill="url(#execBarGradient)"
              radius={[5, 5, 0, 0]}
              maxBarSize={52}
            />
            <Line
              yAxisId="portfolio"
              type="monotone"
              dataKey="valueM"
              name="Valor da Carteira"
              stroke="#818cf8"
              strokeWidth={2.5}
              dot={{ fill: '#818cf8', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#818cf8', stroke: '#312e81', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-700">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3.5 rounded-sm bg-emerald-400/80 inline-block" />
            Barras: valor executado (medições aprovadas) no mês — eixo esq.
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-5 bg-indigo-400 inline-block rounded-full" />
            Linha: valor total da carteira de contratos ativos — eixo dir.
          </span>
        </div>
        <p className="text-[11px] text-gray-700 mt-1.5">
          O gráfico exibe os Últimos {monthlyData.length} meses e avança automaticamente a cada mês.
        </p>
      </div>

      {/* --------------------------------------------------------
          BLOCO 6 — CARGA FISCAL  +  BLOCO 7 — UNIDADES
      -------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Carga de Trabalho dos Fiscais */}
        <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
          <SectionHeader title="Carga de Trabalho — Fiscais" icon={<Users className="h-3.5 w-3.5" />} />
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {fw.length > 0 ? fw.map((w: any) => (
              <WorkloadRow
                key={w.id} name={w.shortName} contracts={w.contracts} max={maxFiscalContracts}
                totalValue={w.totalValue} pendingMeasurements={w.pendingMeasurements}
                onClick={() => onNavigate('contracts', undefined, `fiscal:${w.id}`)}
              />
            )) : (
              <div className="text-center py-8">
                <Users className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                <p className="text-xs text-gray-700">Nenhum fiscal com contratos ativos</p>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-3 text-[11px] text-gray-700">
            <span className="flex items-center gap-1"><span className="h-2 w-2 bg-red-500 rounded-full" /> Sobrecarga (5+)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 bg-amber-500 rounded-full" /> Atenção (3-4)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 bg-emerald-500 rounded-full" /> Normal</span>
          </div>
        </div>

        {/* Contratos por Unidade */}
        <div className="bg-gray-100/20 border border-gray-200 rounded-xl p-5">
          <SectionHeader title="Contratos por Unidade Administrativa" icon={<Building2 className="h-3.5 w-3.5" />} />
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {(c?.byUnit ?? []).slice(0, 12).map((u: any, i: number) => {
              const maxVal = Math.max(...(c?.byUnit ?? []).map((x: any) => x.value), 1);
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-gray-700 truncate max-w-[78%]">{u.name}</span>
                    <span className="text-xs font-bold text-gray-700 tabular-nums">{u.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-700 to-blue-400 rounded-full"
                      style={{ width: `${(u.value / maxVal) * 100}%` }} />
                  </div>
                </div>
              );
            })}
            {(c?.byUnit ?? []).length === 0 && (
              <p className="text-xs text-gray-700 text-center py-4">Sem dados de unidade</p>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          ANÁLISE DA CARTEIRA — GRÁFICOS ANALÍTICOS
      -------------------------------------------------------- */}
      <div>
        <SectionHeader title="Análise da Carteira" icon={<BarChart2 className="h-3.5 w-3.5" />} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <DonutCard
            title="Contratos por Situação"
            subtitle="Status atual dos contratos"
            data={c?.byStatus ?? []}
          />
          <DonutCard
            title="Contratos por Modalidade"
            subtitle="Distribuição por tipo licitatório"
            data={c?.byModality ?? []}
          />
          <DonutCard
            title="Processos por Fase"
            subtitle="Fases em andamento"
            data={c?.processesByPhase ?? []}
          />
        </div>
      </div>

      {/* -- KPIs secundários -- */}
      <div>
        <SectionHeader title="Indicadores Operacionais" icon={<Activity className="h-3.5 w-3.5" />} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Contratos Vigentes', value: k?.activeContracts ?? 0, accent: 'emerald', nav: () => onNavigate('contracts', undefined, 'active') },
            { label: 'Enc. em 180 dias', value: k?.expiringIn180 ?? 0, accent: 'amber', nav: () => onNavigate('contracts', undefined, 'expiring180') },
            { label: 'Proc. em Andamento', value: k?.processesInProgress ?? 0, accent: 'blue', nav: () => onNavigate('processes', undefined, 'IN_PROGRESS') },
            { label: 'Prorrogações Pend.', value: k?.pendingRenewals ?? 0, accent: 'amber', nav: () => onNavigate('pending') },
            { label: 'Renov. Necessárias', value: k?.expiringIn90 ?? 0, accent: 'red', nav: () => onNavigate('contracts', undefined, 'expiring90') },
            { label: 'Fiscais c/ Contratos', value: fw.length, accent: 'zinc', nav: undefined },
          ].map(({ label, value, accent, nav }, i) => (
            <button key={i} onClick={nav ?? undefined} disabled={!nav}
              className={`bg-gray-100/30 border border-gray-200 hover:border-gray-300 p-4 rounded-xl text-left transition-all ${nav ? 'cursor-pointer' : 'cursor-default'}`}>
              <p className="text-[11px] font-medium text-gray-700 uppercase tracking-widest mb-1.5">{label}</p>
              <p className={`text-2xl font-bold tabular-nums ${ { emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-700', blue: 'text-blue-700', zinc: 'text-slate-900' }[accent] }`}>
                {value}
              </p>
              {nav && <ChevronRight className="h-3 w-3 text-gray-700 mt-1" />}
            </button>
          ))}
        </div>
      </div>

      {/* -- Footer legal -- */}
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex flex-wrap gap-6 text-xs text-gray-700">
        <span><strong className="text-emerald-400">Lei 13.303/2016</strong> — Contratos de empresas estatais</span>
        <span><strong className="text-gray-700">Aditivo máx.:</strong> 25% serviços — 50% reformas</span>
        <span><strong className="text-gray-700">Alerta 180d:</strong> vencimento contratual</span>
        <span><strong className="text-gray-700">RILC IQUEGO</strong> — Regulamento Interno de Licitações</span>
        <span className="ml-auto text-gray-700">v3.1 — {new Date().toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  );
}
