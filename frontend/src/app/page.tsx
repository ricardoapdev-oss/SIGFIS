'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStoredUser,
  setStoredUser,
  getStoredToken,
  setStoredToken,
  api,
  writeAuditLog,
  User
} from '@/lib/api';
import Providers from './providers';
import { Sidebar } from '@/components/layout/Sidebar';
import { GestorDashboard } from '@/components/views/GestorDashboard';
import { FiscalDashboard } from '@/components/views/FiscalDashboard';
import { ContractTabs } from '@/components/views/ContractTabs';
import { ProcessesView } from '@/components/views/ProcessesView';
import { PendingDashboard } from '@/components/views/PendingDashboard';
import { RiskPanel } from '@/components/views/RiskPanel';
import { CommunicationsView } from '@/components/views/CommunicationsView';
import { UsersView } from '@/components/views/UsersView';
import { AuditView } from '@/components/views/AuditView';
import { AIInsightsPanel } from '@/components/ai/AIInsightsPanel';
import { BackupView } from '@/components/views/BackupView';
import { formatCurrency, formatDate } from '@/lib/labels';
import {
  Mail, Lock, LogIn, Search, Filter, Plus,
  FileText, ArrowRight, X, Save, Eye, EyeOff, User2, Shield,
  Clock, AlertTriangle
} from 'lucide-react';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';
type ContractFilter = 'ALL' | 'active' | 'expiring180' | 'expiring90' | 'expiring60' | 'expiring30' | 'pending_measurements' | 'delayed_processes' | (string & {});

// -- SIGFIS Logo ---------------------------------------------------------------
function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.svg" alt="SIGFIS" className={className} />;
}

// -- USER PROFILE MODAL -------------------------------------------------------
function UserProfileModal({ user, onClose, onSaved }: { user: User; onClose: () => void; onSaved: (u: User) => void }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [regNum, setRegNum] = useState(user.registrationNumber || '');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const mutation = useMutation({
    mutationFn: (data: any) => api.users.update(user.id, data),
    onSuccess: (updatedUser: any) => {
      setSuccess('Perfil atualizado com sucesso!');
      setPassword('');
      setConfirmPwd('');
      onSaved({ ...user, name: updatedUser.name, email: updatedUser.email, registrationNumber: updatedUser.registrationNumber });
      queryClient.invalidateQueries();
    },
    onError: (err: any) => setError(err.message || 'Erro ao salvar'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password && password !== confirmPwd) {
      setError('As senhas não coincidem.');
      return;
    }
    const payload: any = { name, email, registrationNumber: regNum };
    if (password) payload.password = password;
    mutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Meu Perfil</h2>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{user.role}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-lg transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">Nome Completo</label>
            <div className="relative">
              <User2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
              <input value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">Matrícula</label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
              <input value={regNum} onChange={e => setRegNum(e.target.value)}
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">Alterar Senha (opcional)</p>
            <div className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Nova senha" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
                <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-2.5 text-gray-700 hover:text-gray-700">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Confirmar nova senha" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
              </div>
            </div>
          </div>

          {error && <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">{error}</p>}
          {success && <p className="text-[11px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2 text-center">{success}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer">
              Cancelar
            </button>
            <button type="submit" disabled={mutation.isPending}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50">
              <Save className="h-3.5 w-3.5" /> {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -- MAIN APP SHELL -----------------------------------------------------------
function MainAppShell() {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [contractFilter, setContractFilter] = useState<ContractFilter>('ALL');
  const [processFilter, setProcessFilter] = useState<string>('ALL');
  const [processNavKey, setProcessNavKey] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      window.history.replaceState(
        { view: 'dashboard', contractId: null, contractFilter: 'ALL', processFilter: 'ALL' },
        '',
        '#dashboard'
      );
    }
    setIsLoadingUser(false);
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state?.view) return;
      setActiveView(state.view);
      setSelectedContractId(state.contractId ?? null);
      setContractFilter(state.contractFilter ?? 'ALL');
      setProcessFilter(state.processFilter ?? 'ALL');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.auth.login({ email: loginEmail, password: loginPassword });
      setStoredToken(res.access_token);
      setStoredUser(res.user);
      setUser(res.user);
      setActiveView('dashboard');
      window.history.replaceState(
        { view: 'dashboard', contractId: null, contractFilter: 'ALL', processFilter: 'ALL' },
        '',
        '#dashboard'
      );
    } catch (err: any) {
      setLoginError(err.message || 'Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setStoredToken(null);
    setStoredUser(null);
    setUser(null);
    setSelectedContractId(null);
    setContractFilter('ALL');
  };

  const handleNavigate = (view: View, contractId?: string, filter?: string) => {
    let newContractId: string | null = null;
    let newContractFilter: ContractFilter = 'ALL';
    let newProcessFilter = 'ALL';
    let newHash = `#${view}`;

    if (view === 'details' && !contractId) {
      view = 'contracts';
      setSelectedContractId(null);
      newHash = '#contracts';
    } else if (view === 'details') {
      setSelectedContractId(contractId!);
      newContractId = contractId!;
      newContractFilter = contractFilter;
      newProcessFilter = processFilter;
      newHash = `#contracts/${contractId}`;
    } else if (view === 'contracts') {
      setSelectedContractId(null);
      newContractFilter = (filter as ContractFilter) || 'ALL';
      setContractFilter(newContractFilter);
      newProcessFilter = processFilter;
    } else if (view === 'processes') {
      setSelectedContractId(null);
      newProcessFilter = filter || 'ALL';
      setProcessFilter(newProcessFilter);
      setProcessNavKey(k => k + 1);
    } else {
      setSelectedContractId(null);
      setContractFilter('ALL');
    }

    setActiveView(view);
    window.history.pushState(
      { view, contractId: newContractId, contractFilter: newContractFilter, processFilter: newProcessFilter },
      '',
      newHash
    );
  };


  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 text-gray-700">
        <div className="flex flex-col items-center gap-3">
          <SigfisLogo className="h-12 w-12 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-blue-400">CARREGANDO...</span>
        </div>
      </div>
    );
  }

  // -- LOGIN SCREEN --
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
        <div className="w-full max-w-md bg-gray-100/40 border border-gray-200 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4">
              <SigfisLogo className="h-16 w-16" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-widest">SIGFIS <span className="text-blue-400">CONTRATOS</span></h1>
            <p className="text-xs text-gray-700 tracking-wider uppercase mt-1">Gestão e Fiscalização de Contratos · IQUEGO</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="exemplo@sigecontratos.com"
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] font-medium text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 border border-blue-500/20 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
            >
              <LogIn className="h-4 w-4" /> Entrar no Sistema
            </button>
          </form>

        </div>
      </div>
    );
  }

  // -- MAIN SHELL --
  return (
    <div className="flex h-screen bg-slate-100 text-gray-900 overflow-hidden font-sans antialiased">
      {showProfileModal && (
        <UserProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSaved={(updated) => {
            setUser(updated);
            setStoredUser(updated);
            setShowProfileModal(false);
          }}
        />
      )}

      <Sidebar
        user={user}
        activeView={activeView}
        onNavigate={(v) => handleNavigate(v)}
        onLogout={handleLogout}
        onEditProfile={() => setShowProfileModal(true)}
      />

      <main className="app-surface flex-1 overflow-y-auto bg-slate-50 p-8 border-l border-slate-200">
        {activeView === 'dashboard' && (
          user.role === 'FISCAL' ? (
            <FiscalDashboard user={user} onNavigate={handleNavigate} />
          ) : (
            <GestorDashboard user={user} onNavigate={handleNavigate} />
          )
        )}

        {activeView === 'contracts' && (
          <ContractsListView
            key={contractFilter}
            onSelectContract={(id) => handleNavigate('details', id)}
            user={user}
            initialFilter={contractFilter}
          />
        )}

        {activeView === 'details' && selectedContractId && (
          <ContractTabs
            key={selectedContractId}
            contractId={selectedContractId}
            user={user}
            onBack={() => handleNavigate('contracts')}
            onNavigate={(view, id, filter) => handleNavigate(view as View, id, filter)}
          />
        )}

        {activeView === 'processes' && <ProcessesView key={processNavKey} user={user} initialFilter={processFilter} />}
        {activeView === 'pending' && <PendingDashboard user={user} onNavigate={handleNavigate} />}
        {activeView === 'risk' && <RiskPanel user={user} onNavigate={handleNavigate} />}
        {activeView === 'communications' && <CommunicationsView user={user} onNavigate={(v, id) => handleNavigate(v as View, id)} />}
        {activeView === 'users' && <UsersView user={user} />}
        {activeView === 'audit' && <AuditView user={user} />}
        {activeView === 'ai' && <AIInsightsPanel user={user} onNavigate={handleNavigate} />}
        {activeView === 'backup' && <BackupView user={user} />}
      </main>
    </div>
  );
}

// -- CONTRACTS LIST VIEW ------------------------------------------------------
function ContractsListView({
  onSelectContract,
  user,
  initialFilter = 'ALL',
}: {
  onSelectContract: (id: string) => void;
  user: User;
  initialFilter?: ContractFilter;
}) {
  const queryClient = useQueryClient();
  const { data: contracts, isLoading } = useQuery<any[]>({
    queryKey: ['contracts-list', user.id],
    queryFn: () => api.contracts.list(),
    staleTime: 300_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.contracts.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter === 'active' ? 'ACTIVE' : 'ALL');
  const [showConcluded, setShowConcluded] = useState(false);
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [ncNumSeq, setNcNumSeq] = useState('');
  const [ncNumYear, setNcNumYear] = useState(new Date().getFullYear().toString());
  const [ncObject, setNcObject] = useState('');
  const [ncValue, setNcValue] = useState('');
  const [ncSigning, setNcSigning] = useState('');
  const [ncStart, setNcStart] = useState('');
  const [ncEnd, setNcEnd] = useState('');
  const [ncContractorId, setNcContractorId] = useState('');
  const [ncProcessId, setNcProcessId] = useState('');
  const [ncObservations, setNcObservations] = useState('');
  const [ncNewContractorName, setNcNewContractorName] = useState('');
  const [ncNewContractorCnpj, setNcNewContractorCnpj] = useState('');
  const [ncNewContractorEmail, setNcNewContractorEmail] = useState('');

  const { data: contractors = [] } = useQuery<any[]>({
    queryKey: ['contractors'],
    queryFn: () => api.contractors.list(),
    staleTime: 300_000,
  });
  const { data: processes = [] } = useQuery<any[]>({
    queryKey: ['processes', user.id, user.role],
    queryFn: () => api.processes.list(),
    staleTime: 300_000,
  });

  const createContractMutation = useMutation({
    mutationFn: (data: any) => api.contracts.create(data),
    onSuccess: (created: any, vars: any) => {
      if (user) writeAuditLog(user, 'CREATE', 'Contract', created?.id || vars.contractNumber, `Contrato ${vars.contractNumber} cadastrado`);
      queryClient.invalidateQueries({ queryKey: ['contracts-list'] });
      setShowNewContractModal(false);
      setNcNumSeq(''); setNcNumYear(new Date().getFullYear().toString()); setNcObject(''); setNcValue(''); setNcSigning(''); setNcStart(''); setNcEnd('');
      setNcContractorId(''); setNcProcessId(''); setNcObservations('');
      setNcNewContractorName(''); setNcNewContractorCnpj(''); setNcNewContractorEmail('');
    },
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const filterLabels: Record<string, string> = {
    ALL: '',
    active: 'Contratos Vigentes',
    expiring180: 'Encerrando em 180 dias',
    expiring90: 'Encerrando em 90 dias — Monitorar',
    expiring60: 'Encerrando em 60 dias — Atenção urgente',
    expiring30: 'Encerrando em 30 dias — Risco crítico',
    pending_measurements: 'Com Medições Pendentes',
    delayed_processes: 'Com Processos Atrasados',
    open_occurrences: 'Com Ocorrências Abertas',
  };

  const filterBannerColor: Record<string, string> = {
    ALL: '',
    active: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
    expiring180: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
    expiring90: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
    expiring60: 'border-orange-500/30 bg-orange-500/5 text-orange-300',
    expiring30: 'border-red-500/30 bg-red-500/5 text-red-300',
    pending_measurements: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
    delayed_processes: 'border-red-500/30 bg-red-500/5 text-red-300',
    open_occurrences: 'border-red-500/30 bg-red-500/5 text-red-300',
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-white rounded-lg animate-pulse" />
        <div className="h-12 bg-white rounded-xl animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100/40 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const today = new Date();
  const daysUntil = (dateStr: string) => {
    const d = new Date(dateStr);
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const fiscalIdFromFilter = initialFilter.startsWith('fiscal:') ? initialFilter.slice(7) : null;
  const fiscalNameFromFilter = initialFilter.startsWith('fiscal-name:') ? initialFilter.slice(12) : null;

  const getFiscalLabel = () => {
    if (!fiscalIdFromFilter && !fiscalNameFromFilter) return '';
    const contract = (contracts || []).find(c =>
      fiscalIdFromFilter
        ? c.fiscalAssignments?.some((a: any) => a.fiscalId === fiscalIdFromFilter)
        : c.fiscalAssignments?.some((a: any) => a.fiscal?.name === fiscalNameFromFilter)
    );
    const assignment = contract?.fiscalAssignments?.find((a: any) =>
      fiscalIdFromFilter ? a.fiscalId === fiscalIdFromFilter : a.fiscal?.name === fiscalNameFromFilter
    );
    return assignment?.fiscal?.name ?? fiscalNameFromFilter ?? fiscalIdFromFilter ?? '';
  };

  const filtered = (contracts || []).filter(c => {
    const matchesSearch =
      c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.objectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.contractor?.corporateName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;

    let matchesKpi = true;
    if (initialFilter === 'expiring180') {
      const days = daysUntil(c.endDate);
      matchesKpi = c.status === 'ACTIVE' && days > 0 && days <= 180;
    } else if (initialFilter === 'expiring90') {
      const days = daysUntil(c.endDate);
      matchesKpi = c.status === 'ACTIVE' && days > 0 && days <= 90;
    } else if (initialFilter === 'expiring60') {
      const days = daysUntil(c.endDate);
      matchesKpi = c.status === 'ACTIVE' && days > 0 && days <= 60;
    } else if (initialFilter === 'expiring30') {
      const days = daysUntil(c.endDate);
      matchesKpi = c.status === 'ACTIVE' && days > 0 && days <= 30;
    } else if (initialFilter === 'active') {
      matchesKpi = c.status === 'ACTIVE';
    } else if (initialFilter === 'pending_measurements') {
      matchesKpi = !!(c.measurements?.some((m: any) => m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') || c.hasPendingMeasurements);
    } else if (initialFilter === 'open_occurrences') {
      matchesKpi = !!(c.occurrences?.some((o: any) => o.status !== 'RESOLVED') || c.hasOpenOccurrences);
    } else if (initialFilter === 'delayed_processes') {
      matchesKpi = !!(c.hasDelayedProcesses);
    } else if (fiscalIdFromFilter) {
      matchesKpi = (c.fiscalAssignments || []).some((a: any) => a.fiscalId === fiscalIdFromFilter);
    } else if (fiscalNameFromFilter) {
      matchesKpi = (c.fiscalAssignments || []).some((a: any) => a.fiscal?.name === fiscalNameFromFilter);
    }

    return matchesSearch && matchesStatus && matchesKpi;
  });

  // Sort: expiring filters by urgency, default by startDate newest first
  if (['expiring180', 'expiring90', 'expiring60', 'expiring30'].includes(initialFilter)) {
    filtered.sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate));
  } else {
    filtered.sort((a, b) => {
      const [numA, yearA] = (a.contractNumber || '').split('/');
      const [numB, yearB] = (b.contractNumber || '').split('/');
      const yA = parseInt(yearA || '0'), yB = parseInt(yearB || '0');
      if (yB !== yA) return yB - yA;
      return parseInt(numB || '0') - parseInt(numA || '0');
    });
  }

  const activeFiltered = filtered.filter(c => c.status !== 'CONCLUDED');
  const concludedFiltered = filtered.filter(c => c.status === 'CONCLUDED');

  const statusColors: Record<string, string> = {
    DRAFT: 'text-gray-700 bg-gray-100 border-gray-300',
    ACTIVE: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    SUSPENDED: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    CONCLUDED: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    RESCINDED: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  const statusLabels: Record<string, string> = {
    DRAFT: 'Rascunho', ACTIVE: 'Ativo', SUSPENDED: 'Suspenso', CONCLUDED: 'Concluído', RESCINDED: 'Rescindido',
  };

  const showDaysBadge = ['expiring180', 'expiring90', 'expiring60', 'expiring30'].includes(initialFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Contratos Administrativos</h2>
          <p className="text-xs text-gray-700 mt-0.5">Listagem e detalhamento de contratos vigentes e históricos</p>
        </div>
        <button
          onClick={() => setShowNewContractModal(true)}
          className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Novo Contrato
        </button>
      </div>

      {/* Modal Novo Contrato */}
      {showNewContractModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => setShowNewContractModal(false)} className="absolute right-4 top-4 p-1 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Registrar Novo Contrato</h3>
            <p className="text-xs text-gray-700 mb-5 border-b border-gray-200 pb-3">Preencha os dados após a homologação da licitação.</p>
            <form
              onSubmit={async e => {
                e.preventDefault();
                let contractorId = ncContractorId;
                if (contractorId === '__new__') {
                  if (!ncNewContractorName || !ncNewContractorCnpj || !ncNewContractorEmail) {
                    alert('Preencha Nome, CNPJ/CPF e E-mail da nova empresa.'); return;
                  }
                  try {
                    const created = await api.contractors.create({
                      corporateName: ncNewContractorName,
                      cnpjCpf: ncNewContractorCnpj,
                      email: ncNewContractorEmail,
                    });
                    queryClient.invalidateQueries({ queryKey: ['contractors'] });
                    contractorId = created.id;
                  } catch (err: any) {
                    alert(`Erro ao cadastrar empresa: ${err.message}`); return;
                  }
                }
                if (!contractorId) { alert('Selecione ou cadastre a empresa contratada.'); return; }
                createContractMutation.mutate({
                  contractNumber: `${ncNumSeq}/${ncNumYear}`, contractorId,
                  initialValue: Number(ncValue), signingDate: ncSigning,
                  startDate: ncStart, endDate: ncEnd,
                  objectDescription: ncObject,
                  processId: ncProcessId || undefined,
                  observations: ncObservations || undefined,
                });
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Número do Contrato * <span className="normal-case font-normal text-gray-400">(Nº / Ano)</span></label>
                  <div className="flex items-center gap-2">
                    <input type="text" value={ncNumSeq} onChange={e => setNcNumSeq(e.target.value)} required
                      placeholder="Ex: 0001"
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                    <span className="text-gray-400 font-bold text-sm">/</span>
                    <input type="text" value={ncNumYear} onChange={e => setNcNumYear(e.target.value)} required
                      placeholder="Ex: 2026" maxLength={4}
                      className="w-24 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                  {ncNumSeq && ncNumYear && (
                    <p className="text-[10px] text-gray-400 mt-0.5">Número final: <span className="font-semibold text-gray-600">{ncNumSeq}/{ncNumYear}</span></p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valor (R$) *</label>
                  <input type="number" min="0" step="0.01" value={ncValue} onChange={e => setNcValue(e.target.value)} required
                    placeholder="0,00"
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Empresa Contratada *</label>
                  <select value={ncContractorId} onChange={e => setNcContractorId(e.target.value)} required
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                    <option value="">— Selecionar empresa —</option>
                    {(contractors as any[]).map((c: any) => (
                      <option key={c.id} value={c.id}>{c.corporateName}</option>
                    ))}
                    <option value="__new__">+ Cadastrar nova empresa</option>
                  </select>
                </div>
                {ncContractorId === '__new__' && (
                  <div className="col-span-2 bg-blue-50/60 border border-blue-200 rounded-xl p-3 space-y-2">
                    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">Nova Empresa Contratada</p>
                    <input type="text" value={ncNewContractorName} onChange={e => setNcNewContractorName(e.target.value)}
                      placeholder="Razão social *" required={ncContractorId === '__new__'}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={ncNewContractorCnpj} onChange={e => setNcNewContractorCnpj(e.target.value)}
                        placeholder="CNPJ/CPF *" required={ncContractorId === '__new__'}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                      <input type="email" value={ncNewContractorEmail} onChange={e => setNcNewContractorEmail(e.target.value)}
                        placeholder="E-mail *" required={ncContractorId === '__new__'}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Objeto do Contrato *</label>
                  <textarea value={ncObject} onChange={e => setNcObject(e.target.value)} required rows={2}
                    placeholder="Descreva o objeto do contrato..."
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Assinatura *</label>
                  <input type="date" value={ncSigning} onChange={e => setNcSigning(e.target.value)} required
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Início da Vigência *</label>
                  <input type="date" value={ncStart} onChange={e => setNcStart(e.target.value)} required
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Fim da Vigência *</label>
                  <input type="date" value={ncEnd} onChange={e => setNcEnd(e.target.value)} required
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Processo (opcional)</label>
                  <select value={ncProcessId} onChange={e => setNcProcessId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                    <option value="">— Nenhum —</option>
                    {(processes as any[]).map((p: any) => (
                      <option key={p.id} value={p.id}>{p.processNumber}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Observações</label>
                  <textarea value={ncObservations} onChange={e => setNcObservations(e.target.value)} rows={2}
                    placeholder="Anotações internas, condições especiais..."
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowNewContractModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={createContractMutation.isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
                  {createContractMutation.isPending ? 'Salvando...' : 'Registrar Contrato'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KPI filter banner */}
      {initialFilter !== 'ALL' && (filterLabels[initialFilter] || fiscalIdFromFilter || fiscalNameFromFilter) && (
        <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold ${filterBannerColor[initialFilter] ?? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'}`}>
          {(initialFilter === 'expiring90' || initialFilter === 'delayed_processes') && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
          {(initialFilter === 'expiring180') && <Clock className="h-3.5 w-3.5 shrink-0" />}
          Filtro ativo: {filterLabels[initialFilter] ?? `Fiscal: ${getFiscalLabel()}`} — {filtered.length} contrato{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-100/30 border border-gray-200 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
          <input
            type="text"
            placeholder="Buscar por número, objeto ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>
        {initialFilter === 'ALL' && (
          <div className="flex gap-2 shrink-0">
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-700" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-blue-50 border border-gray-300 rounded-xl pl-9 pr-8 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none cursor-pointer"
              >
                <option value="ALL">Todos os Status</option>
                <option value="ACTIVE">Ativos</option>
                <option value="DRAFT">Rascunhos</option>
                <option value="SUSPENDED">Suspensos</option>
                <option value="CONCLUDED">Concluídos</option>
                <option value="RESCINDED">Rescindidos</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {activeFiltered.length > 0 ? (
        <div className="space-y-3">
          {activeFiltered.map((c) => {
            const days = daysUntil(c.endDate);
            return (
              <div
                key={c.id}
                onClick={() => onSelectContract(c.id)}
                className="bg-gray-100/30 border border-gray-200 hover:border-gray-300 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all group cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-400 transition-colors">{c.contractNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${statusColors[c.status] || ''}`}>
                      {statusLabels[c.status] || c.status}
                    </span>
                    <span className="text-xs text-gray-700">| {c.contractor?.corporateName || 'Empresa não associada'}</span>
                    {showDaysBadge && days > 0 && (
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${days <= 90 ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                        {days}d restantes
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-1">{c.objectDescription}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-right shrink-0">
                  <div>
                    <span className="text-gray-700 block text-[11px] uppercase tracking-wider">Vigência até</span>
                    <span className="text-gray-700 font-semibold">{formatDate(c.endDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-700 block text-[11px] uppercase tracking-wider">Valor Atual</span>
                    <span className="text-emerald-400 font-bold">{formatCurrency(c.currentValue)}</span>
                  </div>
                  {user.role === 'ADMIN' && (
                    <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir contrato ${c.contractNumber} permanentemente?`)) deleteMutation.mutate(c.id); }}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                      title="Excluir contrato">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <div className="p-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 group-hover:text-gray-900 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-100/10 border border-gray-200 rounded-xl p-12 text-center">
          <FileText className="h-8 w-8 text-gray-700 mx-auto mb-3" />
          <p className="text-xs text-gray-700">Nenhum contrato encontrado para este filtro.</p>
        </div>
      )}

      {/* Contratos Encerrados */}
      {concludedFiltered.length > 0 && (
        <div className="mt-6">
          <button onClick={() => setShowConcluded(v => !v)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-800 transition-colors cursor-pointer mb-3">
            <span className={`transition-transform inline-block ${showConcluded ? 'rotate-90' : ''}`}>?</span>
            Contratos Encerrados ({concludedFiltered.length})
          </button>
          {showConcluded && (
            <div className="space-y-3">
              {concludedFiltered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectContract(c.id)}
                  className="bg-gray-100/10 border border-gray-200 hover:border-gray-300 p-4 rounded-xl flex justify-between items-center gap-4 transition-all group opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-gray-700 group-hover:text-gray-800 transition-colors">{c.contractNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold border text-blue-400 bg-blue-500/10 border-blue-500/20">Encerrado</span>
                      <span className="text-xs text-gray-700">| {c.contractor?.corporateName || '—'}</span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-1">{c.objectDescription}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-gray-700 block text-[11px] uppercase tracking-wider">Encerrado em</span>
                      <span className="text-gray-700 font-semibold text-xs">{formatDate(c.endDate)}</span>
                    </div>
                    {user.role === 'ADMIN' && (
                      <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir contrato ${c.contractNumber} permanentemente?`)) deleteMutation.mutate(c.id); }}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                        title="Excluir contrato">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <div className="p-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 group-hover:text-gray-700 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Providers>
      <MainAppShell />
    </Providers>
  );
}
