'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X, UserCheck, UserX, Trash2 } from 'lucide-react';
import { api, User } from '@/lib/api';
import { userRoleLabel } from '@/lib/labels';

interface UsersViewProps {
  user: User;
}

export function UsersView({ user }: UsersViewProps) {
  const queryClient = useQueryClient();
  const [isNewOpen, setIsNewOpen] = useState(false);

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

  const userList: any[] = users ?? [];

  const roleColor: Record<string, string> = {
    ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    GESTOR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    FISCAL: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ALTA_GESTAO: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-semibold text-white">Gestão de Usuários</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Servidores cadastrados no sistema com seus perfis de acesso</p>
        </div>
        {(user.role === 'GESTOR' || user.role === 'ALTA_GESTAO' || user.role === 'ADMIN') && (
          <button
            onClick={() => setIsNewOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Usuário
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-zinc-900/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-900/40 border-b border-zinc-900 text-zinc-400 font-semibold">
                <th className="p-4">Servidor</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Matrícula</th>
                <th className="p-4">Perfil de Acesso</th>
                <th className="p-4">Status</th>
                {(user.role === 'GESTOR' || user.role === 'ADMIN' || user.role === 'ALTA_GESTAO') && <th className="p-4 text-center">Ações</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {userList.map((u: any) => (
                <tr key={u.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-300 shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-zinc-200">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400">{u.email}</td>
                  <td className="p-4 text-zinc-400 font-mono">{u.registrationNumber || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border ${roleColor[u.role] || ''}`}>
                      {userRoleLabel[u.role] || u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border ${
                      u.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {u.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  {(user.role === 'GESTOR' || user.role === 'ADMIN' || user.role === 'ALTA_GESTAO') && (
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {user.role === 'GESTOR' && u.id !== user.id && (
                          <button
                            onClick={() => toggleStatusMutation.mutate({
                              id: u.id,
                              status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                            })}
                            title={u.status === 'ACTIVE' ? 'Desativar usuário' : 'Reativar usuário'}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              u.status === 'ACTIVE'
                                ? 'hover:bg-red-500/10 text-zinc-400 hover:text-red-400'
                                : 'hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400'
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
                            title="Excluir usuário"
                            className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
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
      )}

      {/* Modal: Novo Usuário */}
      {isNewOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsNewOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-bold text-white mb-2">Cadastrar Servidor</h3>
            <p className="text-xs text-zinc-500 mb-5 border-b border-zinc-800 pb-3">Adicionar novo usuário ao SIGECONTRATOS.</p>

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
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  placeholder="Nome do servidor" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">E-mail Corporativo</label>
                  <input type="email" value={fEmail} onChange={(e) => setFEmail(e.target.value)} required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    placeholder="servidor@iquego.com.br" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Matrícula</label>
                  <input type="text" value={fRegistration} onChange={(e) => setFRegistration(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    placeholder="IQG-0000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Perfil de Acesso</label>
                  <select value={fRole} onChange={(e) => setFRole(e.target.value as 'GESTOR' | 'FISCAL' | 'ALTA_GESTAO')} required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50">
                    <option value="FISCAL">Fiscal de Contrato</option>
                    <option value="GESTOR">Gestor de Contratos</option>
                    {(user.role === 'ADMIN' || user.role === 'ALTA_GESTAO') && <option value="ALTA_GESTAO">Alta Gestão</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Senha Inicial</label>
                  <input type="password" value={fPassword} onChange={(e) => setFPassword(e.target.value)} required minLength={6}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    placeholder="Mínimo 6 caracteres" />
                </div>
              </div>

              <button type="submit" disabled={createMutation.isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50">
                {createMutation.isPending ? 'Cadastrando...' : 'Cadastrar Servidor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
