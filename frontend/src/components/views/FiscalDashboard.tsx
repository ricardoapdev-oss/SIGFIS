'use client';

import { useQuery } from '@tanstack/react-query';
import {
  FileText, Clock, AlertTriangle, CheckCircle, MessageSquare,
  ChevronRight, Bell, Layers, Calendar, Shield,
  TrendingDown, Activity,
} from 'lucide-react';
import { api, User, FiscalDashboard as FiscalDashboardType, ContractAlert } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/labels';

interface Props {
  user: User;
  onNavigate: (view: any, contractId?: string, filter?: string) => void;
}

// ── Legenda de tipo de alerta ────────────────────────────────────────────────
const alertLabel: Partial<Record<string, string>> = {
  CONTRACT_EXPIRING_180: 'Vencimento 180d',
  CONTRACT_EXPIRING_90: 'Vencimento 90d',
  RENEWAL_REQUESTED: 'Prorrogação',
  MEASUREMENT_OVERDUE: 'Medição',
  ALTERATION_OVERDUE: 'Aditivo',
  OCCURRENCE_CRITICAL_OPEN: 'Ocorrência',
  PROCESS_PHASE_OVERDUE: 'Fase atrasada',
  COMMUNICATION_MANDATORY: 'Comunicado',
  NEW_PROCESS_AUTO_CREATED: 'Novo Processo',
};

// ── KPI Card de Contagem ──────────────────────────────────────────────────────
function CountCard({ label, value, icon, accent, onClick }: {
  label: string; value: number; icon: React.ReactNode;
  accent: 'emerald' | 'amber' | 'red' | 'blue'; onClick?: () => void;
}) {
  const cfg = {
    emerald: { wrap: 'bg-emerald-500/8 border-emerald-500/25', icon: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400', num: 'text-emerald-400', dot: 'bg-emerald-500' },
    amber:   { wrap: 'bg-amber-500/8 border-amber-500/25',   icon: 'bg-amber-500/15 border-amber-500/20 text-amber-400',   num: 'text-amber-400',   dot: 'bg-amber-500' },
    red:     { wrap: 'bg-red-500/8 border-red-500/25',       icon: 'bg-red-500/15 border-red-500/20 text-red-400',         num: 'text-red-400',     dot: 'bg-red-500' },
    blue:    { wrap: 'bg-blue-500/8 border-blue-500/25',     icon: 'bg-blue-500/15 border-blue-500/20 text-blue-400',      num: 'text-blue-400',    dot: 'bg-blue-500' },
  }[accent];

  return (
    <button onClick={onClick} disabled={!onClick}
      className={`${cfg.wrap} border rounded-xl p-4 text-left w-full transition-all ${onClick ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-lg border ${cfg.icon}`}>{icon}</div>
        {value > 0 && <span className={`h-2 w-2 rounded-full ${cfg.dot} animate-pulse mt-0.5`} />}
      </div>
      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{label}</p>
      <p className={`text-3xl font-bold mt-1 tabular-nums ${cfg.num}`}>{value}</p>
    </button>
  );
}

// ── Card de Contrato ──────────────────────────────────────────────────────────
function ContractCard({ contract, onClick }: { contract: any; onClick: () => void }) {
  const dExp = Math.ceil((new Date(contract.endDate).getTime() - Date.now()) / 86400000);
  const urgency = dExp <= 0 ? 'expired' : dExp <= 30 ? 'critical' : dExp <= 90 ? 'high' : dExp <= 180 ? 'medium' : 'ok';

  const urgencyCfg = {
    expired:  { bar: 'bg-red-500',    badge: 'bg-red-500/10 border-red-500/20 text-red-400',    label: 'VENCIDO',               pct: 100 },
    critical: { bar: 'bg-red-500',    badge: 'bg-red-500/10 border-red-500/20 text-red-400',    label: `${dExp}d — CRÍTICO`,    pct: Math.min(100, ((180 - dExp) / 180) * 100) },
    high:     { bar: 'bg-amber-500',  badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', label: `${dExp}d restantes`,  pct: Math.min(100, ((180 - dExp) / 180) * 100) },
    medium:   { bar: 'bg-amber-400',  badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', label: `${dExp}d restantes`,  pct: Math.min(100, ((180 - dExp) / 180) * 100) },
    ok:       { bar: 'bg-emerald-500',badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', label: `${dExp}d restantes`, pct: Math.min(100, ((180 - dExp) / 180) * 100) },
  }[urgency];

  const statusLabels: Record<string, string> = {
    DRAFT: 'Rascunho', ACTIVE: 'Ativo', SUSPENDED: 'Suspenso', CONCLUDED: 'Concluído', RESCINDED: 'Rescindido',
  };

  return (
    <button onClick={onClick}
      className="w-full text-left bg-zinc-900/20 border border-zinc-900/80 hover:border-zinc-800 p-4 rounded-xl transition-all group cursor-pointer">
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-zinc-500">{contract.contractNumber}</span>
            <span className="text-[9px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">
              {statusLabels[contract.status] ?? contract.status}
            </span>
          </div>
          <p className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
            {contract.objectDescription}
          </p>
          <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
            {(contract.contractor as any)?.tradeName || (contract.contractor as any)?.corporateName || '—'}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-bold text-zinc-300">{formatCurrency(contract.currentValue)}</p>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border block mt-1 ${urgencyCfg.badge}`}>
            {urgencyCfg.label}
          </span>
        </div>
      </div>

      {/* Barra de urgência */}
      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${urgencyCfg.bar} rounded-full transition-all`} style={{ width: `${urgencyCfg.pct}%` }} />
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] text-zinc-600">Vence {formatDate(contract.endDate)}</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </button>
  );
}

// ── Badge de Alerta ───────────────────────────────────────────────────────────
function AlertBadge({ alert }: { alert: ContractAlert }) {
  const severityCfg: Record<string, string> = {
    CONTRACT_EXPIRING_90:     'bg-red-500/8 border-red-500/25 text-red-400',
    OCCURRENCE_CRITICAL_OPEN: 'bg-red-500/8 border-red-500/25 text-red-400',
    CONTRACT_EXPIRING_180:    'bg-amber-500/8 border-amber-500/25 text-amber-400',
    MEASUREMENT_OVERDUE:      'bg-amber-500/8 border-amber-500/25 text-amber-400',
    PROCESS_PHASE_OVERDUE:    'bg-amber-500/8 border-amber-500/25 text-amber-400',
    COMMUNICATION_MANDATORY:  'bg-blue-500/8 border-blue-500/25 text-blue-400',
  };
  const cls = severityCfg[alert.type] ?? 'bg-zinc-900/40 border-zinc-800 text-zinc-400';

  return (
    <div className={`${cls} border rounded-xl p-3`}>
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        <div className="min-w-0">
          <span className="text-[9px] font-bold uppercase block mb-0.5">
            {alertLabel[alert.type] ?? alert.type}
          </span>
          <p className="text-[11px] leading-snug font-medium">{alert.title}</p>
        </div>
      </div>
    </div>
  );
}

// ── Próximo Vencimento ────────────────────────────────────────────────────────
function ExpiryItem({ item, onClick }: { item: { contractId: string; contractNumber: string; daysUntil: number }; onClick: () => void }) {
  const urgency = item.daysUntil <= 30 ? 'red' : item.daysUntil <= 90 ? 'amber' : 'green';
  const cfg = {
    red:   'bg-red-500/8 border-red-500/25 text-red-400',
    amber: 'bg-amber-500/8 border-amber-500/25 text-amber-400',
    green: 'bg-emerald-500/8 border-emerald-500/25 text-emerald-400',
  }[urgency];

  return (
    <button onClick={onClick}
      className={`w-full text-left ${cfg} border rounded-xl p-3 hover:opacity-80 transition-opacity cursor-pointer flex justify-between items-center`}>
      <div>
        <p className="text-[10px] font-bold">{item.contractNumber}</p>
        <p className="text-[9px] opacity-70 mt-0.5">Vencimento contratual</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold tabular-nums">{item.daysUntil}</p>
        <p className="text-[9px] opacity-60">dias</p>
      </div>
    </button>
  );
}

// ── Processo Pendente ─────────────────────────────────────────────────────────
function ProcessItem({ process, onClick }: { process: any; onClick: () => void }) {
  const statusCfg: Record<string, string> = {
    PLANNING:    'bg-blue-500/10 border-blue-500/20 text-blue-400',
    IN_PROGRESS: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    CONCLUDED:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    CANCELED:    'bg-zinc-800 border-zinc-700 text-zinc-500',
  };
  const statusLabel: Record<string, string> = {
    PLANNING: 'Planejamento', IN_PROGRESS: 'Em Andamento', CONCLUDED: 'Concluído', CANCELED: 'Cancelado',
  };
  return (
    <button onClick={onClick}
      className="w-full text-left bg-zinc-900/20 border border-zinc-900/80 hover:border-zinc-800 p-3 rounded-xl transition-colors group cursor-pointer flex justify-between items-center">
      <div className="min-w-0">
        <span className="text-[10px] text-zinc-500 block">{process.processNumber}</span>
        <p className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors line-clamp-1">
          {process.subject}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-3">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusCfg[process.status] ?? 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>
          {statusLabel[process.status] ?? process.status}
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </button>
  );
}

// ── Comunicado ────────────────────────────────────────────────────────────────
function CommCard({ comm, onClick }: { comm: any; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
        comm.isMandatory
          ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
          : 'bg-zinc-900/20 border-zinc-900/80 hover:border-zinc-800'
      }`}>
      {comm.isMandatory && (
        <span className="text-[9px] font-bold text-red-400 uppercase block mb-1">Obrigatório</span>
      )}
      <p className="text-[11px] font-semibold text-zinc-300 line-clamp-1">{comm.subject}</p>
      <p className="text-[10px] text-zinc-500 mt-0.5">{(comm.sender as any)?.name}</p>
    </button>
  );
}

// ── Seção Header ──────────────────────────────────────────────────────────────
function SectionHeader({ title, icon, count }: { title: string; icon: React.ReactNode; count?: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-zinc-500">{icon}</span>
      <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{title}</h3>
      {count !== undefined && count > 0 && (
        <span className="text-[9px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700 px-1.5 py-0.5 rounded-full tabular-nums">
          {count}
        </span>
      )}
    </div>
  );
}

// ── Painel de Urgência (resumo visual) ────────────────────────────────────────
function UrgencyBar({ contracts }: { contracts: any[] }) {
  const expired = contracts.filter(c => { const d = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000); return d <= 0; }).length;
  const critical = contracts.filter(c => { const d = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000); return d > 0 && d <= 30; }).length;
  const high = contracts.filter(c => { const d = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000); return d > 30 && d <= 90; }).length;
  const ok = contracts.length - expired - critical - high;

  if (contracts.length === 0) return null;

  return (
    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 mb-5">
      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Situação da Carteira</p>
      <div className="flex gap-2 h-2 rounded-full overflow-hidden">
        {expired > 0 && <div className="bg-red-600 rounded-full" style={{ flex: expired }} />}
        {critical > 0 && <div className="bg-red-500" style={{ flex: critical }} />}
        {high > 0 && <div className="bg-amber-500" style={{ flex: high }} />}
        {ok > 0 && <div className="bg-emerald-500 rounded-full" style={{ flex: ok }} />}
      </div>
      <div className="flex gap-4 mt-2.5 flex-wrap text-[10px]">
        {expired > 0  && <span className="flex items-center gap-1 text-red-400 font-semibold"><span className="h-2 w-2 bg-red-600 rounded-full" />{expired} vencido{expired > 1 ? 's' : ''}</span>}
        {critical > 0 && <span className="flex items-center gap-1 text-red-400"><span className="h-2 w-2 bg-red-500 rounded-full" />{critical} crítico{critical > 1 ? 's' : ''}</span>}
        {high > 0     && <span className="flex items-center gap-1 text-amber-400"><span className="h-2 w-2 bg-amber-500 rounded-full" />{high} atenção</span>}
        {ok > 0       && <span className="flex items-center gap-1 text-emerald-400"><span className="h-2 w-2 bg-emerald-500 rounded-full" />{ok} regular{ok > 1 ? 'es' : ''}</span>}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function FiscalDashboard({ user, onNavigate }: Props) {
  const { data, isLoading } = useQuery<FiscalDashboardType>({
    queryKey: ['dashboard-fiscal', user.id],
    queryFn: () => api.dashboard.fiscal(),
    enabled: !!user,
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="space-y-5 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-zinc-900/40 rounded-xl animate-pulse" />)}
        </div>
        {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-zinc-900/40 rounded-xl animate-pulse" />)}
      </div>
    );
  }

  const d = data;
  const myContracts = d?.myContracts ?? [];
  const alerts = d?.pendingAlerts ?? [];
  const expirations = d?.upcomingExpirations ?? [];
  const comms = d?.gestorCommunications ?? [];
  const processes = d?.myProcesses ?? [];
  const pending = d?.pendingItems ?? { measurements: 0, occurrences: 0, alterations: 0 };

  const totalPending = pending.measurements + pending.occurrences + pending.alterations;
  const criticalAlerts = alerts.filter(a => a.type === 'CONTRACT_EXPIRING_90' || a.type === 'OCCURRENCE_CRITICAL_OPEN');

  const firstName = user.name.split(' ')[0] || user.name;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="space-y-7 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-white">{greeting}, {firstName}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Painel de Fiscalização · {user.registrationNumber}
            {criticalAlerts.length > 0 && (
              <span className="ml-2 text-red-400 font-semibold animate-pulse">
                · {criticalAlerts.length} alerta{criticalAlerts.length > 1 ? 's' : ''} crítico{criticalAlerts.length > 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-sm text-emerald-400 shrink-0">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* ── KPIs de Pendências ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <CountCard
          label="Meus Contratos"
          value={myContracts.length}
          icon={<FileText className="h-4 w-4" />}
          accent="emerald"
          onClick={() => onNavigate('contracts')}
        />
        <CountCard
          label="Alertas Ativos"
          value={alerts.length}
          icon={<Bell className="h-4 w-4" />}
          accent="amber"
          onClick={() => onNavigate('pending')}
        />
        <CountCard
          label="Ocorrências Abertas"
          value={pending.occurrences}
          icon={<AlertTriangle className="h-4 w-4" />}
          accent="red"
          onClick={() => onNavigate('contracts', undefined, 'open_occurrences')}
        />
        <CountCard
          label="Medições Pendentes"
          value={pending.measurements}
          icon={<CheckCircle className="h-4 w-4" />}
          accent="blue"
          onClick={() => onNavigate('contracts', undefined, 'pending_measurements')}
        />
      </div>

      {/* ── Painel de Urgência ── */}
      <UrgencyBar contracts={myContracts} />

      {/* ── Conteúdo Principal ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Coluna esquerda — Contratos + Processos */}
        <div className="lg:col-span-2 space-y-6">

          {/* Meus Contratos */}
          <div>
            <SectionHeader
              title="Meus Contratos"
              icon={<FileText className="h-3.5 w-3.5" />}
              count={myContracts.length}
            />
            {myContracts.length > 0 ? (
              <div className="space-y-2.5">
                {[...myContracts]
                  .sort((a, b) => {
                    const da = Math.ceil((new Date(a.endDate).getTime() - Date.now()) / 86400000);
                    const db = Math.ceil((new Date(b.endDate).getTime() - Date.now()) / 86400000);
                    return da - db;
                  })
                  .map(contract => (
                    <ContractCard
                      key={contract.id}
                      contract={contract}
                      onClick={() => onNavigate('details', contract.id)}
                    />
                  ))
                }
              </div>
            ) : (
              <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-10 text-center">
                <FileText className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 font-semibold">Nenhum contrato designado</p>
                <p className="text-[10px] text-zinc-600 mt-1">Aguarde designação pelo gestor</p>
              </div>
            )}
          </div>

          {/* Meus Processos */}
          {processes.length > 0 && (
            <div>
              <SectionHeader
                title="Meus Processos"
                icon={<Layers className="h-3.5 w-3.5" />}
                count={processes.length}
              />
              <div className="space-y-2">
                {processes.map(p => (
                  <ProcessItem key={p.id} process={p} onClick={() => onNavigate('processes')} />
                ))}
              </div>
            </div>
          )}

          {/* Status rápido de pendências */}
          {totalPending > 0 && (
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4">
              <SectionHeader title="Resumo de Pendências" icon={<Activity className="h-3.5 w-3.5" />} />
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => onNavigate('contracts', undefined, 'pending_measurements')}
                  className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3 text-center hover:opacity-80 transition-opacity cursor-pointer">
                  <p className="text-xl font-bold text-blue-400 tabular-nums">{pending.measurements}</p>
                  <p className="text-[9px] text-blue-400/70 uppercase tracking-wide mt-0.5">Medições</p>
                </button>
                <button onClick={() => onNavigate('contracts', undefined, 'open_occurrences')}
                  className="bg-red-500/8 border border-red-500/20 rounded-xl p-3 text-center hover:opacity-80 transition-opacity cursor-pointer">
                  <p className="text-xl font-bold text-red-400 tabular-nums">{pending.occurrences}</p>
                  <p className="text-[9px] text-red-400/70 uppercase tracking-wide mt-0.5">Ocorrências</p>
                </button>
                <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-amber-400 tabular-nums">{pending.alterations}</p>
                  <p className="text-[9px] text-amber-400/70 uppercase tracking-wide mt-0.5">Aditivos</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coluna direita — Alertas + Vencimentos + Comunicados */}
        <div className="space-y-5">

          {/* Alertas Ativos */}
          <div>
            <SectionHeader
              title="Alertas Ativos"
              icon={<Bell className="h-3.5 w-3.5" />}
              count={alerts.length}
            />
            {alerts.length > 0 ? (
              <div className="space-y-2">
                {[...alerts]
                  .sort((a, b) => {
                    const priority: Record<string, number> = {
                      CONTRACT_EXPIRING_90: 0, OCCURRENCE_CRITICAL_OPEN: 1,
                      CONTRACT_EXPIRING_180: 2, MEASUREMENT_OVERDUE: 3, PROCESS_PHASE_OVERDUE: 4,
                    };
                    return (priority[a.type] ?? 9) - (priority[b.type] ?? 9);
                  })
                  .map(a => <AlertBadge key={a.id} alert={a} />)
                }
              </div>
            ) : (
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5 text-center">
                <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-[11px] text-emerald-400 font-semibold">Sem alertas pendentes</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Carteira em dia</p>
              </div>
            )}
          </div>

          {/* Próximos Vencimentos */}
          {expirations.length > 0 && (
            <div>
              <SectionHeader
                title="Próximos Vencimentos"
                icon={<Clock className="h-3.5 w-3.5" />}
                count={expirations.length}
              />
              <div className="space-y-2">
                {expirations.slice(0, 5).map(e => (
                  <ExpiryItem
                    key={e.contractId}
                    item={e}
                    onClick={() => onNavigate('details', e.contractId)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Calendário simples */}
          {expirations.length === 0 && (
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 text-center">
              <Calendar className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhum vencimento próximo</p>
              <p className="text-[10px] text-zinc-600 mt-0.5">nos próximos 180 dias</p>
            </div>
          )}

          {/* Comunicados do Gestor */}
          {comms.length > 0 && (
            <div>
              <SectionHeader
                title="Comunicados"
                icon={<MessageSquare className="h-3.5 w-3.5" />}
                count={comms.length}
              />
              <div className="space-y-2">
                {comms.map(c => (
                  <CommCard key={c.id} comm={c} onClick={() => onNavigate('communications')} />
                ))}
              </div>
            </div>
          )}

          {/* Painel de saúde pessoal */}
          <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4">
            <SectionHeader title="Minha Situação" icon={<Shield className="h-3.5 w-3.5" />} />
            <div className="space-y-2.5">
              {[
                {
                  label: 'Contratos regulares',
                  value: myContracts.filter(c => { const d = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000); return d > 90; }).length,
                  color: 'text-emerald-400',
                  icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />,
                },
                {
                  label: 'Vencendo em 90 dias',
                  value: myContracts.filter(c => { const d = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000); return d > 0 && d <= 90; }).length,
                  color: 'text-amber-400',
                  icon: <TrendingDown className="h-3.5 w-3.5 text-amber-400" />,
                },
                {
                  label: 'Total sob fiscalização',
                  value: myContracts.reduce((s, c) => s + c.currentValue, 0),
                  isCurrency: true,
                  color: 'text-blue-400',
                  icon: <Activity className="h-3.5 w-3.5 text-blue-400" />,
                },
              ].map(({ label, value, color, icon, isCurrency }, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-950/40 border border-zinc-900 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-[10px] text-zinc-400">{label}</span>
                  </div>
                  <span className={`text-[11px] font-bold ${color} tabular-nums`}>
                    {isCurrency ? formatCurrency(value as number) : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
