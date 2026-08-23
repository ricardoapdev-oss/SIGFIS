'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X, UserCheck, UserX, Trash2, Search, Users as UsersIcon, ShieldCheck, ShieldOff, Clock } from 'lucide-react';
import { api, User, UserRole } from '@/lib/api';
import { userRoleLabel, formatDateTime } from '@/lib/labels';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';

interface UsersViewProps {
  user: User;
}

const ROLE_COLOR: Record<string, string> = {
  ADMIN: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  GESTOR: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  FISCAL: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  ALTA_GESTAO: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

// Resumo factual das permissões já aplicadas pelo backend (RBAC real — ver
// UsersService, ContractsController, AuditController etc.), não uma
// funcionalidade nova nem uma matriz de permissões granular inventada.
const ROLE_PERMISSIONS: Record<string, string> = {
  ADMIN: 'Acesso total ao sistema',
  ALTA_GESTAO: 'Supervisão executiva · sem gestão de usuários ADMIN',
  GESTOR: 'Gerencia contratos, processos e usuários (exceto ADMIN)',
  FISCAL: 'Fiscalização dos contratos designados a ele',
};

export function UsersView({ user }: UsersViewProps) {
  const queryClient = useQueryClient();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'INACTIVE' | ''>('');

  // Form state
  const [fName, setFName] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [fPassword, setFPassword] = useState('');
  const [fRole, setFRole] = useState<'GESTOR' | 'FISCAL' | 'ALTA_GESTAO'>('FISCAL');
  const [fRegistration, setFRegistration] = useState('');

  const { data: users, isLoading } = useQuery({
    queryKey: ['users-all'],
    queryFn: () => api.users.listAll(),
    enabled: !!user && (user.role === 'ADMIN' || user.role === 'GESTOR' || user.role === 'ALTA_GESTAO'),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.users.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-all'] });
      queryClient.invalidateQueries({ queryKey: ['fiscais'] });
      setIsNewOpen(false);
      setFName(''); setFEmail(''); setFPassword(''); setFRole('FISCAL'); setFRegistration('');
    },
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACTIVE' | 'INACTIVE' }) =>
      api.users.toggleStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users-all'] }),
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.users.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users-all'] }),
    onError: (err: any) => alert(`Erro: ${err.message}`),
  });

  const canDelete = (target: any) => {
    if (user.role === 'ADMIN') return true;
    if (user.role === 'ALTA_GESTAO') return target.role !== 'ADMIN';
    return false;
  };

  const canToggleStatus = (target: any) => {
    if (user.role === 'ADMIN') return true;
    if (user.role === 'GESTOR') return target.role !== 'ADMIN' && target.id !== user.id;
    return false;
  };

  const canManage = user.role === 'GESTOR' || user.role === 'ADMIN' || user.role === 'ALTA_GESTAO';
  const allUsers: any[] = users ?? [];

  const filtered = allUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.registrationNumber || '').toLowerCase().includes(q);
    const matchesRole = !roleFilter || u.role === roleFilter;
    const matchesStatus = !statusFilter || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const kpi = {
    total: allUsers.length,
    active: allUsers.filter((u) => u.status === 'ACTIVE').length,
    inactive: allUsers.filter((u) => u.status === 'INACTIVE').length,
    admins: allUsers.filter((u) => u.role === 'ADMIN' || u.role === 'ALTA_GESTAO').length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Gestão de Usuários</h2>
          <p className="text-xs text-gray-500 mt-0.5">Servidores cadastrados no sistema com seus perfis de acesso</p>
        </div>
        {canManage && (
          <button
            onClick={() => setIsNewOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Usuário
          </button>
        )}
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={UsersIcon} label="Total de usuários" value={kpi.total} tone="blue" align="center" />
        <StatCard icon={ShieldCheck} label="Ativos" value={kpi.active} tone="green" align="center" />
        <StatCard icon={ShieldOff} label="Inativos" value={kpi.inactive} tone="red" align="center" />
        <StatCard icon={UsersIcon} label="Admin / Alta Gestão" value={kpi.admins} tone="purple" align="center" />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail ou matrícula..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as UserRole | '')}
          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
          <option value="">Todos os perfis</option>
          {Object.entries(userRoleLabel).map(([role, label]) => <option key={role} value={role}>{label}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'ACTIVE' | 'INACTIVE' | '')}
          className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none cursor-pointer">
          <option value="">Todos os status</option>
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
        </select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100/60 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={UsersIcon} title="Nenhum usuário encontrado"
          description={allUsers.length === 0 ? 'Não há usuários cadastrados.' : 'Nenhum usuário corresponde aos filtros selecionados.'} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold">
                  <th className="p-4">Servidor</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4">Matrícula</th>
                  <th className="p-4">Perfil</th>
                  <th className="p-4">Permissões</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Último acesso</th>
                  {canManage && <th className="p-4 text-center">Ações</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((u: any) => (
                  <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-700 shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{u.email}</td>
                    <td className="p-4 text-gray-500 font-mono">{u.registrationNumber || '—'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border whitespace-nowrap ${ROLE_COLOR[u.role] || ''}`}>
                        {userRoleLabel[u.role] || u.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 max-w-56">{ROLE_PERMISSIONS[u.role] || '—'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border whitespace-nowrap ${
                        u.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-600 border-red-500/20'
                      }`}>
                        {u.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {u.lastLoginAt
                        ? <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gray-400" />{formatDateTime(u.lastLoginAt)}</span>
                        : <span className="text-gray-400">Nunca acessou</span>}
                    </td>
                    {canManage && (
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {canToggleStatus(u) && (
                            <button
                              onClick={() => toggleStatusMutation.mutate({
                                id: u.id,
                                status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                              })}
                              disabled={toggleStatusMutation.isPending}
                              title={u.status === 'ACTIVE' ? 'Desativar usuário' : 'Reativar usuário'}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-40 ${
                                u.status === 'ACTIVE'
                                  ? 'hover:bg-red-500/10 text-gray-400 hover:text-red-500'
                                  : 'hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500'
                              }`}
                            >
                              {u.status === 'ACTIVE' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                            </button>
                          )}
                          {canDelete(u) && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Excluir ${u.name}? Esta ação não pode ser desfeita.`)) {
                                  deleteMutation.mutate(u.id);
                                }
                              }}
                              disabled={deleteMutation.isPending}
                              title="Excluir usuário"
                              className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10 text-gray-400 hover:text-red-500 disabled:opacity-40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Novo Usuário */}
      {isNewOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsNewOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Cadastrar Servidor</h3>
            <p className="text-xs text-gray-500 mb-5 border-b border-gray-200 pb-3">Adicionar novo usuário ao SIGFIS.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate({
                  name: fName,
                  email: fEmail,
                  password: fPassword,
                  role: fRole,
                  registrationNumber: fRegistration,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  placeholder="Nome do servidor" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">E-mail Corporativo</label>
                  <input type="email" value={fEmail} onChange={(e) => setFEmail(e.target.value)} required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    placeholder="servidor@iquego.com.br" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Matrícula</label>
                  <input type="text" value={fRegistration} onChange={(e) => setFRegistration(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    placeholder="IQG-0000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Perfil de Acesso</label>
                  <select value={fRole} onChange={(e) => setFRole(e.target.value as 'GESTOR' | 'FISCAL' | 'ALTA_GESTAO')} required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                    <option value="FISCAL">Fiscal de Contrato</option>
                    <option value="GESTOR">Gestor de Contratos</option>
                    {(user.role === 'ADMIN' || user.role === 'ALTA_GESTAO') && <option value="ALTA_GESTAO">Alta Gestão</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Senha Inicial</label>
                  <input type="password" value={fPassword} onChange={(e) => setFPassword(e.target.value)} required minLength={6}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    placeholder="Mínimo 6 caracteres" />
                </div>
              </div>

              <button type="submit" disabled={createMutation.isPending}
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
                {createMutation.isPending ? 'Cadastrando...' : 'Cadastrar Servidor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
