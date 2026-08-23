'use client';

import { Activity, FileSignature, LogOut, Shield, FolderOpen, ShieldCheck, Users, ShieldAlert, MessageSquare, History, Brain, UserCog, Crown, Database, X } from 'lucide-react';
import { User } from '@/lib/api';
import { Tooltip } from '@/components/ui/tooltip';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';

interface SidebarProps {
  user: User;
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onEditProfile?: () => void;
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.svg" alt="SIGFIS" className={className} />;
}

const roleStyle: Record<string, { icon: typeof Shield; wrap: string; badge: string }> = {
  ADMIN: { icon: Shield, wrap: 'bg-amber-400/15 text-amber-300 border-amber-400/25', badge: 'text-amber-300 bg-amber-400/10 border-amber-400/25' },
  GESTOR: { icon: ShieldCheck, wrap: 'bg-brand-cyan/15 text-teal-300 border-brand-cyan/25', badge: 'text-teal-300 bg-brand-cyan/10 border-brand-cyan/25' },
  ALTA_GESTAO: { icon: Crown, wrap: 'bg-violet-400/15 text-violet-300 border-violet-400/25', badge: 'text-violet-300 bg-violet-400/10 border-violet-400/25' },
  FISCAL: { icon: Shield, wrap: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', badge: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25' },
};

function RoleIcon({ role }: { role: string }) {
  const s = roleStyle[role] ?? roleStyle.FISCAL;
  const Icon = s.icon;
  return (
    <div className={`p-2 rounded-lg border shrink-0 transition-colors ${s.wrap}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',            icon: Activity,      roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'contracts' as View,      label: 'Contratos',               icon: FileSignature, roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: false },
  { view: 'processes' as View,      label: 'Processos',               icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], dividerAfter: true  },
  { view: 'pending' as View,        label: 'Fiscalizações',           icon: ShieldCheck,   roles: ['GESTOR', 'FISCAL'],                         dividerAfter: false },
  { view: 'risk' as View,           label: 'Painel de Risco',         icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'communications' as View, label: 'Comunicados',             icon: MessageSquare, roles: ['GESTOR', 'FISCAL', 'ALTA_GESTAO'],          dividerAfter: true  },
  { view: 'ai' as View,             label: 'Inteligência Contratual', icon: Brain,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: false },
  { view: 'audit' as View,          label: 'Auditoria',               icon: History,       roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: true  },
  { view: 'users' as View,          label: 'Usuários',                icon: Users,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           dividerAfter: true  },
  { view: 'backup' as View,         label: 'Backup do Sistema',       icon: Database,      roles: ['ADMIN', 'GESTOR'],                          dividerAfter: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout, onEditProfile, collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  const items = navItems.filter((item) => item.roles.includes(user.role));

  const renderContent = (collapsedNow: boolean) => (
    <aside
      className={`sigfis-sidebar-texture h-full flex flex-col justify-between shrink-0 transition-[width] duration-200 ease-in-out ${collapsedNow ? 'w-[76px]' : 'w-64'}`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto sigfis-scrollbar-thin">
        {/* Logo */}
        <div className={`flex items-center gap-3 border-b border-sidebar-border p-5 ${collapsedNow ? 'justify-center px-3' : ''}`}>
          <SigfisLogo className="h-8 w-8 shrink-0" />
          {!collapsedNow && (
            <div className="min-w-0">
              <h2 className="font-bold tracking-wide text-sm text-white leading-tight">SIGFIS</h2>
              <span className="text-[9.5px] text-slate-400 font-medium leading-tight block">Sistema de Fiscalização de Contratos</span>
            </div>
          )}
          <button onClick={onCloseMobile} className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User badge */}
        <div className={`mt-4 px-3 ${collapsedNow ? 'px-2' : ''}`}>
          {collapsedNow ? (
            <Tooltip content={`${user.name} · ${user.role}`} side="right">
              <button onClick={onEditProfile} className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:border-white/20 hover:bg-white/10 cursor-pointer">
                <RoleIcon role={user.role} />
              </button>
            </Tooltip>
          ) : (
            <button onClick={onEditProfile} title="Editar perfil" className="w-full group cursor-pointer">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20 hover:bg-white/10">
                <RoleIcon role={user.role} />
                <div className="min-w-0 flex-1 text-left">
                  <p className="line-clamp-1 text-xs font-semibold text-white">{user.name}</p>
                  <span className={`mt-0.5 block w-max rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${(roleStyle[user.role] ?? roleStyle.FISCAL).badge}`}>
                    {user.role}
                  </span>
                </div>
                <UserCog className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-white" />
              </div>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="space-y-0.5 p-3">
          {items.map(({ view, label, icon: Icon, dividerAfter }) => {
            const active = isActive(view);
            const button = (
              <button
                onClick={() => onNavigate(view)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg text-xs font-medium transition-colors ${
                  collapsedNow ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5 text-left'
                } ${
                  active
                    ? 'bg-brand-blue text-white font-semibold shadow-[0_4px_12px_rgba(20,107,255,0.35)]'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                {!collapsedNow && label}
              </button>
            );
            return (
              <div key={view}>
                {collapsedNow ? <Tooltip content={label} side="right">{button}</Tooltip> : button}
                {dividerAfter && <div className="mx-3 my-1.5 border-b border-white/8" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className={`border-t border-sidebar-border p-4 ${collapsedNow ? 'flex flex-col items-center gap-2' : 'flex items-center justify-between gap-2'}`}>
        {!collapsedNow && (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold text-slate-300">{user.email}</p>
              <span className="text-[9px] text-slate-500">{user.registrationNumber || 'IQUEGO'}</span>
            </div>
          </div>
        )}
        <Tooltip content="Sair do Sistema" side="right">
          <button
            onClick={onLogout}
            className="shrink-0 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: coluna fixa que empurra o conteúdo */}
      <div className="hidden lg:block">{renderContent(collapsed)}</div>

      {/* Mobile: drawer sobreposto — sempre expandido, independente do estado do desktop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onCloseMobile} />
          <div className="relative h-full w-64">{renderContent(false)}</div>
        </div>
      )}
    </>
  );
}
