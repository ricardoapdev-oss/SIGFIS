'use client';

import { Activity, FileSignature, LogOut, Shield, FolderOpen, ShieldCheck, Users, ShieldAlert, MessageSquare, History, Brain, UserCog, Crown, Database, X, ChevronDown, Settings } from 'lucide-react';
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
// — usado por inteiro, sem recorte e sem retipar o texto, exatamente como
// fornecido.
function SigfisLogo({ className }: { className?: string }) {
  return <img src="/sigfis-logo.png" alt="SIGFIS — Sistema de Fiscalização de Contratos" className={className} />;
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

// A separação entre grupos vem de espaçamento (gapAfter), não de linhas —
// ver item "Separação Visual" do design da sidebar.
const navItems = [
  { view: 'dashboard' as View,      label: 'Painel Geral',            icon: Activity,      roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: false },
  { view: 'contracts' as View,      label: 'Contratos',               icon: FileSignature, roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: false },
  { view: 'processes' as View,      label: 'Processos',               icon: FolderOpen,    roles: ['ADMIN', 'GESTOR', 'FISCAL', 'ALTA_GESTAO'], gapAfter: true  },
  { view: 'pending' as View,        label: 'Fiscalizações',           icon: ShieldCheck,   roles: ['ADMIN', 'GESTOR', 'FISCAL'],                gapAfter: false },
  { view: 'risk' as View,           label: 'Painel de Risco',         icon: ShieldAlert,   roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'communications' as View, label: 'Comunicados',             icon: MessageSquare, roles: ['GESTOR', 'FISCAL', 'ALTA_GESTAO'],          gapAfter: true  },
  { view: 'ai' as View,             label: 'Inteligência Contratual', icon: Brain,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'audit' as View,          label: 'Auditoria',               icon: History,       roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: false },
  { view: 'users' as View,          label: 'Usuários',                icon: Users,         roles: ['ADMIN', 'GESTOR', 'ALTA_GESTAO'],           gapAfter: true  },
  { view: 'backup' as View,         label: 'Backup do Sistema',       icon: Database,      roles: ['ADMIN', 'GESTOR'],                          gapAfter: false },
];

export function Sidebar({ user, activeView, onNavigate, onLogout, onEditProfile, alwaysExpanded, onToggleAlwaysExpanded, collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const isActive = (view: View) =>
    view === 'contracts' ? activeView === 'contracts' || activeView === 'details' : activeView === view;

  const items = navItems.filter((item) => item.roles.includes(user.role));

  const renderContent = (collapsedNow: boolean) => (
    <aside
      className={`sigfis-sidebar-texture h-full flex flex-col justify-between shrink-0 transition-[width] duration-200 ease-in-out ${collapsedNow ? 'w-[76px]' : 'w-[270px]'}`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto sigfis-scrollbar-thin">
        {/* Logo — asset oficial usado tal como fornecido: símbolo + SIGFIS + tagline
            já embutidos na imagem, sem HTML de apoio, sem sombra/filtro extra. */}
        <div className={`relative flex flex-col items-center border-b border-sidebar-border ${collapsedNow ? 'px-2 py-5' : 'px-6 pt-9 pb-7'}`}>
          <SigfisLogo className={collapsedNow ? 'h-auto w-10' : 'h-auto w-[160px]'} />
          <button onClick={onCloseMobile} className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-1 p-4">
          {items.map(({ view, label, icon: Icon, gapAfter }) => {
            const active = isActive(view);
            const button = (
              <button
                onClick={() => onNavigate(view)}
                className={`relative flex w-full cursor-pointer items-center gap-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  collapsedNow ? 'justify-center px-0 py-3' : 'px-3.5 py-3 text-left'
                } ${
                  active
                    ? 'bg-brand-blue text-white font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.28)]'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                {!collapsedNow && label}
                {active && <span className="absolute inset-y-1.5 right-0 w-1 rounded-l-full bg-brand-cyan" />}
              </button>
            );
            return (
              <div key={view}>
                {collapsedNow ? <Tooltip content={label} side="right">{button}</Tooltip> : button}
                {gapAfter && <div className="h-4" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer: identidade do usuário + sair do sistema */}
      <div className={`border-t border-sidebar-border p-4 ${collapsedNow ? 'px-2' : ''}`}>
        {collapsedNow ? (
          <Tooltip content={`${user.name} · ${user.role}`} side="right">
            <button onClick={onEditProfile} className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:border-white/20 hover:bg-white/10 cursor-pointer">
              <RoleIcon role={user.role} />
            </button>
          </Tooltip>
        ) : (
          <Dropdown
            side="top"
            align="start"
            className="w-full"
            panelClassName="w-full"
            trigger={({ open, toggle }) => (
              <button onClick={toggle} title="Menu do usuário" className="group w-full cursor-pointer">
                <div className={`flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-white/20 hover:bg-white/10 ${open ? 'border-white/20 bg-white/10' : ''}`}>
                  <RoleIcon role={user.role} />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="line-clamp-1 text-sm font-semibold text-white">{user.name}</p>
                    <span className={`mt-1 block w-max rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${(roleStyle[user.role] ?? roleStyle.FISCAL).badge}`}>
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
              className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={onLogout}
            className="mt-2 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:bg-white/8 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
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
