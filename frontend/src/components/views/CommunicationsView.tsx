'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Plus, Send, ChevronRight, X, CheckCircle, Archive } from 'lucide-react';
import { api, User } from '@/lib/api';
import { formatDateTime } from '@/lib/labels';

interface CommunicationsViewProps {
  user: User;
  onNavigate?: (view: string, contractId?: string) => void;
}

export function CommunicationsView({ user, onNavigate }: CommunicationsViewProps) {
  const queryClient = useQueryClient();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedComm, setSelectedComm] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Form state
  const [fContractId, setFContractId] = useState('');
  const [fRecipientId, setFRecipientId] = useState('');
  const [fSubject, setFSubject] = useState('');
  const [fMessage, setFMessage] = useState('');

  const { data: contracts } = useQuery({
    queryKey: ['contracts', user.id, user.role],
    queryFn: () => api.contracts.list(),
    enabled: !!user,
  });

  const { data: fiscais } = useQuery({
    queryKey: ['fiscais'],
    queryFn: () => api.utils.getFiscais(),
    enabled: !!user && user.role === 'GESTOR',
  });

  const { data: gestores } = useQuery({
    queryKey: ['gestores'],
    queryFn: () => api.utils.getGestores(),
    enabled: !!user && user.role === 'ALTA_GESTAO',
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.communications.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      queryClient.invalidateQueries({ queryKey: ['all-communications'] });
      setIsNewOpen(false);
      setFContractId(''); setFRecipientId(''); setFSubject(''); setFMessage('');
    },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const replyMutation = useMutation({
    mutationFn: (data: any) => api.communications.reply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications', fContractId] });
      queryClient.invalidateQueries({ queryKey: ['all-communications'] });
      setReplyText('');
    },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => api.communications.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-communications'] });
      setSelectedComm(null);
    },
    onError: (err: any) => alert(`Erro ao concluir: ${err.message}`),
  });

  // Agregar comunicados por contrato — listar de todos os contratos acessíveis
  const allContracts: any[] = contracts ?? [];
  const contractIds = allContracts.map((c: any) => c.id);

  const { data: allComms } = useQuery({
    queryKey: ['all-communications', contractIds.join(',')],
    queryFn: async () => {
      const results = await Promise.all(
        contractIds.map((id: string) => api.communications.listByContract(id).catch(() => []))
      );
      return results.flat();
    },
    enabled: contractIds.length > 0,
  });

  const allTopLevel: any[] = (allComms ?? []).filter((c: any) => !c.parentId);
  const activeComms = allTopLevel.filter((c: any) => !c.isCompleted);
  const completedComms = allTopLevel.filter((c: any) => c.isCompleted);

  const repliesMap: Record<string, any[]> = {};
  (allComms ?? []).filter((c: any) => c.parentId).forEach((r: any) => {
    if (!repliesMap[r.parentId]) repliesMap[r.parentId] = [];
    repliesMap[r.parentId].push(r);
  });

  const getContractNumber = (contractId: string) =>
    allContracts.find((c: any) => c.id === contractId)?.contractNumber || contractId;

  const renderComm = (comm: any) => {
    const replies = repliesMap[comm.id] ?? [];
    const isExpanded = selectedComm?.id === comm.id;

    return (
      <div key={comm.id} className={`border rounded-xl overflow-hidden transition-all ${
        comm.isCompleted ? 'bg-zinc-900/10 border-zinc-800/50 opacity-75' : 'bg-zinc-900/20 border-zinc-900'
      }`}>
        {/* Header do comunicado */}
        <button
          onClick={() => onNavigate ? onNavigate('details', comm.contractId) : setSelectedComm(isExpanded ? null : comm)}
          className="w-full text-left p-5 flex justify-between items-start hover:bg-zinc-900/30 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                {getContractNumber(comm.contractId)}
              </span>
              {!comm.readAt && comm.recipientId === user.id && (
                <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold">NOVO</span>
              )}
              {comm.sender?.role === 'ALTA_GESTAO' && user.role === 'GESTOR' && (
                <span className="text-[9px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded font-bold">COMUNICADO RECEBIDO</span>
              )}
              {comm.isCompleted && (
                <span className="text-[9px] bg-zinc-800 text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <Archive className="h-2.5 w-2.5" /> Concluído
                </span>
              )}
            </div>
            <h4 className="text-xs font-bold text-white">{comm.subject}</h4>
            <p className="text-[11px] text-zinc-500">
              De: <span className="text-zinc-400 font-medium">{comm.sender?.name}</span>
              {comm.recipient && <> → Para: <span className="text-zinc-400 font-medium">{comm.recipient.name}</span></>}
              <span className="ml-2">• {formatDateTime(comm.createdAt)}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {replies.length > 0 && (
              <span className="text-[10px] text-zinc-500">{replies.length} resposta{replies.length > 1 ? 's' : ''}</span>
            )}
            <ChevronRight className={`h-4 w-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </button>

        {/* Corpo expandido */}
        {isExpanded && (
          <div className="border-t border-zinc-900 p-5 space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-lg border border-zinc-900">
              {comm.message}
            </p>

            {/* Respostas */}
            {replies.length > 0 && (
              <div className="space-y-3 pl-4 border-l-2 border-zinc-800">
                {replies.map((reply: any) => (
                  <div key={reply.id} className="bg-zinc-950 p-3 rounded-lg border border-zinc-900">
                    <p className="text-[10px] text-zinc-500 mb-1">
                      <span className="text-zinc-400 font-medium">{reply.sender?.name}</span> • {formatDateTime(reply.createdAt)}
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{reply.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Ação: Concluir comunicado (apenas Gestor, apenas ativos) */}
            {user.role === 'GESTOR' && !comm.isCompleted && (
              <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Encerrar Comunicado</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Marcar como concluído — será movido para a lista de comunicados arquivados</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Confirmar conclusão deste comunicado? Ele será arquivado.')) {
                      completeMutation.mutate(comm.id);
                    }
                  }}
                  disabled={completeMutation.isPending}
                  className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-[10px] font-bold transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {completeMutation.isPending ? 'Concluindo...' : 'Concluir'}
                </button>
              </div>
            )}

            {/* Formulário de resposta — Fiscal responde, Gestor também (apenas ativos) */}
            {!comm.isCompleted && (comm.recipientId === user.id || comm.senderId === user.id || user.role === 'GESTOR') && (
              <div className="space-y-2">
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Responder</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  placeholder="Escreva sua resposta..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
                <button
                  disabled={!replyText.trim() || replyMutation.isPending}
                  onClick={() => {
                    replyMutation.mutate({
                      contractId: comm.contractId,
                      subject: `Re: ${comm.subject}`,
                      message: replyText,
                      parentId: comm.id,
                      recipientId: comm.senderId === user.id ? comm.recipientId : comm.senderId,
                    });
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  Enviar Resposta
                </button>
              </div>
            )}

            {/* Indicação de comunicado concluído */}
            {comm.isCompleted && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                <Archive className="h-4 w-4 text-zinc-500 shrink-0" />
                <p className="text-[10px] text-zinc-500">
                  Comunicado concluído em {comm.completedAt ? formatDateTime(comm.completedAt) : '—'}. As respostas não são mais possíveis.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-semibold text-white">Central de Comunicados</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Mensagens oficiais entre Gestor e Fiscais vinculadas aos contratos</p>
        </div>
        {(user.role === 'GESTOR' || user.role === 'ALTA_GESTAO') && (
          <button
            onClick={() => setIsNewOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Comunicado
          </button>
        )}
      </div>

      {/* Comunicados Ativos */}
      {activeComms.length === 0 && completedComms.length === 0 ? (
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-12 text-center">
          <MessageSquare className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Nenhum comunicado registrado.</p>
        </div>
      ) : (
        <>
          {/* Lista de comunicados ativos */}
          {activeComms.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                Comunicados Ativos ({activeComms.length})
              </h3>
              {activeComms.map(renderComm)}
            </div>
          )}

          {/* Lista de comunicados concluídos — colapsável */}
          {completedComms.length > 0 && (
            <div className="space-y-3">
              <button
                onClick={() => setShowCompleted(v => !v)}
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer uppercase tracking-widest"
              >
                <Archive className="h-3.5 w-3.5" />
                Comunicados Concluídos e Arquivados ({completedComms.length})
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showCompleted ? 'rotate-90' : ''}`} />
              </button>

              {showCompleted && (
                <div className="space-y-3 pl-4 border-l-2 border-zinc-800">
                  <p className="text-[10px] text-zinc-600 italic">
                    Comunicados encerrados pelo gestor. Mantidos para registro histórico.
                  </p>
                  {completedComms.map(renderComm)}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal: Novo Comunicado */}
      {isNewOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsNewOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-bold text-white mb-2">Novo Comunicado Oficial</h3>
            <p className="text-xs text-zinc-500 mb-5 border-b border-zinc-800 pb-3">Mensagem vinculada a um contrato específico.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate({
                  contractId: fContractId,
                  recipientId: fRecipientId || undefined,
                  subject: fSubject,
                  message: fMessage,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Contrato de Referência</label>
                <select value={fContractId} onChange={(e) => setFContractId(e.target.value)} required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50">
                  <option value="">Selecione um contrato...</option>
                  {allContracts.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.contractNumber} — {c.contractor?.tradeName || c.contractor?.corporateName}</option>
                  ))}
                </select>
              </div>

              {user.role === 'GESTOR' && fiscais && (
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Destinatário (Fiscal)</label>
                  <select value={fRecipientId} onChange={(e) => setFRecipientId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50">
                    <option value="">Todos os fiscais do contrato</option>
                    {(fiscais as any[]).map((f: any) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
              )}
              {user.role === 'ALTA_GESTAO' && (
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Destinatário (Gestor) *</label>
                  <select value={fRecipientId} onChange={(e) => setFRecipientId(e.target.value)} required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50">
                    <option value="">Selecione um Gestor...</option>
                    {(gestores as any[] ?? []).map((g: any) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Assunto</label>
                <input type="text" value={fSubject} onChange={(e) => setFSubject(e.target.value)} required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  placeholder="Assunto do comunicado oficial..." />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Mensagem</label>
                <textarea value={fMessage} onChange={(e) => setFMessage(e.target.value)} required rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  placeholder="Texto da comunicação oficial..." />
              </div>

              <button type="submit" disabled={createMutation.isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
                {createMutation.isPending ? 'Enviando...' : 'Publicar Comunicado'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
