'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderOpen, Plus, ChevronRight, Search, X, Check, Clock, AlertTriangle, Calendar, User as UserIcon, FileText, ChevronDown, Trash2 } from 'lucide-react';
import { api, User, ProcessPhase, PhaseStatus, PHASE_NAMES } from '@/lib/api';
import { processStatusLabel, processStatusColor, modalityLabel, formatCurrency, formatDate } from '@/lib/labels';

const MODALITIES = [
  { value: 'LICITACAO_13303', label: 'Licitação 13.303/2016' }, { value: 'DISPENSA_13303', label: 'Dispensa 13.303/2016' },
  { value: 'INEXIGIBILIDADE', label: 'Inexigibilidade' }, { value: 'PREGAO_ELETRONICO', label: 'Pregão Eletrônico' },
  { value: 'OUTROS', label: 'Outros' },
];

const phaseStatusLabel: Record<PhaseStatus, string> = {
  PENDING: 'Pendente', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluída', OVERDUE: 'Em Atraso', BLOCKED: 'Bloqueada',
};

const phaseStatusColor: Record<PhaseStatus, { dot: string; badge: string; border: string }> = {
  PENDING:     { dot: 'bg-zinc-600',   badge: 'bg-zinc-800/80 text-zinc-400',    border: 'border-zinc-700' },
  IN_PROGRESS: { dot: 'bg-blue-500',   badge: 'bg-blue-500/10 text-blue-400',    border: 'border-blue-500/50' },
  COMPLETED:   { dot: 'bg-emerald-500',badge: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/50' },
  OVERDUE:     { dot: 'bg-red-500',    badge: 'bg-red-500/10 text-red-400',      border: 'border-red-500/50' },
  BLOCKED:     { dot: 'bg-amber-500',  badge: 'bg-amber-500/10 text-amber-400',  border: 'border-amber-500/50' },
};

const PHASE_STATUSES: PhaseStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE', 'BLOCKED'];

interface ProcessesViewProps { user: User; initialFilter?: string; }

export function ProcessesView({ user, initialFilter }: ProcessesViewProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

  const [fNumber, setFNumber] = useState('');
  const [fSubject, setFSubject] = useState('');
  const [fDescription, setFDescription] = useState('');
  const [fModality, setFModality] = useState('LICITACAO_13303');
  const [fValue, setFValue] = useState('');
  const [fDepartment, setFDepartment] = useState('');

  const { data: processes = [], isLoading } = useQuery({
    queryKey: ['processes', user.id, user.role],
    queryFn: () => api.processes.list(),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.processes.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['processes'] }); setIsNewOpen(false); resetForm(); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const resetForm = () => { setFNumber(''); setFSubject(''); setFDescription(''); setFModality('LICITACAO_13303'); setFValue(''); setFDepartment(''); };

  const filtered = (processes as any[]).filter(p => {
    const matchSearch =
      p.processNumber?.toLowerCase().includes(search.toLowerCase()) ||
      p.subject?.toLowerCase().includes(search.toLowerCase()) ||
      p.requesterDepartment?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !initialFilter || initialFilter === 'ALL'
      || (initialFilter === 'IN_PROGRESS' ? (p.status !== 'CONCLUDED' && p.status !== 'CANCELED') : p.status === initialFilter);
    return matchSearch && matchFilter;
  });

  if (selectedProcessId) {
    const p = (processes as any[]).find((p: any) => p.id === selectedProcessId);
    return <ProcessDetail processId={selectedProcessId} processSummary={p} user={user} onBack={() => setSelectedProcessId(null)} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-semibold text-white">Processos de Contratação</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Ciclo de vida das contratações — desde o planejamento até a formalização</p>
        </div>
        {(user.role === 'GESTOR' || user.role === 'FISCAL') && (
          <button onClick={() => setIsNewOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <Plus className="h-4 w-4" /> Novo Processo
          </button>
        )}
      </div>

      {initialFilter && initialFilter !== 'ALL' && (
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2.5 text-xs text-blue-300">
          <span className="font-semibold">Filtro ativo:</span>
          <span>{initialFilter === 'IN_PROGRESS' ? 'Processos em Andamento' : initialFilter}</span>
          <span className="text-blue-400/60">· {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
        <input type="text" placeholder="Buscar por número, objeto ou unidade..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-zinc-900/40 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((p: any) => {
            const phases: ProcessPhase[] = p.phases || [];
            const completedPhases = phases.filter(ph => ph.status === 'COMPLETED').length;
            const overduePhases = phases.filter(ph => ph.status === 'OVERDUE' || (ph.plannedEnd && ph.status !== 'COMPLETED' && new Date(ph.plannedEnd) < new Date())).length;
            const progress = phases.length > 0 ? (completedPhases / phases.length) * 100 : 0;
            return (
              <div key={p.id} className="bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 rounded-xl p-5 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{p.processNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${processStatusColor[p.status] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                        {processStatusLabel[p.status] || p.status}
                      </span>
                      {overduePhases > 0 && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-red-500/10 text-red-400 border-red-500/20 flex items-center gap-1">
                          <AlertTriangle className="h-2.5 w-2.5" /> {overduePhases} fase{overduePhases > 1 ? 's' : ''} em atraso
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xl truncate">{p.subject}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500">Progresso</p>
                      <p className="text-xs font-bold text-zinc-300">{completedPhases}/{phases.length} fases</p>
                    </div>
                    <button onClick={() => setSelectedProcessId(p.id)}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer">
                      Gerenciar
                    </button>
                  </div>
                </div>

                {/* Mini timeline */}
                {phases.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {phases.map((ph) => {
                        const isOverdue = ph.plannedEnd && ph.status !== 'COMPLETED' && new Date(ph.plannedEnd) < new Date();
                        const effectiveStatus = isOverdue ? 'OVERDUE' : ph.status;
                        return (
                          <div key={ph.id} className="flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-800"
                            title={`${ph.phaseNumber}. ${ph.name}: ${phaseStatusLabel[effectiveStatus as PhaseStatus]}`}>
                            <div className={`h-full rounded-full ${phaseStatusColor[effectiveStatus as PhaseStatus]?.dot || 'bg-zinc-600'} ${effectiveStatus === 'IN_PROGRESS' ? 'w-1/2' : effectiveStatus === 'COMPLETED' ? 'w-full' : 'w-0'}`} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-zinc-600">
                      <span>Fase 1: {phases[0]?.name}</span>
                      <span className="text-zinc-500">{progress.toFixed(0)}% concluído</span>
                      <span>Fase 9: {phases[8]?.name || 'Encerramento'}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-12 text-center">
          <FolderOpen className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Nenhum processo encontrado.</p>
        </div>
      )}

      {/* Modal Novo Processo */}
      {isNewOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => { setIsNewOpen(false); resetForm(); }} className="absolute right-4 top-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 cursor-pointer"><X className="h-4 w-4" /></button>
            <h3 className="text-sm font-bold text-white mb-1">Abrir Novo Processo de Contratação</h3>
            <p className="text-xs text-zinc-500 mb-5 border-b border-zinc-800 pb-3">9 fases serão criadas automaticamente em status Pendente.</p>
            <form onSubmit={e => { e.preventDefault(); createMutation.mutate({ processNumber: fNumber, subject: fSubject, description: fDescription, modality: fModality, estimatedValue: Number(fValue), requesterDepartment: fDepartment }); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Número do Processo"><input type="text" value={fNumber} onChange={e => setFNumber(e.target.value)} required placeholder="IQUEGO-PRC-2026/00001" className={inputCls} /></Field>
                <Field label="Modalidade"><select value={fModality} onChange={e => setFModality(e.target.value)} required className={inputCls}>{MODALITIES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}</select></Field>
              </div>
              <Field label="Objeto"><input type="text" value={fSubject} onChange={e => setFSubject(e.target.value)} required className={inputCls} placeholder="Objeto da contratação..." /></Field>
              <Field label="Descrição / Justificativa"><textarea value={fDescription} onChange={e => setFDescription(e.target.value)} rows={3} className={inputCls} placeholder="Justificativa técnica..." /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Valor Estimado (R$)"><input type="number" value={fValue} onChange={e => setFValue(e.target.value)} required className={inputCls} /></Field>
                <Field label="Unidade Solicitante"><input type="text" value={fDepartment} onChange={e => setFDepartment(e.target.value)} required className={inputCls} /></Field>
              </div>
              <button type="submit" disabled={createMutation.isPending} className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
                {createMutation.isPending ? 'Abrindo...' : 'Abrir Processo e Criar Fases'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Detalhe com Fases ──────────────────────────────────────────────────────────

function ProcessDetail({ processId, processSummary, user, onBack }: { processId: string; processSummary: any; user: User; onBack: () => void }) {
  const queryClient = useQueryClient();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [phaseEdits, setPhaseEdits] = useState<Partial<ProcessPhase>>({});

  const deleteProcessMutation = useMutation({
    mutationFn: () => api.processes.delete(processId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['processes'] }); onBack(); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const { data: process, isLoading } = useQuery({
    queryKey: ['process-detail', processId],
    queryFn: () => api.processes.get(processId),
    enabled: !!processId,
  });

  const updatePhaseMutation = useMutation({
    mutationFn: ({ phaseId, data }: { phaseId: string; data: any }) => api.processes.updatePhase(processId, phaseId, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['process-detail', processId] }); queryClient.invalidateQueries({ queryKey: ['processes'] }); setEditingPhase(null); setPhaseEdits({}); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const { data: fiscais = [] } = useQuery({
    queryKey: ['fiscais'],
    queryFn: () => api.utils.getFiscais(),
    enabled: !!user,
  });

  const proc = process || processSummary;
  const phases: ProcessPhase[] = (process?.phases || processSummary?.phases || []).sort((a: ProcessPhase, b: ProcessPhase) => a.phaseNumber - b.phaseNumber);

  const canEdit = user.role === 'GESTOR' || user.role === 'FISCAL';

  const startEdit = (ph: ProcessPhase) => {
    setEditingPhase(ph.id);
    setPhaseEdits({ status: ph.status, plannedStart: ph.plannedStart, plannedEnd: ph.plannedEnd, actualStart: ph.actualStart, actualEnd: ph.actualEnd, responsibleId: ph.responsibleId, observations: ph.observations });
  };

  const saveEdit = (phaseId: string) => { updatePhaseMutation.mutate({ phaseId, data: phaseEdits }); };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <button onClick={onBack} className="hover:text-zinc-300 transition-colors">Processos</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-300 font-semibold">{proc?.processNumber}</span>
      </div>

      {/* Cabeçalho do processo */}
      <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">PROCESSO DE CONTRATAÇÃO</span>
            <h2 className="text-xl font-bold text-white mt-1">{proc?.processNumber}</h2>
          </div>
          <div className="flex items-center gap-2 self-start">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${processStatusColor[proc?.status] || ''}`}>
              {processStatusLabel[proc?.status] || proc?.status}
            </span>
            {user.role === 'ADMIN' && (
              <button onClick={() => { if (confirm(`Excluir processo ${proc?.processNumber} permanentemente?`)) deleteProcessMutation.mutate(); }}
                disabled={deleteProcessMutation.isPending}
                className="flex items-center gap-1.5 text-[11px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-lg text-red-400 font-semibold cursor-pointer disabled:opacity-50 transition-colors">
                <Trash2 className="h-3.5 w-3.5" /> {deleteProcessMutation.isPending ? 'Excluindo...' : 'Excluir'}
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">{proc?.subject}</p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs border-t border-zinc-900 pt-4">
          <div><span className="text-zinc-500 block">Modalidade</span><strong className="text-zinc-300">{modalityLabel[proc?.modality] || proc?.modality}</strong></div>
          <div><span className="text-zinc-500 block">Valor Estimado</span><strong className="text-zinc-300">{formatCurrency(proc?.estimatedValue)}</strong></div>
          <div><span className="text-zinc-500 block">Unidade Solicitante</span><strong className="text-zinc-300">{proc?.requesterDepartment}</strong></div>
        </div>
      </div>

      {/* Timeline de Fases */}
      <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Monitoramento de Fases</h3>
            <p className="text-[11px] text-zinc-500">Ciclo de vida da contratação — Lei 13.303/2016</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-zinc-300">{phases.filter(p => p.status === 'COMPLETED').length}/{phases.length}</span>
            <span className="text-[10px] text-zinc-500 block">fases concluídas</span>
          </div>
        </div>

        {/* Barra de progresso geral */}
        {phases.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-0.5 h-2.5 rounded-full overflow-hidden bg-zinc-800 border border-zinc-900">
              {phases.map(ph => {
                const isOverdue = ph.plannedEnd && ph.status !== 'COMPLETED' && new Date(ph.plannedEnd) < new Date();
                const s = isOverdue ? 'OVERDUE' : ph.status;
                return <div key={ph.id} className={`flex-1 ${phaseStatusColor[s as PhaseStatus]?.dot || 'bg-zinc-600'}`} title={`Fase ${ph.phaseNumber}: ${ph.name}`} />;
              })}
            </div>
            <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
              <span>Início</span>
              <span>{((phases.filter(p => p.status === 'COMPLETED').length / Math.max(phases.length, 1)) * 100).toFixed(0)}% concluído</span>
              <span>Encerramento</span>
            </div>
          </div>
        )}

        {/* Lista de fases */}
        {isLoading ? (
          <div className="space-y-2">{[...Array(9)].map((_, i) => <div key={i} className="h-12 bg-zinc-900/40 rounded-lg animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {phases.map((ph) => {
              const isOverdue = ph.plannedEnd && ph.status !== 'COMPLETED' && new Date(ph.plannedEnd) < new Date();
              const effectiveStatus: PhaseStatus = isOverdue ? 'OVERDUE' : ph.status;
              const sc = phaseStatusColor[effectiveStatus];
              const isExpanded = expandedPhase === ph.id;
              const isEditing = editingPhase === ph.id;
              const responsible = (fiscais as any[]).find((f: any) => f.id === (isEditing ? phaseEdits.responsibleId : ph.responsibleId));

              return (
                <div key={ph.id} className={`border rounded-xl overflow-hidden transition-all ${sc.border} ${isExpanded ? 'bg-zinc-950/60' : 'bg-zinc-900/10 hover:bg-zinc-900/30'}`}>
                  {/* Cabeçalho da fase */}
                  <button onClick={() => setExpandedPhase(isExpanded ? null : ph.id)}
                    className="w-full flex items-center gap-3 p-3.5 text-left cursor-pointer">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 ${effectiveStatus === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-zinc-950' : effectiveStatus === 'IN_PROGRESS' ? 'bg-zinc-900 border-blue-500 text-blue-400' : effectiveStatus === 'OVERDUE' ? 'bg-zinc-900 border-red-500 text-red-400' : effectiveStatus === 'BLOCKED' ? 'bg-zinc-900 border-amber-500 text-amber-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>
                      {effectiveStatus === 'COMPLETED' ? <Check className="h-3.5 w-3.5" /> : ph.phaseNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-zinc-200">{ph.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${sc.badge}`}>{phaseStatusLabel[effectiveStatus]}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-zinc-500">
                        {ph.plannedEnd && <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />Prazo: {formatDate(ph.plannedEnd)}</span>}
                        {ph.responsibleId && <span className="flex items-center gap-1"><UserIcon className="h-2.5 w-2.5" />{responsible?.name || ph.responsibleId}</span>}
                        {isOverdue && ph.plannedEnd && <span className="text-red-400 flex items-center gap-1"><AlertTriangle className="h-2.5 w-2.5" />{Math.abs(Math.ceil((new Date(ph.plannedEnd).getTime() - Date.now()) / 86400000))}d em atraso</span>}
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Detalhe expandido */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-zinc-900/60">
                      {isEditing ? (
                        <div className="pt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
                              <select value={phaseEdits.status || ph.status} onChange={e => setPhaseEdits(p => ({ ...p, status: e.target.value as PhaseStatus }))} className={inputCls}>
                                {PHASE_STATUSES.map(s => <option key={s} value={s}>{phaseStatusLabel[s]}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Responsável</label>
                              <select value={phaseEdits.responsibleId || ''} onChange={e => setPhaseEdits(p => ({ ...p, responsibleId: e.target.value || undefined }))} className={inputCls}>
                                <option value="">Não definido</option>
                                {(fiscais as any[]).map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Prazo Previsto Início</label>
                              <input type="date" value={phaseEdits.plannedStart || ''} onChange={e => setPhaseEdits(p => ({ ...p, plannedStart: e.target.value || undefined }))} className={inputCls} />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Prazo Previsto Fim</label>
                              <input type="date" value={phaseEdits.plannedEnd || ''} onChange={e => setPhaseEdits(p => ({ ...p, plannedEnd: e.target.value || undefined }))} className={inputCls} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Início Real</label>
                              <input type="date" value={phaseEdits.actualStart || ''} onChange={e => setPhaseEdits(p => ({ ...p, actualStart: e.target.value || undefined }))} className={inputCls} />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Conclusão Real</label>
                              <input type="date" value={phaseEdits.actualEnd || ''} onChange={e => setPhaseEdits(p => ({ ...p, actualEnd: e.target.value || undefined }))} className={inputCls} />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Observações</label>
                            <textarea value={phaseEdits.observations || ''} onChange={e => setPhaseEdits(p => ({ ...p, observations: e.target.value || undefined }))} rows={3} className={inputCls} placeholder="Anotações técnicas da fase..." />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => saveEdit(ph.id)} disabled={updatePhaseMutation.isPending}
                              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
                              {updatePhaseMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                            <button onClick={() => { setEditingPhase(null); setPhaseEdits({}); }}
                              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer">
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4 space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="space-y-2">
                              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Prazos Previstos</p>
                              <div className="flex justify-between text-zinc-400"><span>Início</span><strong className="text-zinc-300">{ph.plannedStart ? formatDate(ph.plannedStart) : '—'}</strong></div>
                              <div className="flex justify-between text-zinc-400"><span>Fim</span><strong className={`${isOverdue ? 'text-red-400' : 'text-zinc-300'}`}>{ph.plannedEnd ? formatDate(ph.plannedEnd) : '—'}</strong></div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Execução Real</p>
                              <div className="flex justify-between text-zinc-400"><span>Início</span><strong className="text-zinc-300">{ph.actualStart ? formatDate(ph.actualStart) : '—'}</strong></div>
                              <div className="flex justify-between text-zinc-400"><span>Conclusão</span><strong className="text-zinc-300">{ph.actualEnd ? formatDate(ph.actualEnd) : '—'}</strong></div>
                            </div>
                          </div>
                          {ph.observations && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-[11px] text-zinc-400 leading-relaxed">
                              {ph.observations}
                            </div>
                          )}
                          {canEdit && (
                            <button onClick={() => startEdit(ph)}
                              className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-semibold py-2 rounded-lg text-[11px] transition-colors cursor-pointer">
                              Editar Fase
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contratos vinculados */}
      {proc?.contracts?.length > 0 && (
        <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-4">Contratos Derivados</h3>
          <div className="space-y-3">
            {proc.contracts.map((c: any) => (
              <div key={c.id} className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-300">{c.contractNumber}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${processStatusColor[c.status] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}
