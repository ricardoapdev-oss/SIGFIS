'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock, CheckCircle, AlertTriangle, Calendar as CalendarIcon,
  DollarSign, TrendingUp, Users, Building2, BarChart2, ChevronRight,
  RefreshCw, Printer, MoreVertical, ArrowRight, ShieldAlert, FileSignature,
  Info,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { api, User, GestorDashboard as GestorDashboardType } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/labels';
import { FINANCIAL_TOOLTIPS, sumMoney } from '@/lib/financial-calculations';
import { ChartContainer } from '@/components/ui/chart-container';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import { Tooltip } from '@/components/ui/tooltip';
import { ContractReport } from './ContractReport';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';

interface Props {
  user: User;
  onNavigate: (view: View, contractId?: string, filter?: string) => void;
}

// Cartão executivo dos 6 KPIs do topo do Painel Geral — visual próprio (não é
// o StatCard genérico usado em outras telas), para não afetar mais nada.
const KPI_TONE: Record<string, string> = {
  blue: 'bg-brand-blue/10 text-brand-blue',
  cyan: 'bg-brand-cyan/10 text-teal-600',
  green: 'bg-brand-green/10 text-emerald-600',
  purple: 'bg-brand-purple/10 text-violet-600',
  amber: 'bg-brand-amber/10 text-amber-600',
  red: 'bg-brand-red/10 text-red-600',
};
function ExecutiveKpiCard({
  icon: Icon, title, value, description, tone = 'blue', onClick, tooltip, tooltipAlign = 'left',
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: React.ReactNode;
  description?: string;
  tone?: keyof typeof KPI_TONE;
  onClick?: () => void;
  tooltip?: string;
  /** lado para onde o balão da explicação se estende (evita cortar nas bordas do grid). */
  tooltipAlign?: 'left' | 'right';
}) {
  const Comp = onClick ? 'button' : 'div';
  const strVal = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const isLong = strVal.length > 11;
  const isMedium = strVal.length > 6;

  return (
    <Comp
      onClick={onClick}
      className={`relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-3.5 sm:p-4 text-left shadow-card transition-all overflow-visible ${
        onClick ? 'cursor-pointer hover:shadow-card-hover hover:border-brand-blue/30' : ''
      }`}
    >
      <div>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${KPI_TONE[tone]}`}>
            <Icon className="size-3.5" />
          </span>
          <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground leading-tight truncate" title={title}>
            {title}
          </p>
          {tooltip && (
            <Tooltip
              side="bottom"
              className={`top-full bottom-auto translate-x-0 mb-0 mt-2 z-[60] max-w-[240px] whitespace-normal ${
                tooltipAlign === 'right' ? 'left-auto right-0' : 'left-0 right-auto'
              }`}
              content={<span className="whitespace-normal block max-w-[220px]">{tooltip}</span>}
            >
              <Info className="size-3 shrink-0 text-muted-foreground/70" />
            </Tooltip>
          )}
        </div>
        <div className="mt-2.5 flex items-baseline justify-center overflow-hidden">
          <p className={`font-bold leading-none text-foreground whitespace-nowrap tracking-tight ${
            isLong
              ? 'text-[13px] sm:text-[14px] xl:text-[15.5px] 2xl:text-[17px]'
              : isMedium
              ? 'text-[18px] sm:text-[20px] xl:text-[22px] 2xl:text-[24px]'
              : 'text-[22px] sm:text-[24px] xl:text-[26px] 2xl:text-[28px]'
          }`}>
            {value}
          </p>
        </div>
      </div>
      {description && <p className="mt-2 text-center text-[10px] text-muted-foreground whitespace-nowrap">{description}</p>}
    </Comp>
  );
}

const RISK_COLORS: Record<string, string> = { critical: '#EF4444', high: '#F59E0B', medium: '#FACC15', low: '#32D583' };
const PERIODS = [
  { key: '30d', label: '30 dias' },
  { key: '90d', label: '90 dias' },
  { key: '6m', label: '6 meses' },
  { key: '12m', label: '12 meses' },
] as const;
type PeriodKey = typeof PERIODS[number]['key'];

export function GestorDashboard({ user, onNavigate }: Props) {
  const [showReport, setShowReport] = useState(false);
  const [period, setPeriod] = useState<PeriodKey>('6m');

  const { data, isLoading, isError, refetch, isFetching, dataUpdatedAt } = useQuery<GestorDashboardType>({
    queryKey: ['dashboard-gestor', user.id],
    queryFn: () => api.dashboard.gestor(),
    enabled: !!user,
    staleTime: 300_000,
  });

  const k = data?.kpis;
  const c = data?.charts;
  const f = data?.financial;
  const rs = data?.riskSummary;
  const ue = data?.upcomingEvents ?? [];
  const fw = data?.fiscalWorkload ?? [];
  const ea = data?.extendedAlerts;

  // Auditoria 2026-08-24: os valores mensais já chegam limpos (sumMoney no
  // backend/fallback) — não arredondar aqui, ou o total do período (abaixo)
  // perde centavos em relação à mesma soma feita em outros lugares do
  // sistema (ex.: financial.medicoesAprovadas).
  const monthly = useMemo(() => c?.monthlyEvolution ?? [], [c]);
  const displayedMonthly = useMemo(() => {
    if (period === '30d') return monthly.slice(-1);
    if (period === '90d') return monthly.slice(-3);
    if (period === '6m') return monthly.slice(-6);
    if (period === '12m') return monthly.slice(-12);
    return monthly.slice(-6);
  }, [monthly, period]);
  const periodTotal = sumMoney(displayedMonthly.map((m) => m.measured));

  const situacao = useMemo(() => {
    if (!k) return [];
    const statusMap = new Map((c?.byStatus ?? []).map((s) => [s.name, s.value]));
    return [
      { label: 'Ativos', value: k.activeContracts, tone: 'bg-brand-blue', filter: 'active' },
      { label: 'A vencer (90 dias)', value: k.expiringIn90, tone: 'bg-brand-cyan', filter: 'expiring90' },
      { label: 'Vencidos', value: k.expiredContracts, tone: 'bg-brand-red', filter: undefined },
      { label: 'Suspensos', value: statusMap.get('Suspenso') ?? 0, tone: 'bg-brand-amber', filter: undefined },
      { label: 'Encerrados', value: statusMap.get('Concluído') ?? 0, tone: 'bg-brand-gray', filter: undefined },
    ];
  }, [k, c]);
  const maxSituacao = Math.max(1, ...situacao.map((s) => s.value));

  const lastUpdateLabel = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null;
  // eslint-disable-next-line react-hooks/purity -- leitura única de "agora" para estimar a data de eventos a partir de daysUntil; projeto não usa o React Compiler
  const now = useMemo(() => Date.now(), []);

  const firstName = user.name?.split(' ')[0] || user.name;

  const canSeeAudit = ['ADMIN', 'GESTOR', 'ALTA_GESTAO'].includes(user.role);
  const canSeeBackup = ['ADMIN', 'GESTOR'].includes(user.role);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl">
        <EmptyState
          icon={AlertTriangle}
          title="Não foi possível carregar o painel"
          description="Houve uma falha ao consultar os indicadores. Tente atualizar novamente."
          action={
            <button onClick={() => refetch()} className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white cursor-pointer">
              <RefreshCw className="size-3.5" /> Tentar novamente
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {showReport && <ContractReport user={user} onClose={() => setShowReport(false)} />}

      {/* Saudação + ações */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Olá, {firstName} 👋</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Bem-vindo ao SIGFIS. Aqui está o resumo da gestão contratual da IQUEGO.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Atualizando...' : 'Atualizar dados'}
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-blue-dark cursor-pointer"
          >
            <Printer className="size-3.5" /> Relatório Executivo
          </button>
          <Dropdown
            trigger={({ toggle }) => (
              <button onClick={toggle} className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted cursor-pointer">
                <MoreVertical className="size-4" />
              </button>
            )}
          >
            {canSeeAudit && <DropdownItem icon={ShieldAlert} onClick={() => onNavigate('audit')}>Ver trilha de Auditoria</DropdownItem>}
            {canSeeBackup && <DropdownItem icon={FileSignature} onClick={() => onNavigate('backup')}>Backup do Sistema</DropdownItem>}
            <DropdownItem icon={ArrowRight} onClick={() => onNavigate('contracts')}>Ver todos os contratos</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <ExecutiveKpiCard icon={FileSignature} title="Contratos Ativos" value={k?.activeContracts ?? '—'} tone="blue" onClick={() => onNavigate('contracts', undefined, 'active')}
          tooltip={'Contratos com situação “Ativo” hoje. Não inclui minutas, contratos suspensos, encerrados ou rescindidos.'} />
        <ExecutiveKpiCard icon={CheckCircle} title="Fiscalizações Pendentes" value={k?.pendingFiscalizacoes ?? '—'} tone="cyan" onClick={() => onNavigate('contracts', undefined, 'pending_measurements')}
          tooltip="Medições que o fiscal já enviou e que aguardam a homologação do gestor. Não conta medições ainda em preenchimento pelo fiscal." />
        <ExecutiveKpiCard icon={AlertTriangle} title="Alertas Críticos" value={rs?.critical ?? '—'} tone="red" onClick={() => onNavigate('risk')}
          tooltip={'Contratos ativos em risco crítico: pontuação de risco igual ou acima de 60, somando prazo, ocorrências abertas, medições pendentes e alertas ativos. É mais restrito que o “Alto risco” do Painel de Risco, que começa em 40 — por isso os números podem ser diferentes.'} />
        <ExecutiveKpiCard icon={Clock} title="Contratos a Vencer" description="Próx. 90 dias" value={k?.expiringIn90 ?? '—'} tone="amber" onClick={() => onNavigate('contracts', undefined, 'expiring90')} tooltipAlign="right"
          tooltip="Contratos ativos que encerram nos próximos 90 dias. Serve para começar a tempo a análise de continuidade ou de uma nova contratação, quando cabível." />
        <ExecutiveKpiCard icon={DollarSign} title="Valor Contratual Atual" value={f ? formatCurrency(f.valorContratualAtual) : '—'} tone="purple" tooltipAlign="right"
          tooltip="Soma do valor atual de todos os contratos ativos, já com os aditivos de acréscimo e de supressão aprovados. Não é valor pago nem empenhado." />
        <ExecutiveKpiCard icon={TrendingUp} title="Taxa de Execução" value={f ? `${f.taxaExecucaoMedicoes.toFixed(1)}%` : '—'} tone="green" tooltipAlign="right" tooltip={FINANCIAL_TOOLTIPS.taxaExecucaoMedicoes} />
      </div>

      {/* Execução Financeira + Mapa de Riscos */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartContainer
          className="lg:col-span-2"
          title="Medições Aprovadas por Período"
          description="Medições aprovadas não equivalem necessariamente a pagamentos realizados."
          action={
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-muted p-1">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${period === p.key ? 'bg-surface text-brand-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          }
        >
          <p className="text-2xl font-bold text-foreground">{formatCurrency(periodTotal)}</p>
          <p className="text-xs text-muted-foreground">Total de medições aprovadas no período selecionado</p>
          {displayedMonthly.length > 0 ? (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayedMonthly} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="execArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#146BFF" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#146BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}mi` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}mil` : v} width={52} />
                  <RTooltip formatter={(v) => [formatCurrency(Number(v) || 0), 'Medições Aprovadas']} contentStyle={{ borderRadius: 12, border: '1px solid #E4E7EC', fontSize: 12 }} />
                  <Area type="monotone" dataKey="measured" stroke="#146BFF" strokeWidth={2.5} fill="url(#execArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState className="mt-4" icon={TrendingUp} title="Sem histórico suficiente" description="Ainda não há medições aprovadas para exibir evolução." />
          )}
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center sm:grid-cols-5">
            <div>
              <p className="text-[10px] font-bold tracking-wide text-muted-foreground">Contratado</p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{f ? formatCurrency(f.valorContratualAtual) : '—'}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wide text-muted-foreground">
                Medições aprovadas
                <Tooltip content={<span className="whitespace-normal block max-w-[220px]">{FINANCIAL_TOOLTIPS.medicoesAprovadas}</span>}>
                  <Info className="size-3 shrink-0" />
                </Tooltip>
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{f ? formatCurrency(f.medicoesAprovadas) : '—'}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wide text-muted-foreground">
                Saldo não executado
                <Tooltip content={<span className="whitespace-normal block max-w-[220px]">{FINANCIAL_TOOLTIPS.saldoContratualNaoExecutado}</span>}>
                  <Info className="size-3 shrink-0" />
                </Tooltip>
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{f ? formatCurrency(f.saldoContratualNaoExecutado) : '—'}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wide text-muted-foreground">
                Estimativa mensal calculada (carteira)
                <Tooltip content={<span className="whitespace-normal block max-w-[260px]">{FINANCIAL_TOOLTIPS.valorMensalEstimadoCarteira}</span>}>
                  <Info className="size-3 shrink-0" />
                </Tooltip>
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{f ? formatCurrency(f.valorMensalEstimadoCarteira) : '—'}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wide text-muted-foreground">
                Média mensal calculada por contrato
                <Tooltip content={<span className="whitespace-normal block max-w-[260px]">{FINANCIAL_TOOLTIPS.mediaMensalPorContrato}</span>}>
                  <Info className="size-3 shrink-0" />
                </Tooltip>
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{f ? formatCurrency(f.mediaMensalPorContrato) : '—'}</p>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Mapa de Riscos Contratuais" description="Distribuição dos contratos ativos por nível de risco">
          {rs && (rs.critical + rs.high + rs.medium + rs.low) > 0 ? (
            <>
              <div className="relative mx-auto h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ name: 'Crítico', value: rs.critical }, { name: 'Alto', value: rs.high }, { name: 'Médio', value: rs.medium }, { name: 'Baixo', value: rs.low }]}
                      dataKey="value" innerRadius={48} outerRadius={70} paddingAngle={3} startAngle={90} endAngle={-270}
                    >
                      {['critical', 'high', 'medium', 'low'].map((key) => <Cell key={key} fill={RISK_COLORS[key]} stroke="transparent" />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{rs.critical + rs.high + rs.medium + rs.low}</span>
                  <span className="text-[10px] text-muted-foreground">Total</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { label: 'Crítico', value: rs.critical, color: RISK_COLORS.critical },
                  { label: 'Alto', value: rs.high, color: RISK_COLORS.high },
                  { label: 'Médio', value: rs.medium, color: RISK_COLORS.medium },
                  { label: 'Baixo', value: rs.low, color: RISK_COLORS.low },
                ].map((r) => (
                  <button key={r.label} onClick={() => onNavigate('risk')} className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-muted cursor-pointer">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: r.color }} />
                    <span className="flex-1 text-xs text-muted-foreground">{r.label}</span>
                    <span className="text-xs font-bold text-foreground">{r.value}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <EmptyState icon={ShieldAlert} title="Nenhum risco identificado" description="Todos os contratos ativos estão em situação regular." />
          )}
        </ChartContainer>
      </div>

      {/* Próximos Eventos + Contratos por Situação */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartContainer
          className="lg:col-span-2"
          title="Próximos Eventos Contratuais"
          action={<button onClick={() => onNavigate('contracts', undefined, 'expiring180')} className="flex items-center gap-1 text-xs font-semibold text-brand-blue cursor-pointer">Ver todos <ArrowRight className="size-3" /></button>}
        >
          {ue.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
                    <th className="pb-2 font-semibold">Evento</th>
                    <th className="pb-2 font-semibold">Contrato</th>
                    <th className="pb-2 font-semibold">Data</th>
                    <th className="pb-2 font-semibold text-right">Dias restantes</th>
                  </tr>
                </thead>
                <tbody>
                  {ue.map((ev, i) => {
                    const eventDate = new Date(now + ev.daysUntil * 86400000);
                    const typeLabel: Record<string, string> = { EXPIRATION: 'Vencimento contratual', PROCESS: 'Fase de processo' };
                    return (
                      <tr
                        key={i}
                        onClick={ev.contractId ? () => onNavigate('details', ev.contractId) : undefined}
                        className={`border-b border-border last:border-0 ${ev.contractId ? 'cursor-pointer hover:bg-muted' : ''}`}
                      >
                        <td className="py-2.5 pr-2 text-foreground">{typeLabel[ev.type] || ev.description}</td>
                        <td className="py-2.5 pr-2 font-semibold text-foreground">{ev.contractNumber || '—'}</td>
                        <td className="py-2.5 pr-2 text-muted-foreground">{formatDate(eventDate)}</td>
                        <td className="py-2.5 text-right">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${ev.severity === 'red' ? 'bg-brand-red/10 text-brand-red' : ev.severity === 'amber' ? 'bg-brand-amber/10 text-amber-700' : 'bg-brand-green/10 text-emerald-700'}`}>
                            {ev.daysUntil} dias
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState icon={CalendarIcon} title="Nenhum evento nos próximos 90 dias" />
          )}
        </ChartContainer>

        <ChartContainer title="Contratos por Situação">
          <div className="space-y-4">
            {situacao.map((s) => (
              <button
                key={s.label}
                onClick={s.filter ? () => onNavigate('contracts', undefined, s.filter) : undefined}
                className={`block w-full text-left ${s.filter ? 'cursor-pointer' : ''}`}
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-bold text-foreground">{s.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${s.tone}`} style={{ width: `${(s.value / maxSituacao) * 100}%` }} />
                </div>
              </button>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Carga fiscal + Unidades administrativas */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartContainer title="Carga de Trabalho — Fiscais" description="Contratos ativos por fiscal designado">
          {fw.length > 0 ? (
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {fw.map((w) => {
                const overloaded = w.contracts >= 5;
                const warn = w.contracts >= 3;
                return (
                  <button key={w.id} onClick={() => onNavigate('contracts', undefined, `fiscal:${w.id}`)} className="block w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted cursor-pointer">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{w.shortName}</span>
                      <span className={`text-xs font-bold ${overloaded ? 'text-brand-red' : warn ? 'text-amber-600' : 'text-muted-foreground'}`}>{w.contracts} ctr.</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${overloaded ? 'bg-brand-red' : warn ? 'bg-brand-amber' : 'bg-brand-green'}`} style={{ width: `${Math.min(100, (w.contracts / 5) * 100)}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{formatCurrency(w.totalValue)} sob fiscalização</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState icon={Users} title="Nenhum fiscal com contratos ativos" />
          )}
        </ChartContainer>

        <ChartContainer title="Contratos por Unidade Administrativa">
          {(c?.byUnit ?? []).length > 0 ? (
            <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
              {(c!.byUnit).slice(0, 12).map((u, i) => {
                const maxVal = Math.max(1, ...c!.byUnit.map((x) => x.value));
                return (
                  <div key={i}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="truncate text-muted-foreground">{u.name}</span>
                      <span className="font-bold text-foreground">{u.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-brand-blue" style={{ width: `${(u.value / maxVal) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon={Building2} title="Sem dados de unidade" />
          )}
        </ChartContainer>
      </div>

      {/* Indicadores operacionais */}
      <ChartContainer title="Indicadores Operacionais">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Enc. em 180 dias', value: k?.expiringIn180, nav: () => onNavigate('contracts', undefined, 'expiring180') },
            { label: 'Proc. em Andamento', value: k?.processesInProgress, nav: () => onNavigate('processes', undefined, 'IN_PROGRESS') },
            { label: 'Proc. Atrasados', value: k?.delayedProcesses, nav: () => onNavigate('processes', undefined, 'DELAYED') },
            { label: 'Prorrogações Pend.', value: k?.pendingRenewals, nav: () => onNavigate('pending') },
            { label: 'Comun. s/ Resposta', value: k?.communicationsPendingReply, nav: () => onNavigate('communications') },
            { label: 'Fiscais c/ Contratos', value: fw.length, nav: undefined },
          ].map(({ label, value, nav }) => (
            <button key={label} onClick={nav} disabled={!nav} className={`rounded-xl border border-border p-3 text-center transition-colors ${nav ? 'cursor-pointer hover:bg-muted' : ''}`}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-1 text-xl font-bold text-foreground">{value ?? '—'}</p>
              <div className="mt-1 flex h-3 items-center justify-center">
                {nav && <ChevronRight className="size-3 text-muted-foreground" />}
              </div>
            </button>
          ))}
        </div>
      </ChartContainer>

      {/* Análise da carteira */}
      <ChartContainer title="Análise da Carteira" description="Modalidade de contratação e fases de processo">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <MiniDonut title="Por Modalidade" data={c?.byModality ?? []} />
          <MiniDonut title="Processos por Fase" data={c?.processesByPhase ?? []} />
        </div>
      </ChartContainer>

      {/* Rodapé legal */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-brand-green/20 bg-brand-green/5 p-4 text-xs text-muted-foreground">
        <span><strong className="text-emerald-700">Lei 13.303/2016</strong> — Contratos de empresas estatais</span>
        <span><strong className="text-foreground">Aditivo máx.:</strong> 25% serviços — 50% reformas</span>
        <span><strong className="text-foreground">RILC IQUEGO</strong> — Regulamento Interno de Licitações</span>
        {lastUpdateLabel && <span className="ml-auto">Última atualização: {lastUpdateLabel}</span>}
      </div>
      {ea && (ea.contractsWithoutFiscal > 0 || ea.openCriticalOccurrences > 0) && (
        <p className="text-[11px] text-muted-foreground">
          {ea.contractsWithoutFiscal > 0 && `${ea.contractsWithoutFiscal} contrato(s) sem fiscal designado. `}
          {ea.openCriticalOccurrences > 0 && `${ea.openCriticalOccurrences} ocorrência(s) crítica(s) em aberto.`}
        </p>
      )}
    </div>
  );
}

function MiniDonut({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  const colors = ['#146BFF', '#00D4B4', '#7C4DFF', '#F59E0B', '#32D583', '#EF4444'];
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <EmptyState icon={BarChart2} title={title} description="Sem dados suficientes" />;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-foreground">{title}</p>
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={28} outerRadius={44} paddingAngle={2}>
                {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} stroke="transparent" />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px]">
              <span className="size-2 shrink-0 rounded-full" style={{ background: colors[i % colors.length] }} />
              <span className="flex-1 truncate text-muted-foreground">{d.name}</span>
              <span className="font-bold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
