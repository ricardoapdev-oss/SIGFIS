'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Clock, CheckCircle, FileText, X, ArrowRight } from 'lucide-react';
import { api, User, ContractAlert, ContractAlertType, ContractAlertResponse } from '@/lib/api';

interface AlertEngineProps {
  user: User;
  onNavigate?: (view: any, contractId?: string, processId?: string) => void;
}

const ALERT_PRIORITY: Record<ContractAlertType, number> = {
  CONTRACT_EXPIRING_180: 1,
  RENEWAL_REQUESTED: 2,
  CONTRACT_EXPIRING_90: 3,
  MEASUREMENT_OVERDUE: 4,
  ALTERATION_OVERDUE: 4,
  OCCURRENCE_CRITICAL_OPEN: 4,
  PROCESS_PHASE_OVERDUE: 5,
  COMMUNICATION_MANDATORY: 2,
  RENEWAL_APPROVED: 6,
  RENEWAL_REJECTED: 6,
  NEW_PROCESS_AUTO_CREATED: 7,
  GESTOR_CONTRACT_UPDATE: 8,
};

export function AlertEngine({ user, onNavigate }: AlertEngineProps) {
  const queryClient = useQueryClient();
  const [choice, setChoice] = useState<ContractAlertResponse | null>(null);
  const [replyText, setReplyText] = useState('');

  // 1) Rodar motor ao montar
  const { data: engineResult } = useQuery({
    queryKey: ['alert-engine', user.id],
    queryFn: () => api.alerts.runEngine(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  // 2) Buscar alertas pendentes
  const { data: rawAlerts = [] } = useQuery<ContractAlert[]>({
    queryKey: ['alerts-pending', user.id, engineResult],
    queryFn: () => api.alerts.list(),
    enabled: !!user,
  });

  // Ordenar por prioridade e pegar o primeiro
  const alerts = [...rawAlerts].sort((a, b) => (ALERT_PRIORITY[a.type] ?? 9) - (ALERT_PRIORITY[b.type] ?? 9));
  const current = alerts[0] ?? null;

  useEffect(() => { setChoice(null); setReplyText(''); }, [current?.id]);

  const respondMutation = useMutation({
    mutationFn: ({ id, response }: { id: string; response: ContractAlertResponse }) =>
      api.alerts.respond(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts-pending'] });
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      setChoice(null);
    },
  });

  const dismissMutation = useMutation({
    mutationFn: (id: string) => api.alerts.dismiss(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts-pending'] }),
  });

  if (!current) return null;

  const handleRespond = (response: ContractAlertResponse) => {
    respondMutation.mutate({ id: current.id, response });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Barra superior indicativa */}
        <div className={`h-1.5 w-full ${alertBarColor(current.type)}`} />

        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex items-start gap-4 mb-5">
            <div className={`p-3 rounded-xl border shrink-0 ${alertIconBg(current.type)}`}>
              <AlertIcon type={current.type} />
            </div>
            <div className="min-w-0">
              <span className={`text-[9px] font-bold uppercase tracking-widest block mb-1 ${alertTagColor(current.type)}`}>
                {alertTag(current.type)}
              </span>
              <h3 className="text-sm font-bold text-white leading-tight">{current.title}</h3>
            </div>
            {isDismissable(current.type) && (
              <button onClick={() => dismissMutation.mutate(current.id)}
                className="ml-auto p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mensagem principal */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 leading-relaxed mb-5">
            {current.message}
            {current.type === 'COMMUNICATION_MANDATORY' && current.metadata?.fullMessage && (
              <p className="text-zinc-400 mt-3 pt-3 border-t border-zinc-800">{current.metadata.fullMessage}</p>
            )}
          </div>

          {/* Metadados contextuais */}
          {current.metadata?.daysUntilEnd !== undefined && (
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-950/40 border border-zinc-900 rounded-lg px-3 py-2 mb-5">
              <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span><strong className="text-amber-400">{current.metadata.daysUntilEnd} dia{current.metadata.daysUntilEnd !== 1 ? 's' : ''}</strong> restante{current.metadata.daysUntilEnd !== 1 ? 's' : ''} para o encerramento</span>
            </div>
          )}

          {/* Contador de alertas restantes */}
          {alerts.length > 1 && (
            <div className="text-[10px] text-zinc-500 text-center mb-4">
              Alerta 1 de {alerts.length} — responda para ver o próximo
            </div>
          )}

          {/* ── Ações por tipo de alerta ── */}
          <AlertActions
            alert={current}
            choice={choice}
            setChoice={setChoice}
            onRespond={handleRespond}
            loading={respondMutation.isPending}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}

// ── Ações específicas por tipo ─────────────────────────────────────────────────

function AlertActions({ alert, choice, setChoice, onRespond, loading, onNavigate }: {
  alert: ContractAlert; choice: ContractAlertResponse | null; setChoice: (c: ContractAlertResponse | null) => void;
  onRespond: (r: ContractAlertResponse) => void;
  loading: boolean; onNavigate?: (view: any, cId?: string, pId?: string) => void;
}) {
  const RadioOpt = ({ value, label, desc }: { value: ContractAlertResponse; label: string; desc: string }) => (
    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${choice === value ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'}`}>
      <input type="radio" className="mt-0.5 accent-emerald-500" checked={choice === value} onChange={() => setChoice(value)} />
      <div>
        <span className="text-xs font-semibold text-zinc-200 block">{label}</span>
        <span className="text-[10px] text-zinc-500">{desc}</span>
      </div>
    </label>
  );

  // 180-day expiry — fiscal selects action
  if (alert.type === 'CONTRACT_EXPIRING_180') {
    return (
      <div className="space-y-3">
        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Selecione a providência:</p>
        <RadioOpt value="EXTEND_CONTRACT" label="Prorrogar por Termo Aditivo" desc="Solicitar aprovação do Gestor para formalizar a extensão de prazo contratual." />
        <RadioOpt value="NEW_PROCESS" label="Iniciar Novo Processo de Contratação" desc="Abrir automaticamente processo de contratação em fase de Planejamento." />
        <button onClick={() => choice && onRespond(choice)} disabled={!choice || loading}
          className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 cursor-pointer">
          {loading ? 'Processando...' : 'Confirmar Providência'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Renewal requested — gestor approves or rejects
  if (alert.type === 'RENEWAL_REQUESTED') {
    return (
      <div className="space-y-3">
        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Solicitação pendente de validação:</p>
        <RadioOpt value="APPROVE" label="Aprovar Prorrogação" desc="O Fiscal será notificado para providenciar o Termo Aditivo." />
        <RadioOpt value="REJECT" label="Rejeitar e Iniciar Nova Contratação" desc="Um novo processo de contratação será criado automaticamente." />
        <button onClick={() => choice && onRespond(choice)} disabled={!choice || loading}
          className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 cursor-pointer">
          {loading ? 'Processando...' : 'Confirmar Decisão'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Mandatory communication — must acknowledge
  if (alert.type === 'COMMUNICATION_MANDATORY') {
    return (
      <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50">
        {loading ? 'Registrando...' : 'Li e Estou Ciente'} <CheckCircle className="h-4 w-4" />
      </button>
    );
  }

  // Informational alerts that link to an action area
  if (alert.type === 'MEASUREMENT_OVERDUE') {
    return (
      <div className="flex gap-2">
        {onNavigate && alert.contractId && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('details', alert.contractId); }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Ver Contrato e Homologar
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50">
          Ciente
        </button>
      </div>
    );
  }

  if (alert.type === 'ALTERATION_OVERDUE') {
    return (
      <div className="flex gap-2">
        {onNavigate && alert.contractId && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('details', alert.contractId); }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Ver Aditivos Pendentes
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
          Ciente
        </button>
      </div>
    );
  }

  if (alert.type === 'OCCURRENCE_CRITICAL_OPEN') {
    return (
      <div className="flex gap-2">
        {onNavigate && alert.contractId && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('details', alert.contractId); }}
            className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Resolver Ocorrência
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
          Ciente
        </button>
      </div>
    );
  }

  if (alert.type === 'PROCESS_PHASE_OVERDUE') {
    return (
      <div className="flex gap-2">
        {onNavigate && alert.processId && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('processes'); }}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Ver Processo
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
          Ciente
        </button>
      </div>
    );
  }

  if (alert.type === 'CONTRACT_EXPIRING_90') {
    return (
      <div className="flex gap-2">
        {onNavigate && alert.contractId && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('details', alert.contractId); }}
            className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Abrir Contrato e Criar Aditivo
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
          Ciente
        </button>
      </div>
    );
  }

  if (alert.type === 'NEW_PROCESS_AUTO_CREATED') {
    return (
      <div className="flex gap-2">
        {onNavigate && (
          <button onClick={() => { onRespond('ACKNOWLEDGED'); onNavigate('processes'); }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
            Ver Processo Criado
          </button>
        )}
        <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
          Ciente
        </button>
      </div>
    );
  }

  // Generic fallback (RENEWAL_APPROVED, RENEWAL_REJECTED)
  return (
    <button onClick={() => onRespond('ACKNOWLEDGED')} disabled={loading}
      className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50">
      {loading ? 'Registrando...' : 'Estou Ciente'} <CheckCircle className="h-4 w-4" />
    </button>
  );
}

// ── Helpers visuais ────────────────────────────────────────────────────────────

function isDismissable(type: ContractAlertType) {
  return ['MEASUREMENT_OVERDUE', 'ALTERATION_OVERDUE', 'OCCURRENCE_CRITICAL_OPEN', 'PROCESS_PHASE_OVERDUE'].includes(type);
}

function alertBarColor(type: ContractAlertType) {
  if (['CONTRACT_EXPIRING_180', 'CONTRACT_EXPIRING_90', 'RENEWAL_REQUESTED'].includes(type)) return 'bg-amber-500';
  if (['OCCURRENCE_CRITICAL_OPEN', 'COMMUNICATION_MANDATORY'].includes(type)) return 'bg-red-500';
  if (['NEW_PROCESS_AUTO_CREATED', 'RENEWAL_APPROVED'].includes(type)) return 'bg-emerald-500';
  return 'bg-blue-500';
}

function alertIconBg(type: ContractAlertType) {
  if (['CONTRACT_EXPIRING_180', 'CONTRACT_EXPIRING_90', 'RENEWAL_REQUESTED'].includes(type)) return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
  if (['OCCURRENCE_CRITICAL_OPEN', 'COMMUNICATION_MANDATORY'].includes(type)) return 'bg-red-500/10 border-red-500/20 text-red-400';
  if (['NEW_PROCESS_AUTO_CREATED', 'RENEWAL_APPROVED'].includes(type)) return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
}

function alertTagColor(type: ContractAlertType) {
  if (['CONTRACT_EXPIRING_180', 'CONTRACT_EXPIRING_90', 'RENEWAL_REQUESTED'].includes(type)) return 'text-amber-400';
  if (['OCCURRENCE_CRITICAL_OPEN', 'COMMUNICATION_MANDATORY'].includes(type)) return 'text-red-400';
  if (['NEW_PROCESS_AUTO_CREATED', 'RENEWAL_APPROVED'].includes(type)) return 'text-emerald-400';
  return 'text-blue-400';
}

function alertTag(type: ContractAlertType): string {
  const tags: Record<ContractAlertType, string> = {
    CONTRACT_EXPIRING_180: 'Alerta de Vencimento — 180 dias',
    CONTRACT_EXPIRING_90: 'Urgente — Vencimento em 90 dias',
    RENEWAL_REQUESTED: 'Solicitação de Prorrogação',
    RENEWAL_APPROVED: 'Prorrogação Aprovada',
    RENEWAL_REJECTED: 'Prorrogação Rejeitada',
    MEASUREMENT_OVERDUE: 'Medição Pendente de Homologação',
    ALTERATION_OVERDUE: 'Aditivo Pendente de Aprovação',
    OCCURRENCE_CRITICAL_OPEN: 'Ocorrência Grave em Aberto',
    PROCESS_PHASE_OVERDUE: 'Fase do Processo em Atraso',
    NEW_PROCESS_AUTO_CREATED: 'Novo Processo Criado',
    COMMUNICATION_MANDATORY: 'Comunicado Obrigatório',
    GESTOR_CONTRACT_UPDATE: 'Atualização pelo Gestor',
  };
  return tags[type] || 'Alerta do Sistema';
}

function AlertIcon({ type }: { type: ContractAlertType }) {
  if (['CONTRACT_EXPIRING_180', 'CONTRACT_EXPIRING_90', 'PROCESS_PHASE_OVERDUE'].includes(type)) return <Clock className="h-5 w-5" />;
  if (['NEW_PROCESS_AUTO_CREATED'].includes(type)) return <FileText className="h-5 w-5" />;
  if (['RENEWAL_APPROVED', 'RENEWAL_REJECTED'].includes(type)) return <CheckCircle className="h-5 w-5" />;
  return <AlertTriangle className="h-5 w-5" />;
}
