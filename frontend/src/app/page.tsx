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
import { Header } from '@/components/layout/Header';
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
import { ArchivedContractsView } from '@/components/views/ArchivedContractsView';
import { formatCurrency, formatDate } from '@/lib/labels';
import {
  Mail, Lock, LogIn, Search, Filter, Plus,
  FileText, ArrowRight, X, Save, Eye, EyeOff, User2, Shield,
  Clock, AlertTriangle, Download, ArrowUpDown, Archive,
  MoreVertical, PauseCircle, PlayCircle, Ban,
} from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import { CurrencyInput } from '@/components/ui/currency-input';

type View = 'dashboard' | 'contracts' | 'archived-contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';
type ContractFilter = 'ALL' | 'active' | 'expiring180' | 'expiring90' | 'expiring60' | 'expiring30' | 'pending_measurements' | 'delayed_processes' | (string & {});

// -- SIGFIS Logo ---------------------------------------------------------------
// sigfis-logo.png é o lockup vertical (ícone + "SIGFIS" + tagline). Nos usos
// compactos (ícone), recortamos só o símbolo via object-cover/object-top —
// o texto embutido na imagem fica fora da área visível, evitando duplicar o
// nome ao lado de um texto digitado à parte.
function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.png" alt="SIGFIS" className={`object-cover object-top ${className || ''}`} />;
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
            <div className="h-10 w-10 rounded-full bg-brand-blue-dark/10 border border-brand-blue-dark/20 flex items-center justify-center font-bold text-brand-blue-dark">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Meu Perfil</h2>
              <span className="text-xs font-bold text-brand-blue-dark uppercase tracking-widest bg-brand-blue-dark/10 px-1.5 py-0.5 rounded border border-brand-blue-dark/20">{user.role}</span>
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
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand-blue-dark/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand-blue-dark/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-1">Matrícula</label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
              <input value={regNum} onChange={e => setRegNum(e.target.value)}
                className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand-blue-dark/50" />
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">Alterar Senha (opcional)</p>
            <div className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Nova senha" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-dark/50" />
                <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-2.5 text-gray-700 hover:text-gray-700">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-700" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Confirmar nova senha" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                  className="w-full bg-blue-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-dark/50" />
              </div>
            </div>
          </div>

          {error && <p className="text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">{error}</p>}
          {success && <p className="text-[11px] text-brand-blue-dark bg-brand-blue-dark/5 border border-brand-blue-dark/10 rounded-lg p-2 text-center">{success}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer">
              Cancelar
            </button>
            <button type="submit" disabled={mutation.isPending}
              className="flex-1 bg-brand-blue-dark hover:bg-brand-blue text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50">
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
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    const storedCollapsed = window.localStorage.getItem('sigfis:sidebarCollapsed');
    if (storedCollapsed === '1') setSidebarCollapsed(true);
    setIsLoadingUser(false);
  }, []);

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((v) => {
      const next = !v;
      window.localStorage.setItem('sigfis:sidebarCollapsed', next ? '1' : '0');
      return next;
    });
  };

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
    setMobileSidebarOpen(false);
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
      <div className="flex min-h-screen items-center justify-center bg-brand-navy text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <SigfisLogo className="h-12 w-[72px] animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-brand-blue">CARREGANDO...</span>
        </div>
      </div>
    );
  }

  // -- LOGIN SCREEN --
  if (!user) {
    return (
      <div className="sigfis-sidebar-texture relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        {/* Elementos geométricos discretos */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/4 hidden size-40 rotate-12 rounded-3xl border border-white/5 sm:block" />
        <div className="pointer-events-none absolute left-1/3 bottom-1/4 hidden size-24 -rotate-12 rounded-2xl border border-white/5 md:block" />

        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- asset de marca fornecido, não passa por otimização do Next */}
            <img src="/sigfis-login-hero.png" alt="SIGFIS — Sistema de Fiscalização de Contratos — IQUEGO" className="w-full max-w-sm" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-400">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu.email@iquego.com.br"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-400">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showLoginPwd ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-xs text-gray-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPwd((v) => !v)}
                  aria-label={showLoginPwd ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 cursor-pointer"
                >
                  {showLoginPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="rounded-lg border border-brand-red/20 bg-brand-red/10 p-2 text-center text-[11px] font-medium text-red-300">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue-dark cursor-pointer"
            >
              <LogIn className="h-4 w-4" /> Entrar no Sistema
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-slate-500">
            Acesso restrito a usuários autorizados da IQUEGO. Conexão segura.
          </p>
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
        alwaysExpanded={!sidebarCollapsed}
        onToggleAlwaysExpanded={toggleSidebarCollapsed}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={user}
          activeView={activeView}
          onNavigate={handleNavigate}
          onToggleSidebar={toggleSidebarCollapsed}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onEditProfile={() => setShowProfileModal(true)}
          onLogout={handleLogout}
          sidebarAlwaysExpanded={!sidebarCollapsed}
          onToggleSidebarAlwaysExpanded={toggleSidebarCollapsed}
        />

        <main className="app-surface flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-8 border-l border-slate-200">
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
              onOpenArchived={() => handleNavigate('archived-contracts')}
              user={user}
              initialFilter={contractFilter}
            />
          )}

          {activeView === 'archived-contracts' && <ArchivedContractsView user={user} onBack={() => handleNavigate('contracts')} />}

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
    </div>
  );
}

// -- SORTABLE TABLE HEADER -----------------------------------------------------
function SortableHeader({ label, col, sortBy, sortDir, onClick }: {
  label: string; col: 'number' | 'value' | 'end'; sortBy: string; sortDir: 'asc' | 'desc'; onClick: (col: 'number' | 'value' | 'end') => void;
}) {
  const active = sortBy === col;
  return (
    <th className="px-4 py-2.5 font-semibold">
      <button onClick={() => onClick(col)} className={`flex items-center gap-1 cursor-pointer transition-colors ${active ? 'text-brand-blue' : 'hover:text-gray-800'}`}>
        {label}
        <ArrowUpDown className={`h-3 w-3 ${active ? 'opacity-100' : 'opacity-40'}`} />
        {active && <span className="text-[9px]">{sortDir === 'asc' ? '↑' : '↓'}</span>}
      </button>
    </th>
  );
}

// -- CONTRACTS LIST VIEW ------------------------------------------------------
function ContractsListView({
  onSelectContract,
  onOpenArchived,
  user,
  initialFilter = 'ALL',
}: {
  onSelectContract: (id: string) => void;
  onOpenArchived: () => void;
  user: User;
  initialFilter?: ContractFilter;
}) {
  const queryClient = useQueryClient();
  const { data: contracts, isLoading, isError, error, refetch } = useQuery<any[]>({
    queryKey: ['contracts-list', user.id],
    queryFn: () => api.contracts.list(),
    staleTime: 300_000,
  });

  const canSeeArchived = user.role === 'ADMIN' || user.role === 'GESTOR' || user.role === 'ALTA_GESTAO';
  const canArchive = user.role === 'ADMIN' || user.role === 'GESTOR';
  const canHardDelete = user.role === 'ADMIN';

  // Arquivar (soft delete) — ação "Excluir" para usuários autorizados.
  // Retira o contrato da listagem operacional, mas preserva todo o histórico
  // em Contratos Arquivados.
  const archiveMutation = useMutation({
    mutationFn: (id: string) => api.contracts.archive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  // Exclusão definitiva — exclusiva do ADMIN, diferente de arquivar.
  const hardDeleteMutation = useMutation({
    mutationFn: (id: string) => api.contracts.hardDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  // Suspender/Reativar — mudança de situação apenas; o contrato permanece
  // na listagem principal (diferente de arquivar/rescindir).
  const suspendMutation = useMutation({
    mutationFn: (id: string) => api.contracts.updateData(id, { status: 'SUSPENDED' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });
  const reactivateMutation = useMutation({
    mutationFn: (id: string) => api.contracts.updateData(id, { status: 'ACTIVE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  // Rescindir — muda a situação para Rescindido e arquiva automaticamente
  // (sai da listagem principal, com destaque em Contratos Arquivados).
  const rescindMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      api.contracts.updateData(id, { status: 'RESCINDED', archiveReason: reason }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts-list'] }),
    onError: (e: any) => alert(`Erro: ${e.message}`),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter === 'active' ? 'ACTIVE' : 'ALL');
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

  // Nomes de gestor só são resolvíveis para papéis com acesso a /users;
  // para FISCAL, a coluna Gestor mostra "—" em vez de inventar um nome.
  const canResolveManagers = ['ADMIN', 'GESTOR', 'ALTA_GESTAO'].includes(user.role);
  const { data: allUsersForLookup = [] } = useQuery<any[]>({
    queryKey: ['users-manager-lookup'],
    queryFn: () => api.users.listAll(),
    staleTime: 300_000,
    enabled: canResolveManagers,
  });
  const managerNameById = new Map<string, string>((allUsersForLookup || []).map((u: any) => [u.id, u.name]));

  const [sortBy, setSortBy] = useState<'number' | 'value' | 'end'>('number');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [quickFilter, setQuickFilter] = useState<'ALL' | 'active' | 'expiring90' | 'expired' | 'suspended'>('ALL');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const createContractMutation = useMutation({
    mutationFn: (data: any) => api.contracts.create(data),
    onSuccess: () => {
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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 max-w-7xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 mb-1">Não foi possível carregar os contratos.</p>
          <p className="text-xs text-gray-500 font-mono bg-gray-100/40 border border-gray-300 rounded px-3 py-1.5 max-w-sm">
            {(error as any)?.message || 'Backend indisponível'}
          </p>
        </div>
        <button onClick={() => refetch()} className="text-xs px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-colors cursor-pointer">
          Tentar novamente
        </button>
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

    let matchesQuick = true;
    if (initialFilter === 'ALL') {
      const days = daysUntil(c.endDate);
      if (quickFilter === 'active') matchesQuick = c.status === 'ACTIVE';
      else if (quickFilter === 'expiring90') matchesQuick = c.status === 'ACTIVE' && days > 0 && days <= 90;
      else if (quickFilter === 'expired') matchesQuick = c.status === 'ACTIVE' && days <= 0;
      else if (quickFilter === 'suspended') matchesQuick = c.status === 'SUSPENDED';
    }

    return matchesSearch && matchesStatus && matchesKpi && matchesQuick;
  });

  // Ordenação: escolhida pelo usuário (colunas clicáveis), com direção configurável.
  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'value') {
      cmp = (a.currentValue ?? 0) - (b.currentValue ?? 0);
    } else if (sortBy === 'end') {
      cmp = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    } else {
      const [numA, yearA] = (a.contractNumber || '').split('/');
      const [numB, yearB] = (b.contractNumber || '').split('/');
      const yA = parseInt(yearA || '0'), yB = parseInt(yearB || '0');
      cmp = yA !== yB ? yA - yB : parseInt(numA || '0') - parseInt(numB || '0');
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageClamped = Math.min(page, totalPages);
  const paginated = filtered.slice((pageClamped - 1) * PAGE_SIZE, pageClamped * PAGE_SIZE);

  const toggleSort = (col: 'number' | 'value' | 'end') => {
    if (sortBy === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(col); setSortDir('desc'); }
  };

  const portfolioIndicators = {
    active: (contracts || []).filter((c) => c.status === 'ACTIVE').length,
    expiring90: (contracts || []).filter((c) => c.status === 'ACTIVE' && daysUntil(c.endDate) > 0 && daysUntil(c.endDate) <= 90).length,
    expired: (contracts || []).filter((c) => c.status === 'ACTIVE' && daysUntil(c.endDate) <= 0).length,
    suspended: (contracts || []).filter((c) => c.status === 'SUSPENDED').length,
  };

  const exportCsv = () => {
    const header = ['Contrato', 'Objeto', 'Fornecedor', 'Valor', 'Início', 'Fim', 'Gestor', 'Fiscal', 'Status'];
    const rows = filtered.map((c) => {
      const fiscal = (c.fiscalAssignments || []).find((a: any) => a.isActive)?.fiscal?.name || '';
      const manager = c.managerId ? (managerNameById.get(c.managerId) || '') : '';
      return [c.contractNumber, c.objectDescription, c.contractor?.corporateName || '', String(c.currentValue ?? ''), c.startDate, c.endDate, manager, fiscal, statusLabels[c.status] || c.status];
    });
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `contratos_sigfis_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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


  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Contratos</h2>
          <p className="text-xs text-gray-700 mt-0.5">Central de gestão dos contratos administrativos da IQUEGO</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {canSeeArchived && (
            <button
              onClick={onOpenArchived}
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              <Archive className="h-3.5 w-3.5" /> Contratos Arquivados
            </button>
          )}
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Exportar
          </button>
          <button
            onClick={() => setShowNewContractModal(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Novo Contrato
          </button>
        </div>
      </div>

      {/* Indicadores do portfólio (independentes do filtro ativo) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button onClick={() => { setQuickFilter('active'); setPage(1); }} className={`rounded-xl border p-3.5 text-center transition-colors cursor-pointer ${quickFilter === 'active' ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Ativos</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{portfolioIndicators.active}</p>
        </button>
        <button onClick={() => { setQuickFilter('expiring90'); setPage(1); }} className={`rounded-xl border p-3.5 text-center transition-colors cursor-pointer ${quickFilter === 'expiring90' ? 'border-brand-amber bg-brand-amber/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">A vencer (90d)</p>
          <p className="mt-1 text-xl font-bold text-amber-600">{portfolioIndicators.expiring90}</p>
        </button>
        <button onClick={() => { setQuickFilter('expired'); setPage(1); }} className={`rounded-xl border p-3.5 text-center transition-colors cursor-pointer ${quickFilter === 'expired' ? 'border-brand-red bg-brand-red/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Vencidos</p>
          <p className="mt-1 text-xl font-bold text-red-600">{portfolioIndicators.expired}</p>
        </button>
        <button onClick={() => { setQuickFilter('suspended'); setPage(1); }} className={`rounded-xl border p-3.5 text-center transition-colors cursor-pointer ${quickFilter === 'suspended' ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Suspensos</p>
          <p className="mt-1 text-xl font-bold text-gray-700">{portfolioIndicators.suspended}</p>
        </button>
      </div>
      {quickFilter !== 'ALL' && (
        <button onClick={() => setQuickFilter('ALL')} className="text-xs font-semibold text-brand-blue cursor-pointer">✕ Limpar indicador selecionado</button>
      )}

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
                  <CurrencyInput value={ncValue} onChange={n => setNcValue(String(n))} required
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

      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-[10px] uppercase tracking-wide text-gray-500">
                  <SortableHeader label="Contrato" col="number" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                  <th className="px-4 py-2.5 font-semibold">Objeto</th>
                  <th className="px-4 py-2.5 font-semibold">Fornecedor</th>
                  <SortableHeader label="Valor" col="value" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                  <SortableHeader label="Vigência" col="end" sortBy={sortBy} sortDir={sortDir} onClick={toggleSort} />
                  <th className="px-4 py-2.5 font-semibold">Gestor</th>
                  <th className="px-4 py-2.5 font-semibold">Fiscal</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => {
                  const days = daysUntil(c.endDate);
                  const fiscalName = (c.fiscalAssignments || []).find((a: any) => a.isActive)?.fiscal?.name;
                  const managerName = c.managerId ? managerNameById.get(c.managerId) : undefined;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectContract(c.id)}
                      className="cursor-pointer border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-bold text-gray-900">{c.contractNumber}</td>
                      <td className="max-w-[220px] px-4 py-3 text-gray-700"><span className="line-clamp-1">{c.objectDescription}</span></td>
                      <td className="max-w-[160px] px-4 py-3 text-gray-700"><span className="line-clamp-1">{c.contractor?.corporateName || '—'}</span></td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">{formatCurrency(c.currentValue)}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {formatDate(c.endDate)}
                        {c.status === 'ACTIVE' && days > 0 && days <= 90 && (
                          <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">{days}d</span>
                        )}
                        {c.status === 'ACTIVE' && days <= 0 && (
                          <span className="ml-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">vencido</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{managerName || (canResolveManagers ? '—' : <span title="Não disponível para seu perfil">—</span>)}</td>
                      <td className="px-4 py-3 text-gray-700">{fiscalName || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded px-2 py-0.5 text-[11px] font-bold border ${statusColors[c.status] || ''}`}>
                          {statusLabels[c.status] || c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {canArchive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Arquivar contrato ${c.contractNumber}?\n\nO contrato será retirado da listagem principal, mas seus dados históricos serão preservados em Contratos Arquivados.`)) {
                                  archiveMutation.mutate(c.id);
                                }
                              }}
                              disabled={archiveMutation.isPending}
                              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600 disabled:opacity-40 cursor-pointer"
                              title="Arquivar contrato">
                              <Archive className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {canArchive && (c.status === 'ACTIVE' || c.status === 'SUSPENDED') && (
                            <div onClick={(e) => e.stopPropagation()}>
                              <Dropdown
                                trigger={({ toggle }) => (
                                  <button
                                    onClick={toggle}
                                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                                    title="Mais ações">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              >
                                {c.status === 'ACTIVE' && (
                                  <DropdownItem
                                    icon={PauseCircle}
                                    onClick={() => {
                                      if (confirm(`Suspender o contrato ${c.contractNumber}?\n\nEle permanecerá na listagem principal, com status Suspenso.`)) {
                                        suspendMutation.mutate(c.id);
                                      }
                                    }}
                                  >
                                    Suspender Contrato
                                  </DropdownItem>
                                )}
                                {c.status === 'SUSPENDED' && (
                                  <DropdownItem
                                    icon={PlayCircle}
                                    onClick={() => {
                                      if (confirm(`Reativar o contrato ${c.contractNumber}?\n\nO status voltará para Ativo.`)) {
                                        reactivateMutation.mutate(c.id);
                                      }
                                    }}
                                  >
                                    Reativar Contrato
                                  </DropdownItem>
                                )}
                                <DropdownItem
                                  icon={Ban}
                                  className="text-brand-red hover:bg-brand-red/5"
                                  onClick={() => {
                                    const input = window.prompt(
                                      `Rescindir o contrato ${c.contractNumber}?\n\nO contrato será rescindido e movido para Contratos Arquivados, com destaque.\n\nInforme o motivo da rescisão (opcional):`
                                    );
                                    if (input !== null) rescindMutation.mutate({ id: c.id, reason: input || undefined });
                                  }}
                                >
                                  Rescindir Contrato
                                </DropdownItem>
                              </Dropdown>
                            </div>
                          )}
                          {canHardDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const input = window.prompt(
                                  `ATENÇÃO: esta ação é irreversível.\n\nA exclusão definitiva removerá permanentemente o contrato ${c.contractNumber} e os dados vinculados a ele (fiscalizações, aditivos, ocorrências, pagamentos, comunicados, documentos). Essa operação não poderá ser desfeita.\n\nDigite EXCLUIR para confirmar.`
                                );
                                if (input === 'EXCLUIR') hardDeleteMutation.mutate(c.id);
                              }}
                              disabled={hardDeleteMutation.isPending}
                              className="rounded-lg p-1.5 text-red-500/60 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40 cursor-pointer"
                              title="Excluir definitivamente (irreversível)">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <div className="rounded-lg border border-gray-200 p-1.5 text-gray-500">
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row">
            <span className="text-[11px] text-gray-500">{filtered.length} contrato{filtered.length !== 1 ? 's' : ''} · página {pageClamped} de {totalPages}</span>
            <Pagination page={pageClamped} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      ) : (
        <EmptyState icon={FileText} title="Nenhum contrato encontrado" description="Ajuste a busca ou os filtros para ver resultados." />
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
