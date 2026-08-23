'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FolderOpen, Plus, ChevronRight, Search, X, Check, AlertTriangle, Calendar,
  User as UserIcon, ChevronDown, Trash2, Clock, AlertCircle, CheckCircle2,
  Ban, ArrowRight, FileText, Building2, ChevronLeft,
} from 'lucide-react';
import { api, User, ProcessPhase, ChecklistItem, PhaseStatus, writeAuditLog } from '@/lib/api';
import { processStatusLabel, processStatusColor, modalityLabel, formatCurrency, formatDate } from '@/lib/labels';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';

// ── Constants ──────────────────────────────────────────────────────────────────

const MODALITIES = [
  { value: 'LICITACAO_13303', label: 'Licitação 13.303/2016' },
  { value: 'DISPENSA_13303', label: 'Dispensa 13.303/2016' },
  { value: 'INEXIGIBILIDADE', label: 'Inexigibilidade' },
  { value: 'PREGAO_ELETRONICO', label: 'Pregão Eletrônico' },
  { value: 'OUTROS', label: 'Outros' },
];

const TIPOS_CONTRATACAO = [
  { value: 'DISPENSA_VALOR', label: 'Dispensa por Valor (art. 29, §1º, Lei 13.303)' },
  { value: 'DISPENSA_EMERGENCIAL', label: 'Dispensa Emergencial (art. 29, §3º, Lei 13.303)' },
  { value: 'INEXIGIBILIDADE', label: 'Inexigibilidade (art. 30, Lei 13.303)' },
  { value: 'LICITACAO_13303', label: 'Licitação (art. 31, Lei 13.303)' },
  { value: 'PREGAO_ELETRONICO', label: 'Pregão Eletrônico' },
  { value: 'SERVICO_CONTINUO', label: 'Serviço de Natureza Contínua' },
  { value: 'OUTROS', label: 'Outros' },
];

const PRIORIDADES = [
  { value: 'NORMAL', label: 'Normal' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'URGENTE', label: 'Urgente' },
];

type PhaseFilter = 'TODOS' | 'ATRASADOS' | 'AGUARDANDO_GESTOR' | 'AGUARDANDO_TERCEIRO' | 'CONCLUIDOS';

const phaseFilterLabel: Record<PhaseFilter, string> = {
  TODOS: 'Todas as Fases', ATRASADOS: 'Em Atraso', AGUARDANDO_GESTOR: 'Aguardando Gestor',
  AGUARDANDO_TERCEIRO: 'Aguardando Terceiro', CONCLUIDOS: 'Concluídas',
};

const PHASE_STATUSES: PhaseStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED'];

const phaseStatusLabel: Record<PhaseStatus, string> = {
  PENDING: 'Pendente', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluída',
  OVERDUE: 'Em Atraso', BLOCKED: 'Bloqueada',
};

// Semáforo: green=ok, yellow=atenção, red=crítico, gray=inativo
function getSemaforo(ph: ProcessPhase): 'green' | 'yellow' | 'red' | 'gray' {
  if (ph.status === 'COMPLETED') return 'green';
  if (ph.status === 'BLOCKED') return 'gray';
  const now = new Date();
  const deadline = ph.plannedEnd ? new Date(ph.plannedEnd) : null;
  if (deadline && deadline < now) return 'red';
  if (deadline) {
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / 86400000);
    if (daysLeft <= 5) return 'yellow';
  }
  if (ph.status === 'IN_PROGRESS') return 'yellow';
  return 'gray';
}

const semaforoStyle = {
  green:  { dot: 'bg-emerald-500', ring: 'ring-emerald-300', border: 'border-emerald-500/40', bg: 'bg-emerald-50' },
  yellow: { dot: 'bg-amber-400',   ring: 'ring-amber-300',   border: 'border-amber-400/40',   bg: 'bg-amber-50' },
  red:    { dot: 'bg-red-500',     ring: 'ring-red-300',     border: 'border-red-500/40',     bg: 'bg-red-50' },
  gray:   { dot: 'bg-gray-300',    ring: 'ring-gray-200',    border: 'border-gray-200',        bg: 'bg-white' },
};

// ── ProcessesView ──────────────────────────────────────────────────────────────

interface ProcessesViewProps { user: User; initialFilter?: string; }

export function ProcessesView({ user, initialFilter }: ProcessesViewProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(1);

  // Form state — Step 1
  const [fNumber, setFNumber] = useState('');
  const [fSubject, setFSubject] = useState('');
  const [fDescription, setFDescription] = useState('');
  const [fModality, setFModality] = useState('LICITACAO_13303');
  const [fTipoContratacao, setFTipoContratacao] = useState('');
  const [fFundamentoLegal, setFFundamentoLegal] = useState('');
  // Step 2
  const [fDepartment, setFDepartment] = useState('');
  const [fResponsavel, setFResponsavel] = useState('');
  const [fDataSolicitacao, setFDataSolicitacao] = useState('');
  const [fValue, setFValue] = useState('');
  const [fPrioridade, setFPrioridade] = useState('NORMAL');
  // Step 3
  const [fPrazoCritico, setFPrazoCritico] = useState(false);
  const [fDataLimite, setFDataLimite] = useState('');
  const [fJustUrgencia, setFJustUrgencia] = useState('');
  const [fExigeTR, setFExigeTR] = useState(true);
  const [fExigeParecerJur, setFExigeParecerJur] = useState(true);
  const [fExigeRatificacao, setFExigeRatificacao] = useState(true);
  const [fExigeContrato, setFExigeContrato] = useState(true);
  const [fExigePublicacao, setFExigePublicacao] = useState(true);
  const [fObsGerenciais, setFObsGerenciais] = useState('');

  const { data: processes = [], isLoading } = useQuery({
    queryKey: ['processes', user.id, user.role],
    queryFn: () => api.processes.list(),
    enabled: !!user,
    staleTime: 300_000,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.processes.create(data),
    onSuccess: (created: any, vars: any) => {
      writeAuditLog(user, 'CREATE', 'Process', created?.id || vars.processNumber, `Processo ${vars.processNumber} aberto — ${vars.subject}`);
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      setIsNewOpen(false);
      resetForm();
      if (created?.id) setSelectedProcessId(created.id);
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const resetForm = () => {
    setFNumber(''); setFSubject(''); setFDescription(''); setFModality('LICITACAO_13303');
    setFTipoContratacao(''); setFFundamentoLegal(''); setFDepartment(''); setFResponsavel('');
    setFDataSolicitacao(''); setFValue(''); setFPrioridade('NORMAL'); setFPrazoCritico(false);
    setFDataLimite(''); setFJustUrgencia(''); setFExigeTR(true); setFExigeParecerJur(true);
    setFExigeRatificacao(true); setFExigeContrato(true); setFExigePublicacao(true);
    setFObsGerenciais(''); setFormStep(1);
  };

  const hasOverduePhase = (p: any) =>
    (p.phases || []).some((ph: any) => ph.status !== 'COMPLETED' && ph.plannedEnd && new Date(ph.plannedEnd) < new Date());

  const filtered = (processes as any[]).filter(p => {
    const matchSearch =
      p.processNumber?.toLowerCase().includes(search.toLowerCase()) ||
      p.subject?.toLowerCase().includes(search.toLowerCase()) ||
      p.requesterDepartment?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !initialFilter || initialFilter === 'ALL'
      || (initialFilter === 'DELAYED' ? hasOverduePhase(p) : false)
      || (initialFilter === 'IN_PROGRESS' ? (p.status !== 'CONCLUDED' && p.status !== 'CANCELED') : p.status === initialFilter);
    return matchSearch && matchFilter;
  });

  if (selectedProcessId) {
    const p = (processes as any[]).find((p: any) => p.id === selectedProcessId);
    return <ProcessDetail processId={selectedProcessId} processSummary={p} user={user} onBack={() => setSelectedProcessId(null)} />;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createMutation.mutate({
      processNumber: fNumber, subject: fSubject, description: fDescription,
      modality: fModality, tipoContratacao: fTipoContratacao || null,
      fundamentoLegalPreliminar: fFundamentoLegal || null,
      estimatedValue: Number(fValue), requesterDepartment: fDepartment,
      responsavelDemanda: fResponsavel || null,
      dataSolicitacao: fDataSolicitacao || null, prioridade: fPrioridade,
      possuiPrazoCritico: fPrazoCritico, dataLimiteProcesso: fDataLimite || null,
      justificativaUrgencia: fJustUrgencia || null,
      exigeTR: fExigeTR, exigeParecerJuridico: fExigeParecerJur,
      exigeRatificacaoAutoridade: fExigeRatificacao, exigeContratoFormal: fExigeContrato,
      exigePublicacaoDivulgacao: fExigePublicacao, observacoesGerenciais: fObsGerenciais || null,
    });
  };

  const kpi = {
    active: (processes as any[]).filter((p: any) => p.status !== 'CONCLUDED' && p.status !== 'CANCELED').length,
    delayed: (processes as any[]).filter(hasOverduePhase).length,
    pending: (processes as any[]).filter((p: any) => p.status === 'PLANNING' || p.status === 'LEGAL_REVIEW').length,
    concluded: (processes as any[]).filter((p: any) => p.status === 'CONCLUDED').length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Processos</h2>
          <p className="text-xs text-gray-500 mt-0.5">Ciclo de vida das contratações — desde o planejamento até a formalização</p>
        </div>
        <button onClick={() => { setIsNewOpen(true); setFormStep(1); }}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
          <Plus className="h-4 w-4" /> Novo Processo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={FolderOpen} label="Ativos" value={kpi.active} tone="blue" align="center" />
        <StatCard icon={AlertTriangle} label="Atrasados" value={kpi.delayed} tone="red" align="center" />
        <StatCard icon={Clock} label="Pendentes" value={kpi.pending} tone="amber" align="center" />
        <StatCard icon={CheckCircle2} label="Concluídos" value={kpi.concluded} tone="green" align="center" />
      </div>

      {initialFilter && initialFilter !== 'ALL' && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs border ${initialFilter === 'DELAYED' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-300'}`}>
          {initialFilter === 'DELAYED' && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
          <span className="font-semibold">Filtro ativo:</span>
          <span>{initialFilter === 'DELAYED' ? 'Processos com Fases em Atraso' : initialFilter === 'IN_PROGRESS' ? 'Processos em Andamento' : initialFilter}</span>
          <span className="opacity-60">· {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
        <input type="text" placeholder="Buscar por número, objeto ou unidade..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-100/40 border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-100/40 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((p: any) => {
            const phases: ProcessPhase[] = (p.phases || []).sort((a: ProcessPhase, b: ProcessPhase) => a.phaseNumber - b.phaseNumber);
            const completedCount = phases.filter(ph => ph.status === 'COMPLETED').length;
            const overdueCount = phases.filter(ph => ph.status !== 'COMPLETED' && ph.plannedEnd && new Date(ph.plannedEnd) < new Date()).length;
            const progress = phases.length > 0 ? (completedCount / phases.length) * 100 : 0;
            const activePhase = phases.find(ph => ph.status === 'IN_PROGRESS') || phases.find(ph => ph.status === 'PENDING');
            const prioStyle = p.prioridade === 'URGENTE' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
              p.prioridade === 'ALTA' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
              'bg-gray-100 text-gray-500 border-gray-200';
            return (
              <div key={p.id} className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-5 transition-colors shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold text-gray-900">{p.processNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${processStatusColor[p.status] || 'bg-gray-100 text-gray-500 border-gray-300'}`}>
                        {processStatusLabel[p.status] || p.status}
                      </span>
                      {p.prioridade && p.prioridade !== 'NORMAL' && (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${prioStyle}`}>{p.prioridade}</span>
                      )}
                      {overdueCount > 0 && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
                          <AlertTriangle className="h-2.5 w-2.5" /> {overdueCount} fase{overdueCount > 1 ? 's' : ''} em atraso
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate max-w-xl">{p.subject}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{p.requesterDepartment}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] text-gray-400">Progresso</p>
                      <p className="text-xs font-bold text-gray-700">{completedCount}/{phases.length} fases</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">{progress.toFixed(0)}%</p>
                    </div>
                    <button onClick={() => setSelectedProcessId(p.id)}
                      className="bg-gray-900 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1">
                      Gerenciar Fases <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                {phases.length > 0 && (
                  <div>
                    <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-gray-100 border border-gray-200 mb-1.5">
                      {phases.map(ph => {
                        const s = getSemaforo(ph);
                        return <div key={ph.id} className={`flex-1 ${s === 'green' ? 'bg-emerald-500' : s === 'red' ? 'bg-red-400' : s === 'yellow' ? 'bg-amber-400' : 'bg-gray-200'}`}
                          title={`${ph.phaseNumber}. ${ph.name}`} />;
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-gray-400">
                      <span>Fase 1 — {phases[0]?.name}</span>
                      {activePhase && <span className="text-blue-500 font-medium">↪ Fase {activePhase.phaseNumber}: {activePhase.name}</span>}
                      <span>Fase 14 — Encerramento</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={FolderOpen} title="Nenhum processo encontrado" description="Ajuste a busca ou o filtro para ver resultados." />
      )}

      {/* Modal Novo Processo */}
      {isNewOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Abrir Novo Processo de Contratação</h3>
                <p className="text-xs text-gray-500 mt-0.5">14 fases serão criadas automaticamente — Lei 13.303/2016</p>
              </div>
              <button onClick={() => { setIsNewOpen(false); resetForm(); }} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"><X className="h-4 w-4" /></button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 px-6 pt-4 shrink-0">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${formStep === s ? 'bg-emerald-500 text-white' : formStep > s ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                    {formStep > s ? <Check className="h-3 w-3" /> : s}
                  </div>
                  <span className={`text-[10px] font-medium ${formStep === s ? 'text-gray-800' : 'text-gray-400'}`}>
                    {s === 1 ? 'Identificação' : s === 2 ? 'Solicitação' : 'Configurações'}
                  </span>
                  {s < 3 && <div className="w-8 h-px bg-gray-200 mx-1" />}
                </div>
              ))}
            </div>

            {/* Form body */}
            <div className="overflow-y-auto flex-1 px-6 py-4">
              <form id="new-process-form" onSubmit={handleSubmit}>
                {formStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Número do Processo *">
                        <input type="text" value={fNumber} onChange={e => setFNumber(e.target.value)} required placeholder="Ex: 202600055" className={inputCls} />
                      </Field>
                      <Field label="Modalidade *">
                        <select value={fModality} onChange={e => setFModality(e.target.value)} required className={inputCls}>
                          {MODALITIES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Objeto / Título *">
                      <input type="text" value={fSubject} onChange={e => setFSubject(e.target.value)} required className={inputCls} placeholder="Objeto resumido da contratação..." />
                    </Field>
                    <Field label="Descrição / Justificativa">
                      <textarea value={fDescription} onChange={e => setFDescription(e.target.value)} rows={3} className={inputCls} placeholder="Justificativa técnica da necessidade..." />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Tipo de Contratação">
                        <select value={fTipoContratacao} onChange={e => setFTipoContratacao(e.target.value)} className={inputCls}>
                          <option value="">Selecionar...</option>
                          {TIPOS_CONTRATACAO.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Fundamento Legal Preliminar">
                        <input type="text" value={fFundamentoLegal} onChange={e => setFFundamentoLegal(e.target.value)} className={inputCls} placeholder="Art. XX, Lei 13.303/2016..." />
                      </Field>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Unidade Solicitante *">
                        <input type="text" value={fDepartment} onChange={e => setFDepartment(e.target.value)} required className={inputCls} placeholder="Ex: DIENG, COTIN..." />
                      </Field>
                      <Field label="Responsável pela Demanda">
                        <input type="text" value={fResponsavel} onChange={e => setFResponsavel(e.target.value)} className={inputCls} placeholder="Nome do responsável..." />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Data da Solicitação">
                        <input type="date" value={fDataSolicitacao} onChange={e => setFDataSolicitacao(e.target.value)} className={inputCls} />
                      </Field>
                      <Field label="Prioridade">
                        <select value={fPrioridade} onChange={e => setFPrioridade(e.target.value)} className={inputCls}>
                          {PRIORIDADES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Valor Estimado (R$) *">
                      <input type="number" value={fValue} onChange={e => setFValue(e.target.value)} required min="0" step="0.01" className={inputCls} placeholder="0,00" />
                    </Field>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="space-y-5">
                    {/* Prazo crítico */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-800">Possui Prazo Crítico?</span>
                        <button type="button" onClick={() => setFPrazoCritico(v => !v)}
                          className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${fPrazoCritico ? 'bg-red-500' : 'bg-gray-200'}`}>
                          <div className={`h-3.5 w-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${fPrazoCritico ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      {fPrazoCritico && (
                        <>
                          <Field label="Data Limite do Processo">
                            <input type="date" value={fDataLimite} onChange={e => setFDataLimite(e.target.value)} className={inputCls} />
                          </Field>
                          <Field label="Justificativa de Urgência">
                            <textarea value={fJustUrgencia} onChange={e => setFJustUrgencia(e.target.value)} rows={2} className={inputCls} placeholder="Motivo do prazo crítico..." />
                          </Field>
                        </>
                      )}
                    </div>

                    {/* Exigências */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Exigências do Processo</p>
                      <div className="space-y-2">
                        {[
                          { label: 'Exige Termo de Referência', value: fExigeTR, set: setFExigeTR },
                          { label: 'Exige Parecer Jurídico', value: fExigeParecerJur, set: setFExigeParecerJur },
                          { label: 'Exige Ratificação / Autorização da Autoridade', value: fExigeRatificacao, set: setFExigeRatificacao },
                          { label: 'Exige Contrato Formal', value: fExigeContrato, set: setFExigeContrato },
                          { label: 'Exige Publicação / Divulgação', value: fExigePublicacao, set: setFExigePublicacao },
                        ].map(item => (
                          <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                            <button type="button" onClick={() => item.set(v => !v)}
                              className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${item.value ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'}`}>
                              {item.value && <Check className="h-2.5 w-2.5 text-white" />}
                            </button>
                            <span className="text-xs text-gray-700">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Field label="Observações Gerenciais">
                      <textarea value={fObsGerenciais} onChange={e => setFObsGerenciais(e.target.value)} rows={3} className={inputCls} placeholder="Observações internas de gestão..." />
                    </Field>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 shrink-0">
              <button type="button" onClick={() => formStep > 1 ? setFormStep(s => s - 1) : (setIsNewOpen(false), resetForm())}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-medium cursor-pointer transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" /> {formStep > 1 ? 'Anterior' : 'Cancelar'}
              </button>
              {formStep < 3 ? (
                <button type="button" onClick={() => {
                  if (formStep === 1 && (!fNumber.trim() || !fSubject.trim())) { alert('Preencha Número e Objeto.'); return; }
                  if (formStep === 2 && (!fDepartment.trim() || !fValue)) { alert('Preencha Unidade Solicitante e Valor.'); return; }
                  setFormStep(s => s + 1);
                }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
                  Próximo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button form="new-process-form" type="submit" disabled={createMutation.isPending}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50">
                  {createMutation.isPending ? 'Abrindo...' : <><Check className="h-3.5 w-3.5" /> Abrir Processo</>}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ProcessDetail ──────────────────────────────────────────────────────────────

function ProcessDetail({ processId, processSummary, user, onBack }: {
  processId: string; processSummary: any; user: User; onBack: () => void;
}) {
  const queryClient = useQueryClient();
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('TODOS');
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [phaseEdits, setPhaseEdits] = useState<Partial<ProcessPhase & { status: PhaseStatus }>>({});

  const { data: process, isLoading } = useQuery({
    queryKey: ['process-detail', processId],
    queryFn: () => api.processes.get(processId),
    enabled: !!processId,
  });

  const { data: fiscais = [] } = useQuery({
    queryKey: ['fiscais'],
    queryFn: () => api.utils.getFiscais(),
    enabled: !!user,
  });

  const updatePhaseMutation = useMutation({
    mutationFn: ({ phaseId, data }: { phaseId: string; data: any }) => api.processes.updatePhase(processId, phaseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process-detail', processId] });
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      setEditingPhase(null); setPhaseEdits({});
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const deleteProcessMutation = useMutation({
    mutationFn: () => api.processes.delete(processId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['processes'] }); onBack(); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const proc = process || processSummary;
  const allPhases: ProcessPhase[] = ((process?.phases || processSummary?.phases || []) as ProcessPhase[])
    .sort((a, b) => a.phaseNumber - b.phaseNumber);

  const canEdit = user.role === 'GESTOR' || user.role === 'FISCAL' || user.role === 'ADMIN';
  const canCheck = user.role === 'GESTOR' || user.role === 'ADMIN';

  const completedCount = allPhases.filter(p => p.status === 'COMPLETED').length;
  const overdueCount = allPhases.filter(p => p.status !== 'COMPLETED' && p.plannedEnd && new Date(p.plannedEnd) < new Date()).length;
  const progress = allPhases.length > 0 ? (completedCount / allPhases.length) * 100 : 0;
  const nextCritical = allPhases.find(p => p.status !== 'COMPLETED' && p.bloqueiaAvancoSemConclusao);

  const phases = useMemo(() => {
    return allPhases.filter(ph => {
      const isOverdue = ph.status !== 'COMPLETED' && ph.plannedEnd && new Date(ph.plannedEnd) < new Date();
      if (phaseFilter === 'ATRASADOS') return isOverdue;
      if (phaseFilter === 'CONCLUIDOS') return ph.status === 'COMPLETED';
      if (phaseFilter === 'AGUARDANDO_GESTOR') return ph.status === 'IN_PROGRESS' || (ph.status === 'PENDING' && ph.phaseNumber === (allPhases.find(p => p.status === 'IN_PROGRESS')?.phaseNumber ?? 0) + 1);
      if (phaseFilter === 'AGUARDANDO_TERCEIRO') return ph.responsavelSetor && !['Fiscal do Contrato / Gestão', 'Diretoria / RH'].includes(ph.responsavelSetor || '') && ph.status === 'IN_PROGRESS';
      return true;
    });
  }, [allPhases, phaseFilter]);

  const startEdit = (ph: ProcessPhase) => {
    setEditingPhase(ph.id);
    setPhaseEdits({
      status: ph.status, plannedStart: ph.plannedStart, plannedEnd: ph.plannedEnd,
      actualStart: ph.actualStart, actualEnd: ph.actualEnd, responsibleId: ph.responsibleId,
      observacoes: ph.observacoes, responsavelSetor: ph.responsavelSetor,
      pendenciaCritica: ph.pendenciaCritica, checklistItems: ph.checklistItems ? [...ph.checklistItems] : undefined,
    });
  };

  const toggleChecklist = (ph: ProcessPhase, itemId: string) => {
    const items = (ph.checklistItems || []).map(ci =>
      ci.id === itemId ? { ...ci, concluido: !ci.concluido } : ci
    );
    updatePhaseMutation.mutate({ phaseId: ph.id, data: { checklistItems: items } });
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <button onClick={onBack} className="hover:text-gray-700 transition-colors cursor-pointer">Processos</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-700 font-semibold">{proc?.processNumber}</span>
      </div>

      {/* Cabeçalho do processo */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">PROCESSO DE CONTRATAÇÃO</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${processStatusColor[proc?.status] || 'bg-gray-100 text-gray-500 border-gray-300'}`}>
                {processStatusLabel[proc?.status] || proc?.status}
              </span>
              {proc?.prioridade && proc.prioridade !== 'NORMAL' && (
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${proc.prioridade === 'URGENTE' ? 'bg-red-50 text-red-500 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                  {proc.prioridade}
                </span>
              )}
              {proc?.possuiPrazoCritico && (
                <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-red-50 text-red-500 border-red-200 flex items-center gap-1">
                  <AlertCircle className="h-2.5 w-2.5" /> PRAZO CRÍTICO
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900">{proc?.processNumber}</h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{proc?.subject}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {user.role === 'ADMIN' && (
              <button onClick={() => { if (confirm(`Excluir processo ${proc?.processNumber}?`)) deleteProcessMutation.mutate(); }}
                disabled={deleteProcessMutation.isPending}
                className="flex items-center gap-1 text-[10px] bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg text-red-500 font-semibold cursor-pointer disabled:opacity-50 transition-colors">
                <Trash2 className="h-3 w-3" /> Excluir
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-gray-100 pt-4">
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Modalidade</span>
            <strong className="text-gray-700">{modalityLabel[proc?.modality] || proc?.modality}</strong>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Valor Estimado</span>
            <strong className="text-gray-700">{formatCurrency(proc?.estimatedValue)}</strong>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Unidade Solicitante</span>
            <strong className="text-gray-700">{proc?.requesterDepartment}</strong>
          </div>
          {proc?.responsavelDemanda && (
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Responsável Demanda</span>
              <strong className="text-gray-700">{proc.responsavelDemanda}</strong>
            </div>
          )}
          {proc?.dataSolicitacao && (
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Data Solicitação</span>
              <strong className="text-gray-700">{formatDate(proc.dataSolicitacao)}</strong>
            </div>
          )}
          {proc?.dataLimiteProcesso && (
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Data Limite</span>
              <strong className="text-red-500">{formatDate(proc.dataLimiteProcesso)}</strong>
            </div>
          )}
          {proc?.tipoContratacao && (
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Tipo</span>
              <strong className="text-gray-700">{TIPOS_CONTRATACAO.find(t => t.value === proc.tipoContratacao)?.label || proc.tipoContratacao}</strong>
            </div>
          )}
          {proc?.fundamentoLegalPreliminar && (
            <div className="col-span-2">
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Fundamento Legal</span>
              <strong className="text-gray-700">{proc.fundamentoLegalPreliminar}</strong>
            </div>
          )}
        </div>

        {proc?.observacoesGerenciais && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Observações Gerenciais</span>
            <p className="text-xs text-gray-600 leading-relaxed">{proc.observacoesGerenciais}</p>
          </div>
        )}
      </div>

      {/* Painel de progresso gerencial */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">{progress.toFixed(0)}%</div>
          <div className="text-[10px] text-gray-500 mt-1">Progresso Geral</div>
          <div className="text-[9px] text-gray-400">{completedCount}/{allPhases.length} fases concluídas</div>
        </div>
        <div className={`border rounded-xl p-4 text-center shadow-sm ${overdueCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
          <div className={`text-2xl font-bold ${overdueCount > 0 ? 'text-red-500' : 'text-gray-300'}`}>{overdueCount}</div>
          <div className="text-[10px] text-gray-500 mt-1">Fases em Atraso</div>
          <div className="text-[9px] text-gray-400">{overdueCount > 0 ? 'Requer atenção imediata' : 'Sem atrasos'}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Próxima Pendência</div>
          {nextCritical ? (
            <>
              <div className="text-xs font-bold text-gray-800">Fase {nextCritical.phaseNumber}</div>
              <div className="text-[10px] text-gray-500 leading-tight">{nextCritical.name}</div>
            </>
          ) : (
            <div className="text-xs text-gray-400">Nenhuma</div>
          )}
        </div>
      </div>

      {/* Barra de progresso visual */}
      {allPhases.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex gap-px h-3 rounded-full overflow-hidden bg-gray-100 mb-2">
            {allPhases.map(ph => {
              const s = getSemaforo(ph);
              return <div key={ph.id} className={`flex-1 ${s === 'green' ? 'bg-emerald-500' : s === 'red' ? 'bg-red-400' : s === 'yellow' ? 'bg-amber-400' : 'bg-gray-200'}`}
                title={`${ph.phaseNumber}. ${ph.name}`} />;
            })}
          </div>
          <div className="flex justify-between text-[9px] text-gray-400">
            <span>Fase 1: Solicitação</span>
            <span>{progress.toFixed(0)}% concluído</span>
            <span>Fase 14: Encerramento</span>
          </div>
        </div>
      )}

      {/* Filtros + lista de fases */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Filtro tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
          {(['TODOS', 'ATRASADOS', 'AGUARDANDO_GESTOR', 'AGUARDANDO_TERCEIRO', 'CONCLUIDOS'] as PhaseFilter[]).map(f => {
            const count = f === 'TODOS' ? allPhases.length :
              f === 'ATRASADOS' ? overdueCount :
              f === 'CONCLUIDOS' ? completedCount :
              allPhases.filter(ph => ph.status === 'IN_PROGRESS').length;
            return (
              <button key={f} onClick={() => setPhaseFilter(f)}
                className={`px-4 py-3 text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px ${phaseFilter === f ? 'text-emerald-600 border-emerald-500 bg-white' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
                {phaseFilterLabel[f]} {count > 0 && <span className="ml-1 bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 text-[9px]">{count}</span>}
              </button>
            );
          })}
        </div>

        {/* Fases */}
        {isLoading ? (
          <div className="p-4 space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}</div>
        ) : phases.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400">Nenhuma fase nesta categoria.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {phases.map((ph) => {
              const semaforo = getSemaforo(ph);
              const ss = semaforoStyle[semaforo];
              const isOverdue = ph.status !== 'COMPLETED' && ph.plannedEnd && new Date(ph.plannedEnd) < new Date();
              const effectiveStatus: PhaseStatus = isOverdue ? 'OVERDUE' : ph.status;
              const isExpanded = expandedPhase === ph.id;
              const isEditing = editingPhase === ph.id;
              const responsible = (fiscais as any[]).find((f: any) => f.id === ph.responsibleId);
              const checkItems: ChecklistItem[] = ph.checklistItems || [];
              const checkDone = checkItems.filter(c => c.concluido).length;
              const daysLeft = ph.plannedEnd ? Math.ceil((new Date(ph.plannedEnd).getTime() - Date.now()) / 86400000) : null;

              // Check if blocked by previous phase
              const prevPhase = allPhases.find(p => p.phaseNumber === ph.phaseNumber - 1);
              const isBlockedByPrev = prevPhase?.bloqueiaAvancoSemConclusao && prevPhase.status !== 'COMPLETED' && ph.status !== 'COMPLETED';

              return (
                <div key={ph.id} className={`transition-colors ${isExpanded ? ss.bg : 'hover:bg-gray-50'}`}>
                  {/* Cabeçalho da fase — clicável */}
                  <button onClick={() => setExpandedPhase(isExpanded ? null : ph.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer">
                    {/* Semáforo */}
                    <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${ss.border} ${ss.bg} ring-2 ${ss.ring}`}>
                      {semaforo === 'green' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> :
                       semaforo === 'red' ? <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> :
                       semaforo === 'yellow' ? <Clock className="h-3.5 w-3.5 text-amber-500" /> :
                       <span className="text-gray-400">{ph.phaseNumber}</span>}
                    </div>

                    {/* Número + nome + badges */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-gray-400 font-mono">Fase {ph.phaseNumber}</span>
                        <span className="text-xs font-semibold text-gray-800 truncate">{ph.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                          effectiveStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                          effectiveStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                          effectiveStatus === 'OVERDUE' ? 'bg-red-100 text-red-600' :
                          effectiveStatus === 'BLOCKED' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-500'}`}>
                          {phaseStatusLabel[effectiveStatus]}
                        </span>
                        {isBlockedByPrev && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1"><Ban className="h-2.5 w-2.5" />Aguarda fase {ph.phaseNumber - 1}</span>}
                        {ph.bloqueiaAvancoSemConclusao && ph.status !== 'COMPLETED' && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-orange-50 text-orange-600 border border-orange-200">Bloqueante</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400">
                        {ph.responsavelSetor && <span className="flex items-center gap-1"><Building2 className="h-2.5 w-2.5" />{ph.responsavelSetor}</span>}
                        {responsible && <span className="flex items-center gap-1"><UserIcon className="h-2.5 w-2.5" />{responsible.name}</span>}
                        {ph.plannedEnd && <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />Prazo: {formatDate(ph.plannedEnd)}</span>}
                        {daysLeft !== null && daysLeft < 0 && ph.status !== 'COMPLETED' && (
                          <span className="text-red-500 font-medium flex items-center gap-1"><AlertTriangle className="h-2.5 w-2.5" />{Math.abs(daysLeft)}d em atraso</span>
                        )}
                        {daysLeft !== null && daysLeft >= 0 && daysLeft <= 5 && ph.status !== 'COMPLETED' && (
                          <span className="text-amber-600 font-medium flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{daysLeft}d restantes</span>
                        )}
                      </div>
                    </div>

                    {/* Checklist mini */}
                    {checkItems.length > 0 && (
                      <div className="shrink-0 text-right hidden sm:block">
                        <div className={`text-[10px] font-bold ${checkDone === checkItems.length ? 'text-emerald-600' : 'text-gray-600'}`}>
                          {checkDone}/{checkItems.length}
                        </div>
                        <div className="text-[9px] text-gray-400">itens</div>
                      </div>
                    )}
                    <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Painel expandido */}
                  {isExpanded && (
                    <div className="px-4 pb-5 border-t border-gray-100">
                      {/* Descrição */}
                      {ph.descricao && (
                        <div className="mt-3 mb-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Descrição da Fase</p>
                          <p className="text-xs text-gray-700 leading-relaxed">{ph.descricao}</p>
                        </div>
                      )}
                      {ph.documentoObrigatorio && (
                        <div className="mb-3 flex items-center gap-2 text-xs">
                          <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span className="text-gray-500">Documento obrigatório:</span>
                          <strong className="text-gray-800">{ph.documentoObrigatorio}</strong>
                        </div>
                      )}

                      {isEditing ? (
                        /* ── Modo Edição ── */
                        <div className="space-y-4 mt-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                              <select value={phaseEdits.status || ph.status} onChange={e => setPhaseEdits(p => ({ ...p, status: e.target.value as PhaseStatus }))} className={inputCls}>
                                {PHASE_STATUSES.map(s => <option key={s} value={s}>{phaseStatusLabel[s]}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Responsável</label>
                              <select value={phaseEdits.responsibleId || ''} onChange={e => setPhaseEdits(p => ({ ...p, responsibleId: e.target.value || undefined }))} className={inputCls}>
                                <option value="">Não definido</option>
                                {(fiscais as any[]).map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Prazo Previsto Início</label>
                              <input type="date" value={phaseEdits.plannedStart || ''} onChange={e => setPhaseEdits(p => ({ ...p, plannedStart: e.target.value }))} className={inputCls} />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Prazo Previsto Fim</label>
                              <input type="date" value={phaseEdits.plannedEnd || ''} onChange={e => setPhaseEdits(p => ({ ...p, plannedEnd: e.target.value }))} className={inputCls} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Início Real</label>
                              <input type="date" value={phaseEdits.actualStart || ''} onChange={e => setPhaseEdits(p => ({ ...p, actualStart: e.target.value }))} className={inputCls} />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Conclusão Real</label>
                              <input type="date" value={phaseEdits.actualEnd || ''} onChange={e => setPhaseEdits(p => ({ ...p, actualEnd: e.target.value }))} className={inputCls} />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Setor Responsável</label>
                            <input type="text" value={phaseEdits.responsavelSetor || ''} onChange={e => setPhaseEdits(p => ({ ...p, responsavelSetor: e.target.value }))} className={inputCls} placeholder="Ex: Assessoria Jurídica..." />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pendência Crítica</label>
                            <textarea value={phaseEdits.pendenciaCritica || ''} onChange={e => setPhaseEdits(p => ({ ...p, pendenciaCritica: e.target.value }))} rows={2} className={inputCls} placeholder="Descreva a pendência crítica desta fase..." />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Observações</label>
                            <textarea value={phaseEdits.observacoes || ''} onChange={e => setPhaseEdits(p => ({ ...p, observacoes: e.target.value }))} rows={2} className={inputCls} placeholder="Anotações técnicas..." />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => updatePhaseMutation.mutate({ phaseId: ph.id, data: phaseEdits })} disabled={updatePhaseMutation.isPending}
                              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2 rounded-lg text-xs cursor-pointer disabled:opacity-50 transition-colors">
                              {updatePhaseMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                            <button onClick={() => { setEditingPhase(null); setPhaseEdits({}); }}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-xs cursor-pointer transition-colors">
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ── Modo Visualização ── */
                        <div className="mt-3 space-y-4">
                          {/* Checklist */}
                          {checkItems.length > 0 && (
                            <div>
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FileText className="h-3 w-3" />
                                Checklist — {checkDone}/{checkItems.length} concluídos
                              </p>
                              <div className="space-y-1.5">
                                {checkItems.map(ci => (
                                  <label key={ci.id} className="flex items-start gap-2.5 cursor-pointer group">
                                    <button type="button" onClick={() => canCheck && toggleChecklist(ph, ci.id)} disabled={!canCheck}
                                      className={`mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${ci.concluido ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'} ${!canCheck ? 'cursor-default' : 'cursor-pointer'}`}>
                                      {ci.concluido && <Check className="h-2.5 w-2.5 text-white" />}
                                    </button>
                                    <span className={`text-xs leading-snug ${ci.concluido ? 'line-through text-gray-400' : 'text-gray-700'}`}>{ci.texto}</span>
                                  </label>
                                ))}
                              </div>
                              {checkDone === checkItems.length && checkItems.length > 0 && (
                                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Todos os itens concluídos
                                </div>
                              )}
                            </div>
                          )}

                          {/* Datas e responsável */}
                          <div className="grid grid-cols-2 gap-4 text-xs border-t border-gray-100 pt-3">
                            <div className="space-y-1.5">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Prazos Previstos</p>
                              <div className="flex justify-between text-gray-500"><span>Início</span><strong className="text-gray-700">{ph.plannedStart ? formatDate(ph.plannedStart) : '—'}</strong></div>
                              <div className="flex justify-between text-gray-500"><span>Fim</span><strong className={isOverdue ? 'text-red-500' : 'text-gray-700'}>{ph.plannedEnd ? formatDate(ph.plannedEnd) : '—'}</strong></div>
                            </div>
                            <div className="space-y-1.5">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Execução Real</p>
                              <div className="flex justify-between text-gray-500"><span>Início</span><strong className="text-gray-700">{ph.actualStart ? formatDate(ph.actualStart) : '—'}</strong></div>
                              <div className="flex justify-between text-gray-500"><span>Conclusão</span><strong className="text-gray-700">{ph.actualEnd ? formatDate(ph.actualEnd) : '—'}</strong></div>
                            </div>
                          </div>

                          {ph.pendenciaCritica && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                              <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[9px] font-bold text-red-600 uppercase tracking-wider mb-0.5">Pendência Crítica</p>
                                <p className="text-xs text-red-800">{ph.pendenciaCritica}</p>
                              </div>
                            </div>
                          )}

                          {ph.observacoes && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600 leading-relaxed">
                              {ph.observacoes}
                            </div>
                          )}

                          {canEdit && (
                            <button onClick={() => startEdit(ph)}
                              className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-[11px] cursor-pointer transition-colors">
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
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />Contratos Derivados</h3>
          <div className="space-y-2">
            {proc.contracts.map((c: any) => (
              <div key={c.id} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">{c.contractNumber}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${processStatusColor[c.status] || 'bg-gray-100 text-gray-500 border-gray-300'}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}
