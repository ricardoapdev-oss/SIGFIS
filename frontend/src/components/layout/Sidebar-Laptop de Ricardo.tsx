'use client';

import {
  Activity, FileSignature, Layers, LogOut, Shield,
  FolderOpen, MessageSquare, Users, Bell, ShieldAlert,
  History, Sparkles,
} from 'lucide-react';
import { User } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai';

interface SidebarProps {
  user: User;
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',       icon: Activity,      roles: ['ADMIN', 'GESTOR', 'FISCAL'], dividerAfter: false, showBadge: false },
  { view: 'contracts' as View,      label: 'Contratos',          icon: FileSignature, roles: ['ADMIN', 'GESTOR', 'FISCAL'], dividerAfter: false, showBadge: false },
  { view: 'processes' as View,      label: 'Processos',          icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL'], dividerAfter: true,  showBadge: false },
  { view: 'pending' as View,        label: 'Pendências',         icon: Bell,          roles: ['GESTOR', 'FISCAL'],          dividerAfter: false, showBadge: true  },
  { view: 'risk' as View,           label: 'Painel de Risco',    icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR'],           dividerAfter: false, showBadge: false },
  { view: 'communications' as View, label: 'Comunicados',        icon: MessageSquare, roles: ['GESTOR', 'FISCAL'],          dividerAfter: true,  showBadge: false },
  { view: 'ai' as View,             label: 'IA Corporativa',     icon: Sparkles,      roles: ['GESTOR'],                    dividerAfter: false, showBadge: false },
  { view: 'audit' as View,          label: 'Auditoria',          icon: History,       roles: ['ADMIN', 'GESTOR'],           dividerAfter: true,  showBadge: false },
  { view: 'users' as View,          label: 'Usuários',           icon: Users,         roles: ['ADMIN', 'GESTOR'],           dividerAfter: false, showBadge: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  // Badge de pendências
  const { data: stats } = useQuery({
    queryKey: ['stats', user?.id, user?.role],
    queryFn: () => api.contracts.stats(),
    enabled: !!user,
    staleTime: 30_000,
  });
  const pendingCount: number = stats?.pendingAlerts ?? 0;

  return (
    <aside className="w-64 border-r border-zinc-900/80 bg-zinc-950 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-zinc-900/80">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Layers className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-bold tracking-wide text-sm text-white">SIGECONTRATOS</h2>
            <span className="text-[9px] text-zinc-500 font-medium tracking-widest uppercase">IQUEGO SA</span>
          </div>
        </div>

        {/* User badge */}
        <div className="p-4 mx-3 mt-4 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl
          flex items-center gap-3 backdrop-blur-sm">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20
              flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0">
              {user.name.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-zinc-200 line-clamp-1">{user.name}</p>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest
              bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 block w-max mt-0.5">
              {user.role}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-3 mt-2 space-y-0.5">
          {navItems
            .filter((item) => item.roles.includes(user.role))
            .map(({ view, label, icon: Icon, dividerAfter, showBadge }) => {
              const active = isActive(view);
              const badge = showBadge && pendingCount > 0 ? pendingCount : 0;

              return (
                <div key={view}>
                  <button
                    onClick={() => onNavigate(view)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium
                      flex items-center gap-3 transition-all duration-150 cursor-pointer
                      ${active
                        ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                      }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 transition-colors ${active ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                    <span className="flex-1">{label}</span>
                    {badge > 0 && (
                      <span className="min-w-[18px] h-4.5 px-1.5 rounded-full bg-amber-500
                        text-[9px] font-bold text-zinc-950 flex items-center justify-center
                        animate-pulse shrink-0">
                        {badge > 9 ? '9+' : badge}
                      </span>
                    )}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </button>
                  {dividerAfter && <div className="border-b border-zinc-900/60 my-1.5 mx-2" />}
                </div>
              );
            })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-900/80">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center
            font-bold text-xs text-zinc-300 shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-zinc-400 truncate font-semibold">{user.email}</p>
            <span className="text-[9px] text-zinc-600">{user.registrationNumber || 'IQUEGO'}</span>
          </div>
          <button
            onClick={onLogout}
            title="Sair do sistema"
            className="p-1.5 hover:bg-zinc-900 text-zinc-500 hover:text-red-400
              rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
