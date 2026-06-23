'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStoredUser,
  setStoredUser,
  getStoredToken,
  setStoredToken,
  api,
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
import { formatCurrency, formatDate } from '@/lib/labels';
import {
  Mail, Lock, LogIn, Search, Filter,
  FileText, ArrowRight, X, Save, Eye, EyeOff, User2, Shield,
  Clock, AlertTriangle
} from 'lucide-react';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai';
type ContractFilter = 'ALL' | 'active' | 'expiring180' | 'expiring90' | 'pending_measurements' | 'delayed_processes' | (string & {});

// ── SIGFIS Logo ───────────────────────────────────────────────────────────────
function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.svg" alt="SIGFIS" className={className} />;
}

// ── USER PROFILE MODAL ───────────────────────────────────────────────────────
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
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Meu Perfil</h2>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{user.role}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Nome Completo</label>
            <div className="relative">
              <User2 className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Matrícula</label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input value={regNum} onChange={e => setRegNum(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Alterar Senha (opcional)</p>
            <div className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Nova senha" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
                <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Confirmar nova senha" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50" />
              </div>
            </div>
          </div>

          {error && <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">{error}</p>}
          {success && <p className="text-[11px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2 text-center">{success}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer">
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

// ── MAIN APP SHELL ───────────────────────────────────────────────────────────
function MainAppShell() {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [contractFilter, setContractFilter] = useState<ContractFilter>('ALL');
  const [processFilter, setProcessFilter] = useState<string>('ALL');
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
    setActiveView(view);
    let newContractId: string | null = null;
    let newContractFilter: ContractFilter = 'ALL';
    let newProcessFilter = 'ALL';

    if (view === 'details' && contractId) {
      setSelectedContractId(contractId);
      newContractId = contractId;
      newContractFilter = contractFilter;
      newProcessFilter = processFilter;
    } else if (view === 'contracts') {
      setSelectedContractId(null);
      newContractFilter = (filter as ContractFilter) || 'ALL';
      setContractFilter(newContractFilter);
      newProcessFilter = processFilter;
    } else if (view === 'processes') {
      newProcessFilter = filter || 'ALL';
      setProcessFilter(newProcessFilter);
    } else {
      setContractFilter('ALL');
    }

    window.history.pushState(
      { view, contractId: newContractId, contractFilter: newContractFilter, processFilter: newProcessFilter },
      '',
      `#${view}`
    );
  };


  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <SigfisLogo className="h-12 w-12 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-blue-400">CARREGANDO...</span>
        </div>
      </div>
    );
  }

  // ── LOGIN SCREEN ──
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4">
              <SigfisLogo className="h-16 w-16" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-widest">SIGFIS <span className="text-blue-400">CONTRATOS</span></h1>
            <p className="text-xs text-zinc-500 tracking-wider uppercase mt-1">Gestão e Fiscalização de Contratos · IQUEGO</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="exemplo@sigecontratos.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
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

  // ── MAIN SHELL ──
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans antialiased">
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

      <main className="flex-1 overflow-y-auto bg-zinc-950/20 p-8 border-l border-zinc-900">
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
            contractId={selectedContractId}
            user={user}
            onBack={() => handleNavigate('contracts')}
            onNavigate={(view, id, filter) => handleNavigate(view as View, id, filter)}
          />
        )}

        {activeView === 'processes' && <ProcessesView user={user} initialFilter={processFilter} />}
        {activeView === 'pending' && <PendingDashboard user={user} onNavigate={handleNavigate} />}
        {activeView === 'risk' && <RiskPanel user={user} onNavigate={handleNavigate} />}
        {activeView === 'communications' && <CommunicationsView user={user} onNavigate={(v, id) => handleNavigate(v as View, id)} />}
        {activeView === 'users' && <UsersView user={user} />}
        {activeView === 'audit' && <AuditView user={user} />}
        {activeView === 'ai' && <AIInsightsPanel user={user} onNavigate={handleNavigate} />}
      </main>
    </div>
  );
}

// ── CONTRACTS LIST VIEW ──────────────────────────────────────────────────────
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
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.contracts.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter === 'active' ? 'ACTIVE' : 'ALL');
  const [showConcluded, setShowConcluded] = useState(false);

  const filterLabels: Record<string, string> = {
    ALL: '',
    active: 'Contratos Vigentes',
    expiring180: 'Encerrando em 180 dias',
    expiring90: 'Encerrando em 90 dias — Urgente',
    pending_measurements: 'Com Medições Pendentes',
    delayed_processes: 'Com Processos Atrasados',
    open_occurrences: 'Com Ocorrências Abertas',
  };

  const filterBannerColor: Record<string, string> = {
    ALL: '',
    active: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
    expiring180: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
    expiring90: 'border-red-500/30 bg-red-500/5 text-red-300',
    pending_measurements: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
    delayed_processes: 'border-red-500/30 bg-red-500/5 text-red-300',
    open_occurrences: 'border-red-500/30 bg-red-500/5 text-red-300',
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-zinc-900 rounded-lg animate-pulse" />
        <div className="h-12 bg-zinc-900 rounded-xl animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-zinc-900/40 rounded-xl animate-pulse" />
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
    } else if (initialFilter === 'active') {
      matchesKpi = c.status === 'ACTIVE';
    } else if (initialFilter === 'pending_measurements') {
      matchesKpi = !!c.hasPendingMeasurements;
    } else if (initialFilter === 'open_occurrences') {
      matchesKpi = !!c.hasOpenOccurrences;
    } else if (initialFilter === 'delayed_processes') {
      matchesKpi = !!c.hasDelayedProcesses;
    } else if (fiscalIdFromFilter) {
      matchesKpi = (c.fiscalAssignments || []).some((a: any) => a.fiscalId === fiscalIdFromFilter);
    } else if (fiscalNameFromFilter) {
      matchesKpi = (c.fiscalAssignments || []).some((a: any) => a.fiscal?.name === fiscalNameFromFilter);
    }

    return matchesSearch && matchesStatus && matchesKpi;
  });

  // Sort expiring filters by days remaining (most urgent first)
  if (initialFilter === 'expiring180' || initialFilter === 'expiring90') {
    filtered.sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate));
  }

  const activeFiltered = filtered.filter(c => c.status !== 'CONCLUDED');
  const concludedFiltered = filtered.filter(c => c.status === 'CONCLUDED');

  const statusColors: Record<string, string> = {
    DRAFT: 'text-zinc-500 bg-zinc-800 border-zinc-700',
    ACTIVE: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    SUSPENDED: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    CONCLUDED: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    RESCINDED: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  const statusLabels: Record<string, string> = {
    DRAFT: 'Rascunho', ACTIVE: 'Ativo', SUSPENDED: 'Suspenso', CONCLUDED: 'Concluído', RESCINDED: 'Rescindido',
  };

  const showDaysBadge = initialFilter === 'expiring180' || initialFilter === 'expiring90';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-base font-semibold text-white">Contratos Administrativos</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Listagem e detalhamento de contratos vigentes e históricos</p>
      </div>

      {/* KPI filter banner */}
      {initialFilter !== 'ALL' && (filterLabels[initialFilter] || fiscalIdFromFilter || fiscalNameFromFilter) && (
        <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold ${filterBannerColor[initialFilter] ?? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'}`}>
          {(initialFilter === 'expiring90' || initialFilter === 'delayed_processes') && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
          {(initialFilter === 'expiring180') && <Clock className="h-3.5 w-3.5 shrink-0" />}
          Filtro ativo: {filterLabels[initialFilter] ?? `Fiscal: ${getFiscalLabel()}`} — {filtered.length} contrato{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por número, objeto ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>
        {initialFilter === 'ALL' && (
          <div className="flex gap-2 shrink-0">
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none cursor-pointer"
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
              <div key={c.id} className="bg-zinc-900/30 border border-zinc-900/80 hover:border-zinc-800/80 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all group">
                <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onSelectContract(c.id)}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{c.contractNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${statusColors[c.status] || ''}`}>
                      {statusLabels[c.status] || c.status}
                    </span>
                    <span className="text-[10px] text-zinc-500">| {c.contractor?.corporateName || 'Empresa não associada'}</span>
                    {showDaysBadge && days > 0 && (
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${days <= 90 ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                        {days}d restantes
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">{c.objectDescription}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-right shrink-0">
                  <div className="cursor-pointer" onClick={() => onSelectContract(c.id)}>
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Vigência até</span>
                    <span className="text-zinc-300 font-semibold">{formatDate(c.endDate)}</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => onSelectContract(c.id)}>
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Valor Atual</span>
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
                  <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 group-hover:text-white transition-colors cursor-pointer" onClick={() => onSelectContract(c.id)}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-12 text-center">
          <FileText className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-xs text-zinc-500">Nenhum contrato encontrado para este filtro.</p>
        </div>
      )}

      {/* Contratos Encerrados */}
      {concludedFiltered.length > 0 && (
        <div className="mt-6">
          <button onClick={() => setShowConcluded(v => !v)}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer mb-3">
            <span className={`transition-transform inline-block ${showConcluded ? 'rotate-90' : ''}`}>▶</span>
            Contratos Encerrados ({concludedFiltered.length})
          </button>
          {showConcluded && (
            <div className="space-y-3">
              {concludedFiltered.map((c) => (
                <div key={c.id} className="bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 p-4 rounded-xl flex justify-between items-center gap-4 transition-all group opacity-70 hover:opacity-100">
                  <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onSelectContract(c.id)}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">{c.contractNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold border text-blue-400 bg-blue-500/10 border-blue-500/20">Encerrado</span>
                      <span className="text-[10px] text-zinc-600">| {c.contractor?.corporateName || '—'}</span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">{c.objectDescription}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right cursor-pointer" onClick={() => onSelectContract(c.id)}>
                      <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">Encerrado em</span>
                      <span className="text-zinc-400 font-semibold text-xs">{formatDate(c.endDate)}</span>
                    </div>
                    {user.role === 'ADMIN' && (
                      <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir contrato ${c.contractNumber} permanentemente?`)) deleteMutation.mutate(c.id); }}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                        title="Excluir contrato">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-600 group-hover:text-zinc-400 transition-colors cursor-pointer" onClick={() => onSelectContract(c.id)}>
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
