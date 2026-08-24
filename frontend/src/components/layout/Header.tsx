'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Menu, Search, Bell, HelpCircle, ChevronDown, FileSignature, FolderOpen,
  Building2, Users as UsersIcon, AlertTriangle, Clock, ShieldAlert, MessageSquare,
  CheckCircle2, LogOut, UserCog, Settings, X,
} from 'lucide-react';
import { api, User, ContractAlert } from '@/lib/api';
import { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel } from '@/components/ui/dropdown';
import { Drawer } from '@/components/ui/drawer';
import { EmptyState } from '@/components/ui/empty-state';

type View = 'dashboard' | 'contracts' | 'archived-contracts' | 'details' | 'processes' | 'communications' | 'users' | 'pending' | 'risk' | 'audit' | 'ai' | 'backup';

interface SearchContract { id: string; contractNumber: string; objectDescription?: string; contractor?: { corporateName?: string } }
interface SearchProcess { id: string; processNumber: string; subject?: string }
interface SearchContractor { id: string; corporateName: string; cnpjCpf?: string }
interface SearchUser { id: string; name: string; email: string }

const VIEW_META: Record<View, { title: string; description: string; help: string }> = {
  dashboard: { title: 'Centro de Gestão Contratual', description: 'Visão executiva inteligente · Lei 13.303/2016 · RILC IQUEGO', help: 'Aqui você acompanha os principais indicadores dos contratos sob sua responsabilidade: contratos ativos, fiscalizações pendentes, alertas críticos e a execução financeira acumulada. Clique nos cartões e gráficos para navegar direto ao detalhe relacionado.' },
  contracts: { title: 'Contratos', description: 'Listagem e detalhamento de contratos vigentes e históricos', help: 'Liste, busque e filtre todos os contratos aos quais você tem acesso. Use a busca para localizar por número, objeto ou empresa contratada, e os filtros de status para refinar o resultado. Clique em um contrato para abrir seus detalhes completos.' },
  'archived-contracts': { title: 'Contratos Arquivados', description: 'Consulta histórica de contratos encerrados ou arquivados', help: 'Contratos retirados da listagem operacional principal — encerrados ou arquivados manualmente — permanecem aqui para consulta histórica, com seus dados, aditivos, ocorrências e valores pagos preservados. Restrito a ADMIN, GESTOR e ALTA GESTÃO.' },
  details: { title: 'Detalhe do Contrato', description: 'Dados completos, medições, ocorrências e aditivos', help: 'Esta tela reúne todas as informações de um contrato específico: dados cadastrais, fiscal designado, medições, ocorrências registradas e aditivos. Use as abas para navegar entre as seções.' },
  processes: { title: 'Processos', description: 'Processos administrativos de contratação', help: 'Acompanhe os processos de contratação em andamento, suas fases e prazos. Processos atrasados aparecem sinalizados para ação imediata.' },
  pending: { title: 'Fiscalizações', description: 'Pendências de fiscalização e homologação', help: 'Reúne tudo que depende de uma ação sua: medições aguardando homologação, ocorrências em aberto e aditivos pendentes de aprovação.' },
  risk: { title: 'Painel de Risco', description: 'Mapa de riscos contratuais e indicadores críticos', help: 'Visão consolidada dos contratos classificados por nível de risco (crítico, alto, médio, baixo), calculado a partir de vencimento, pendências e ocorrências.' },
  communications: { title: 'Comunicados', description: 'Comunicações entre gestores e fiscais', help: 'Canal de comunicação formal entre a Gestão e os Fiscais de cada contrato. Comunicados obrigatórios exigem confirmação de leitura.' },
  users: { title: 'Usuários', description: 'Gestão de usuários e permissões do sistema', help: 'Cadastre, edite e defina o perfil de acesso (ADMIN, GESTOR, FISCAL, ALTA GESTÃO) de cada usuário do SIGFIS.' },
  audit: { title: 'Auditoria', description: 'Trilha de auditoria de ações no sistema', help: 'Histórico completo e imutável de ações realizadas no sistema, para fins de conformidade e rastreabilidade — quem fez o quê e quando.' },
  ai: { title: 'Inteligência Contratual', description: 'Análises e recomendações assistidas', help: 'Painel de apoio à decisão com análises automáticas sobre o portfólio de contratos — riscos emergentes, oportunidades de economia e prazos críticos.' },
  backup: { title: 'Backup do Sistema', description: 'Exportação e restauração de dados', help: 'Gere backups completos dos dados do SIGFIS e, se necessário, restaure um backup anterior. Ação restrita a ADMIN e GESTOR.' },
};

type AlertSeverity = 'critical' | 'attention' | 'info';
const SEVERITY_META: Record<AlertSeverity, { label: string; color: string }> = {
  critical: { label: 'Críticas', color: 'text-brand-red' },
  attention: { label: 'Atenção', color: 'text-amber-600' },
  info: { label: 'Informativas', color: 'text-brand-blue' },
};
const ALERT_CATEGORY: Record<string, { label: string; icon: typeof Clock; severity: AlertSeverity }> = {
  CONTRACT_EXPIRING_180: { label: 'Contrato próximo do vencimento', icon: Clock, severity: 'attention' },
  CONTRACT_EXPIRING_90: { label: 'Contrato próximo do vencimento', icon: Clock, severity: 'critical' },
  RENEWAL_REQUESTED: { label: 'Prorrogação solicitada', icon: FolderOpen, severity: 'attention' },
  RENEWAL_APPROVED: { label: 'Prorrogação aprovada', icon: CheckCircle2, severity: 'info' },
  RENEWAL_REJECTED: { label: 'Prorrogação rejeitada', icon: CheckCircle2, severity: 'info' },
  MEASUREMENT_OVERDUE: { label: 'Medição pendente de homologação', icon: ShieldAlert, severity: 'attention' },
  ALTERATION_OVERDUE: { label: 'Aditivo pendente de aprovação', icon: ShieldAlert, severity: 'attention' },
  OCCURRENCE_CRITICAL_OPEN: { label: 'Ocorrência crítica em aberto', icon: AlertTriangle, severity: 'critical' },
  PROCESS_PHASE_OVERDUE: { label: 'Fase de processo atrasada', icon: FolderOpen, severity: 'attention' },
  NEW_PROCESS_AUTO_CREATED: { label: 'Novo processo criado', icon: CheckCircle2, severity: 'info' },
  COMMUNICATION_MANDATORY: { label: 'Comunicado obrigatório sem confirmação', icon: MessageSquare, severity: 'critical' },
  GESTOR_CONTRACT_UPDATE: { label: 'Atualização do gestor', icon: CheckCircle2, severity: 'info' },
};

interface HeaderProps {
  user: User;
  activeView: View;
  onNavigate: (view: View, contractId?: string, filter?: string) => void;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
  onEditProfile: () => void;
  onLogout: () => void;
  sidebarAlwaysExpanded: boolean;
  onToggleSidebarAlwaysExpanded: () => void;
}

export function Header({ user, activeView, onNavigate, onToggleSidebar, onOpenMobileSidebar, onEditProfile, onLogout, sidebarAlwaysExpanded, onToggleSidebarAlwaysExpanded }: HeaderProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const canSeeUsers = ['ADMIN', 'GESTOR', 'ALTA_GESTAO'].includes(user.role);

  const { data: contracts = [] } = useQuery<SearchContract[]>({ queryKey: ['contracts-list', user.id], queryFn: () => api.contracts.list(), staleTime: 300_000 });
  const { data: processes = [] } = useQuery<SearchProcess[]>({ queryKey: ['processes', user.id, user.role], queryFn: () => api.processes.list(), staleTime: 300_000 });
  const { data: contractors = [] } = useQuery<SearchContractor[]>({ queryKey: ['contractors'], queryFn: () => api.contractors.list(), staleTime: 300_000 });
  const { data: users = [] } = useQuery<SearchUser[]>({ queryKey: ['users-search'], queryFn: () => api.users.listAll(), staleTime: 300_000, enabled: canSeeUsers });
  const { data: alerts = [] } = useQuery<ContractAlert[]>({ queryKey: ['alerts-pending', user.id], queryFn: () => api.alerts.list(), staleTime: 60_000 });

  const term = searchTerm.trim().toLowerCase();
  const searchResults = React.useMemo(() => {
    if (term.length < 2) return null;
    return {
      contracts: contracts.filter((c) => c.contractNumber?.toLowerCase().includes(term) || c.objectDescription?.toLowerCase().includes(term) || c.contractor?.corporateName?.toLowerCase().includes(term)).slice(0, 5),
      processes: processes.filter((p) => p.processNumber?.toLowerCase().includes(term) || p.subject?.toLowerCase().includes(term)).slice(0, 5),
      contractors: contractors.filter((c) => c.corporateName?.toLowerCase().includes(term) || c.cnpjCpf?.includes(term)).slice(0, 5),
      users: canSeeUsers ? users.filter((u) => u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term)).slice(0, 5) : [],
    };
  }, [term, contracts, processes, contractors, users, canSeeUsers]);

  const totalResults = searchResults
    ? searchResults.contracts.length + searchResults.processes.length + searchResults.contractors.length + searchResults.users.length
    : 0;

  const bySeverity = React.useMemo(() => {
    const buckets: Record<AlertSeverity, ContractAlert[]> = { critical: [], attention: [], info: [] };
    for (const a of alerts) {
      const meta = ALERT_CATEGORY[a.type];
      buckets[meta?.severity ?? 'info'].push(a);
    }
    return buckets;
  }, [alerts]);

  const meta = VIEW_META[activeView] ?? VIEW_META.dashboard;

  const goTo = (view: View, contractId?: string, filter?: string) => {
    setSearchOpen(false);
    setSearchTerm('');
    onNavigate(view, contractId, filter);
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 sm:px-6">
      {/* Hamburgers */}
      <button onClick={onOpenMobileSidebar} className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden cursor-pointer" aria-label="Abrir menu">
        <Menu className="size-5" />
      </button>
      <button onClick={onToggleSidebar} className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex cursor-pointer" aria-label="Recolher/expandir menu">
        <Menu className="size-5" />
      </button>

      {/* Title */}
      <div className="min-w-0 hidden sm:block">
        <h1 className="truncate text-sm font-bold text-foreground leading-tight">{meta.title}</h1>
        {activeView !== 'dashboard' && meta.description && (
          <p className="truncate text-[11px] text-muted-foreground leading-tight">
            {meta.description}
          </p>
        )}
      </div>

      {/* Busca global */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Buscar no sistema..."
          className="h-9 w-full rounded-xl border border-border bg-muted/60 pl-9 pr-8 text-xs text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-brand-blue/50 focus:bg-surface focus:ring-2 focus:ring-brand-blue/15"
        />
        {searchTerm && (
          <button onClick={() => { setSearchTerm(''); setSearchOpen(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
            <X className="size-3.5" />
          </button>
        )}

        {searchOpen && searchResults && (
          <div className="sigfis-fade-in absolute left-0 right-0 z-40 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-popover shadow-popover">
            {totalResults === 0 ? (
              <div className="p-4">
                <EmptyState icon={Search} title="Nenhum resultado" description={`Nada encontrado para "${searchTerm}"`} />
              </div>
            ) : (
              <>
                {searchResults.contracts.length > 0 && (
                  <ResultGroup label="Contratos" icon={FileSignature}>
                    {searchResults.contracts.map((c) => (
                      <ResultItem key={c.id} title={c.contractNumber} subtitle={c.contractor?.corporateName || c.objectDescription} onClick={() => goTo('details', c.id)} />
                    ))}
                  </ResultGroup>
                )}
                {searchResults.processes.length > 0 && (
                  <ResultGroup label="Processos" icon={FolderOpen}>
                    {searchResults.processes.map((p) => (
                      <ResultItem key={p.id} title={p.processNumber} subtitle={p.subject} onClick={() => goTo('processes')} />
                    ))}
                  </ResultGroup>
                )}
                {searchResults.contractors.length > 0 && (
                  <ResultGroup label="Fornecedores" icon={Building2}>
                    {searchResults.contractors.map((c) => (
                      <ResultItem key={c.id} title={c.corporateName} subtitle={c.cnpjCpf} onClick={() => goTo('contracts')} />
                    ))}
                  </ResultGroup>
                )}
                {searchResults.users.length > 0 && (
                  <ResultGroup label="Usuários" icon={UsersIcon}>
                    {searchResults.users.map((u) => (
                      <ResultItem key={u.id} title={u.name} subtitle={u.email} onClick={() => goTo('users')} />
                    ))}
                  </ResultGroup>
                )}
              </>
            )}
          </div>
        )}
        {searchOpen && (searchResults || searchTerm) && (
          <div className="fixed inset-0 z-30" onClick={() => setSearchOpen(false)} />
        )}
      </div>

      {/* Notificações */}
      <Dropdown
        trigger={({ toggle }) => (
          <button onClick={toggle} className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer" aria-label="Notificações">
            <Bell className="size-4.5" />
            {alerts.length > 0 && (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                {alerts.length > 9 ? '9+' : alerts.length}
              </span>
            )}
          </button>
        )}
        panelClassName="w-80"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-xs font-bold text-foreground">Notificações</p>
          <span className="text-[10px] text-muted-foreground">{alerts.length} não lida{alerts.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">Nenhuma notificação pendente.</div>
          ) : (
            (['critical', 'attention', 'info'] as AlertSeverity[]).map((sev) => {
              const items = bySeverity[sev];
              if (items.length === 0) return null;
              return (
                <div key={sev}>
                  <DropdownLabel>
                    <span className={SEVERITY_META[sev].color}>{SEVERITY_META[sev].label}</span>
                  </DropdownLabel>
                  {items.slice(0, 5).map((a) => {
                    const meta = ALERT_CATEGORY[a.type];
                    const Icon = meta?.icon ?? CheckCircle2;
                    return (
                      <DropdownItem key={a.id} icon={Icon} onClick={() => { onNavigate(a.contractId ? 'details' : 'processes', a.contractId); }}>
                        <span className="block line-clamp-2 leading-snug">{a.title}</span>
                        {meta && <span className="text-[10px] font-normal text-muted-foreground">{meta.label}</span>}
                      </DropdownItem>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
        <p className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
          Notificações somem da lista ao serem respondidas ou dispensadas — não há histórico de lidas.
        </p>
      </Dropdown>

      {/* Ajuda */}
      <button onClick={() => setHelpOpen(true)} className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer" aria-label="Ajuda">
        <HelpCircle className="size-4.5" />
      </button>

      {/* Perfil */}
      <Dropdown
        trigger={({ toggle }) => (
          <button onClick={toggle} className="flex items-center gap-1.5 rounded-lg py-1 pl-1 pr-1.5 transition-colors hover:bg-muted cursor-pointer">
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">{user.name.charAt(0)}</span>
            <ChevronDown className="size-3.5 text-muted-foreground hidden sm:block" />
          </button>
        )}
      >
        <DropdownLabel>{user.name}</DropdownLabel>
        <div className="px-3.5 pb-2 -mt-1">
          <span className="text-[10px] text-muted-foreground">{user.email}</span>
        </div>
        <DropdownSeparator />
        <DropdownItem icon={UserCog} onClick={onEditProfile}>Meu Perfil</DropdownItem>
        <DropdownItem icon={Settings} onClick={onToggleSidebarAlwaysExpanded}>
          Preferências
          <span className="ml-auto text-[10px] font-normal text-muted-foreground">{sidebarAlwaysExpanded ? 'Menu expandido' : 'Menu recolhido'}</span>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={LogOut} onClick={onLogout} className="text-brand-red hover:bg-brand-red/5">Sair</DropdownItem>
      </Dropdown>

      {/* Central de Ajuda */}
      <Drawer open={helpOpen} onClose={() => setHelpOpen(false)} title="Central de Ajuda">
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Sobre esta tela</p>
            <h3 className="mt-1 text-sm font-bold text-foreground">{meta.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{meta.help}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Precisa de mais ajuda?</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Entre em contato com o administrador do sistema para dúvidas não cobertas por esta central.
            </p>
          </div>
        </div>
      </Drawer>
    </header>
  );
}

function ResultGroup({ label, icon: Icon, children }: { label: string; icon: typeof Search; children: React.ReactNode }) {
  return (
    <div className="border-b border-border last:border-0">
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3" /> {label}
      </div>
      {children}
    </div>
  );
}

function ResultItem({ title, subtitle, onClick }: { title: string; subtitle?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left transition-colors hover:bg-muted cursor-pointer">
      <span className="text-xs font-semibold text-foreground line-clamp-1">{title}</span>
      {subtitle && <span className="text-[11px] text-muted-foreground line-clamp-1">{subtitle}</span>}
    </button>
  );
}
