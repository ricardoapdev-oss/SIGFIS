'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Archive, ArchiveRestore, ChevronLeft, Eye, Search, X, ShieldAlert,
  Trash2, AlertTriangle, FileClock, Bell, ClipboardList, Ban, Info,
} from 'lucide-react';
import { api, User } from '@/lib/api';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/labels';
import { contractStatusLabel, contractStatusColor, modalityLabel } from '@/lib/labels';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import { Tooltip } from '@/components/ui/tooltip';
import { ContractHistory } from './ContractTabs';

// Revisão técnica (Etapa 3, Ponto 2): ContractPayment não tem status,
// estorno/cancelamento, glosa, retenção, valor líquido nem ordem bancária
// (auditado no schema real de produção). O total bruto de pagamentos
// registrados não é tratado como indicador financeiro "efetivo" — ver
// mesma decisão em ContractTabs.tsx (aba Pagamentos).
const PAGAMENTOS_INCOMPLETOS_TOOLTIP =
  'Dados financeiros incompletos: os registros de pagamento não têm status, estorno/cancelamento, glosa, retenção nem valor líquido. Não deve ser tratado como indicador financeiro oficial de pagamento efetivo.';

interface Props {
  user: User;
  onBack?: () => void;
}

const PAGE_SIZE = 12;

/**
 * Painel "Gerenciar dados históricos" — exclusivo do ADMIN. Ações
 * independentes da exclusão do contrato: cada uma apaga apenas um tipo de
 * dado vinculado (histórico de auditoria, alertas ou ocorrências), sem
 * apagar o contrato em si.
 */
function HistoricalDataPanel({ contractId, contractNumber }: { contractId: string; contractNumber: string }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: summary, isLoading } = useQuery({
    queryKey: ['contract-historical-data', contractId],
    queryFn: () => api.contracts.getHistoricalDataSummary(contractId),
    enabled: open,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['contract-historical-data', contractId] });
    queryClient.invalidateQueries({ queryKey: ['archived-contracts'] });
  };

  const deleteHistoryMutation = useMutation({
    mutationFn: () => api.contracts.deleteHistory(contractId),
    onSuccess: invalidate,
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const deleteAlertsMutation = useMutation({
    mutationFn: () => api.contracts.deleteAlerts(contractId),
    onSuccess: invalidate,
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const deleteOccurrencesMutation = useMutation({
    mutationFn: () => api.contracts.deleteOccurrences(contractId),
    onSuccess: invalidate,
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const confirmAndRun = (label: string, mutate: () => void) => {
    if (confirm(`Excluir ${label}?\n\nEsta ação removerá permanentemente os registros selecionados deste contrato e não poderá ser desfeita.`)) {
      mutate();
    }
  };

  return (
    <div className="border border-red-200 bg-red-50/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left cursor-pointer hover:bg-red-50/70 transition-colors"
      >
        <span className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wide">
          <ShieldAlert className="h-4 w-4" /> Gerenciar Dados Históricos (Auditor/Admin)
        </span>
        <span className="text-[10px] text-red-500">{open ? 'Recolher' : 'Expandir'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-[11px] text-red-700/80 leading-relaxed">
            Exclusão definitiva de dados vinculados ao contrato {contractNumber}. Diferente de excluir o contrato:
            cada ação abaixo apaga apenas um tipo de registro, sem apagar o contrato em si.
          </p>

          {isLoading ? (
            <div className="h-16 bg-white/60 rounded-lg animate-pulse" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-white border border-red-200 rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <FileClock className="h-3 w-3" /> Histórico
                </div>
                <p className="text-lg font-bold text-gray-900">{summary?.auditCount ?? '—'}</p>
                <button
                  onClick={() => confirmAndRun('o histórico de auditoria deste contrato', () => deleteHistoryMutation.mutate())}
                  disabled={deleteHistoryMutation.isPending || !summary?.auditCount}
                  className="flex items-center justify-center gap-1 text-[10px] font-semibold text-red-600 border border-red-300 rounded-lg py-1.5 hover:bg-red-50 disabled:opacity-40 cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Excluir definitivamente
                </button>
              </div>
              <div className="bg-white border border-red-200 rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <Bell className="h-3 w-3" /> Alertas
                </div>
                <p className="text-lg font-bold text-gray-900">{summary?.alertsCount ?? '—'}</p>
                <button
                  onClick={() => confirmAndRun('os alertas deste contrato', () => deleteAlertsMutation.mutate())}
                  disabled={deleteAlertsMutation.isPending || !summary?.alertsCount}
                  className="flex items-center justify-center gap-1 text-[10px] font-semibold text-red-600 border border-red-300 rounded-lg py-1.5 hover:bg-red-50 disabled:opacity-40 cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Excluir definitivamente
                </button>
              </div>
              <div className="bg-white border border-red-200 rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <ClipboardList className="h-3 w-3" /> Ocorrências
                </div>
                <p className="text-lg font-bold text-gray-900">{summary?.occurrencesCount ?? '—'}</p>
                <button
                  onClick={() => confirmAndRun('as ocorrências deste contrato', () => deleteOccurrencesMutation.mutate())}
                  disabled={deleteOccurrencesMutation.isPending || !summary?.occurrencesCount}
                  className="flex items-center justify-center gap-1 text-[10px] font-semibold text-red-600 border border-red-300 rounded-lg py-1.5 hover:bg-red-50 disabled:opacity-40 cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Excluir definitivamente
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ArchivedContractDetail({ contract, user, onClose, onRestored }: {
  contract: any; user: User; onClose: () => void; onRestored: () => void;
}) {
  const restoreMutation = useMutation({
    mutationFn: () => api.contracts.restore(contract.id),
    onSuccess: () => { onRestored(); onClose(); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const hardDeleteMutation = useMutation({
    mutationFn: () => api.contracts.hardDelete(contract.id),
    onSuccess: () => { onRestored(); onClose(); },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const isAdmin = user.role === 'ADMIN';
  const canRestore = user.role === 'ADMIN' || user.role === 'GESTOR';
  const fiscais = (contract.fiscalAssignments || []).map((a: any) => a.fiscal?.name).filter(Boolean);
  const isRescinded = contract.status === 'RESCINDED';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          {isRescinded ? (
            <span className="text-[9px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 shrink-0 bg-red-50 text-red-700 border-red-300">
              <Ban className="h-3 w-3" /> Rescindido
            </span>
          ) : (
            <span className="text-[9px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 shrink-0 bg-gray-100 text-gray-600 border-gray-300">
              <Archive className="h-3 w-3" /> Arquivado
            </span>
          )}
          <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border ${contractStatusColor[contract.status] || ''}`}>
            {contractStatusLabel[contract.status] || contract.status}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">{contract.contractNumber}</h3>

        {/* Dados principais */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs mb-5">
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Modalidade</dt>
            <dd className="text-gray-800 mt-0.5">{contract.process?.modality ? (modalityLabel[contract.process.modality] || contract.process.modality) : '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Processo de origem</dt>
            <dd className="text-gray-800 mt-0.5">{contract.process?.processNumber || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Empresa</dt>
            <dd className="text-gray-800 mt-0.5">{contract.contractor?.tradeName || contract.contractor?.corporateName || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CNPJ</dt>
            <dd className="text-gray-800 mt-0.5 font-mono">{contract.contractor?.cnpjCpf || '—'}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valor</dt>
            <dd className="text-gray-800 mt-0.5 font-semibold">{formatCurrency(contract.currentValue)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Vigência</dt>
            <dd className="text-gray-800 mt-0.5">{formatDate(contract.startDate)} — {formatDate(contract.endDate)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fiscal(is)</dt>
            <dd className="text-gray-800 mt-0.5">{fiscais.length > 0 ? fiscais.join(', ') : '—'}</dd>
          </div>
        </div>

        {/* Execução */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-500">Aditivos</p>
            <p className="text-base font-bold text-gray-900 mt-1">{(contract.alterations || []).length}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-500">Ocorrências</p>
            <p className="text-base font-bold text-gray-900 mt-1">{(contract.occurrences || []).length}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
              Total Pago
              <Tooltip side="bottom" interactive content={<span className="block">{PAGAMENTOS_INCOMPLETOS_TOOLTIP} (bruto registrado: {formatCurrency((contract.payments || []).reduce((s: number, p: any) => s + Number(p.value), 0))})</span>}>
                <Info className="h-3 w-3 shrink-0" />
              </Tooltip>
            </p>
            <p className="text-sm font-bold text-gray-400 mt-1">Dados incompletos</p>
          </div>
        </div>

        {/* Metadados de arquivamento — destaque diferenciado para rescisão */}
        <div className={`border rounded-xl p-3 mb-5 text-[11px] space-y-0.5 ${isRescinded ? 'bg-red-50/60 border-red-200 text-red-800' : 'bg-amber-50/60 border-amber-200 text-amber-800'}`}>
          <p><strong>Arquivado em:</strong> {contract.archivedAt ? formatDateTime(contract.archivedAt) : '—'} {contract.archivedBy?.name ? `por ${contract.archivedBy.name}` : ''}</p>
          <p><strong>Motivo:</strong> {contract.archiveReason || '—'}</p>
          {contract.restoredAt && (
            <p><strong>Última restauração:</strong> {formatDateTime(contract.restoredAt)} {contract.restoredBy?.name ? `por ${contract.restoredBy.name}` : ''}</p>
          )}
        </div>

        {/* Histórico */}
        <div className="mb-5">
          <ContractHistory contractId={contract.id} user={user} />
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
          {canRestore && (
            <button
              onClick={() => { if (confirm(`Restaurar o contrato ${contract.contractNumber}?\n\nEle voltará para a listagem principal de Contratos, mantendo o histórico preservado. A situação contratual não é alterada automaticamente.`)) restoreMutation.mutate(); }}
              disabled={restoreMutation.isPending}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-colors"
            >
              <ArchiveRestore className="h-3.5 w-3.5" /> {restoreMutation.isPending ? 'Restaurando...' : 'Restaurar Contrato'}
            </button>
          )}

          {isAdmin && (
            <>
              <HistoricalDataPanel contractId={contract.id} contractNumber={contract.contractNumber} />

              <button
                onClick={() => {
                  const input = window.prompt(
                    `ATENÇÃO: esta ação é irreversível.\n\nA exclusão definitiva removerá permanentemente o contrato ${contract.contractNumber} e os dados vinculados a ele (fiscalizações, aditivos, ocorrências, pagamentos, comunicados, documentos). Essa operação não poderá ser desfeita.\n\nDigite EXCLUIR para confirmar.`
                  );
                  if (input === 'EXCLUIR') hardDeleteMutation.mutate();
                }}
                disabled={hardDeleteMutation.isPending}
                className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-colors"
              >
                <AlertTriangle className="h-3.5 w-3.5" /> {hardDeleteMutation.isPending ? 'Excluindo...' : 'Excluir Definitivamente'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArchivedContractsView({ user, onBack }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [page, setPage] = useState(1);

  const { data: contracts, isLoading, isError, error } = useQuery<any[]>({
    queryKey: ['archived-contracts'],
    queryFn: () => api.contracts.listArchived(),
  });

  const isAdmin = user.role === 'ADMIN';
  const canRestore = user.role === 'ADMIN' || user.role === 'GESTOR';

  const restoreMutation = useMutation({
    mutationFn: (id: string) => api.contracts.restore(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['archived-contracts'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const hardDeleteMutation = useMutation({
    mutationFn: (id: string) => api.contracts.hardDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['archived-contracts'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const filtered = (contracts || []).filter((c: any) => {
    const term = search.toLowerCase();
    return (
      c.contractNumber.toLowerCase().includes(term) ||
      (c.contractor?.corporateName || '').toLowerCase().includes(term) ||
      (c.contractor?.tradeName || '').toLowerCase().includes(term) ||
      (c.contractor?.cnpjCpf || '').includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageClamped = Math.min(page, totalPages);
  const paginated = filtered.slice((pageClamped - 1) * PAGE_SIZE, pageClamped * PAGE_SIZE);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer mb-1.5">
              <ChevronLeft className="h-3.5 w-3.5" /> Contratos
            </button>
          )}
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Archive className="h-4 w-4 text-gray-500" /> Contratos Arquivados
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Consulta histórica — contratos encerrados ou arquivados, fora da operação corrente</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Buscar por número, empresa ou CNPJ..."
          className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100/60 rounded-xl animate-pulse" />)}</div>
      ) : isError ? (
        <EmptyState icon={AlertTriangle} title="Não foi possível carregar os contratos arquivados"
          description={(error as any)?.message || 'Verifique sua conexão ou permissões e tente novamente.'} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Archive} title="Nenhum contrato arquivado"
          description={search ? 'Nenhum contrato arquivado corresponde à busca.' : 'Contratos encerrados ou arquivados manualmente aparecerão aqui.'} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-[10px] uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-2.5 font-semibold text-left">Contrato</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Modalidade</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Vigência</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Valor</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Empresa</th>
                  <th className="px-4 py-2.5 font-semibold text-left">CNPJ</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Fiscal</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Status</th>
                  <th className="px-4 py-2.5 font-semibold text-left">
                    <span className="inline-flex items-center gap-1">
                      Total Pago
                      <Tooltip side="bottom" interactive className="normal-case tracking-normal" content={<span className="block">{PAGAMENTOS_INCOMPLETOS_TOOLTIP}</span>}>
                        <Info className="h-3 w-3 shrink-0" />
                      </Tooltip>
                    </span>
                  </th>
                  <th className="px-4 py-2.5 font-semibold text-left">Arquivado em</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Motivo</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c: any) => {
                  const fiscalName = (c.fiscalAssignments || [])[0]?.fiscal?.name;
                  const isRescinded = c.status === 'RESCINDED';
                  return (
                    <tr key={c.id} className={`border-b last:border-0 transition-colors ${isRescinded ? 'border-red-100 bg-red-50/40 hover:bg-red-50/70' : 'border-gray-100 hover:bg-gray-50/60'}`}>
                      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {isRescinded && <Ban className="h-3 w-3 text-red-500 shrink-0" />}
                          {c.contractNumber}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.process?.modality ? (modalityLabel[c.process.modality] || c.process.modality) : '—'}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(c.startDate)} – {formatDate(c.endDate)}</td>
                      <td className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">{formatCurrency(c.currentValue)}</td>
                      <td className="max-w-[160px] px-4 py-3 text-gray-700"><span className="line-clamp-1">{c.contractor?.tradeName || c.contractor?.corporateName || '—'}</span></td>
                      <td className="px-4 py-3 text-gray-500 font-mono whitespace-nowrap">{c.contractor?.cnpjCpf || '—'}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{fiscalName || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded px-2 py-0.5 text-[11px] font-bold border ${contractStatusColor[c.status] || ''}`}>
                          {contractStatusLabel[c.status] || c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-400 whitespace-nowrap" title={`${PAGAMENTOS_INCOMPLETOS_TOOLTIP} (bruto registrado: ${formatCurrency(c.totalPaid)})`}>Dados incompletos</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{c.archivedAt ? formatDate(c.archivedAt) : '—'}</td>
                      <td className={`max-w-[180px] px-4 py-3 ${isRescinded ? 'text-red-700 font-medium' : 'text-gray-500'}`} title={c.archiveReason || undefined}>
                        <span className="line-clamp-1">{c.archiveReason || '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelected(c)}
                            title="Visualizar"
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-brand-blue cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          {canRestore && (
                            <button
                              onClick={() => { if (confirm(`Restaurar o contrato ${c.contractNumber}?\n\nEle voltará para a listagem principal de Contratos, mantendo o histórico preservado.`)) restoreMutation.mutate(c.id); }}
                              disabled={restoreMutation.isPending}
                              title="Restaurar contrato"
                              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 cursor-pointer"
                            >
                              <ArchiveRestore className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              onClick={() => {
                                const input = window.prompt(
                                  `ATENÇÃO: esta ação é irreversível.\n\nA exclusão definitiva removerá permanentemente o contrato ${c.contractNumber} e os dados vinculados a ele. Essa operação não poderá ser desfeita.\n\nDigite EXCLUIR para confirmar.`
                                );
                                if (input === 'EXCLUIR') hardDeleteMutation.mutate(c.id);
                              }}
                              disabled={hardDeleteMutation.isPending}
                              title="Excluir definitivamente (irreversível)"
                              className="rounded-lg p-1.5 text-red-500/60 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row">
            <span className="text-[11px] text-gray-500">{filtered.length} contrato{filtered.length !== 1 ? 's' : ''} arquivado{filtered.length !== 1 ? 's' : ''} · página {pageClamped} de {totalPages}</span>
            <Pagination page={pageClamped} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}

      {selected && (
        <ArchivedContractDetail
          contract={selected}
          user={user}
          onClose={() => setSelected(null)}
          onRestored={() => queryClient.invalidateQueries({ queryKey: ['archived-contracts'] })}
        />
      )}
    </div>
  );
}
