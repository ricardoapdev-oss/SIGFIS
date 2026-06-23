'use client';

import { Activity, FileSignature, LogOut, Shield, FolderOpen, MessageSquare, Users, Bell, ShieldAlert, History, Brain, UserCog, Search, Crown } from 'lucide-react';
import { User } from '@/lib/api';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai';

interface SidebarProps {
  user: User;
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onEditProfile?: () => void;
}

function SigfisLogo({ className }: { className?: string }) {
  return (
    <img src="/sigfis-logo.svg" alt="SIGFIS" className={className} />
  );
}

function RoleIcon({ role }: { role: string }) {
  if (role === 'GESTOR') {
    return (
      <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
        <Search className="h-4 w-4" />
      </div>
    );
  }
  if (role === 'ADMIN') {
    return (
      <div className="bg-yellow-500/10 text-yellow-400 p-2 rounded-lg border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
        <Shield className="h-4 w-4" />
      </div>
    );
  }
  if (role === 'ALTA_GESTAO') {
    return (
      <div className="bg-violet-500/10 text-violet-400 p-2 rounded-lg border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
        <Crown className="h-4 w-4" />
      </div>
    );
  }
  // FISCAL — escudo verde
  return (
    <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
      <Shield className="h-4 w-4" />
    </div>
  );
}

const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',       icon: Activity,      roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'contracts' as View,      label: 'Contratos',          icon: FileSignature, roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'processes' as View,      label: 'Processos',          icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: true  },
  { view: 'pending' as View,        label: 'Pendências',         icon: Bell,          roles: ['GESTOR', 'FISCAL'],                         dividerAfter: false },
  { view: 'risk' as View,           label: 'Painel de Risco',    icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'communications' as View, label: 'Comunicados',        icon: MessageSquare, roles: ['GESTOR', 'FISCAL', 'ALTA_GESTAO'],          dividerAfter: true  },
  { view: 'ai' as View,             label: 'Inteligência Contratual', icon: Brain,    roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'audit' as View,          label: 'Auditoria',          icon: History,       roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: true  },
  { view: 'users' as View,          label: 'Usuários',           icon: Users,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout, onEditProfile }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  return (
    <aside className="w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-zinc-900">
          <SigfisLogo className="h-8 w-8 shrink-0" />
          <div>
            <h2 className="font-bold tracking-wider text-sm text-white">SIGFIS</h2>
            <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">CONTRATOS</span>
          </div>
        </div>

        {/* User badge — clicável para editar perfil */}
        <button
          onClick={onEditProfile}
          title="Editar perfil"
          className="w-full p-4 mx-0 mt-4 px-3 group"
        >
          <div className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-700 rounded-xl flex items-center gap-3 p-3 transition-colors cursor-pointer">
            <RoleIcon role={user.role} />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-semibold text-zinc-200 line-clamp-1">{user.name}</p>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border block w-max mt-0.5 ${
                user.role === 'ADMIN'
                  ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                  : user.role === 'GESTOR'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : user.role === 'ALTA_GESTAO'
                  ? 'text-violet-400 bg-violet-500/10 border-violet-500/20'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {user.role}
              </span>
            </div>
            <UserCog className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />
          </div>
        </button>

        {/* Nav */}
        <nav className="p-4 space-y-0.5">
          {navItems
            .filter((item) => item.roles.includes(user.role))
            .map(({ view, label, icon: Icon, dividerAfter }) => (
              <div key={view}>
                <button
                  onClick={() => onNavigate(view)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive(view)
                      ? 'bg-zinc-900 text-white font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive(view) ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  {label}
                </button>
                {dividerAfter && <div className="border-b border-zinc-900 my-1.5 mx-3" />}
              </div>
            ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-900 flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300 shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-zinc-400 truncate font-semibold">{user.email}</p>
            <span className="text-[9px] text-zinc-500">{user.registrationNumber || 'IQUEGO'}</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          title="Sair do sistema"
          className="p-1.5 hover:bg-zinc-900 text-zinc-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
