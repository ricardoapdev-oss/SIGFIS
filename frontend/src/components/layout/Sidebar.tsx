'use client';

import { LayoutGrid, FileText, LogOut, FolderOpen, ShieldCheck, Users, ShieldAlert, MessageSquare, ClipboardList, Brain, UserCog, Database, X, ChevronDown, Settings } from 'lucide-react';
import { User } from '@/lib/api';
import { Tooltip } from '@/components/ui/tooltip';
import { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel } from '@/components/ui/dropdown';

type View = 'dashboard' | 'contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';

interface SidebarProps {
  user: User;
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onEditProfile?: () => void;
  /** Estado real do menu (o mesmo alternado pelo botão ☰ do header) — exibido como "Preferências" no menu do usuário. */
  alwaysExpanded: boolean;
  onToggleAlwaysExpanded: () => void;
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

// sigfis-logo.png é o lockup vertical oficial (símbolo + "SIGFIS" + tagline)
function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.png" alt="SIGFIS — Sistema de Fiscalização de Contratos" className={className} />;
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';
  return (
    <div className="size-9.5 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-[0_0_12px_rgba(20,107,255,0.5)]">
      {initials}
    </div>
  );
}

const roleBadgeStyle: Record<string, string> = {
  ADMIN: 'text-[#fbbf24] bg-[#f59e0b]/20 border-[#f59e0b]/40',
  GESTOR: 'text-teal-300 bg-brand-cyan/20 border-brand-cyan/40',
  ALTA_GESTAO: 'text-violet-300 bg-violet-400/20 border-violet-400/40',
  FISCAL: 'text-emerald-300 bg-emerald-400/20 border-emerald-400/40',
};

const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',            icon: LayoutGrid,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: false },
  { view: 'contracts' as View,      label: 'Contratos',               icon: FileText,      roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: false },
  { view: 'processes' as View,      label: 'Processos',               icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: true  },
  { view: 'pending' as View,        label: 'Fiscalizações',           icon: ShieldCheck,   roles: ['ADMIN', 'GESTOR', 'FISCAL'],                gapAfter: false },
  { view: 'risk' as View,           label: 'Painel de Risco',         icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'communications' as View, label: 'Comunicados',             icon: MessageSquare, roles: ['GESTOR', 'FISCAL', 'ALTA_GESTAO'],          gapAfter: true  },
  { view: 'ai' as View,             label: 'Inteligência Contratual', icon: Brain,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'audit' as View,          label: 'Auditoria',               icon: ClipboardList, roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'users' as View,          label: 'Usuários',                icon: Users,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: true  },
  { view: 'backup' as View,         label: 'Backup do Sistema',       icon: Database,      roles: ['ADMIN', 'GESTOR'],                          gapAfter: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout, onEditProfile, alwaysExpanded, onToggleAlwaysExpanded, collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  const items = navItems.filter((item) => item.roles.includes(user.role));

  const renderContent = (collapsedNow: boolean) => (
    <aside
      className={`sigfis-sidebar-bg h-full flex flex-col justify-between shrink-0 transition-[width] duration-200 ease-in-out ${collapsedNow ? 'w-[76px]' : 'w-[270px]'}`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto sigfis-scrollbar-thin">
        {/* Logo — asset oficial com proporções equilibradas */}
        <div className={`relative flex flex-col items-center border-b border-white/[0.05] ${collapsedNow ? 'px-2 py-4' : 'px-6 pt-8 pb-6'}`}>
          <SigfisLogo className={collapsedNow ? 'h-auto w-9' : 'h-auto w-[118px]'} />
          <button onClick={onCloseMobile} className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-1 p-3">
          {items.map(({ view, label, icon: Icon, gapAfter }) => {
            const active = isActive(view);
            const button = (
              <button
                onClick={() => onNavigate(view)}
                className={`relative flex w-full cursor-pointer items-center gap-3 rounded-xl border text-[13.5px] font-medium transition-all duration-150 ${
                  collapsedNow ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5 text-left'
                } ${
                  active
                    ? 'border-[#2563eb]/70 bg-[#0c1f38]/95 text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.28)]'
                    : 'border-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className={`h-[19px] w-[19px] shrink-0 ${active ? 'text-[#38bdf8]' : 'text-slate-400'}`} />
                {!collapsedNow && label}
                {active && <span className="absolute inset-y-2 right-0 w-[3.5px] rounded-l-full bg-brand-blue shadow-[0_0_10px_#146bff]" />}
              </button>
            );
            return (
              <div key={view}>
                {collapsedNow ? <Tooltip content={label} side="right">{button}</Tooltip> : button}
                {gapAfter && <div className="h-3" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer: identidade do usuário + sair do sistema */}
      <div className={`border-t border-white/[0.06] p-3 ${collapsedNow ? 'px-2' : ''}`}>
        {collapsedNow ? (
          <Tooltip content={`${user.name} · ${user.role}`} side="right">
            <button onClick={onEditProfile} className="flex w-full items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 transition-colors hover:border-white/15 hover:bg-white/10 cursor-pointer">
              <UserAvatar name={user.name} />
            </button>
          </Tooltip>
        ) : (
          <Dropdown
            side="top"
            align="start"
            className="w-full"
            panelClassName="w-full bg-[#151D27] border-white/10"
            trigger={({ open, toggle }) => (
              <button onClick={toggle} title="Menu do usuário" className="group w-full cursor-pointer">
                <div className={`flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0f151f]/90 p-3 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-colors hover:border-white/20 hover:bg-[#151c28] ${open ? 'border-white/20 bg-[#151c28]' : ''}`}>
                  <UserAvatar name={user.name} />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="line-clamp-1 text-xs font-semibold text-white">{user.name}</p>
                    <span className={`mt-0.5 inline-block rounded border px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider ${roleBadgeStyle[user.role] || roleBadgeStyle.FISCAL}`}>
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:text-white ${open ? 'rotate-180' : ''}`} />
                </div>
              </button>
            )}
          >
            <DropdownLabel>{user.name}</DropdownLabel>
            <div className="-mt-1 px-3.5 pb-2">
              <span className="text-[10px] text-muted-foreground">{user.email}</span>
            </div>
            <DropdownSeparator />
            <DropdownItem icon={UserCog} onClick={onEditProfile}>Meu Perfil</DropdownItem>
            <DropdownItem icon={Settings} onClick={onToggleAlwaysExpanded}>
              Preferências
              <span className="ml-auto text-[10px] font-normal text-muted-foreground">{alwaysExpanded ? 'Menu expandido' : 'Menu recolhido'}</span>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={LogOut} onClick={onLogout} className="text-brand-red hover:bg-brand-red/5">Sair</DropdownItem>
          </Dropdown>
        )}

        {collapsedNow ? (
          <Tooltip content="Sair do Sistema" side="right">
            <button
              onClick={onLogout}
              className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={onLogout}
            className="mt-2.5 flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0 text-slate-400" />
            Sair do Sistema
          </button>
        )}
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
          <div className="relative h-full w-[270px]">{renderContent(false)}</div>
        </div>
      )}
    </>
  );
}
