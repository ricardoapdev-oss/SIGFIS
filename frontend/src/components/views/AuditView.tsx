'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Shield, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, LogIn, LogOut, Clock } from 'lucide-react';
import { api, User, AuditLog, AuditAction } from '@/lib/api';
import { formatDateTime } from '@/lib/labels';

interface Props { user: User }

const actionConfig: Record<AuditAction, { label: string; color: string; icon: React.ReactNode }> = {
  CREATE:  { label: 'Criação',    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: <Edit className="h-3 w-3" /> },
  UPDATE:  { label: 'Alteração', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',          icon: <Edit className="h-3 w-3" /> },
  DELETE:  { label: 'Exclusão',  color: 'text-red-400 bg-red-500/10 border-red-500/20',             icon: <Trash2 className="h-3 w-3" /> },
  VIEW:    { label: 'Consulta',  color: 'text-gray-500 bg-gray-100 border-gray-300',                icon: <Eye className="h-3 w-3" /> },
  APPROVE: { label: 'Aprovação', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle className="h-3 w-3" /> },
  REJECT:  { label: 'Rejeição',  color: 'text-red-400 bg-red-500/10 border-red-500/20',             icon: <XCircle className="h-3 w-3" /> },
  LOGIN:   { label: 'Login',     color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',          icon: <LogIn className="h-3 w-3" /> },
  LOGOUT:  { label: 'Logout',    color: 'text-gray-500 bg-gray-100 border-gray-300',                icon: <LogOut className="h-3 w-3" /> },
};

const entityLabel: Record<string, string> = {
  Contract: 'Contrato', Process: 'Processo', Measurement: 'Medição', Occurrence: 'Ocorrência',
  Alteration: 'Aditivo', Communication: 'Comunicado', User: 'Usuário', Session: 'Sessão',
};

export function AuditView({ user }: Props) {
  const queryClient = useQueryClient();
  const isAdmin = user.role === 'ADMIN';
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<AuditAction | ''>('');
  const [entityFilter, setEntityFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => api.audit.list(),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.audit.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['audit-logs'] }),
  });

  const logs: AuditLog[] = (data as any)?.logs || [];

  const filtered = logs.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.userName.toLowerCase().includes(q) || l.entityLabel.toLowerCase().includes(q) || l.entity.toLowerCase().includes(q);
    const matchAction = !actionFilter || l.action === actionFilter;
    const matchEntity = !entityFilter || l.entity === entityFilter;
    return matchSearch && matchAction && matchEntity;
  });

  const entities = [...new Set(logs.map(l => l.entity))];
  const actions = [...new Set(logs.map(l => l.action))];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" /> Trilha de Auditoria
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Registro imutável de todas as ações do sistema · Soft delete ativo</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-gray-100/40 border border-gray-300 px-3 py-1.5 rounded-lg">
          <Clock className="h-3 w-3" />
          {logs.length} eventos registrados
        </div>
      </div>

      {/* Política de retenção */}
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-[10px] text-gray-500 flex flex-wrap gap-4">
        <span><strong className="text-emerald-400">Soft Delete:</strong> Nenhum registro é apagado fisicamente.</span>
        <span><strong className="text-emerald-400">Imutável:</strong> Histórico de alterações preservado indefinidamente.</span>
        <span><strong className="text-emerald-400">Rastreabilidade:</strong> Quem fez · Quando · O quê.</span>
        <span><strong className="text-emerald-400">Conformidade:</strong> Lei 13.303/2016 · Decreto 10.433/2024.</span>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por usuário, entidade..."
            className="w-full bg-gray-100/40 border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
        </div>
        <select value={actionFilter} onChange={e => setActionFilter(e.target.value as any)}
          className="bg-gray-100/40 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
          <option value="">Todas as ações</option>
          {actions.map(a => <option key={a} value={a}>{actionConfig[a]?.label || a}</option>)}
        </select>
        <select value={entityFilter} onChange={e => setEntityFilter(e.target.value)}
          className="bg-gray-100/40 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
          <option value="">Todas as entidades</option>
          {entities.map(e => <option key={e} value={e}>{entityLabel[e] || e}</option>)}
        </select>
      </div>

      {/* Timeline */}
      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100/40 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length > 0 ? (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-3">
            {filtered.map((log) => {
              const cfg = actionConfig[log.action];
              return (
                <div key={log.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-4 h-3 w-3 rounded-full border-2 border-zinc-950 ${cfg?.color.split(' ').find(c => c.startsWith('bg-')) || 'bg-gray-200'}`} />

                  <div className="bg-gray-100/20 border border-gray-200 hover:border-gray-300 p-4 rounded-xl transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div className="flex items-start gap-3">
                        {/* Action badge */}
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 shrink-0 ${cfg?.color || ''}`}>
                          {cfg?.icon} {cfg?.label || log.action}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{log.entityLabel}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            <span className="text-gray-500 font-medium">{entityLabel[log.entity] || log.entity}</span>
                            {log.entityId && <span className="text-gray-400"> · ID: {log.entityId}</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-[11px] font-semibold text-gray-700">{log.userName}</p>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border text-gray-500 bg-gray-100 border-gray-300">{log.userRole}</span>
                          <p className="text-[10px] text-gray-400 mt-0.5">{formatDateTime(log.createdAt)}</p>
                        </div>
                        {isAdmin && (
                          <button
                            onClick={() => { if (confirm('Excluir este registro de auditoria permanentemente?')) deleteMutation.mutate(log.id); }}
                            disabled={deleteMutation.isPending}
                            title="Excluir registro"
                            className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40 mt-0.5">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Changes */}
                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <div className="mt-3 bg-blue-50/60 border border-gray-200 rounded-lg p-3 space-y-1">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Alterações</p>
                        {Object.entries(log.changes).map(([field, { from, to }]) => (
                          <div key={field} className="flex items-center gap-2 text-[10px]">
                            <span className="text-gray-500 uppercase font-bold">{field}:</span>
                            <span className="bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded line-through">{String(from)}</span>
                            <span className="text-gray-400">→</span>
                            <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">{String(to)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-100/10 border border-gray-200 rounded-xl p-10 text-center">
          <Shield className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Nenhum evento encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
}
