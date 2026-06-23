'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FileText, AlertTriangle, CheckCircle, DollarSign,
  Bell, Plus, ArrowRight, ChevronRight, FileSignature,
  AlertCircle, Check, X, PlusCircle,
  Search,
} from 'lucide-react';
import {
  api, getStoredUser, setStoredUser, setStoredToken, User, Contract, FiscalRole, OccurrenceSeverity, AlterationType,
} from '../lib/api';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProcessesView } from '@/components/views/ProcessesView';
import { CommunicationsView } from '@/components/views/CommunicationsView';
import { UsersView } from '@/components/views/UsersView';
import { PendingDashboard } from '@/components/views/PendingDashboard';
import { AlertEngine } from '@/components/alerts/AlertEngine';
import { GestorDashboard } from '@/components/views/GestorDashboard';
import { FiscalDashboard } from '@/components/views/FiscalDashboard';
import { ContractTabs } from '@/components/views/ContractTabs';
import { RiskPanel } from '@/components/views/RiskPanel';
import { AuditView } from '@/components/views/AuditView';
import { AIInsightsPanel } from '@/components/ai/AIInsightsPanel';
import {
  contractStatusLabel, contractStatusColor,
  measurementStatusLabel, measurementStatusColor,
  occurrenceSeverityLabel, occurrenceSeverityColor,
  occurrenceStatusLabel, occurrenceStatusColor,
  alterationTypeLabel, alterationStatusLabel, alterationStatusColor,
  fiscalRoleLabel,
  formatCurrency, formatDate, formatDateTime,
} from '@/lib/labels';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai';

export default function Home() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

  // Login
  const [email, setEmail] = useState('gestor@sigecontratos.com');
  const [password, setPassword] = useState('gestor123');
  const [loginError, setLoginError] = useState('');

  // Modais
  const [isNewContractOpen, setIsNewContractOpen] = useState(false);
  const [isAssignFiscalOpen, setIsAssignFiscalOpen] = useState(false);
  const [isNewMeasurementOpen, setIsNewMeasurementOpen] = useState(false);
  const [isNewOccurrenceOpen, setIsNewOccurrenceOpen] = useState(false);
  const [isNewAlterationOpen, setIsNewAlterationOpen] = useState(false);
  const [isResolveOccOpen, setIsResolveOccOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  // Estados de formulários
  const [newCtrNumber, setNewCtrNumber] = useState('');
  const [newCtrContractorId, setNewCtrContractorId] = useState('');
  const [newCtrValue, setNewCtrValue] = useState('');
  const [newCtrSigningDate, setNewCtrSigningDate] = useState('');
  const [newCtrStartDate, setNewCtrStartDate] = useState('');
  const [newCtrEndDate, setNewCtrEndDate] = useState('');
  const [newCtrObject, setNewCtrObject] = useState('');

  const [asgFiscalId, setAsgFiscalId] = useState('');
  const [asgRole, setAsgRole] = useState<FiscalRole>('TITULAR');
  const [asgAct, setAsgAct] = useState('');
  const [asgDate, setAsgDate] = useState('');
  const [asgStartDate, setAsgStartDate] = useState('');

  const [msrStart, setMsrStart] = useState('');
  const [msrEnd, setMsrEnd] = useState('');
  const [msrValue, setMsrValue] = useState('');
  const [msrReport, setMsrReport] = useState('');

  const [occTitle, setOccTitle] = useState('');
  const [occDesc, setOccDesc] = useState('');
  const [occSeverity, setOccSeverity] = useState<OccurrenceSeverity>('MEDIUM');

  const [altType, setAltType] = useState<AlterationType>('ADDENDUM_VALUE_INCREASE');
  const [altNumber, setAltNumber] = useState('');
  const [altValue, setAltValue] = useState('');
  const [altEndDate, setAltEndDate] = useState('');
  const [altJustification, setAltJustification] = useState('');

  const [selectedOccId, setSelectedOccId] = useState<string | null>(null);
  const [occResolutionDesc, setOccResolutionDesc] = useState('');
  const [rejectTarget, setRejectTarget] = useState<{ type: 'measurement' | 'alteration'; id: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [contractSearch, setContractSearch] = useState('');

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['stats', user?.id, user?.role],
    queryFn: () => api.contracts.stats(),
    enabled: !!user,
  });

  const { data: contracts, isLoading: isContractsLoading } = useQuery({
    queryKey: ['contracts', user?.id, user?.role],
    queryFn: () => api.contracts.list(),
    enabled: !!user,
  });

  const { data: selectedContract, isLoading: isContractLoading } = useQuery({
    queryKey: ['contract', selectedContractId],
    queryFn: () => api.contracts.get(selectedContractId!),
    enabled: !!user && !!selectedContractId,
  });

  const { data: contractorsList } = useQuery({
    queryKey: ['contractors'],
    queryFn: () => api.utils.getContractors(),
    enabled: !!user,
  });

  const { data: fiscaisList } = useQuery({
    queryKey: ['fiscais'],
    queryFn: () => api.utils.getFiscais(),
    enabled: !!user,
  });

  // ── Mutations ─────────────────────────────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) => api.auth.login(creds),
    onSuccess: (data) => {
      setStoredToken(data.access_token);
      setStoredUser(data.user);
      setUser(data.user);
      setLoginError('');
    },
    onError: (err: any) => setLoginError(err.message || 'Erro de autenticação'),
  });

  const createContractMutation = useMutation({
    mutationFn: (data: any) => api.contracts.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contracts'] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setIsNewContractOpen(false); resetContractForm(); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const assignFiscalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.contracts.assignFiscal(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); setIsAssignFiscalOpen(false); resetAssignForm(); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const createMeasurementMutation = useMutation({
    mutationFn: (data: any) => api.measurements.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setIsNewMeasurementOpen(false); resetMeasurementForm(); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const approveMeasurementMutation = useMutation({
    mutationFn: (id: string) => api.measurements.approve(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const rejectMeasurementMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.measurements.reject(id, reason),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setRejectModalOpen(false); setRejectionReason(''); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const createOccurrenceMutation = useMutation({
    mutationFn: (data: any) => api.occurrences.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setIsNewOccurrenceOpen(false); resetOccurrenceForm(); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const resolveOccurrenceMutation = useMutation({
    mutationFn: ({ id, desc }: { id: string; desc: string }) => api.occurrences.resolve(id, desc),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setIsResolveOccOpen(false); setOccResolutionDesc(''); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const createAlterationMutation = useMutation({
    mutationFn: (data: any) => api.alterations.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setIsNewAlterationOpen(false); resetAlterationForm(); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const approveAlterationMutation = useMutation({
    mutationFn: (id: string) => api.alterations.approve(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const rejectAlterationMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.alterations.reject(id, reason),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contract', selectedContractId] }); queryClient.invalidateQueries({ queryKey: ['stats'] }); setRejectModalOpen(false); setRejectionReason(''); },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  // ── Resets ────────────────────────────────────────────────────────────────
  const resetContractForm = () => { setNewCtrNumber(''); setNewCtrContractorId(''); setNewCtrValue(''); setNewCtrSigningDate(''); setNewCtrStartDate(''); setNewCtrEndDate(''); setNewCtrObject(''); };
  const resetAssignForm = () => { setAsgFiscalId(''); setAsgRole('TITULAR'); setAsgAct(''); setAsgDate(''); setAsgStartDate(''); };
  const resetMeasurementForm = () => { setMsrStart(''); setMsrEnd(''); setMsrValue(''); setMsrReport(''); };
  const resetOccurrenceForm = () => { setOccTitle(''); setOccDesc(''); setOccSeverity('MEDIUM'); };
  const resetAlterationForm = () => { setAltType('ADDENDUM_VALUE_INCREASE'); setAltNumber(''); setAltValue(''); setAltEndDate(''); setAltJustification(''); };

  const handleLogout = () => { setStoredToken(null); setStoredUser(null); setUser(null); setSelectedContractId(null); setActiveView('dashboard'); };

  const handleNavigate = (view: View, contractId?: string, processId?: string) => {
    if (contractId) setSelectedContractId(contractId);
    else if (view !== 'details') setSelectedContractId(null);
    setActiveView(view);
  };

  const filteredContracts = (contracts ?? []).filter((c: Contract) =>
    c.contractNumber?.toLowerCase().includes(contractSearch.toLowerCase()) ||
    c.objectDescription?.toLowerCase().includes(contractSearch.toLowerCase()) ||
    (c.contractor as any)?.corporateName?.toLowerCase().includes(contractSearch.toLowerCase()) ||
    (c.contractor as any)?.tradeName?.toLowerCase().includes(contractSearch.toLowerCase())
  );

  // ── Tela de Login ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-zinc-950 p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-900/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-emerald-500/10 rounded-xl mb-4 border border-emerald-500/20">
              <FileSignature className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">SIGECONTRATOS</h1>
            <p className="text-zinc-400 text-sm mt-1">IQUEGO — Gestão e Fiscalização de Contratos</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); loginMutation.mutate({ email, password }); }} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">E-mail Corporativo</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
                placeholder="servidor@iquego.com.br" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
                placeholder="••••••••" />
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" disabled={loginMutation.isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60">
              {loginMutation.isPending ? 'Verificando...' : 'Acessar o Sistema'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
            <p className="text-zinc-500 text-xs mb-3">Contas de teste:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'Gestor (Ana)', email: 'gestor@sigecontratos.com', pw: 'gestor123' },
                { label: 'Fiscal (João)', email: 'fiscal1@sigecontratos.com', pw: 'fiscal123' },
                { label: 'Auditor (Carlos)', email: 'admin@sigecontratos.com', pw: 'admin123' },
              ].map((acc) => (
                <button key={acc.email} onClick={() => { setEmail(acc.email); setPassword(acc.pw); }}
                  className="bg-zinc-800/60 hover:bg-zinc-800 px-2.5 py-1.5 rounded-md text-[10px] text-zinc-300 font-medium transition-colors cursor-pointer">
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Layout Principal ───────────────────────────────────────────────────────
  const headerTitles: Record<View, string> = {
    dashboard: 'Painel Consolidado',
    contracts: 'Contratos Administrativos',
    details: 'Detalhes do Contrato',
    processes: 'Processos de Contratação',
    communications: 'Central de Comunicados',
    users: 'Gestão de Usuários',
    pending: 'Central de Pendências',
    risk: 'Painel de Risco',
    audit: 'Trilha de Auditoria',
    ai: 'IA Corporativa',
  };

  return (
    <div className="flex-1 flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Sidebar user={user} activeView={activeView} onNavigate={handleNavigate} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        {/* Header */}
        <header className="h-16 border-b border-zinc-900 flex justify-between items-center px-8 shrink-0">
          <h1 className="text-sm font-semibold text-white">{headerTitles[activeView]}</h1>

          <div className="flex items-center gap-4 relative">
            {user.role !== 'ADMIN' && (
              <button onClick={() => handleNavigate('pending')}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-900 hover:border-zinc-800 rounded-lg transition-all relative cursor-pointer">
                <Bell className="h-4 w-4" />
                {(stats?.pendingAlerts ?? 0) > 0 && (
                  <span className="absolute top-[-2px] right-[-2px] min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-[9px] font-bold text-zinc-950 flex items-center justify-center">
                    {stats.pendingAlerts > 9 ? '9+' : stats.pendingAlerts}
                  </span>
                )}
              </button>
            )}

            <div className="text-right border-l border-zinc-900 pl-4">
              <span className="text-xs font-semibold text-zinc-300 block">{user.name}</span>
              <span className="text-[10px] text-zinc-500 block">{user.role}</span>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* ── DASHBOARD GESTOR ── */}
          {activeView === 'dashboard' && user.role === 'GESTOR' && (
            <GestorDashboard user={user} onNavigate={(v, cId) => handleNavigate(v as View, cId)} />
          )}

          {/* ── DASHBOARD FISCAL ── */}
          {activeView === 'dashboard' && user.role === 'FISCAL' && (
            <FiscalDashboard user={user} onNavigate={(v, cId) => handleNavigate(v as View, cId)} />
          )}

          {/* ── DASHBOARD ADMIN (padrão existente) ── */}
          {activeView === 'dashboard' && user.role === 'ADMIN' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {isStatsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-zinc-900/40 border border-zinc-900 rounded-xl animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard label="Contratos Sob Gestão" value={stats?.totalContracts} badge={`${stats?.activeContracts} Ativos`} icon={<FileText className="h-5 w-5" />} />
                  <MetricCard label="Valor Acumulado" value={formatCurrency(stats?.totalValue ?? 0)} icon={<DollarSign className="h-5 w-5" />} small />
                  <MetricCard label="Valor Executado" value={formatCurrency(stats?.totalMeasured ?? 0)}
                    badge={stats?.totalValue > 0 ? `${((stats.totalMeasured / stats.totalValue) * 100).toFixed(1)}% executado` : '0%'}
                    icon={<CheckCircle className="h-5 w-5" />} accent="emerald" small />
                  <MetricCard label="Ocorrências Ativas" value={stats?.openOccurrences} icon={<AlertTriangle className="h-5 w-5" />} accent="red" />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contratos recentes */}
                <div className="lg:col-span-2 bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Contratos Recentes</h3>
                      <p className="text-[11px] text-zinc-500">Últimos contratos ativos</p>
                    </div>
                    <button onClick={() => setActiveView('contracts')} className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer">
                      Ver todos <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {isContractsLoading ? (
                    <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-zinc-900/50 rounded-lg animate-pulse" />)}</div>
                  ) : (contracts ?? []).length > 0 ? (
                    <div className="divide-y divide-zinc-900">
                      {(contracts as Contract[]).slice(0, 4).map((c) => (
                        <div key={c.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                          <div>
                            <span className="text-xs font-bold text-zinc-300 block">{c.contractNumber}</span>
                            <span className="text-[11px] text-zinc-500 block max-w-xs truncate">{c.objectDescription}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-xs font-semibold text-zinc-300 block">{formatCurrency(c.currentValue)}</span>
                              <span className="text-[10px] text-zinc-500 block">Vence em {formatDate(c.endDate)}</span>
                            </div>
                            <button onClick={() => { setSelectedContractId(c.id); setActiveView('details'); }}
                              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer">
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-xs text-center py-8">Nenhum contrato cadastrado</p>
                  )}
                </div>

                {/* Central de Alertas */}
                <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Central de Alertas</h3>
                    <p className="text-[11px] text-zinc-500 border-b border-zinc-900 pb-4 mb-4">Notificações geradas via Lei 13.303/2016</p>
                    <div className="space-y-3">
                      {(stats?.alerts?.length ?? 0) > 0 ? (
                        stats.alerts.map((al: any) => (
                          <div key={al.id} className="bg-zinc-950 p-3 border border-zinc-900 rounded-lg flex items-start gap-2.5">
                            <AlertCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] text-zinc-300 leading-normal font-medium">{al.message}</p>
                              <span className="text-[9px] text-zinc-500 mt-1 block">{formatDateTime(al.createdAt)}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-500 text-xs text-center py-6">Nenhum alerta pendente</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg text-[10px] text-zinc-400 leading-relaxed mt-4">
                    <span className="font-semibold text-emerald-400 block mb-1">Lei 13.303/2016 — RILC IQUEGO</span>
                    O sistema bloqueia termos aditivos que excedam 25% (compras/serviços) ou 50% (reformas) do valor inicial.
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* end ADMIN dashboard */}

          {/* ── LISTA DE CONTRATOS ── */}
          {activeView === 'contracts' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-semibold text-white">Contratos Administrativos</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Ciclo de vigência, fiscalização e execução financeira</p>
                </div>
                {user.role === 'GESTOR' && (
                  <button onClick={() => setIsNewContractOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Novo Contrato
                  </button>
                )}
              </div>

              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input type="text" placeholder="Buscar por número, objeto ou fornecedor..."
                  value={contractSearch} onChange={(e) => setContractSearch(e.target.value)}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
              </div>

              {isContractsLoading ? (
                <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-zinc-900/40 rounded-xl animate-pulse" />)}</div>
              ) : filteredContracts.length > 0 ? (
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-zinc-900/40 border-b border-zinc-900 text-zinc-400 font-semibold">
                        <th className="p-4">Nº Contrato</th>
                        <th className="p-4">Fornecedor</th>
                        <th className="p-4">Objeto</th>
                        <th className="p-4">Valor Inicial</th>
                        <th className="p-4">Valor Atual</th>
                        <th className="p-4">Fiscal Titular</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {filteredContracts.map((c: Contract) => {
                        const titular = (c.fiscalAssignments as any[])?.find((f) => f.role === 'TITULAR' && f.isActive);
                        return (
                          <tr key={c.id} className="hover:bg-zinc-900/30 transition-colors">
                            <td className="p-4 font-bold text-white whitespace-nowrap">{c.contractNumber}</td>
                            <td className="p-4 font-medium text-zinc-300">{(c.contractor as any)?.tradeName || (c.contractor as any)?.corporateName}</td>
                            <td className="p-4 text-zinc-400 max-w-xs truncate" title={c.objectDescription}>{c.objectDescription}</td>
                            <td className="p-4 text-zinc-300">{formatCurrency(c.initialValue)}</td>
                            <td className="p-4 text-zinc-300">{formatCurrency(c.currentValue)}</td>
                            <td className="p-4 text-zinc-400">{titular?.fiscal?.name || 'Não designado'}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border ${contractStatusColor[c.status] || ''}`}>
                                {contractStatusLabel[c.status] || c.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button onClick={() => { setSelectedContractId(c.id); setActiveView('details'); }}
                                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer">
                                Fiscalizar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-12 text-center">
                  <FileText className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm">Nenhum contrato encontrado.</p>
                </div>
              )}
            </div>
          )}

          {/* ── DETALHES DO CONTRATO (12 abas) ── */}
          {activeView === 'details' && selectedContractId && (
            <ContractTabs
              contractId={selectedContractId}
              user={user}
              onBack={() => handleNavigate('contracts')}
              onOpenMeasurement={() => setIsNewMeasurementOpen(true)}
              onOpenOccurrence={() => setIsNewOccurrenceOpen(true)}
              onOpenAlteration={() => setIsNewAlterationOpen(true)}
              onApproveMeasurement={(id) => approveMeasurementMutation.mutate(id)}
              onRejectMeasurement={(id) => { setRejectTarget({ type: 'measurement', id }); setRejectModalOpen(true); }}
              onApproveAlteration={(id) => approveAlterationMutation.mutate(id)}
              onRejectAlteration={(id) => { setRejectTarget({ type: 'alteration', id }); setRejectModalOpen(true); }}
              onResolveOccurrence={(id) => { setSelectedOccId(id); setIsResolveOccOpen(true); }}
              onAssignFiscal={() => setIsAssignFiscalOpen(true)}
            />
          )}

          {/* ── PAINEL DE RISCO ── */}
          {activeView === 'risk' && <RiskPanel user={user} onNavigate={(v, cId) => handleNavigate(v as View, cId)} />}

          {/* ── AUDITORIA ── */}
          {activeView === 'audit' && <AuditView user={user} />}

          {/* ── IA CORPORATIVA ── */}
          {activeView === 'ai' && <AIInsightsPanel user={user} onNavigate={(v, cId) => handleNavigate(v as View, cId)} />}

          {/* ── PROCESSOS ── */}
          {activeView === 'processes' && <ProcessesView user={user} />}

          {/* ── COMUNICADOS ── */}
          {activeView === 'communications' && <CommunicationsView user={user} />}

          {/* ── USUÁRIOS ── */}
          {activeView === 'users' && <UsersView user={user} />}

          {/* ── CENTRAL DE PENDÊNCIAS ── */}
          {activeView === 'pending' && <PendingDashboard user={user} onNavigate={(v, cId, pId) => handleNavigate(v as View, cId, pId)} />}

        </div>
      </main>

      {/* ── MOTOR DE ALERTAS (overlay sempre ativo) ── */}
      {user.role !== 'ADMIN' && (
        <AlertEngine
          user={user}
          onNavigate={(v, cId, pId) => handleNavigate(v as View, cId, pId)}
        />
      )}

      {/* ══════════════════════════════════════ MODAIS ══════════════════════════════════════ */}

      {/* Modal: Novo Contrato */}
      {isNewContractOpen && (
        <Modal title="Registrar Novo Contrato" subtitle="Preencha os dados após a homologação da licitação." onClose={() => { setIsNewContractOpen(false); resetContractForm(); }}>
          <form onSubmit={(e) => { e.preventDefault(); createContractMutation.mutate({ contractNumber: newCtrNumber, contractorId: newCtrContractorId, initialValue: Number(newCtrValue), signingDate: newCtrSigningDate, startDate: newCtrStartDate, endDate: newCtrEndDate, objectDescription: newCtrObject }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Número do Contrato"><input type="text" value={newCtrNumber} onChange={(e) => setNewCtrNumber(e.target.value)} required placeholder="IQUEGO-CTR-2026/00001" className={inputCls} /></Field>
              <Field label="Fornecedor Contratado">
                <select value={newCtrContractorId} onChange={(e) => setNewCtrContractorId(e.target.value)} required className={inputCls}>
                  <option value="">Selecione...</option>
                  {(contractorsList as any[] ?? []).map((c: any) => <option key={c.id} value={c.id}>{c.tradeName || c.corporateName}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Valor (R$)"><input type="number" value={newCtrValue} onChange={(e) => setNewCtrValue(e.target.value)} required placeholder="1200000.00" className={inputCls} /></Field>
              <Field label="Data de Assinatura"><input type="date" value={newCtrSigningDate} onChange={(e) => setNewCtrSigningDate(e.target.value)} required className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Início da Vigência"><input type="date" value={newCtrStartDate} onChange={(e) => setNewCtrStartDate(e.target.value)} required className={inputCls} /></Field>
              <Field label="Fim da Vigência"><input type="date" value={newCtrEndDate} onChange={(e) => setNewCtrEndDate(e.target.value)} required className={inputCls} /></Field>
            </div>
            <Field label="Descrição do Objeto"><textarea value={newCtrObject} onChange={(e) => setNewCtrObject(e.target.value)} required rows={3} placeholder="Objeto da contratação..." className={inputCls} /></Field>
            <SubmitBtn loading={createContractMutation.isPending}>Cadastrar Contrato</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Designar Fiscal */}
      {isAssignFiscalOpen && (
        <Modal title="Designar Fiscal" subtitle="Atribuição por portaria diretora." onClose={() => { setIsAssignFiscalOpen(false); resetAssignForm(); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!selectedContractId) return; assignFiscalMutation.mutate({ id: selectedContractId, data: { fiscalId: asgFiscalId, role: asgRole, designationAct: asgAct, designationDate: asgDate, startDate: asgStartDate } }); }} className="space-y-4">
            <Field label="Fiscal">
              <select value={asgFiscalId} onChange={(e) => setAsgFiscalId(e.target.value)} required className={inputCls}>
                <option value="">Selecione...</option>
                {(fiscaisList as any[] ?? []).map((f: any) => <option key={f.id} value={f.id}>{f.name} ({f.registrationNumber})</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Papel">
                <select value={asgRole} onChange={(e) => setAsgRole(e.target.value as FiscalRole)} required className={inputCls}>
                  {Object.entries(fiscalRoleLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Field>
              <Field label="Portaria / Ato"><input type="text" value={asgAct} onChange={(e) => setAsgAct(e.target.value)} required placeholder="Portaria nº 050/2026-DG" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Data da Portaria"><input type="date" value={asgDate} onChange={(e) => setAsgDate(e.target.value)} required className={inputCls} /></Field>
              <Field label="Início do Acompanhamento"><input type="date" value={asgStartDate} onChange={(e) => setAsgStartDate(e.target.value)} required className={inputCls} /></Field>
            </div>
            <SubmitBtn loading={assignFiscalMutation.isPending}>Registrar Portaria de Designação</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Nova Medição */}
      {isNewMeasurementOpen && (
        <Modal title="Registrar Medição" subtitle="Valores físicos e conformidades do período." onClose={() => { setIsNewMeasurementOpen(false); resetMeasurementForm(); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!selectedContractId) return; createMeasurementMutation.mutate({ contractId: selectedContractId, periodStart: msrStart, periodEnd: msrEnd, measurementValue: Number(msrValue), reportDescription: msrReport }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Início do Período"><input type="date" value={msrStart} onChange={(e) => setMsrStart(e.target.value)} required className={inputCls} /></Field>
              <Field label="Fim do Período"><input type="date" value={msrEnd} onChange={(e) => setMsrEnd(e.target.value)} required className={inputCls} /></Field>
            </div>
            <Field label="Valor Medido (R$)"><input type="number" value={msrValue} onChange={(e) => setMsrValue(e.target.value)} required placeholder="100000.00" className={inputCls} /></Field>
            <Field label="Relatório de Fiscalização"><textarea value={msrReport} onChange={(e) => setMsrReport(e.target.value)} required rows={4} placeholder="Conformidade técnica, notas fiscais, atesto de serviços..." className={inputCls} /></Field>
            <SubmitBtn loading={createMeasurementMutation.isPending}>Enviar para Homologação</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Nova Ocorrência */}
      {isNewOccurrenceOpen && (
        <Modal title="Registrar Ocorrência" subtitle="Intercorrências, atrasos ou inconformidades contratuais." onClose={() => { setIsNewOccurrenceOpen(false); resetOccurrenceForm(); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!selectedContractId) return; createOccurrenceMutation.mutate({ contractId: selectedContractId, title: occTitle, description: occDesc, severity: occSeverity }); }} className="space-y-4">
            <Field label="Título / Sumário"><input type="text" value={occTitle} onChange={(e) => setOccTitle(e.target.value)} required placeholder="Ex: Divergência em laudo de pureza" className={inputCls} /></Field>
            <Field label="Gravidade">
              <select value={occSeverity} onChange={(e) => setOccSeverity(e.target.value as OccurrenceSeverity)} required className={inputCls}>
                {Object.entries(occurrenceSeverityLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label="Descrição Factual"><textarea value={occDesc} onChange={(e) => setOccDesc(e.target.value)} required rows={4} placeholder="Relate datas, lotes e impactos na produção..." className={inputCls} /></Field>
            <SubmitBtn loading={createOccurrenceMutation.isPending}>Publicar Ocorrência</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Resolver Ocorrência */}
      {isResolveOccOpen && (
        <Modal title="Resolver Ocorrência" subtitle="Parecer de encerramento." onClose={() => { setIsResolveOccOpen(false); setOccResolutionDesc(''); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!selectedOccId) return; resolveOccurrenceMutation.mutate({ id: selectedOccId, desc: occResolutionDesc }); }} className="space-y-4">
            <Field label="Parecer / Providências"><textarea value={occResolutionDesc} onChange={(e) => setOccResolutionDesc(e.target.value)} required rows={5} placeholder="Providências tomadas e aceitação técnica..." className={inputCls} /></Field>
            <SubmitBtn loading={resolveOccurrenceMutation.isPending}>Concluir Ocorrência</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Novo Aditivo */}
      {isNewAlterationOpen && (
        <Modal title="Propor Alteração Contratual" subtitle="Aditivos respeitando os limites da Lei 13.303/2016." onClose={() => { setIsNewAlterationOpen(false); resetAlterationForm(); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!selectedContractId) return; createAlterationMutation.mutate({ contractId: selectedContractId, type: altType, alterationNumber: altNumber, valueChange: Number(altValue || 0), newEndDate: altEndDate || undefined, justification: altJustification }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tipo de Alteração">
                <select value={altType} onChange={(e) => setAltType(e.target.value as AlterationType)} required className={inputCls}>
                  {Object.entries(alterationTypeLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Field>
              <Field label="Nº da Alteração"><input type="text" value={altNumber} onChange={(e) => setAltNumber(e.target.value)} required placeholder="1º Termo Aditivo" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Impacto Financeiro (R$)"><input type="number" value={altValue} onChange={(e) => setAltValue(e.target.value)} placeholder="50000.00" className={inputCls} /></Field>
              <Field label="Nova Vigência (se houver)"><input type="date" value={altEndDate} onChange={(e) => setAltEndDate(e.target.value)} className={inputCls} /></Field>
            </div>
            <Field label="Justificativa Técnica"><textarea value={altJustification} onChange={(e) => setAltJustification(e.target.value)} required rows={4} placeholder="Necessidade técnica do aditivo..." className={inputCls} /></Field>
            <SubmitBtn loading={createAlterationMutation.isPending}>Enviar Solicitação</SubmitBtn>
          </form>
        </Modal>
      )}

      {/* Modal: Rejeitar */}
      {rejectModalOpen && rejectTarget && (
        <Modal title="Recusar e Devolver" subtitle="Insira o motivo detalhado para o Fiscal." onClose={() => { setRejectModalOpen(false); setRejectTarget(null); setRejectionReason(''); }}>
          <form onSubmit={(e) => { e.preventDefault(); if (!rejectTarget) return; if (rejectTarget.type === 'measurement') { rejectMeasurementMutation.mutate({ id: rejectTarget.id, reason: rejectionReason }); } else { rejectAlterationMutation.mutate({ id: rejectTarget.id, reason: rejectionReason }); } }} className="space-y-4">
            <Field label="Motivo da Recusa"><textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} required rows={4} placeholder="Descreva as divergências ou pendências..." className={inputCls} /></Field>
            <button type="submit" disabled={rejectMeasurementMutation.isPending || rejectAlterationMutation.isPending}
              className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
              Confirmar Rejeição
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Componentes auxiliares ────────────────────────────────────────────────────

const inputCls = 'w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
      {loading ? 'Processando...' : children}
    </button>
  );
}

function Modal({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer">
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 mb-5 border-b border-zinc-800 pb-3">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

function MetricCard({ label, value, badge, icon, accent, small }: {
  label: string; value: any; badge?: string; icon: React.ReactNode; accent?: 'emerald' | 'red'; small?: boolean;
}) {
  const accentText = accent === 'emerald' ? 'text-emerald-400' : accent === 'red' ? 'text-red-400' : 'text-white';
  const accentIcon = accent === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : accent === 'red' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-zinc-800/40 text-zinc-400 border-zinc-700';
  return (
    <div className="bg-zinc-900/30 border border-zinc-900/80 p-6 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-medium text-zinc-500">{label}</span>
          <h3 className={`${small ? 'text-2xl' : 'text-3xl'} font-semibold mt-2 leading-8 ${accentText}`}>{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg border ${accentIcon}`}>{icon}</div>
      </div>
      {badge && <div className="mt-4"><span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/20">{badge}</span></div>}
    </div>
  );
}
