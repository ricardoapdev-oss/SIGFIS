'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Shield, Search, X, Eye, Clock, CalendarRange, Users as UsersIcon, AlertOctagon,
  LogIn, LogOut, PlusCircle, Pencil, Trash2, CheckCircle2, XCircle, UserCog,
  Download, RotateCcw, ShieldAlert, Activity, Globe, Monitor,
} from 'lucide-react';
import { api, User, AuditLog } from '@/lib/api';
import { formatDateTime } from '@/lib/labels';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';

interface Props { user: User }

const PAGE_SIZE = 20;

// Metadados visuais por ação. Ações não mapeadas caem no fallback genérico
// (AuditAction aceita qualquer string vinda do backend — nunca falha em runtime).
const ACTION_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  CREATE:          { label: 'Criação',           color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', icon: <PlusCircle className="h-3 w-3" /> },
  UPDATE:          { label: 'Alteração',         color: 'text-blue-600 bg-blue-500/10 border-blue-500/20',          icon: <Pencil className="h-3 w-3" /> },
  DELETE:          { label: 'Exclusão',          color: 'text-red-600 bg-red-500/10 border-red-500/20',             icon: <Trash2 className="h-3 w-3" /> },
  STATUS_CHANGE:   { label: 'Mudança de Status', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',       icon: <UserCog className="h-3 w-3" /> },
  APPROVE:         { label: 'Aprovação',         color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  REJECT:          { label: 'Rejeição',          color: 'text-red-600 bg-red-500/10 border-red-500/20',             icon: <XCircle className="h-3 w-3" /> },
  RESOLVE:         { label: 'Resolução',         color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  LOGIN:           { label: 'Login',             color: 'text-blue-600 bg-blue-500/10 border-blue-500/20',          icon: <LogIn className="h-3 w-3" /> },
  LOGOUT:          { label: 'Logout',            color: 'text-gray-600 bg-gray-100 border-gray-300',                icon: <LogOut className="h-3 w-3" /> },
  ASSIGN_FISCAL:   { label: 'Designação',        color: 'text-purple-600 bg-purple-500/10 border-purple-500/20',    icon: <UserCog className="h-3 w-3" /> },
  EXPORT:          { label: 'Exportação',        color: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20',          icon: <Download className="h-3 w-3" /> },
  RESTORE:         { label: 'Restauração',       color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',       icon: <RotateCcw className="h-3 w-3" /> },
  RESTORE_FAILED:  { label: 'Restauração Falhou', color: 'text-red-600 bg-red-500/10 border-red-500/20',            icon: <ShieldAlert className="h-3 w-3" /> },
};
const DEFAULT_ACTION_META = { label: '', color: 'text-gray-600 bg-gray-100 border-gray-300', icon: <Activity className="h-3 w-3" /> };

const ENTITY_LABEL: Record<string, string> = {
  Contract: 'Contrato', ProcurementProcess: 'Processo', ProcurementPhase: 'Fase do Processo',
  InspectionMeasurement: 'Medição', Occurrence: 'Ocorrência', ContractAlteration: 'Aditivo',
  Communication: 'Comunicado', ContractPayment: 'Pagamento', FiscalAssignment: 'Designação de Fiscal',
  Contractor: 'Contratada', User: 'Usuário', Database: 'Banco de Dados',
};

// Ações consideradas críticas para fins de exibição (mesma regra usada no backend
// em AuditService.getSummary — mantida em sincronia, não é um dado inventado).
const CRITICAL_ACTIONS = new Set(['DELETE', 'STATUS_CHANGE']);

function actionMeta(action: string) {
  return ACTION_META[action] || { ...DEFAULT_ACTION_META, label: action };
}

function DiffValue({ value }: { value: any }) {
  if (value === null || value === undefined) return <span className="text-gray-400 italic">vazio</span>;
  if (typeof value === 'object') return <span className="font-mono">{JSON.stringify(value)}</span>;
  return <span>{String(value)}</span>;
}

function DetailModal({ log, onClose }: { log: AuditLog; onClose: () => void }) {
  const meta = actionMeta(log.action);
  const changedKeys = log.oldValues || log.newValues
    ? Array.from(new Set([...Object.keys(log.oldValues || {}), ...Object.keys(log.newValues || {})]))
    : [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 shrink-0 ${meta.color}`}>
            {meta.icon} {meta.label}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">{ENTITY_LABEL[log.entity] || log.entity}{log.entityId ? ` · ${log.entityId}` : ''}</h3>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs mb-4">
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Data/Hora</dt>
            <dd className="text-gray-800 mt-0.5">{formatDateTime(log.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Módulo</dt>
            <dd className="text-gray-800 mt-0.5">{log.module || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Usuário</dt>
            <dd className="text-gray-800 mt-0.5">{log.userName || 'Sistema'}{log.userRole ? ` (${log.userRole})` : ''}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">E-mail</dt>
            <dd className="text-gray-800 mt-0.5">{log.userEmail || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><Globe className="h-2.5 w-2.5" /> Origem (IP)</dt>
            <dd className="text-gray-800 mt-0.5 font-mono">{log.ipAddress || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><Monitor className="h-2.5 w-2.5" /> Dispositivo</dt>
            <dd className="text-gray-800 mt-0.5 truncate" title={log.userAgent || undefined}>{log.userAgent || '—'}</dd>
          </div>
        </dl>

        {log.detail && (
          <div className="mb-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Descrição</p>
            <p className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">{log.detail}</p>
          </div>
        )}

        {changedKeys.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Comparação de valores</p>
            <div className="space-y-1.5">
              {changedKeys.map(key => (
                <div key={key} className="text-[11px] bg-gray-50 border border-gray-200 rounded-lg p-2">
                  <span className="block text-gray-500 uppercase font-bold text-[9px] mb-1">{key}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-red-500/10 text-red-600 px-1.5 py-0.5 rounded line-through">
                      <DiffValue value={log.oldValues?.[key]} />
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded">
                      <DiffValue value={log.newValues?.[key]} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AuditView({ user }: Props) {
  const [search, setSearch] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data: summary } = useQuery({
    queryKey: ['audit-summary'],
    queryFn: () => api.audit.summary(),
    staleTime: 60_000,
  });

  const { data: filterOptions } = useQuery({
    queryKey: ['audit-filters'],
    queryFn: () => api.audit.filters(),
    staleTime: 300_000,
  });

  // Lista de usuários reais para o filtro "Usuário" — mesma API já usada em
  // outras telas para os papéis com acesso a /users (ADMIN/GESTOR/ALTA_GESTAO,
  // os únicos que também têm acesso a esta tela). Nunca inventa uma lista.
  const { data: usersForFilter = [] } = useQuery<any[]>({
    queryKey: ['users-audit-lookup'],
    queryFn: () => api.users.listAll(),
    staleTime: 300_000,
  });

  const queryParams = {
    page, pageSize: PAGE_SIZE,
    userId: userIdFilter || undefined,
    module: moduleFilter || undefined,
    action: actionFilter || undefined,
    entity: entityFilter || undefined,
    search: search || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  };

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['audit-logs', queryParams],
    queryFn: () => api.audit.list(queryParams),
    placeholderData: (prev) => prev,
  });

  const logs = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  const hasActiveFilters = !!(search || userIdFilter || moduleFilter || actionFilter || entityFilter || dateFrom || dateTo);
  const clearFilters = () => {
    setSearch(''); setUserIdFilter(''); setModuleFilter(''); setActionFilter(''); setEntityFilter('');
    setDateFrom(''); setDateTo(''); setPage(1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-blue" /> Trilha de Auditoria
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Registro institucional das ações do sistema — gravado pelo backend, imutável e independente do navegador</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-gray-100/60 border border-gray-300 px-3 py-1.5 rounded-lg">
          <Clock className="h-3 w-3" />
          {total} evento{total !== 1 ? 's' : ''} registrado{total !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={CalendarRange} label="Eventos hoje" value={summary?.eventsToday ?? '—'} tone="blue" />
        <StatCard icon={Activity} label="Últimos 7 dias" value={summary?.eventsLast7Days ?? '—'} tone="cyan" />
        <StatCard icon={UsersIcon} label="Usuários ativos" value={summary?.activeUsers ?? '—'} tone="green" />
        <StatCard icon={AlertOctagon} label="Ações críticas" value={summary?.criticalActions ?? '—'} tone="red" />
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Buscar por descrição, registro..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
          </div>
          <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
            title="Período — de" className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer" />
          <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
            title="Período — até" className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer" />
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={userIdFilter} onChange={e => { setUserIdFilter(e.target.value); setPage(1); }}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
            <option value="">Todos os usuários</option>
            {usersForFilter.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <select value={moduleFilter} onChange={e => { setModuleFilter(e.target.value); setPage(1); }}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
            <option value="">Todos os módulos</option>
            {(filterOptions?.modules || []).map((m: string) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={actionFilter} onChange={e => { setActionFilter(e.target.value); setPage(1); }}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
            <option value="">Todas as ações</option>
            {(filterOptions?.actions || []).map((a: string) => <option key={a} value={a}>{actionMeta(a).label || a}</option>)}
          </select>
          <select value={entityFilter} onChange={e => { setEntityFilter(e.target.value); setPage(1); }}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
            <option value="">Todas as entidades</option>
            {(filterOptions?.entities || []).map((en: string) => <option key={en} value={en}>{ENTITY_LABEL[en] || en}</option>)}
          </select>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs font-semibold text-brand-blue cursor-pointer px-2">✕ Limpar filtros</button>
          )}
        </div>
      </div>

      {/* Tabela */}
      {isLoading ? (
        <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-100/60 rounded-xl animate-pulse" />)}</div>
      ) : isError ? (
        <EmptyState icon={AlertOctagon} title="Não foi possível carregar a trilha de auditoria"
          description={(error as any)?.message || 'Verifique sua conexão ou permissões e tente novamente.'} />
      ) : logs.length === 0 ? (
        <EmptyState icon={Shield} title="Não há registros de auditoria disponíveis."
          description={hasActiveFilters ? 'Nenhum evento corresponde aos filtros selecionados.' : undefined} />
      ) : (
        <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500 text-left border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Data/Hora</th>
                  <th className="px-4 py-2.5 font-semibold">Usuário</th>
                  <th className="px-4 py-2.5 font-semibold">Ação</th>
                  <th className="px-4 py-2.5 font-semibold">Módulo</th>
                  <th className="px-4 py-2.5 font-semibold">Registro</th>
                  <th className="px-4 py-2.5 font-semibold">Descrição</th>
                  <th className="px-4 py-2.5 font-semibold">Origem</th>
                  <th className="px-4 py-2.5 font-semibold text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => {
                  const meta = actionMeta(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{formatDateTime(log.createdAt)}</td>
                      <td className="px-4 py-2.5">
                        <p className="text-gray-800 font-medium">{log.userName || 'Sistema'}</p>
                        {log.userRole && <p className="text-[10px] text-gray-400">{log.userRole}</p>}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border inline-flex items-center gap-1 whitespace-nowrap ${meta.color} ${CRITICAL_ACTIONS.has(log.action) ? 'ring-1 ring-red-400/40' : ''}`}>
                          {meta.icon} {meta.label || log.action}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{log.module || '—'}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">
                        {ENTITY_LABEL[log.entity] || log.entity}
                        {log.entityId && <span className="text-gray-400"> · {log.entityId.slice(0, 8)}</span>}
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 max-w-xs truncate" title={log.detail || undefined}>{log.detail || '—'}</td>
                      <td className="px-4 py-2.5 text-gray-500 font-mono whitespace-nowrap">{log.ipAddress || '—'}</td>
                      <td className="px-4 py-2.5 text-center">
                        <button onClick={() => setSelectedLog(log)} title="Ver detalhes"
                          className="p-1.5 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">Página {page} de {totalPages} · {total} registro{total !== 1 ? 's' : ''}</p>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}

      {selectedLog && <DetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </div>
  );
}
