'use client';

import { Activity, FileSignature, LogOut, Shield, FolderOpen, MessageSquare, Users, Bell, ShieldAlert, History, Brain, UserCog, Search, Crown, Database } from 'lucide-react';
import { User } from '@/lib/api';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';

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
      <div className="bg-amber-400/20 text-amber-300 p-2 rounded-lg border border-amber-400/30 group-hover:bg-amber-400/30 transition-colors">
        <Search className="h-4 w-4" />
      </div>
    );
  }
  if (role === 'ADMIN') {
    return (
      <div className="bg-yellow-400/20 text-yellow-300 p-2 rounded-lg border border-yellow-400/30 group-hover:bg-yellow-400/30 transition-colors">
        <Shield className="h-4 w-4" />
      </div>
    );
  }
  if (role === 'ALTA_GESTAO') {
    return (
      <div className="bg-violet-400/20 text-violet-300 p-2 rounded-lg border border-violet-400/30 group-hover:bg-violet-400/30 transition-colors">
        <Crown className="h-4 w-4" />
      </div>
    );
  }
  return (
    <div className="bg-emerald-400/20 text-emerald-300 p-2 rounded-lg border border-emerald-400/30 group-hover:bg-emerald-400/30 transition-colors">
      <Shield className="h-4 w-4" />
    </div>
  );
}

const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',            icon: Activity,      roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'contracts' as View,      label: 'Contratos',               icon: FileSignature, roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'processes' as View,      label: 'Processos',               icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: true  },
  { view: 'pending' as View,        label: 'Pendências',              icon: Bell,          roles: ['GESTOR', 'FISCAL'],                         dividerAfter: false },
  { view: 'risk' as View,           label: 'Painel de Risco',         icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'communications' as View, label: 'Comunicados',             icon: MessageSquare, roles: ['GESTOR', 'FISCAL', 'ALTA_GESTAO'],          dividerAfter: true  },
  { view: 'ai' as View,             label: 'Inteligência Contratual', icon: Brain,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'audit' as View,          label: 'Auditoria',               icon: History,       roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: true  },
  { view: 'users' as View,          label: 'Usuários',                icon: Users,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: true  },
  { view: 'backup' as View,         label: 'Backup do Sistema',       icon: Database,      roles: ['ADMIN', 'GESTOR'],                          dividerAfter: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout, onEditProfile }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  return (
    <aside className="w-64 flex flex-col justify-between shrink-0" style={{ background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)' }}>
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-blue-700/50">
          <SigfisLogo className="h-8 w-8 shrink-0" />
          <div>
            <h2 className="font-bold tracking-wider text-sm text-white">SIGFIS</h2>
            <span className="text-[10px] text-blue-300 font-semibold tracking-widest uppercase">CONTRATOS</span>
          </div>
        </div>

        {/* User badge */}
        <button
          onClick={onEditProfile}
          title="Editar perfil"
          className="w-full p-4 mx-0 mt-4 px-3 group"
        >
          <div className="bg-blue-800/50 border border-blue-600/40 hover:border-blue-400/60 hover:bg-blue-700/50 rounded-xl flex items-center gap-3 p-3 transition-colors cursor-pointer">
            <RoleIcon role={user.role} />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-semibold text-white line-clamp-1">{user.name}</p>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border block w-max mt-0.5 ${
                user.role === 'ADMIN'
                  ? 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30'
                  : user.role === 'GESTOR'
                  ? 'text-amber-300 bg-amber-400/10 border-amber-400/30'
                  : user.role === 'ALTA_GESTAO'
                  ? 'text-violet-300 bg-violet-400/10 border-violet-400/30'
                  : 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30'
              }`}>
                {user.role}
              </span>
            </div>
            <UserCog className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-200 shrink-0 transition-colors" />
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
                      ? 'bg-white/15 text-white font-semibold shadow-sm'
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive(view) ? 'text-white' : 'text-blue-300'}`} />
                  {label}
                </button>
                {dividerAfter && <div className="border-b border-blue-700/40 my-1.5 mx-3" />}
              </div>
            ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700/50 flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 rounded-full bg-blue-700/60 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-white shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-blue-200 truncate font-semibold">{user.email}</p>
            <span className="text-[9px] text-blue-400">{user.registrationNumber || 'IQUEGO'}</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          title="Sair do sistema"
          className="p-1.5 hover:bg-blue-700/60 text-blue-300 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
