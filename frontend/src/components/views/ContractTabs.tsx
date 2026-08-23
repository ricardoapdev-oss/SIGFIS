'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Building, FileText, Users, UserCheck, Calendar, ClipboardList,
  AlertTriangle, DollarSign, Bell, History, ChevronLeft, Plus,
  CheckCircle, XCircle, Clock, Shield, ExternalLink, FileSignature,
  Activity, Send, X, Trash2, Pencil, Save, GitBranch,
} from 'lucide-react';
import { api, User, Contract, ContractAlert, writeAuditLog } from '@/lib/api';
import {
  contractStatusLabel, contractStatusColor, occurrenceSeverityLabel, occurrenceSeverityColor,
  occurrenceStatusLabel, occurrenceStatusColor, measurementStatusLabel, measurementStatusColor,
  alterationTypeLabel, alterationStatusLabel, alterationStatusColor, fiscalRoleLabel,
  formatCurrency, formatDate, formatDateTime,
} from '@/lib/labels';

// ── Tipos de aba ──────────────────────────────────────────────────────────────
type TabId = 'dados' | 'empresa' | 'fiscal' | 'gestor' | 'vigencia' | 'aditivos'
           | 'fiscalizacoes' | 'ocorrencias' | 'pagamentos' | 'alertas' | 'historico';

interface Tab { id: TabId; label: string; icon: React.ReactNode; roles?: string[] }

const TABS: Tab[] = [
  { id: 'dados',        label: 'Dados Gerais',  icon: <FileText className="h-3.5 w-3.5" /> },
  { id: 'empresa',      label: 'Empresa',       icon: <Building className="h-3.5 w-3.5" /> },
  { id: 'fiscal',       label: 'Fiscal',        icon: <Users className="h-3.5 w-3.5" /> },
  { id: 'gestor',       label: 'Gestor',        icon: <UserCheck className="h-3.5 w-3.5" /> },
  { id: 'vigencia',     label: 'Vigência',      icon: <Calendar className="h-3.5 w-3.5" /> },
  { id: 'aditivos',     label: 'Aditivos',      icon: <ClipboardList className="h-3.5 w-3.5" /> },
  { id: 'fiscalizacoes',label: 'Fiscalizações', icon: <Activity className="h-3.5 w-3.5" /> },
  { id: 'ocorrencias',  label: 'Ocorrências',   icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  { id: 'pagamentos',   label: 'Pagamentos',    icon: <DollarSign className="h-3.5 w-3.5" /> },
  { id: 'alertas',      label: 'Alertas',       icon: <Bell className="h-3.5 w-3.5" /> },
  { id: 'historico',    label: 'Histórico',     icon: <History className="h-3.5 w-3.5" /> },
];

interface Props {
  contractId: string;
  user: User;
  onBack: () => void;
  onNavigate?: (view: string, id?: string, filter?: string) => void;
  onOpenMeasurement?: () => void;
  onOpenOccurrence?: () => void;
  onOpenAlteration?: () => void;
  onApproveMeasurement?: (id: string) => void;
  onRejectMeasurement?: (id: string) => void;
  onApproveAlteration?: (id: string) => void;
  onRejectAlteration?: (id: string) => void;
  onResolveOccurrence?: (id: string) => void;
  onAssignFiscal?: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const inputCls = 'w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50';
const badgeCls = (color: string) => `px-2 py-0.5 rounded text-[10px] font-semibold border ${color}`;
const infoRow = (label: string, value: React.ReactNode) => (
  <div key={label} className="flex flex-col gap-0.5">
    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{label}</span>
    <span className="text-xs text-gray-800">{value || '—'}</span>
  </div>
);

// ── Succession Panel ──────────────────────────────────────────────────────────
function SuccessionPanel({
  contract, user, onSave, onNavigate,
}: {
  contract: any; user: User;
  onSave: (info: any) => void;
  onNavigate?: (view: string, id?: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [succType, setSuccType] = useState<'contract' | 'process'>('contract');
  const [refNumber, setRefNumber] = useState('');
  const [found, setFound] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const { data: contractsList } = useQuery<any[]>({
    queryKey: ['contracts-list', user.id],
    queryFn: () => api.contracts.list(),
    staleTime: 120_000,
  });
  const { data: processesList } = useQuery<any[]>({
    queryKey: ['processes', user.id, user.role],
    queryFn: () => api.processes.list(),
    staleTime: 120_000,
  });

  const isGestor = user.role === 'GESTOR';
  const successionInfo = contract.successionInfo;

  const reset = () => { setEditing(false); setFound(null); setRefNumber(''); setNotFound(false); };

  const handleSearch = () => {
    setNotFound(false);
    setFound(null);
    const term = refNumber.trim().toLowerCase();
    if (!term) return;
    if (succType === 'contract') {
      const hit = (contractsList ?? []).find(x => x.contractNumber.toLowerCase() === term && x.id !== contract.id);
      hit ? setFound(hit) : setNotFound(true);
    } else {
      const hit = (processesList ?? []).find(x => x.processNumber.toLowerCase() === term);
      hit ? setFound(hit) : setNotFound(true);
    }
  };

  const handleSave = () => {
    if (!found) return;
    onSave({
      type: succType,
      refNumber: succType === 'contract' ? found.contractNumber : found.processNumber,
      refId: found.id,
      label: succType === 'contract'
        ? (found.objectDescription ?? '').substring(0, 60)
        : (found.subject ?? '').substring(0, 60),
      savedAt: new Date().toISOString(),
    });
    reset();
  };

  // ── Saved: show link ──
  if (successionInfo && !editing) {
    return (
      <div className="mt-6 pt-5 border-t border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sucessão do Contrato</span>
          </div>
          {isGestor && (
            <button onClick={() => { setEditing(true); setRefNumber(successionInfo.refNumber); setSuccType(successionInfo.type); }}
              className="text-[9px] text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-300 px-2 py-0.5 rounded transition-colors cursor-pointer">
              Alterar
            </button>
          )}
        </div>
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 space-y-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Este contrato foi indicado como substituído por {successionInfo.type === 'contract' ? 'outro contrato' : 'novo processo licitatório'}.
            {' '}<span className="text-gray-400">Registrado em {new Date(successionInfo.savedAt).toLocaleDateString('pt-BR')}.</span>
          </p>
          <button
            onClick={() => {
              if (!onNavigate) return;
              successionInfo.type === 'contract'
                ? onNavigate('details', successionInfo.refId)
                : onNavigate('processes');
            }}
            disabled={!onNavigate}
            className="flex items-center gap-3 w-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-4 py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-40 group text-left">
            <ExternalLink className="h-4 w-4 text-violet-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-violet-300 group-hover:text-violet-200 transition-colors">
                {successionInfo.type === 'contract' ? '↗ Contrato Substituto' : '↗ Processo Substituto'}: {successionInfo.refNumber}
              </p>
              {successionInfo.label && (
                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{successionInfo.label}</p>
              )}
              <p className="text-[9px] text-violet-600 mt-0.5 group-hover:text-violet-500 transition-colors">Clique para acessar o item cadastrado →</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ── Editing form ──
  if (editing && isGestor) {
    return (
      <div className="mt-6 pt-5 border-t border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Indicar Sucessão do Contrato</span>
        </div>
        <div className="bg-gray-100/30 border border-gray-300 rounded-xl p-4 space-y-4">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Indique qual contrato ou processo substituiu este. Após salvo, o número aparece como link direto para o item cadastrado.
          </p>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tipo de Sucessão</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { key: 'contract', label: 'Substituído por Contrato' },
                { key: 'process',  label: 'Novo Processo Licitatório' },
              ] as const).map(opt => (
                <button key={opt.key} onClick={() => { setSuccType(opt.key); setFound(null); setNotFound(false); }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${succType === opt.key ? 'bg-violet-500/20 border-violet-500/40 text-violet-300' : 'bg-blue-50 border-gray-300 text-gray-500 hover:border-gray-300'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              {succType === 'contract' ? 'Número do Contrato Substituto' : 'Número do Processo Substituto'}
            </p>
            <div className="flex gap-2">
              <input
                type="text" value={refNumber}
                onChange={e => { setRefNumber(e.target.value); setFound(null); setNotFound(false); }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder={succType === 'contract' ? 'Ex: CT-2025/001' : 'Ex: PROC-2025/001'}
                className="flex-1 bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
              />
              <button onClick={handleSearch} disabled={!refNumber.trim()}
                className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-40">
                Buscar
              </button>
            </div>
          </div>

          {found && (
            <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-xl p-3 flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">Encontrado</p>
                <p className="text-xs font-bold text-gray-800">{succType === 'contract' ? found.contractNumber : found.processNumber}</p>
                <p className="text-[11px] text-gray-500 line-clamp-1">{succType === 'contract' ? found.objectDescription : found.subject}</p>
                {succType === 'contract' && found.contractor && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{found.contractor?.corporateName || found.contractor?.tradeName}</p>
                )}
              </div>
            </div>
          )}
          {notFound && !found && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-[11px] text-red-400">
                {succType === 'contract' ? 'Contrato' : 'Processo'} não encontrado. Verifique o número exato e tente novamente.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={reset}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2.5 text-xs font-semibold transition-colors cursor-pointer">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={!found}
              className="flex-1 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 text-white rounded-lg py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
              <Save className="h-3.5 w-3.5" /> Salvar Sucessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── No succession yet — gestor can add ──
  if (!successionInfo && isGestor) {
    return (
      <div className="mt-6 pt-5 border-t border-gray-300">
        <button onClick={() => setEditing(true)}
          className="flex items-center justify-center gap-2 w-full text-[11px] text-gray-500 hover:text-violet-400 border border-dashed border-gray-300 hover:border-violet-500/40 px-4 py-3 rounded-xl transition-colors cursor-pointer">
          <GitBranch className="h-3.5 w-3.5" /> Indicar Contrato ou Processo Substituto
        </button>
      </div>
    );
  }

  return null;
}

// ── Gestor → Fiscal Alert Modal ──────────────────────────────────────────────
const ALERT_TYPES = [
  { value: 'DATA_CHANGE_REQUEST', label: 'Solicitação de Alteração de Dados' },
  { value: 'REPORT_REQUEST',      label: 'Solicitação de Relatório/Informação' },
  { value: 'DEADLINE_NOTICE',     label: 'Notificação de Prazo Contratual' },
  { value: 'COMPLIANCE_NOTICE',   label: 'Notificação de Inconformidade' },
  { value: 'GENERAL_NOTICE',      label: 'Comunicado Geral ao Fiscal' },
];

function GestorAlertModal({ contractId, fiscalId, fiscalName, senderName, onClose }: {
  contractId: string; fiscalId: string; fiscalName: string; senderName: string; onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [alertType, setAlertType] = useState('GENERAL_NOTICE');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const selectedLabel = ALERT_TYPES.find(t => t.value === alertType)?.label || 'Comunicado Geral';

  const mutation = useMutation({
    mutationFn: () => api.communications.create({
      contractId,
      recipientId: fiscalId,
      subject: selectedLabel,
      message,
    }),
    onSuccess: () => {
      setSent(true);
      queryClient.invalidateQueries({ queryKey: ['all-communications'] });
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      setTimeout(onClose, 1500);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-300">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-400" /> Enviar Alerta ao Fiscal
            </h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Destinatário: <span className="text-gray-700 font-semibold">{fiscalName}</span></p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
        {sent ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">Alerta enviado com sucesso!</p>
            <p className="text-xs text-gray-500 mt-1">O fiscal receberá a notificação imediatamente.</p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Tipo de Comunicado</label>
              <select value={alertType} onChange={e => setAlertType(e.target.value)}
                className="w-full bg-blue-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer appearance-none">
                {ALERT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
                Mensagem <span className="text-gray-400 normal-case font-normal">(descreva claramente a solicitação)</span>
              </label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                placeholder={`Ex.: Solicitamos a ${fiscalName} que encaminhe o relatório mensal...`}
                className="w-full bg-blue-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none" />
            </div>
            <div className="bg-blue-50/60 border border-gray-300 rounded-xl p-3 text-[10px] text-gray-500 space-y-0.5">
              <p><span className="text-gray-500 font-semibold">Remetente:</span> {senderName} (Gestor de Contratos)</p>
              <p><span className="text-gray-500 font-semibold">Tipo:</span> {selectedLabel}</p>
            </div>
            {mutation.isError && (
              <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">Erro ao enviar. Tente novamente.</p>
            )}
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer">Cancelar</button>
              <button onClick={() => mutation.mutate()} disabled={!message.trim() || mutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Send className="h-3.5 w-3.5" /> {mutation.isPending ? 'Enviando...' : 'Enviar Alerta'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export function ContractTabs({ contractId, user, onBack, onNavigate, onOpenMeasurement, onOpenOccurrence, onOpenAlteration, onApproveMeasurement, onRejectMeasurement, onApproveAlteration, onRejectAlteration, onResolveOccurrence, onAssignFiscal }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('dados');
  const [gestorAlertFiscal, setGestorAlertFiscal] = useState<{ id: string; name: string } | null>(null);
  const [editingDados, setEditingDados] = useState(false);
  const [dadosEdits, setDadosEdits] = useState<Record<string, any>>({});
  const [editingEmpresa, setEditingEmpresa] = useState(false);
  const [empresaEdits, setEmpresaEdits] = useState<Record<string, any>>({});
  const [editingVigencia, setEditingVigencia] = useState(false);
  const [vigenciaEdits, setVigenciaEdits] = useState<Record<string, any>>({});
  const [editingAltId, setEditingAltId] = useState<string | null>(null);
  const [altEdits, setAltEdits] = useState<Record<string, any>>({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payDate, setPayDate] = useState('');
  const [payValue, setPayValue] = useState('');
  const [payInvoice, setPayInvoice] = useState('');
  const [payDesc, setPayDesc] = useState('');
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [msrPeriodStart, setMsrPeriodStart] = useState('');
  const [msrPeriodEnd, setMsrPeriodEnd] = useState('');
  const [msrValue, setMsrValue] = useState('');
  const [msrDesc, setMsrDesc] = useState('');
  const [showOccurrenceForm, setShowOccurrenceForm] = useState(false);
  const [occTitle, setOccTitle] = useState('');
  const [occDesc, setOccDesc] = useState('');
  const [occSeverity, setOccSeverity] = useState('MEDIUM');
  const [showAlterationForm, setShowAlterationForm] = useState(false);
  const [altType, setAltType] = useState('ADDENDUM_VALUE_INCREASE');
  const [altJustification, setAltJustification] = useState('');
  const [altValueChange, setAltValueChange] = useState('');
  const [altNewEndDate, setAltNewEndDate] = useState('');
  const [altNumber, setAltNumber] = useState('');
  const [rejectMsrModal, setRejectMsrModal] = useState<{ id: string } | null>(null);
  const [rejectMsrReason, setRejectMsrReason] = useState('');
  const [rejectAltModal, setRejectAltModal] = useState<{ id: string } | null>(null);
  const [rejectAltReason, setRejectAltReason] = useState('');
  const [resolveOccModal, setResolveOccModal] = useState<{ id: string } | null>(null);
  const [resolveOccDesc, setResolveOccDesc] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [asgFiscalId, setAsgFiscalId] = useState('');
  const [asgRole, setAsgRole] = useState('TITULAR');
  const [asgAct, setAsgAct] = useState('');
  const [asgDate, setAsgDate] = useState('');
  const [asgStart, setAsgStart] = useState('');
  const queryClient = useQueryClient();

  const { data: contract, isLoading, isError, error, refetch } = useQuery<Contract>({
    queryKey: ['contract', contractId],
    queryFn: () => api.contracts.get(contractId),
    enabled: !!contractId,
    retry: 1,
    staleTime: 60_000,
  });

  const { data: alertsData } = useQuery({
    queryKey: ['alerts-all', user.id],
    queryFn: () => api.alerts.all(),
    enabled: !!user,
    staleTime: 300_000,
  });
  const contractAlerts = ((alertsData || []) as ContractAlert[]).filter(a => a.contractId === contractId);

  const updateDadosMutation = useMutation({
    mutationFn: (data: any) => api.contracts.updateData(contractId, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setEditingDados(false); setDadosEdits({}); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const deleteMeasurementMutation = useMutation({
    mutationFn: (id: string) => api.measurements.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contract', contractId] }),
  });

  const deleteOccurrenceMutation = useMutation({
    mutationFn: (id: string) => api.occurrences.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contract', contractId] }),
  });

  const deleteAlterationMutation = useMutation({
    mutationFn: (id: string) => api.alterations.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contract', contractId] }),
  });

  const updateContractorMutation = useMutation({
    mutationFn: (data: any) => api.contractors.update(c?.contractorId, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setEditingEmpresa(false); setEmpresaEdits({}); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const updateVigenciaMutation = useMutation({
    mutationFn: (data: any) => api.contracts.updateData(contractId, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setEditingVigencia(false); setVigenciaEdits({}); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const removeAssignmentMutation = useMutation({
    mutationFn: (id: string) => api.assignments.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contract', contractId] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const updateAlterationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.alterations.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setEditingAltId(null); setAltEdits({}); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const createPaymentMutation = useMutation({
    mutationFn: (data: any) => api.payments.create(data),
    onSuccess: (_res, vars) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      writeAuditLog(user, 'CREATE', 'Contract', contractId, `Pagamento registrado: R$ ${Number(vars.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em ${vars.paymentDate} — ${cNum}`);
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['payments', contractId] });
      setShowPaymentForm(false);
      setPayDate(''); setPayValue(''); setPayInvoice(''); setPayDesc('');
    },
    onError: (e: any) => alert(`Erro ao registrar pagamento: ${e.message}`),
  });

  const deletePaymentMutation = useMutation({
    mutationFn: (id: string) => api.payments.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['payments', contractId] });
    },
  });

  const createMeasurementMutation = useMutation({
    mutationFn: (data: any) => api.measurements.create(data),
    onSuccess: (_res, vars) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      writeAuditLog(user, 'CREATE', 'Contract', contractId, `Medição registrada: ${vars.periodStart}–${vars.periodEnd} | R$ ${Number(vars.measurementValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — ${cNum}`);
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setShowMeasurementForm(false); setMsrPeriodStart(''); setMsrPeriodEnd(''); setMsrValue(''); setMsrDesc('');
    },
    onError: (e: any) => alert(`Erro ao registrar medição: ${e.message}`),
  });
  const approveMeasurementMutation = useMutation({
    mutationFn: (id: string) => api.measurements.approve(id),
    onSuccess: (_res, id) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const msr = (contract as any)?.measurements?.find((m: any) => m.id === id);
      writeAuditLog(user, 'APPROVE', 'Contract', contractId, `Medição aprovada${msr ? ': R$ ' + Number(msr.measurementValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''} — ${cNum}`, { status: { from: 'PENDING_GESTOR', to: 'APPROVED' } });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const rejectMeasurementMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.measurements.reject(id, reason),
    onSuccess: (_res, { id }) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const msr = (contract as any)?.measurements?.find((m: any) => m.id === id);
      writeAuditLog(user, 'REJECT', 'Contract', contractId, `Medição reprovada${msr ? ': R$ ' + Number(msr.measurementValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''} — ${cNum}`, { status: { from: 'PENDING_GESTOR', to: 'REJECTED' } });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setRejectMsrModal(null); setRejectMsrReason('');
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const createOccurrenceMutation = useMutation({
    mutationFn: (data: any) => api.occurrences.create(data),
    onSuccess: (_res, vars) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      writeAuditLog(user, 'CREATE', 'Contract', contractId, `Ocorrência registrada: "${vars.title}" (${vars.severity || 'MEDIUM'}) — ${cNum}`);
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setShowOccurrenceForm(false); setOccTitle(''); setOccDesc(''); setOccSeverity('MEDIUM');
    },
    onError: (e: any) => alert(`Erro ao registrar ocorrência: ${e.message}`),
  });
  const resolveOccurrenceMutation = useMutation({
    mutationFn: ({ id, desc }: { id: string; desc: string }) => api.occurrences.resolve(id, desc),
    onSuccess: (_res, { id }) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const occ = (contract as any)?.occurrences?.find((o: any) => o.id === id);
      writeAuditLog(user, 'UPDATE', 'Contract', contractId, `Ocorrência resolvida: "${occ?.title || id}" — ${cNum}`, { status: { from: 'OPEN', to: 'RESOLVED' } });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setResolveOccModal(null); setResolveOccDesc('');
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const createAlterationMutation = useMutation({
    mutationFn: (data: any) => api.alterations.create(data),
    onSuccess: (_res, vars) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      writeAuditLog(user, 'CREATE', 'Contract', contractId, `Aditivo solicitado: ${vars.alterationNumber || vars.type}${vars.valueChange ? ' | R$ ' + Number(vars.valueChange).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''} — ${cNum}`);
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setShowAlterationForm(false); setAltType('ADDENDUM_VALUE_INCREASE'); setAltJustification(''); setAltValueChange(''); setAltNewEndDate(''); setAltNumber('');
    },
    onError: (e: any) => alert(`Erro ao criar aditivo: ${e.message}`),
  });
  const approveAlterationMutation = useMutation({
    mutationFn: (id: string) => api.alterations.approve(id),
    onSuccess: (_res, id) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const alt = (contract as any)?.alterations?.find((a: any) => a.id === id);
      writeAuditLog(user, 'APPROVE', 'Contract', contractId, `Aditivo aprovado: ${alt?.alterationNumber || alt?.type || id}${alt?.valueChange ? ' | R$ ' + Number(alt.valueChange).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''} — ${cNum}`, { status: { from: 'PENDING_APPROVAL', to: 'APPROVED' } });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const rejectAlterationMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.alterations.reject(id, reason),
    onSuccess: (_res, { id }) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const alt = (contract as any)?.alterations?.find((a: any) => a.id === id);
      writeAuditLog(user, 'REJECT', 'Contract', contractId, `Aditivo reprovado: ${alt?.alterationNumber || alt?.type || id} — ${cNum}`, { status: { from: 'PENDING_APPROVAL', to: 'REJECTED' } });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setRejectAltModal(null); setRejectAltReason('');
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const assignFiscalMutation = useMutation({
    mutationFn: (data: any) => api.contracts.assignFiscal(contractId, data),
    onSuccess: (_res, vars) => {
      const cNum = (contract as any)?.contractNumber || contractId;
      const roleLabel: Record<string, string> = { TITULAR: 'Titular', SUBSTITUTO: 'Substituto', SUPLENTE: 'Suplente' };
      writeAuditLog(user, 'UPDATE', 'Contract', contractId, `Fiscal designado (${roleLabel[vars.role] || vars.role}) — ${cNum}`);
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); setShowAssignModal(false); setAsgFiscalId(''); setAsgRole('TITULAR'); setAsgAct(''); setAsgDate(''); setAsgStart('');
    },
    onError: (e: any) => alert(`Erro ao designar fiscal: ${e.message}`),
  });

  const { data: availableFiscais } = useQuery<any[]>({
    queryKey: ['fiscais-list'],
    queryFn: () => api.utils.getFiscais(),
    enabled: showAssignModal,
    staleTime: 120_000,
  });

  const concludeContractMutation = useMutation({
    mutationFn: () => api.contracts.conclude(contractId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', contractId] }); queryClient.invalidateQueries({ queryKey: ['contracts-list'] }); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  if (isLoading) return (
    <div className="space-y-3 max-w-7xl mx-auto">
      <div className="h-8 bg-gray-100/50 rounded-xl animate-pulse" />
      <div className="h-32 bg-gray-100/50 rounded-xl animate-pulse" />
      <div className="h-64 bg-gray-100/50 rounded-xl animate-pulse" />
    </div>
  );
  if (isError || !contract) return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 max-w-7xl mx-auto">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900 mb-1">Erro ao carregar contrato</p>
        <p className="text-xs text-gray-500 font-mono bg-gray-100/40 border border-gray-300 rounded px-3 py-1.5 max-w-sm">
          {(error as any)?.message || 'Contrato não encontrado ou backend indisponível'}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => refetch()} className="text-xs px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-colors cursor-pointer">
          Tentar novamente
        </button>
        <button onClick={onBack} className="text-xs px-4 py-2 bg-gray-100/40 hover:bg-gray-100/60 border border-gray-300 text-gray-500 rounded-lg transition-colors cursor-pointer">
          Voltar
        </button>
      </div>
    </div>
  );

  const c = contract as any;
  const canEdit = user.role === 'GESTOR' || user.role === 'ADMIN';
  const isGestor = user.role === 'GESTOR' || user.role === 'ADMIN';

  // Stats rápidos para vigência
  const toContractDate = (d: string) => new Date(d.length === 10 ? d + 'T12:00:00Z' : d);
  const daysLeft = Math.ceil((toContractDate(c.endDate).getTime() - Date.now()) / 86400000);
  const daysTotal = Math.ceil((toContractDate(c.endDate).getTime() - toContractDate(c.startDate || c.signingDate).getTime()) / 86400000);
  const progress = Math.max(0, Math.min(100, ((daysTotal - daysLeft) / daysTotal) * 100));
  const totalMeasured = (c.measurements || []).filter((m: any) => m.status === 'APPROVED').reduce((s: number, m: any) => s + Number(m.measurementValue), 0);
  const executionPctRaw = c.currentValue > 0 ? (totalMeasured / c.currentValue) * 100 : 0;
  const executionPct = executionPctRaw.toFixed(1);
  const executionOverrun = executionPctRaw > 100;

  return (
    <div className="space-y-4 max-w-7xl mx-auto">

      {gestorAlertFiscal && (
        <GestorAlertModal
          contractId={contractId}
          fiscalId={gestorAlertFiscal.id}
          fiscalName={gestorAlertFiscal.name}
          senderName={user.name}
          onClose={() => setGestorAlertFiscal(null)}
        />
      )}

      {/* Modal: Rejeitar Medição */}
      {rejectMsrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Rejeitar Medição</h3>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Motivo da Rejeição *</label>
              <textarea value={rejectMsrReason} onChange={e => setRejectMsrReason(e.target.value)} rows={3}
                placeholder="Descreva o motivo da rejeição..."
                className="w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500/50" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setRejectMsrModal(null); setRejectMsrReason(''); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
              <button onClick={() => { if (!rejectMsrReason.trim()) { alert('Informe o motivo.'); return; } rejectMeasurementMutation.mutate({ id: rejectMsrModal.id, reason: rejectMsrReason }); }}
                disabled={rejectMeasurementMutation.isPending}
                className="flex-1 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer">
                {rejectMeasurementMutation.isPending ? 'Rejeitando...' : 'Confirmar Rejeição'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Resolver Ocorrência */}
      {resolveOccModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Resolver Ocorrência</h3>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Descrição da Resolução *</label>
              <textarea value={resolveOccDesc} onChange={e => setResolveOccDesc(e.target.value)} rows={3}
                placeholder="Descreva como a ocorrência foi resolvida..."
                className="w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setResolveOccModal(null); setResolveOccDesc(''); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
              <button onClick={() => { if (!resolveOccDesc.trim()) { alert('Informe a descrição.'); return; } resolveOccurrenceMutation.mutate({ id: resolveOccModal.id, desc: resolveOccDesc }); }}
                disabled={resolveOccurrenceMutation.isPending}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer">
                {resolveOccurrenceMutation.isPending ? 'Resolvendo...' : 'Confirmar Resolução'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Rejeitar Aditivo */}
      {rejectAltModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Rejeitar Aditivo</h3>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Motivo da Rejeição *</label>
              <textarea value={rejectAltReason} onChange={e => setRejectAltReason(e.target.value)} rows={3}
                placeholder="Descreva o motivo da rejeição..."
                className="w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500/50" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setRejectAltModal(null); setRejectAltReason(''); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
              <button onClick={() => { if (!rejectAltReason.trim()) { alert('Informe o motivo.'); return; } rejectAlterationMutation.mutate({ id: rejectAltModal.id, reason: rejectAltReason }); }}
                disabled={rejectAlterationMutation.isPending}
                className="flex-1 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer">
                {rejectAlterationMutation.isPending ? 'Rejeitando...' : 'Confirmar Rejeição'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Designar Fiscal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Designar Fiscal ao Contrato</h3>
              <button onClick={() => setShowAssignModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fiscal *</label>
                <select value={asgFiscalId} onChange={e => setAsgFiscalId(e.target.value)}
                  className="bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                  <option value="">Selecione um fiscal...</option>
                  {(availableFiscais ?? []).map((f: any) => <option key={f.id} value={f.id}>{f.name} — {f.registrationNumber}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Função *</label>
                <select value={asgRole} onChange={e => setAsgRole(e.target.value)}
                  className="bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                  <option value="TITULAR">Titular</option>
                  <option value="SUBSTITUTO">Substituto</option>
                  <option value="SUPLENTE">Suplente</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Portaria / Ato *</label>
                <input type="text" value={asgAct} onChange={e => setAsgAct(e.target.value)}
                  placeholder="Ex: Port. 001/2026"
                  className="bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Data da Portaria *</label>
                <input type="date" value={asgDate} onChange={e => setAsgDate(e.target.value)}
                  className="bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Início da Designação *</label>
                <input type="date" value={asgStart} onChange={e => setAsgStart(e.target.value)}
                  className="bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
              <button onClick={() => {
                if (!asgFiscalId || !asgAct || !asgDate || !asgStart) { alert('Preencha todos os campos obrigatórios.'); return; }
                assignFiscalMutation.mutate({ fiscalId: asgFiscalId, role: asgRole, designationAct: asgAct, designationDate: asgDate, startDate: asgStart });
              }}
                disabled={assignFiscalMutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer">
                {assignFiscalMutation.isPending ? 'Designando...' : 'Designar Fiscal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            <ChevronLeft className="h-3.5 w-3.5" /> Contratos
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-xs font-semibold text-gray-700">{c.contractNumber}</span>
          <span className={badgeCls(contractStatusColor[c.status] || '')}>{contractStatusLabel[c.status] || c.status}</span>
        </div>
        {isGestor && c.status === 'ACTIVE' && (
          <button onClick={() => { if (confirm(`Concluir o contrato ${c.contractNumber}? Ele será movido para Contratos Encerrados.`)) concludeContractMutation.mutate(); }}
            disabled={concludeContractMutation.isPending}
            className="flex items-center gap-1.5 text-[11px] bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-400 font-semibold cursor-pointer disabled:opacity-50 transition-colors">
            {concludeContractMutation.isPending ? 'Encerrando...' : '✓ Concluir Contrato'}
          </button>
        )}
      </div>

      {/* Contract header strip */}
      <div className="bg-gray-100/30 border border-gray-200 p-5 rounded-xl">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">CONTRATO ADMINISTRATIVO</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{c.contractNumber}</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl">{c.objectDescription}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shrink-0">
            <div className="text-right"><span className="text-gray-500 block text-[10px]">Valor Inicial</span><strong className="text-gray-800">{formatCurrency(c.initialValue)}</strong></div>
            <div className="text-right"><span className="text-gray-500 block text-[10px]">Valor Atual</span><strong className="text-emerald-400">{formatCurrency(c.currentValue)}</strong></div>
            <div className="text-right">
              <span className="text-gray-500 block text-[10px]">Executado</span>
              <strong className={executionOverrun ? 'text-red-400' : 'text-blue-400'}>
                {executionPct}%{executionOverrun && <span className="ml-0.5 text-[9px]">⚠</span>}
              </strong>
            </div>
            <div className="text-right"><span className="text-gray-500 block text-[10px]">{daysLeft > 0 ? 'Dias restantes' : 'Dias vencido'}</span><strong className={daysLeft <= 90 ? 'text-red-400' : daysLeft <= 180 ? 'text-amber-400' : 'text-gray-700'}>{Math.abs(daysLeft)}</strong></div>
          </div>
        </div>

        {/* Progress bar vigência */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>Início: {formatDate(c.startDate)}</span>
            <span>{progress.toFixed(0)}% do prazo decorrido</span>
            <span>Fim: {formatDate(c.endDate)}</span>
          </div>
          <div className="h-1.5 bg-white rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: progress >= 90 ? '#ef4444' : progress >= 70 ? '#f59e0b' : '#10b981' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-gray-100/20 border border-gray-200 p-1.5 rounded-xl">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${activeTab === tab.id ? 'bg-white text-gray-900 border border-gray-300 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-gray-100/10 border border-gray-200 p-6 rounded-xl">

        {/* ── DADOS GERAIS ── */}
        {activeTab === 'dados' && (
          <div className="space-y-5">
            {isGestor && (
              <div className="flex justify-end">
                {editingDados ? (
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingDados(false); setDadosEdits({}); }}
                      className="flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                      <X className="h-3.5 w-3.5" /> Cancelar
                    </button>
                    <button onClick={() => updateDadosMutation.mutate(dadosEdits)}
                      disabled={updateDadosMutation.isPending || Object.keys(dadosEdits).length === 0}
                      className="flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50">
                      <Save className="h-3.5 w-3.5" /> {updateDadosMutation.isPending ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setEditingDados(true); setDadosEdits({}); }}
                    className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                    <Pencil className="h-3.5 w-3.5" /> Editar Dados
                  </button>
                )}
              </div>
            )}
            {editingDados ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-0.5 col-span-2 md:col-span-3">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Objeto</span>
                  <textarea value={dadosEdits.objectDescription ?? c.objectDescription} onChange={e => setDadosEdits(p => ({ ...p, objectDescription: e.target.value }))} rows={2} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Status</span>
                  <select value={dadosEdits.status ?? c.status} onChange={e => setDadosEdits(p => ({ ...p, status: e.target.value }))} className={inputCls}>
                    {Object.entries(contractStatusLabel).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Unidade Administrativa</span>
                  <input type="text" value={dadosEdits.department ?? (c.department || '')} onChange={e => setDadosEdits(p => ({ ...p, department: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Data de Assinatura</span>
                  <input type="date" value={(dadosEdits.signingDate ?? c.signingDate ?? '').slice(0, 10)} onChange={e => setDadosEdits(p => ({ ...p, signingDate: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Início da Vigência</span>
                  <input type="date" value={(dadosEdits.startDate ?? c.startDate ?? '').slice(0, 10)} onChange={e => setDadosEdits(p => ({ ...p, startDate: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Fim da Vigência</span>
                  <input type="date" value={(dadosEdits.endDate ?? c.endDate ?? '').slice(0, 10)} onChange={e => setDadosEdits(p => ({ ...p, endDate: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Valor Inicial (R$)</span>
                  <input type="number" value={dadosEdits.initialValue ?? c.initialValue} onChange={e => setDadosEdits(p => ({ ...p, initialValue: Number(e.target.value) }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Valor Atual (R$)</span>
                  <input type="number" value={dadosEdits.currentValue ?? c.currentValue} onChange={e => setDadosEdits(p => ({ ...p, currentValue: Number(e.target.value) }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Observações</span>
                  <textarea value={dadosEdits.observations ?? (c.observations || '')} onChange={e => setDadosEdits(p => ({ ...p, observations: e.target.value }))} rows={2} className={inputCls} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {infoRow('Número do Contrato', c.contractNumber)}
                {infoRow('Status', <span className={badgeCls(contractStatusColor[c.status] || '')}>{contractStatusLabel[c.status]}</span>)}
                {infoRow('Modalidade', c.process?.modality || '—')}
                {infoRow('Data de Assinatura', formatDate(c.signingDate))}
                {infoRow('Início da Vigência', formatDate(c.startDate))}
                {infoRow('Fim da Vigência', formatDate(c.endDate))}
                {infoRow('Valor Inicial', formatCurrency(c.initialValue))}
                {infoRow('Valor Atual', formatCurrency(c.currentValue))}
                {infoRow('Total Medido', formatCurrency(totalMeasured))}
                {c.processId && infoRow('Processo de Origem', c.process?.processNumber || c.processId)}
                {c.department && infoRow('Unidade Administrativa', c.department)}
                {c.observations && infoRow('Observação', <span className="text-amber-400 font-medium">{c.observations}</span>)}
                {infoRow('Objeto', c.objectDescription)}
              </div>
            )}

            <SuccessionPanel
              contract={c}
              user={user}
              onSave={(info) => updateDadosMutation.mutate({ successionInfo: info })}
              onNavigate={onNavigate}
            />
          </div>
        )}

        {/* ── EMPRESA ── */}
        {activeTab === 'empresa' && c.contractor && (
          <div className="space-y-5">
            {isGestor && (
              <div className="flex justify-end">
                {editingEmpresa ? (
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingEmpresa(false); setEmpresaEdits({}); }}
                      className="flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                      <X className="h-3.5 w-3.5" /> Cancelar
                    </button>
                    <button onClick={() => updateContractorMutation.mutate(empresaEdits)}
                      disabled={updateContractorMutation.isPending || Object.keys(empresaEdits).length === 0}
                      className="flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50">
                      <Save className="h-3.5 w-3.5" /> {updateContractorMutation.isPending ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setEditingEmpresa(true); setEmpresaEdits({}); }}
                    className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                    <Pencil className="h-3.5 w-3.5" /> Editar Empresa
                  </button>
                )}
              </div>
            )}
            {editingEmpresa ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {(['corporateName','tradeName','cnpjCpf','email','phone','postalCode','addressStreet','addressNumber','addressNeighborhood','addressCity','addressState','stateInscription','municipalInscription'] as const).map(field => (
                  <div key={field} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{field}</span>
                    <input type="text" value={empresaEdits[field] ?? c.contractor[field] ?? ''} onChange={e => setEmpresaEdits((p: any) => ({ ...p, [field]: e.target.value }))} className={inputCls} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {infoRow('Razão Social', c.contractor.corporateName)}
                {infoRow('Nome Fantasia', c.contractor.tradeName)}
                {infoRow('CNPJ/CPF', c.contractor.cnpjCpf)}
                {infoRow('E-mail', c.contractor.email)}
                {infoRow('Telefone', c.contractor.phone)}
                {infoRow('CEP', c.contractor.postalCode)}
                {infoRow('Endereço', [c.contractor.addressStreet, c.contractor.addressNumber].filter(Boolean).join(', '))}
                {infoRow('Bairro', c.contractor.addressNeighborhood)}
                {infoRow('Cidade/UF', [c.contractor.addressCity, c.contractor.addressState].filter(Boolean).join('/'))}
                {infoRow('Inscrição Estadual', c.contractor.stateInscription)}
                {infoRow('Inscrição Municipal', c.contractor.municipalInscription)}
              </div>
            )}
          </div>
        )}

        {/* ── FISCAL ── */}
        {activeTab === 'fiscal' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-gray-700">Comissão de Fiscalização</h4>
              <div className="flex items-center gap-2">
                {isGestor && (c.fiscalAssignments || []).length > 0 && (
                  <button
                    onClick={() => {
                      const asg = (c.fiscalAssignments || []).find((a: any) => a.isActive);
                      if (asg?.fiscal) setGestorAlertFiscal({ id: asg.fiscal.id, name: asg.fiscal.name });
                    }}
                    className="flex items-center gap-1.5 text-[11px] bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-400 transition-colors cursor-pointer">
                    <Send className="h-3.5 w-3.5" /> Enviar Alerta
                  </button>
                )}
                {isGestor && (
                  <button onClick={() => setShowAssignModal(true)}
                    className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 transition-colors cursor-pointer">
                    <Plus className="h-3.5 w-3.5" /> Designar
                  </button>
                )}
              </div>
            </div>
            {(c.fiscalAssignments || []).length > 0 ? (
              <div className="space-y-3">
                {(c.fiscalAssignments || []).map((asg: any) => (
                  <div key={asg.id} className="bg-blue-50/60 border border-gray-200 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-xs text-gray-500">
                          {asg.fiscal?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{asg.fiscal?.name}</p>
                          <span className="text-[10px] text-gray-500">{asg.fiscal?.registrationNumber} · {fiscalRoleLabel[asg.role]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isGestor && asg.isActive && asg.fiscal && (
                          <button
                            onClick={() => setGestorAlertFiscal({ id: asg.fiscal.id, name: asg.fiscal.name })}
                            title="Enviar alerta a este fiscal"
                            className="p-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg text-blue-400 transition-colors cursor-pointer">
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {isGestor && asg.isActive && (
                          <button
                            onClick={() => {
                              const activeCount = (c.fiscalAssignments || []).filter((a: any) => a.isActive).length;
                              if (activeCount <= 1) { alert('Não é possível remover o último fiscal ativo do contrato.'); return; }
                              if (confirm(`Remover ${asg.fiscal?.name} da comissão de fiscalização?`)) removeAssignmentMutation.mutate(asg.id);
                            }}
                            disabled={removeAssignmentMutation.isPending}
                            title="Remover fiscal"
                            className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <div className="text-right text-[10px] text-gray-500">
                          <p>Portaria: <strong className="text-gray-500">{asg.designationAct}</strong></p>
                          <p>Desde {formatDate(asg.startDate)}</p>
                          <span className={`mt-1 inline-block px-2 py-0.5 rounded border font-semibold text-[9px] ${asg.isActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-gray-100 border-gray-300 text-gray-500'}`}>
                            {asg.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-500">Nenhum fiscal designado.</p>}
          </div>
        )}

        {/* ── GESTOR ── */}
        {activeTab === 'gestor' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {infoRow('Gestor Responsável', c.manager?.name || 'Jairo Vicente de Melo')}
              {infoRow('Matrícula', c.manager?.registrationNumber || 'IQG-0002')}
              {infoRow('E-mail', c.manager?.email || 'gestor@sigecontratos.com')}
              {infoRow('Perfil', 'GESTOR')}
              {infoRow('Setor', 'Gestão de Contratos — IQUEGO')}
              {infoRow('Responsável desde', formatDate(c.signingDate))}
            </div>
          </div>
        )}

        {/* ── VIGÊNCIA ── */}
        {activeTab === 'vigencia' && (
          <div className="space-y-6">
            {isGestor && (
              <div className="flex justify-end">
                {editingVigencia ? (
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingVigencia(false); setVigenciaEdits({}); }}
                      className="flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                      <X className="h-3.5 w-3.5" /> Cancelar
                    </button>
                    <button onClick={() => updateVigenciaMutation.mutate(vigenciaEdits)}
                      disabled={updateVigenciaMutation.isPending || Object.keys(vigenciaEdits).length === 0}
                      className="flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50">
                      <Save className="h-3.5 w-3.5" /> {updateVigenciaMutation.isPending ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setEditingVigencia(true); setVigenciaEdits({}); }}
                    className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                    <Pencil className="h-3.5 w-3.5" /> Editar Vigência
                  </button>
                )}
              </div>
            )}
            {editingVigencia && (
              <div className="grid grid-cols-2 gap-4 bg-gray-100/30 border border-gray-300 rounded-xl p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Início da Vigência</span>
                  <input type="date" value={(vigenciaEdits.startDate ?? c.startDate ?? '').slice(0, 10)} onChange={e => setVigenciaEdits((p: any) => ({ ...p, startDate: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Término da Vigência</span>
                  <input type="date" value={(vigenciaEdits.endDate ?? c.endDate ?? '').slice(0, 10)} onChange={e => setVigenciaEdits((p: any) => ({ ...p, endDate: e.target.value }))} className={inputCls} />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Início</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{formatDate(c.startDate)}</p>
              </div>
              <div className="bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Término</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{formatDate(c.endDate)}</p>
              </div>
              <div className={`border p-4 rounded-xl text-center ${daysLeft <= 0 ? 'bg-red-500/10 border-red-500/20' : daysLeft <= 90 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{daysLeft > 0 ? 'Dias Restantes' : 'Dias Vencido'}</p>
                <p className={`text-xl font-bold mt-1 ${daysLeft <= 0 ? 'text-red-400' : daysLeft <= 90 ? 'text-amber-400' : 'text-emerald-400'}`}>{Math.abs(daysLeft)}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Prazo Decorrido</p>
                <p className="text-xl font-bold text-blue-400 mt-1">{progress.toFixed(0)}%</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>{formatDate(c.startDate)}</span>
                <span className="font-semibold text-gray-500">{progress.toFixed(1)}% decorrido</span>
                <span>{formatDate(c.endDate)}</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-300">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, background: progress >= 90 ? '#ef4444' : progress >= 70 ? '#f59e0b' : '#10b981' }} />
              </div>
            </div>
            {daysLeft <= 180 && daysLeft > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-300">
                <strong>Atenção:</strong> Contrato na janela de alerta de 180 dias. Providenciar prorrogação ou nova contratação.
              </div>
            )}
          </div>
        )}

        {/* ── ADITIVOS ── */}
        {activeTab === 'aditivos' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-semibold text-gray-700">Termos Aditivos</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Limite: 25% (serviços/compras) · 50% (reformas)</p>
              </div>
              {(user.role === 'FISCAL' || isGestor) && (
                <button onClick={() => setShowAlterationForm(v => !v)} className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                  <Plus className="h-3.5 w-3.5" /> Novo Aditivo
                </button>
              )}
            </div>

            {showAlterationForm && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registrar Novo Termo Aditivo</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Tipo de Aditivo *</label>
                    <select value={altType} onChange={e => setAltType(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                      {Object.entries(alterationTypeLabel).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Número / Identificação</label>
                    <input type="text" value={altNumber} onChange={e => setAltNumber(e.target.value)}
                      placeholder="Ex: 1º Termo Aditivo"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Impacto Financeiro (R$)</label>
                    <input type="number" step="0.01" value={altValueChange} onChange={e => setAltValueChange(e.target.value)}
                      placeholder="0,00 (negativo para supressão)"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Nova Data de Término</label>
                    <input type="date" value={altNewEndDate} onChange={e => setAltNewEndDate(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Justificativa *</label>
                    <textarea value={altJustification} onChange={e => setAltJustification(e.target.value)} rows={3}
                      placeholder="Descreva a justificativa para o aditivo..."
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                </div>
                {createAlterationMutation.isError && (
                  <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2">
                    {(createAlterationMutation.error as any)?.message}
                  </p>
                )}
                <div className="flex gap-3">
                  <button onClick={() => { setShowAlterationForm(false); setAltType('ADDENDUM_VALUE_INCREASE'); setAltJustification(''); setAltValueChange(''); setAltNewEndDate(''); setAltNumber(''); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
                  <button onClick={() => {
                    if (!altJustification.trim()) { alert('Preencha a justificativa.'); return; }
                    createAlterationMutation.mutate({ contractId, type: altType, alterationNumber: altNumber || undefined, justification: altJustification, valueChange: Number(altValueChange) || 0, newEndDate: altNewEndDate || undefined });
                  }}
                    disabled={createAlterationMutation.isPending}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Save className="h-3.5 w-3.5" /> {createAlterationMutation.isPending ? 'Salvando...' : 'Registrar Aditivo'}
                  </button>
                </div>
              </div>
            )}

            {(c.alterations || []).length > 0 ? (
              <div className="space-y-3">
                {(c.alterations || []).map((alt: any) => (
                  <div key={alt.id} className="bg-blue-50/60 border border-gray-200 p-4 rounded-xl">
                    {editingAltId === alt.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Número/Identificação</span>
                            <input type="text" value={altEdits.alterationNumber ?? (alt.alterationNumber || '')} onChange={e => setAltEdits((p: any) => ({ ...p, alterationNumber: e.target.value }))} className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Nova Data de Término</span>
                            <input type="date" value={(altEdits.newEndDate ?? alt.newEndDate ?? '').slice(0, 10)} onChange={e => setAltEdits((p: any) => ({ ...p, newEndDate: e.target.value }))} className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Impacto Financeiro (R$)</span>
                            <input type="number" value={altEdits.valueChange ?? alt.valueChange ?? 0} onChange={e => setAltEdits((p: any) => ({ ...p, valueChange: Number(e.target.value) }))} className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-0.5 col-span-2">
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Justificativa</span>
                            <textarea value={altEdits.justification ?? (alt.justification || '')} onChange={e => setAltEdits((p: any) => ({ ...p, justification: e.target.value }))} rows={2} className={inputCls} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => updateAlterationMutation.mutate({ id: alt.id, data: altEdits })}
                            disabled={updateAlterationMutation.isPending}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-1.5 rounded-lg text-xs cursor-pointer disabled:opacity-50">
                            {updateAlterationMutation.isPending ? 'Salvando...' : 'Salvar'}
                          </button>
                          <button onClick={() => { setEditingAltId(null); setAltEdits({}); }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1.5 rounded-lg text-xs cursor-pointer">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-gray-700">{alt.alterationNumber || alterationTypeLabel[alt.type]}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{alt.justification}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <span className={badgeCls(alterationStatusColor[alt.status] || '')}>{alterationStatusLabel[alt.status] || alt.status}</span>
                            {isGestor && alt.status === 'PENDING_APPROVAL' && (
                              <div className="flex gap-1.5">
                                <button onClick={() => approveAlterationMutation.mutate(alt.id)} disabled={approveAlterationMutation.isPending} className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/20 cursor-pointer disabled:opacity-50"><CheckCircle className="h-3.5 w-3.5" /></button>
                                <button onClick={() => setRejectAltModal({ id: alt.id })} className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer"><XCircle className="h-3.5 w-3.5" /></button>
                              </div>
                            )}
                            {isGestor && (
                              <button onClick={() => { setEditingAltId(alt.id); setAltEdits({}); }}
                                title="Editar aditivo" className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {isGestor && (
                              <button onClick={() => { if (confirm('Excluir este aditivo permanentemente?')) deleteAlterationMutation.mutate(alt.id); }}
                                disabled={deleteAlterationMutation.isPending}
                                title="Excluir aditivo"
                                className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex gap-4 text-[10px] text-gray-500">
                          <span>Impacto: <strong className="text-gray-700">{alt.valueChange >= 0 ? '+' : ''}{formatCurrency(alt.valueChange)}</strong></span>
                          {alt.newEndDate && <span>Nova vigência: <strong className="text-gray-700">{formatDate(alt.newEndDate)}</strong></span>}
                          <span>Solicitado por: <strong className="text-gray-500">{alt.requester?.name || alt.requestedById}</strong></span>
                          <span>{formatDate(alt.createdAt)}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-500">Nenhum aditivo registrado.</p>}
          </div>
        )}


        {/* ── FISCALIZAÇÕES (MEDIÇÕES) ── */}
        {activeTab === 'fiscalizacoes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-semibold text-gray-700">Medições de Fiscalização</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Total medido (aprovado): {formatCurrency(totalMeasured)} de {formatCurrency(c.currentValue)}</p>
              </div>
              {(user.role === 'FISCAL' || isGestor) && (
                <button onClick={() => setShowMeasurementForm(v => !v)} className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer"
                  title="Registre a medição do período fiscalizado, com valor executado e relatório">
                  <Plus className="h-3.5 w-3.5" /> Nova Medição
                </button>
              )}
            </div>

            {showMeasurementForm && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registrar Nova Medição de Fiscalização</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Informe o período fiscalizado, o valor executado e um relatório descritivo da medição.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Período De *</label>
                    <input type="date" value={msrPeriodStart} onChange={e => setMsrPeriodStart(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Período Até *</label>
                    <input type="date" value={msrPeriodEnd} onChange={e => setMsrPeriodEnd(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Valor da Medição (R$) *</label>
                    <input type="number" min="0" step="0.01" value={msrValue} onChange={e => setMsrValue(e.target.value)}
                      placeholder="0,00"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Relatório / Descrição *</label>
                    <input type="text" value={msrDesc} onChange={e => setMsrDesc(e.target.value)}
                      placeholder="Descreva o serviço executado no período..."
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                </div>
                {createMeasurementMutation.isError && (
                  <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2">
                    {(createMeasurementMutation.error as any)?.message}
                  </p>
                )}
                <div className="flex gap-3">
                  <button onClick={() => { setShowMeasurementForm(false); setMsrPeriodStart(''); setMsrPeriodEnd(''); setMsrValue(''); setMsrDesc(''); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
                  <button onClick={() => {
                    if (!msrPeriodStart || !msrPeriodEnd || !msrValue || !msrDesc.trim()) { alert('Preencha todos os campos obrigatórios.'); return; }
                    createMeasurementMutation.mutate({ contractId, periodStart: msrPeriodStart, periodEnd: msrPeriodEnd, measurementValue: Number(msrValue), reportDescription: msrDesc });
                  }}
                    disabled={createMeasurementMutation.isPending}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Save className="h-3.5 w-3.5" /> {createMeasurementMutation.isPending ? 'Salvando...' : 'Registrar Medição'}
                  </button>
                </div>
              </div>
            )}

            {(c.measurements || []).length > 0 ? (
              <div className="space-y-3">
                {(c.measurements || []).map((msr: any) => (
                  <div key={msr.id} className="bg-blue-50/60 border border-gray-200 p-4 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-gray-700">{formatCurrency(msr.measurementValue)}</p>
                        <p className="text-[10px] text-gray-500">Período: {formatDate(msr.periodStart)} — {formatDate(msr.periodEnd)}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{msr.reportDescription}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span className={badgeCls(measurementStatusColor[msr.status] || '')}>{measurementStatusLabel[msr.status] || msr.status}</span>
                        {isGestor && msr.status === 'PENDING_GESTOR' && (
                          <div className="flex gap-1.5">
                            <button onClick={() => approveMeasurementMutation.mutate(msr.id)} disabled={approveMeasurementMutation.isPending} title="Aprovar medição" className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 cursor-pointer disabled:opacity-50 hover:bg-emerald-500/20"><CheckCircle className="h-3.5 w-3.5" /></button>
                            <button onClick={() => setRejectMsrModal({ id: msr.id })} title="Rejeitar medição" className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 cursor-pointer hover:bg-red-500/20"><XCircle className="h-3.5 w-3.5" /></button>
                          </div>
                        )}
                        {isGestor && (
                          <button onClick={() => { if (confirm('Excluir esta medição permanentemente?')) deleteMeasurementMutation.mutate(msr.id); }}
                            disabled={deleteMeasurementMutation.isPending}
                            title="Excluir medição"
                            className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-4 text-[10px] text-gray-500">
                      <span>Fiscal: <strong className="text-gray-500">{msr.fiscal?.name}</strong></span>
                      {msr.approver && <span>Aprovado por: <strong className="text-gray-500">{msr.approver.name}</strong></span>}
                      <span>{formatDateTime(msr.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-500">Nenhuma medição registrada.</p>}
          </div>
        )}

        {/* ── OCORRÊNCIAS ── */}
        {activeTab === 'ocorrencias' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-gray-700">Registro de Ocorrências</h4>
              {(user.role === 'FISCAL' || isGestor) && (
                <button onClick={() => setShowOccurrenceForm(v => !v)} className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                  <Plus className="h-3.5 w-3.5" /> Registrar Ocorrência
                </button>
              )}
            </div>

            {showOccurrenceForm && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registrar Nova Ocorrência</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Título *</label>
                    <input type="text" value={occTitle} onChange={e => setOccTitle(e.target.value)}
                      placeholder="Título da ocorrência..."
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Severidade *</label>
                    <select value={occSeverity} onChange={e => setOccSeverity(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500/50 cursor-pointer">
                      <option value="LOW">Baixa</option>
                      <option value="MEDIUM">Média</option>
                      <option value="HIGH">Alta</option>
                      <option value="CRITICAL">Crítica</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Descrição *</label>
                    <textarea value={occDesc} onChange={e => setOccDesc(e.target.value)} rows={3}
                      placeholder="Descreva a ocorrência em detalhes..."
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50" />
                  </div>
                </div>
                {createOccurrenceMutation.isError && (
                  <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2">
                    {(createOccurrenceMutation.error as any)?.message}
                  </p>
                )}
                <div className="flex gap-3">
                  <button onClick={() => { setShowOccurrenceForm(false); setOccTitle(''); setOccDesc(''); setOccSeverity('MEDIUM'); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">Cancelar</button>
                  <button onClick={() => {
                    if (!occTitle.trim() || !occDesc.trim()) { alert('Preencha título e descrição.'); return; }
                    createOccurrenceMutation.mutate({ contractId, title: occTitle, description: occDesc, severity: occSeverity });
                  }}
                    disabled={createOccurrenceMutation.isPending}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Save className="h-3.5 w-3.5" /> {createOccurrenceMutation.isPending ? 'Salvando...' : 'Registrar Ocorrência'}
                  </button>
                </div>
              </div>
            )}

            {(c.occurrences || []).length > 0 ? (
              <div className="space-y-3">
                {(c.occurrences || []).map((occ: any) => (
                  <div key={occ.id} className="bg-blue-50/60 border border-gray-200 p-4 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg border ${occurrenceSeverityColor[occ.severity] || ''}`}>
                          <AlertTriangle className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-700">{occ.title}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{occ.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span className={badgeCls(occurrenceSeverityColor[occ.severity] || '')}>{occurrenceSeverityLabel[occ.severity]}</span>
                        <span className={badgeCls(occurrenceStatusColor[occ.status] || '')}>{occurrenceStatusLabel[occ.status] || occ.status}</span>
                        {isGestor && occ.status === 'OPEN' && (
                          <button onClick={() => setResolveOccModal({ id: occ.id })} className="flex items-center gap-1 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg text-emerald-400 cursor-pointer hover:bg-emerald-500/20">
                            <CheckCircle className="h-3 w-3" /> Resolver
                          </button>
                        )}
                        {isGestor && (
                          <button onClick={() => { if (confirm('Excluir esta ocorrência permanentemente?')) deleteOccurrenceMutation.mutate(occ.id); }}
                            disabled={deleteOccurrenceMutation.isPending}
                            title="Excluir ocorrência"
                            className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-4 text-[10px] text-gray-500">
                      <span>Registrado por: <strong className="text-gray-500">{occ.fiscal?.name}</strong></span>
                      <span>{formatDateTime(occ.createdAt)}</span>
                      {occ.resolvedAt && <span>Resolvido em: <strong className="text-gray-500">{formatDate(occ.resolvedAt)}</strong></span>}
                    </div>
                    {occ.resolutionDescription && (
                      <div className="mt-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2">
                        <p className="text-[10px] text-emerald-400 font-semibold">Resolução:</p>
                        <p className="text-[10px] text-gray-500">{occ.resolutionDescription}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-500">Nenhuma ocorrência registrada.</p>}
          </div>
        )}

        {/* ── PAGAMENTOS ── */}
        {activeTab === 'pagamentos' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-semibold text-gray-700">Registro de Pagamentos</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Registre pagamentos realizados ao contratado</p>
              </div>
              {(user.role === 'FISCAL' || user.role === 'GESTOR' || user.role === 'ADMIN') && (
                <button onClick={() => setShowPaymentForm(v => !v)}
                  className="flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer">
                  <Plus className="h-3.5 w-3.5" /> Novo Pagamento
                </button>
              )}
            </div>

            {/* Formulário inline de novo pagamento */}
            {showPaymentForm && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registrar Novo Pagamento</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Data do Pagamento *</label>
                    <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Valor (R$) *</label>
                    <input type="number" min="0" step="0.01" value={payValue} onChange={e => setPayValue(e.target.value)}
                      placeholder="0,00"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Nota Fiscal / NF</label>
                    <input type="text" value={payInvoice} onChange={e => setPayInvoice(e.target.value)}
                      placeholder="Ex: NF-001234"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Descrição *</label>
                    <input type="text" value={payDesc} onChange={e => setPayDesc(e.target.value)}
                      placeholder="Ex: Pagamento referência junho/2026"
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                </div>
                {createPaymentMutation.isError && (
                  <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2">
                    {(createPaymentMutation.error as any)?.message}
                  </p>
                )}
                <div className="flex gap-3 pt-1">
                  <button onClick={() => { setShowPaymentForm(false); setPayDate(''); setPayValue(''); setPayInvoice(''); setPayDesc(''); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer">
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (!payDate || !payValue || !payDesc.trim()) { alert('Preencha data, valor e descrição.'); return; }
                      createPaymentMutation.mutate({ contractId, paymentDate: payDate, value: Number(payValue), invoiceNumber: payInvoice || undefined, description: payDesc });
                    }}
                    disabled={createPaymentMutation.isPending}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Save className="h-3.5 w-3.5" /> {createPaymentMutation.isPending ? 'Salvando...' : 'Registrar Pagamento'}
                  </button>
                </div>
              </div>
            )}

            {/* Resumo financeiro */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500">Total Pago (NFs)</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">
                  {formatCurrency((c.payments || []).reduce((s: number, p: any) => s + Number(p.value), 0))}
                </p>
              </div>
              <div className="bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500">Saldo Contratual</p>
                <p className="text-lg font-bold text-blue-400 mt-1">
                  {formatCurrency(c.currentValue - (c.payments || []).reduce((s: number, p: any) => s + Number(p.value), 0))}
                </p>
              </div>
              <div className="bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center">
                <p className="text-[10px] text-gray-500">% Pago</p>
                <p className="text-lg font-bold text-amber-400 mt-1">
                  {c.currentValue > 0 ? (((c.payments || []).reduce((s: number, p: any) => s + Number(p.value), 0) / c.currentValue) * 100).toFixed(1) : '0.0'}%
                </p>
              </div>
            </div>

            {/* Lista de pagamentos */}
            {(c.payments || []).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="py-2 text-left font-semibold">Data</th>
                      <th className="py-2 text-left font-semibold">Descrição</th>
                      <th className="py-2 text-left font-semibold">NF</th>
                      <th className="py-2 text-left font-semibold">Registrado por</th>
                      <th className="py-2 text-right font-semibold">Valor</th>
                      {isGestor && <th className="py-2 w-8" />}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(c.payments || []).map((p: any) => (
                      <tr key={p.id} className="text-gray-700">
                        <td className="py-2.5">{formatDate(p.paymentDate)}</td>
                        <td className="py-2.5 max-w-xs truncate">{p.description}</td>
                        <td className="py-2.5 text-gray-500">{p.invoiceNumber || '—'}</td>
                        <td className="py-2.5 text-gray-500">{p.registeredBy?.name}</td>
                        <td className="py-2.5 text-right font-bold text-emerald-600">{formatCurrency(p.value)}</td>
                        {isGestor && (
                          <td className="py-2.5 text-right">
                            <button onClick={() => { if (confirm('Excluir este pagamento?')) deletePaymentMutation.mutate(p.id); }}
                              disabled={deletePaymentMutation.isPending}
                              className="p-1 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer disabled:opacity-40">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-100/20 border border-dashed border-gray-200 rounded-xl p-8 text-center">
                <DollarSign className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Nenhum pagamento registrado.</p>
                <p className="text-[10px] text-gray-400 mt-1">Use o botão "Novo Pagamento" para registrar.</p>
              </div>
            )}
          </div>
        )}

        {/* ── ALERTAS ── */}
        {activeTab === 'alertas' && (
          <AlertsTab contractAlerts={contractAlerts} user={user} queryClient={queryClient} />
        )}

        {/* ── HISTÓRICO ── */}
        {activeTab === 'historico' && <ContractHistory contractId={contractId} user={user} />}
      </div>
    </div>
  );
}

// ── Alertas Tab ──────────────────────────────────────────────────────────────
function AlertsTab({ contractAlerts, user, queryClient }: { contractAlerts: ContractAlert[]; user: User; queryClient: any }) {
  const isAdmin = user.role === 'ADMIN';

  const respondMutation = useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) => api.alerts.respond(id, response as any),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['alerts-all'] }); queryClient.invalidateQueries({ queryKey: ['alerts-pending'] }); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.alerts.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['alerts-all'] }); queryClient.invalidateQueries({ queryKey: ['alerts-pending'] }); },
  });

  const typeLabels: Record<string, string> = {
    CONTRACT_EXPIRING_180:  'Vencimento em 180 dias',
    CONTRACT_EXPIRING_90:   'Vencimento em 90 dias — Elaborar Aditivo',
    RENEWAL_REQUESTED:      'Prorrogação solicitada ao Gestor',
    RENEWAL_APPROVED:       'Prorrogação Aprovada pelo Gestor',
    RENEWAL_REJECTED:       'Prorrogação Negada pelo Gestor',
    MEASUREMENT_OVERDUE:    'Medição em atraso',
    ALTERATION_OVERDUE:     'Aditivo pendente',
    OCCURRENCE_CRITICAL_OPEN: 'Ocorrência crítica aberta',
    COMMUNICATION_MANDATORY: 'Comunicado obrigatório do Gestor',
    NEW_PROCESS_AUTO_CREATED: 'Novo processo iniciado',
    PROCESS_PHASE_OVERDUE:  'Fase do processo em atraso',
    DATA_CHANGE_REQUEST:    'Solicitação de Alteração de Dados',
    REPORT_REQUEST:         'Solicitação de Relatório/Informação',
    DEADLINE_NOTICE:        'Aviso de Prazo',
    COMPLIANCE_NOTICE:      'Aviso de Conformidade',
    GENERAL_NOTICE:         'Comunicação Geral',
    GESTOR_CONTRACT_UPDATE: 'Atualização pelo Gestor',
  };
  const statusColor: Record<string, string> = {
    PENDING: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    RESPONDED: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    DISMISSED: 'text-gray-500 bg-gray-100 border-gray-300',
    EXPIRED: 'text-gray-400 bg-white border-gray-300',
  };
  const statusLabel: Record<string, string> = {
    PENDING: 'Pendente', RESPONDED: 'Respondido', DISMISSED: 'Dispensado', EXPIRED: 'Expirado',
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-gray-700">Alertas deste Contrato</h4>
      {contractAlerts.length > 0 ? (
        contractAlerts.map(alert => (
          <div key={alert.id} className={`border p-4 rounded-xl space-y-3 ${alert.status === 'PENDING' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-blue-50/60 border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">{typeLabels[alert.type] || alert.type}</span>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">{alert.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{alert.message}</p>
                {(alert as any).metadata?.senderName && (
                  <p className="text-[10px] text-blue-400 mt-1">De: {(alert as any).metadata.senderName}</p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusColor[alert.status] || ''}`}>
                  {statusLabel[alert.status] || alert.status}
                </span>
                {isAdmin && (
                  <button
                    onClick={() => { if (confirm('Excluir este alerta permanentemente?')) deleteMutation.mutate(alert.id); }}
                    disabled={deleteMutation.isPending}
                    title="Excluir alerta"
                    className="p-1 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer disabled:opacity-40">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Ações para FISCAL — alerta de vencimento 180d */}
            {alert.status === 'PENDING' && alert.type === 'CONTRACT_EXPIRING_180' && user.role === 'FISCAL' && (
              <div className="bg-gray-100/60 border border-gray-300 rounded-xl p-3 space-y-2">
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Providência necessária:</p>
                <p className="text-[11px] text-gray-700">Informe ao Gestor a providência desejada para este contrato:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => respondMutation.mutate({ id: alert.id, response: 'EXTEND_CONTRACT' })}
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                    Prorrogar Contrato
                  </button>
                  <button
                    onClick={() => respondMutation.mutate({ id: alert.id, response: 'NEW_PROCESS' })}
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                    Nova Licitação
                  </button>
                </div>
              </div>
            )}

            {/* Ações para GESTOR — solicitação de prorrogação */}
            {alert.status === 'PENDING' && alert.type === 'RENEWAL_REQUESTED' && user.role === 'GESTOR' && (
              <div className="bg-gray-100/60 border border-gray-300 rounded-xl p-3 space-y-2">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Aprovação do Gestor necessária:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => respondMutation.mutate({ id: alert.id, response: 'APPROVE_RENEWAL' })}
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                    <CheckCircle className="h-3.5 w-3.5 inline mr-1" /> Aprovar Prorrogação
                  </button>
                  <button
                    onClick={() => respondMutation.mutate({ id: alert.id, response: 'REJECT_RENEWAL' })}
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50">
                    <XCircle className="h-3.5 w-3.5 inline mr-1" /> Rejeitar
                  </button>
                </div>
              </div>
            )}

            {/* Alerta de 90 dias — preparar termo aditivo */}
            {alert.type === 'CONTRACT_EXPIRING_90' && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Ação urgente:</p>
                <p className="text-[11px] text-gray-700 mt-1">Preparar e encaminhar o Termo Aditivo de prorrogação com urgência. Prazo crítico.</p>
              </div>
            )}

            <p className="text-[10px] text-gray-400">{formatDateTime(alert.createdAt)}</p>
          </div>
        ))
      ) : (
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6 text-center">
          <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
          <p className="text-xs text-emerald-400 font-semibold">Nenhum alerta para este contrato</p>
        </div>
      )}
    </div>
  );
}

// ── Histórico (usa a trilha de auditoria real do backend) ────────────────────
// Consulta a mesma API institucional da tela de Auditoria (backend/src/audit),
// filtrando pelos eventos deste contrato. Registro imutável: não há mais
// exclusão de itens do histórico a partir daqui.
function ContractHistory({ contractId, user: _user }: { contractId: string; user: User }) {
  const { data, isLoading } = useQuery({
    queryKey: ['audit-logs', 'contract', contractId],
    queryFn: () => api.audit.list({ search: contractId, pageSize: 50, sortDir: 'desc' }),
  });
  const logs = (data?.items || []).filter((l) => l.entityId === contractId);

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-gray-700">Histórico de Movimentações</h4>
      {isLoading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-100/60 rounded-xl animate-pulse" />)}</div>
      ) : logs.length > 0 ? (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="relative pl-10">
                <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full bg-gray-200 border-2 border-gray-200" />
                <div className="bg-blue-50/60 border border-gray-200 p-3 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{log.action}</p>
                      <p className="text-xs text-gray-700 mt-0.5">{log.detail || (log.module ? `${log.module} atualizado` : 'Evento registrado')}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 shrink-0 ml-4">{formatDateTime(log.createdAt)}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">por <strong className="text-gray-500">{log.userName || 'Sistema'}</strong>{log.userRole ? ` (${log.userRole})` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-500">Nenhuma movimentação registrada.</p>
      )}
    </div>
  );
}
