// Tipos do Sistema
export type UserRole = 'ADMIN' | 'GESTOR' | 'FISCAL' | 'ALTA_GESTAO';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string; name: string; email: string; role: UserRole; status: UserStatus; registrationNumber?: string;
}
export interface Contractor {
  id: string; corporateName: string; tradeName?: string; cnpjCpf: string; email: string;
  phone?: string; postalCode?: string; addressStreet?: string; addressNumber?: string;
  addressNeighborhood?: string; addressCity?: string; addressState?: string;
  stateInscription?: string; municipalInscription?: string;
}
export type ProcessStatus = 'PLANNING' | 'LEGAL_REVIEW' | 'BIDDING' | 'CONTRACT_PREP' | 'CONCLUDED' | 'CANCELED';
export type BiddingModality = 'LICITACAO_13303' | 'DISPENSA_13303' | 'INEXIGIBILIDADE' | 'PREGAO_ELETRONICO' | 'OUTROS';
export interface ProcurementProcess {
  id: string; processNumber: string; subject: string; description?: string; status: ProcessStatus;
  modality: BiddingModality; estimatedValue: number; requesterDepartment: string; requesterId: string;
}
export type ContractStatus = 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'CONCLUDED' | 'RESCINDED';
export interface Contract {
  id: string; contractNumber: string; processId?: string; contractorId: string;
  objectDescription: string; initialValue: number; currentValue: number;
  signingDate: string; startDate: string; endDate: string; status: ContractStatus; managerId?: string;
  department?: string; observations?: string;
  contractor?: Contractor; process?: ProcurementProcess; fiscalAssignments?: FiscalAssignment[];
  occurrences?: Occurrence[]; measurements?: InspectionMeasurement[]; alterations?: ContractAlteration[];
  communications?: Communication[];
}
export type FiscalRole = 'TITULAR' | 'SUBSTITUTO' | 'TECNICO' | 'ADMINISTRATIVO';
export interface FiscalAssignment {
  id: string; contractId: string; fiscalId: string; role: FiscalRole; designationAct: string;
  designationDate: string; startDate: string; endDate?: string; isActive: boolean; fiscal?: User;
}
export type OccurrenceSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type OccurrenceStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';
export interface Occurrence {
  id: string; contractId: string; fiscalId: string; title: string; description: string;
  severity: OccurrenceSeverity; status: OccurrenceStatus; resolutionDescription?: string;
  resolvedById?: string; resolvedAt?: string; createdAt: string;
  fiscal?: { name: string }; resolver?: { name: string };
}
export type MeasurementStatus = 'PENDING_FISCAL' | 'PENDING_GESTOR' | 'APPROVED' | 'REJECTED';
export interface InspectionMeasurement {
  id: string; contractId: string; fiscalId: string; periodStart: string; periodEnd: string;
  measurementValue: number; reportDescription: string; status: MeasurementStatus;
  approvedById?: string; approvalDate?: string; rejectionReason?: string; createdAt: string;
  fiscal?: { name: string }; approver?: { name: string };
}
export type AlterationType = 'ADDENDUM_VALUE_INCREASE' | 'ADDENDUM_VALUE_DECREASE' | 'ADDENDUM_TIME_EXTENSION' | 'PRICE_REAJUSTE' | 'PRICE_REPACTUACAO' | 'PRICE_REEQUILIBRIO';
export type AlterationStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
export interface ContractAlteration {
  id: string; contractId: string; type: AlterationType; alterationNumber?: string; valueChange: number;
  newEndDate?: string; justification: string; status: AlterationStatus; requestedById: string;
  reviewedById?: string; reviewDate?: string; reviewNotes?: string; createdAt: string;
  requester?: { name: string }; reviewer?: { name: string };
}
export interface Communication {
  id: string; contractId: string; senderId: string; recipientId?: string; subject: string;
  message: string; parentId?: string; readBy?: string[]; isMandatory?: boolean; createdAt: string;
  sender?: { name: string; role: string }; recipient?: { name: string }; replies?: Communication[];
}
// ── Novos Tipos ────────────────────────────────────────────────────────────────

export type ContractAlertType =
  | 'CONTRACT_EXPIRING_180' | 'CONTRACT_EXPIRING_90'
  | 'RENEWAL_REQUESTED' | 'RENEWAL_APPROVED' | 'RENEWAL_REJECTED'
  | 'MEASUREMENT_OVERDUE' | 'ALTERATION_OVERDUE'
  | 'OCCURRENCE_CRITICAL_OPEN' | 'PROCESS_PHASE_OVERDUE'
  | 'NEW_PROCESS_AUTO_CREATED' | 'COMMUNICATION_MANDATORY'
  | 'GESTOR_CONTRACT_UPDATE';

export type ContractAlertStatus = 'PENDING' | 'RESPONDED' | 'DISMISSED' | 'EXPIRED' | 'CONFIRMED' | 'CLOSED_NOT_SENT';
export type ContractAlertResponse = 'EXTEND_CONTRACT' | 'NEW_PROCESS' | 'APPROVE' | 'REJECT' | 'ACKNOWLEDGED' | 'APPROVE_RENEWAL' | 'REJECT_RENEWAL' | 'CONFIRM_RECEIVED' | 'CLOSE_NOT_SENT';

export interface ContractAlert {
  id: string; contractId?: string; processId?: string; targetUserId: string;
  type: ContractAlertType; status: ContractAlertStatus; response?: ContractAlertResponse;
  respondedAt?: string; respondedById?: string; title: string; message: string;
  metadata?: any; expiresAt?: string; createdAt: string; updatedAt: string;
}

export type PhaseStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' | 'BLOCKED';

export interface ChecklistItem { id: string; texto: string; concluido: boolean; }

export interface ProcessPhase {
  id: string; processId: string; phaseNumber: number; name: string; status: PhaseStatus;
  plannedStart?: string; plannedEnd?: string; actualStart?: string; actualEnd?: string;
  responsibleId?: string; observations?: string; isActive: boolean; createdAt: string; updatedAt: string;
  responsible?: User;
  descricao?: string;
  responsavelSetor?: string;
  documentoObrigatorio?: string;
  prazoDias?: number;
  pendenciaCritica?: string;
  checklistItems?: ChecklistItem[];
  bloqueiaAvancoSemConclusao?: boolean;
  alertaAtivo?: boolean;
  observacoes?: string;
}

export const PHASE_NAMES = [
  'Solicitação da Área Demandante', 'Termo de Referência / Projeto Básico', 'Pesquisa de Preços / Cotações',
  'Justificativa / Enquadramento Legal', 'Reserva / Saldo Orçamentário', 'Parecer Jurídico',
  'Ratificação / Autorização da Autoridade', 'Empenho', 'Contrato / Instrumento Equivalente',
  'Assinatura das Partes', 'Designação do Fiscal / Gestor', 'Publicação / Divulgação',
  'Início da Execução', 'Entrega / Ateste / Encerramento',
];

// ── Tipos de BI / Auditoria / IA ──────────────────────────────────────────────

export type RiskLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface RiskItem {
  id: string; contractId?: string; processId?: string; contractNumber?: string; subject?: string;
  riskLevel: RiskLevel; riskScore: number; factors: string[]; daysUntilExpiry?: number;
  pendingItems: number; lastActivity: string;
}

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT' | 'LOGIN' | 'LOGOUT' | 'STATUS_CHANGE' | 'RESOLVE' | 'ASSIGN_FISCAL' | 'EXPORT' | 'RESTORE' | 'RESTORE_FAILED' | (string & {});

// Trilha de auditoria real, persistida em backend/src/audit (tabela audit_logs).
// Gravada automaticamente pelo backend — não depende de localStorage.
export interface AuditLog {
  id: string;
  userId: string | null; userEmail: string | null; userName: string | null; userRole: string | null;
  action: AuditAction; module: string | null; entity: string; entityId: string | null;
  detail: string | null;
  oldValues: Record<string, any> | null; newValues: Record<string, any> | null;
  ipAddress: string | null; userAgent: string | null;
  createdAt: string;
}

export interface AuditLogPage {
  items: AuditLog[]; total: number; page: number; pageSize: number; totalPages: number;
}

export interface AuditLogQuery {
  page?: number; pageSize?: number; userId?: string; module?: string; action?: string;
  entity?: string; search?: string; dateFrom?: string; dateTo?: string; sortDir?: 'asc' | 'desc';
}

export interface AIInsight {
  id: string; type: 'RISK' | 'ALERT' | 'SUGGESTION' | 'PREDICTION';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string; description: string; contractId?: string; processId?: string;
  confidence: number; suggestedAction?: string; createdAt: string;
}

export interface GestorDashboard {
  kpis: {
    activeContracts: number; expiringIn180: number; expiringIn90: number; expiredContracts: number;
    processesInProgress: number; delayedProcesses: number; pendingFiscalizacoes: number;
    pendingRenewals: number; communicationsPendingReply: number;
  };
  financial: {
    totalContracted: number;
    totalExecuted: number;
    balance: number;
    savingsEstimate: number;
    executionPercent: number;
    avgContractValue: number;
  };
  health: {
    score: number;
    level: 'EXCELLENT' | 'GOOD' | 'ATTENTION' | 'CRITICAL';
    factors: { label: string; deduction: number }[];
  };
  extendedAlerts: {
    expiring30: number;
    expiring60: number;
    contractsWithoutFiscal: number;
    openCriticalOccurrences: number;
    pendingAlterations: number;
  };
  fiscalWorkload: { id: string; name: string; shortName: string; contracts: number; totalValue: number; pendingMeasurements: number; pendingOccurrences: number }[];
  upcomingEvents: { type: string; contractId: string; contractNumber: string; description: string; daysUntil: number; severity: string }[];
  riskSummary: { critical: number; high: number; medium: number; low: number };
  charts: {
    byModality: { name: string; value: number }[];
    byStatus: { name: string; value: number }[];
    byFiscal: { name: string; value: number; fiscalId: string; fullName: string }[];
    byUnit: { name: string; value: number }[];
    processesByPhase: { name: string; value: number }[];
    monthlyEvolution: { name: string; contracts: number; value: number; measured: number }[];
  };
}

export interface FiscalDashboard {
  myContracts: Contract[];
  myProcesses: ProcurementProcess[];
  pendingItems: { measurements: number; occurrences: number; alterations: number };
  pendingAlerts: ContractAlert[];
  upcomingExpirations: { contractId: string; contractNumber: string; daysUntil: number }[];
  gestorCommunications: Communication[];
}

// ── Seed Data ──────────────────────────────────────────────────────────────────

const SEED_USERS: User[] = [
  { id: 'usr-admin',  name: 'Ricardo Augusto',                    email: 'admin@sigecontratos.com',        role: 'ADMIN',       status: 'ACTIVE', registrationNumber: 'IQG-0001' },
  { id: 'usr-alta',   name: 'Diretoria de Administração',         email: 'alta@sigecontratos.com',         role: 'ALTA_GESTAO', status: 'ACTIVE', registrationNumber: 'IQG-0003' },
  { id: 'usr-lais',   name: 'Lais de Castro Viana',               email: 'lais.viana@iquego.com.br',       role: 'ALTA_GESTAO', status: 'ACTIVE', registrationNumber: 'IQG-0004' },
  { id: 'usr-gestor', name: 'Jairo Vicente de Melo',              email: 'gestor@sigecontratos.com',  role: 'GESTOR',      status: 'ACTIVE', registrationNumber: 'IQG-0002' },
  { id: 'usr-f01',   name: 'Rogério B. da Silva',                 email: 'f01@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1001' },
  { id: 'usr-f02',   name: 'Maria do Carmo C. Silva',             email: 'f02@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1002' },
  { id: 'usr-f03',   name: 'Edilson Martins Garcia',              email: 'f03@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1003' },
  { id: 'usr-f04',   name: 'Eunice Maria C. Oliveira',            email: 'f04@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1004' },
  { id: 'usr-f05',   name: 'Eliety Rodrigues Pereira',            email: 'f05@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1005' },
  { id: 'usr-f06',   name: 'Weverson de Oliveira',                email: 'f06@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1006' },
  { id: 'usr-f07',   name: 'Cleiton de Sá Silva',                 email: 'f07@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1007' },
  { id: 'usr-f08',   name: 'Robson Policeno de Rezende',          email: 'f08@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1008' },
  { id: 'usr-f09',   name: 'Pedro Henrique Martins',              email: 'f09@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1009' },
  { id: 'usr-f10',   name: 'Thalita Guaribaldine S. Guimaraes',   email: 'f10@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1010' },
  { id: 'usr-f11',   name: 'Fábio Gonçalves da Silva',            email: 'f11@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1011' },
  { id: 'usr-f12',   name: 'Gabriel Moraes Godinho',              email: 'f12@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1012' },
  { id: 'usr-f13',   name: 'Denize Morais',                       email: 'f13@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1013' },
  { id: 'usr-f14',   name: 'Sabrina Maria Barbosa',               email: 'f14@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1014' },
  { id: 'usr-f15',   name: 'Wenderson de Souza',                  email: 'f15@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1015' },
  { id: 'usr-f16',   name: 'Patrícia Sodré',                      email: 'f16@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1016' },
  { id: 'usr-f17',   name: 'Vandeir Gonçalves da Silva',          email: 'f17@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1017' },
  { id: 'usr-f18',   name: 'Alessandro dos Santos',               email: 'f18@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1018' },
  { id: 'usr-f19',   name: 'Vera Lúcia Nunes',                    email: 'f19@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1019' },
  { id: 'usr-f20',   name: 'Laurindo Damas da Silva Júnior',      email: 'f20@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1020' },
  { id: 'usr-f21',   name: 'Emerson Ferreira dos Anjos',          email: 'f21@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1021' },
  { id: 'usr-f22',   name: 'Dalmo Francisco da Costa',            email: 'f22@sigecontratos.com',     role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-1022' },
];

const SEED_CONTRACTS: Contract[] = [
  { id: 'cnt-c01', contractNumber: '032/2023', processId: 'prc-c01', contractorId: 'ctr-c01', objectDescription: 'Realização de exames de saúde ocupacional e medicina do trabalho',                              initialValue: 387450.00,  currentValue: 387450.00,  signingDate: '2024-01-02', startDate: '2024-01-02', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Segurança do Trabalho' },
  { id: 'cnt-c02', contractNumber: '021/2024', processId: 'prc-c02', contractorId: 'ctr-c02', objectDescription: 'Prestação de serviços em saúde e segurança do trabalho, incluindo laudos e PPP',               initialValue: 298320.00,  currentValue: 347160.00,  signingDate: '2025-06-16', startDate: '2025-06-16', endDate: '2027-06-15', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Segurança do Trabalho' },
  { id: 'cnt-c03', contractNumber: '055/2023', processId: 'prc-c03', contractorId: 'ctr-c03', objectDescription: 'Prestação de serviços de remoção hospitalar e translado de pacientes',                         initialValue: 196800.00,  currentValue: 196800.00,  signingDate: '2023-11-01', startDate: '2023-11-01', endDate: '2026-10-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Gestão de Pessoas' },
  { id: 'cnt-c04', contractNumber: '041/2023', processId: 'prc-c04', contractorId: 'ctr-c04', objectDescription: 'Fornecimento de cartão de benefícios — vale alimentação e vale refeição',                     initialValue: 1485000.00, currentValue: 1620000.00, signingDate: '2024-03-01', startDate: '2024-03-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Gestão de Pessoas' },
  { id: 'cnt-c05', contractNumber: '063/2023', processId: 'prc-c05', contractorId: 'ctr-c05', objectDescription: 'Fornecimento de cartão de benefícios — vale alimentação',                                     initialValue: 798500.00,  currentValue: 798500.00,  signingDate: '2024-04-01', startDate: '2024-04-01', endDate: '2027-03-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Gestão de Pessoas' },
  { id: 'cnt-c06', contractNumber: '048/2023', processId: 'prc-c06', contractorId: 'ctr-c06', objectDescription: 'Prestação de serviços de portaria, vigilância e limpeza',                                     initialValue: 612000.00,  currentValue: 648000.00,  signingDate: '2024-01-15', startDate: '2024-01-15', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Coordenação de Serviços Gerais' },
  { id: 'cnt-c07', contractNumber: '018/2022', processId: 'prc-c07', contractorId: 'ctr-c07', objectDescription: 'Fornecimento de refeições e lanches para servidores',                                          initialValue: 117600.00,  currentValue: 117600.00,  signingDate: '2023-02-01', startDate: '2023-02-01', endDate: '2026-09-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Coordenação de Serviços Gerais' },
  { id: 'cnt-c08', contractNumber: '022/2022', processId: 'prc-c08', contractorId: 'ctr-c08', objectDescription: 'Fornecimento de gás liquefeito de petróleo (GLP) em botijões',                                initialValue: 173400.00,  currentValue: 173400.00,  signingDate: '2023-01-10', startDate: '2023-01-10', endDate: '2027-01-09', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Coordenação de Serviços Gerais' },
  { id: 'cnt-c09', contractNumber: '067/2023', processId: 'prc-c09', contractorId: 'ctr-c09', objectDescription: 'Prestação de serviços logísticos de transporte e distribuição',                                initialValue: 924000.00,  currentValue: 978000.00,  signingDate: '2024-06-01', startDate: '2024-06-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Logística' },
  { id: 'cnt-c10', contractNumber: '003/2024', processId: 'prc-c10', contractorId: 'ctr-c10', objectDescription: 'Fornecimento de materiais e produtos de uso geral',                                            initialValue: 342000.00,  currentValue: 342000.00,  signingDate: '2025-01-20', startDate: '2025-01-20', endDate: '2027-01-19', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Logística' },
  { id: 'cnt-c11', contractNumber: '042/2024', processId: 'prc-c11', contractorId: 'ctr-c11', objectDescription: 'Licença de uso de sistema de gestão integrada (ERP)',                                         initialValue: 486000.00,  currentValue: 486000.00,  signingDate: '2025-05-01', startDate: '2025-05-01', endDate: '2027-04-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Tecnologia da Informação e Comunicação' },
  { id: 'cnt-c12', contractNumber: '010/2020', processId: 'prc-c12', contractorId: 'ctr-c12', objectDescription: 'Fornecimento e instalação de sistema de automação e controle predial',                        initialValue: 93500.00,   currentValue: 93500.00,   signingDate: '2021-06-01', startDate: '2021-06-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Tecnologia da Informação e Comunicação' },
  { id: 'cnt-c13', contractNumber: '019/2021', processId: 'prc-c13', contractorId: 'ctr-c13', objectDescription: 'Prestação de serviços de outsourcing de impressão e gestão de documentos',                    initialValue: 432000.00,  currentValue: 462000.00,  signingDate: '2022-03-01', startDate: '2022-03-01', endDate: '2027-02-28', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Tecnologia da Informação e Comunicação', observations: 'NOVA CONTRATAÇÃO EM ANDAMENTO' },
  { id: 'cnt-c14', contractNumber: '038/2022', processId: 'prc-c14', contractorId: 'ctr-c14', objectDescription: 'Prestação de serviços de telecomunicações e telefonia corporativa',                            initialValue: 960000.00,  currentValue: 1056000.00, signingDate: '2023-09-01', startDate: '2023-09-01', endDate: '2028-05-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Tecnologia da Informação e Comunicação' },
  { id: 'cnt-c15', contractNumber: '011/2024', processId: 'prc-c15', contractorId: 'ctr-c14', objectDescription: 'Manutenção preventiva e corretiva do sistema PABX',                                            initialValue: 82800.00,   currentValue: 82800.00,   signingDate: '2024-10-05', startDate: '2024-10-05', endDate: '2026-09-04', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Tecnologia da Informação e Comunicação' },
  { id: 'cnt-c16', contractNumber: '027/2021', processId: 'prc-c16', contractorId: 'ctr-c16', objectDescription: 'Fornecimento de água e coleta de esgoto (contrato de serviço público)',                       initialValue: 237600.00,  currentValue: 241200.00,  signingDate: '2025-01-09', startDate: '2025-01-09', endDate: '2026-09-12', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Engenharia' },
  { id: 'cnt-c17', contractNumber: '068/2023', processId: 'prc-c17', contractorId: 'ctr-c17', objectDescription: 'Fornecimento de energia elétrica (contrato com concessionária)',                               initialValue: 264688.38,  currentValue: 284435.71,  signingDate: '2024-01-15', startDate: '2024-01-15', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Engenharia' },
  { id: 'cnt-c18', contractNumber: '085/2023', processId: 'prc-c18', contractorId: 'ctr-c18', objectDescription: 'Prestação de serviços de manutenção predial e instalações',                                   initialValue: 540000.00,  currentValue: 576000.00,  signingDate: '2024-02-01', startDate: '2024-02-01', endDate: '2027-01-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Engenharia' },
  { id: 'cnt-c19', contractNumber: '052/2023', processId: 'prc-c19', contractorId: 'ctr-c19', objectDescription: 'Prestação de serviços de consultoria e assessoria empresarial',                                initialValue: 372000.00,  currentValue: 390600.00,  signingDate: '2024-03-15', startDate: '2024-03-15', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Logística' },
  { id: 'cnt-c20', contractNumber: '046/2021', processId: 'prc-c20', contractorId: 'ctr-c20', objectDescription: 'Prestação de serviços de publicidade, propaganda e marketing institucional',                   initialValue: 720000.00,  currentValue: 720000.00,  signingDate: '2022-06-01', startDate: '2022-06-01', endDate: '2026-11-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Assessoria de Compras Governamentais', observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
  { id: 'cnt-c21', contractNumber: '030/2023', processId: 'prc-c21', contractorId: 'ctr-c21', objectDescription: 'Prestação de serviços de logística internacional e despacho aduaneiro',                      initialValue: 450000.00,  currentValue: 450000.00,  signingDate: '2024-02-01', startDate: '2024-02-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Assessoria Especial da Presidência' },
  { id: 'cnt-c22', contractNumber: '024/2022', processId: 'prc-c22', contractorId: 'ctr-c22', objectDescription: 'Fornecimento e manutenção de sistema de notificações e comunicação digital',                   initialValue: 283200.00,  currentValue: 283200.00,  signingDate: '2023-06-01', startDate: '2023-06-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência Jurídica', observations: 'NOVA CONTRATAÇÃO EM ANDAMENTO' },
  { id: 'cnt-c23', contractNumber: '007/2024', processId: 'prc-c23', contractorId: 'ctr-c23', objectDescription: 'Prestação de serviços de engenharia civil e obras na planta industrial',                       initialValue: 1176000.00, currentValue: 1260000.00, signingDate: '2024-10-01', startDate: '2024-10-01', endDate: '2026-10-02', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Engenharia', observations: 'SOLICITADA A PRORROGAÇÃO' },
  { id: 'cnt-c24', contractNumber: '028/2024', processId: 'prc-c24', contractorId: 'ctr-c24', objectDescription: 'Prestação de serviços de segurança da informação e consultoria em LGPD',                      initialValue: 156000.00,  currentValue: 180000.00,  signingDate: '2025-02-19', startDate: '2025-02-19', endDate: '2026-08-22', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Assessoria Especial da Presidência', observations: 'PRORROGADO POR MAIS 90 DIAS' },
  { id: 'cnt-c25', contractNumber: '019/2025', processId: 'prc-c25', contractorId: 'ctr-c25', objectDescription: 'Prestação de serviços de informação e consultoria em licitações e contratos',                 initialValue: 138600.00,  currentValue: 138600.00,  signingDate: '2025-07-01', startDate: '2025-07-01', endDate: '2027-06-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Assessoria de Compras Governamentais' },
  { id: 'cnt-c26', contractNumber: '059/2024', processId: 'prc-c26', contractorId: 'ctr-c26', objectDescription: 'Prestação de serviços de agenciamento de viagens corporativas',                               initialValue: 684000.00,  currentValue: 684000.00,  signingDate: '2025-03-01', startDate: '2025-03-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Diretoria Comercial', observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
  { id: 'cnt-c27', contractNumber: '023/2025', processId: 'prc-c27', contractorId: 'ctr-c27', objectDescription: 'Fornecimento de gás liquefeito de petróleo (GLP) a granel',                                   initialValue: 94560.00,   currentValue: 94560.00,   signingDate: '2025-07-15', startDate: '2025-07-15', endDate: '2027-07-14', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Coordenação Administrativa' },
  { id: 'cnt-c28', contractNumber: '051/2024', processId: 'prc-c28', contractorId: 'ctr-c28', objectDescription: 'Seguro de vida em grupo para servidores',                                                      initialValue: 42000.00,   currentValue: 42000.00,   signingDate: '2025-04-01', startDate: '2025-04-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Recursos Humanos' },
  { id: 'cnt-c29', contractNumber: '026/2025', processId: 'prc-c29', contractorId: 'ctr-c29', objectDescription: 'Locação de veículos com motorista para uso institucional',                                    initialValue: 386400.00,  currentValue: 386400.00,  signingDate: '2025-06-01', startDate: '2025-06-01', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Logística' },
  { id: 'cnt-c30', contractNumber: '002/2025', processId: 'prc-c30', contractorId: 'ctr-c30', objectDescription: 'Prestação de serviços de dedetização, desratização e controle de pragas',                     initialValue: 71400.00,   currentValue: 71400.00,   signingDate: '2025-03-01', startDate: '2025-03-01', endDate: '2027-02-28', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gestão de Contratos' },
  { id: 'cnt-c31', contractNumber: '005/2023', processId: 'prc-c31', contractorId: 'ctr-c31', objectDescription: 'Prestação de serviços de gestão e proteção de dados empresariais',                             initialValue: 516000.00,  currentValue: 528000.00,  signingDate: '2024-01-02', startDate: '2024-01-02', endDate: '2026-12-31', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Assessoria de Compras Governamentais' },
  { id: 'cnt-c32', contractNumber: '040/2025', processId: 'prc-c32', contractorId: 'ctr-c32', objectDescription: 'Prestação de serviços de calibração e inspeção de equipamentos de medição',                   initialValue: 38400.00,   currentValue: 38400.00,   signingDate: '2025-09-10', startDate: '2025-09-10', endDate: '2026-08-09', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Controle da Qualidade' },
  { id: 'cnt-c33', contractNumber: '014/2025', processId: 'prc-c33', contractorId: 'ctr-c33', objectDescription: 'Prestação de serviços de auditoria independente das demonstrações contábeis',                 initialValue: 204000.00,  currentValue: 204000.00,  signingDate: '2025-10-01', startDate: '2025-10-01', endDate: '2026-09-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Contabilidade', observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
  { id: 'cnt-c34', contractNumber: '028/2025', processId: 'prc-c34', contractorId: 'ctr-c34', objectDescription: 'Prestação de serviços de auditoria, assessoria e consultoria em gestão pública',              initialValue: 185400.00,  currentValue: 185400.00,  signingDate: '2025-10-15', startDate: '2025-10-15', endDate: '2026-09-30', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Contabilidade' },
  { id: 'cnt-c35', contractNumber: '060/2025', processId: 'prc-c35', contractorId: 'ctr-c35', objectDescription: 'Prestação de serviços de capacitação, treinamento e desenvolvimento organizacional',           initialValue: 336000.00,  currentValue: 336000.00,  signingDate: '2025-11-08', startDate: '2025-11-08', endDate: '2028-04-07', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Contabilidade' },
  { id: 'cnt-c36', contractNumber: '014/2026', processId: 'prc-c36', contractorId: 'ctr-c36', objectDescription: 'Prestação de serviços laboratoriais de análises clínicas e microbiológicas',                  initialValue: 124800.00,  currentValue: 124800.00,  signingDate: '2026-05-01', startDate: '2026-05-01', endDate: '2027-04-27', status: 'ACTIVE', managerId: 'usr-gestor', department: 'Gerência de Contabilidade' },
];

const SEED_ASSIGNMENTS: FiscalAssignment[] = [
  { id: 'asg-c01', contractId: 'cnt-c01', fiscalId: 'usr-f01', role: 'TITULAR', designationAct: 'Portaria nº 079/2024-DG', designationDate: '2024-01-02', startDate: '2024-01-02', isActive: true },
  { id: 'asg-c02', contractId: 'cnt-c02', fiscalId: 'usr-f01', role: 'TITULAR', designationAct: 'Portaria nº 080/2025-DG', designationDate: '2025-06-16', startDate: '2025-06-16', isActive: true },
  { id: 'asg-c03', contractId: 'cnt-c03', fiscalId: 'usr-f03', role: 'TITULAR', designationAct: 'Portaria nº 045/2023-DG', designationDate: '2023-11-01', startDate: '2023-11-01', isActive: true },
  { id: 'asg-c04', contractId: 'cnt-c04', fiscalId: 'usr-f04', role: 'TITULAR', designationAct: 'Portaria nº 023/2024-DG', designationDate: '2024-03-01', startDate: '2024-03-01', isActive: true },
  { id: 'asg-c05', contractId: 'cnt-c05', fiscalId: 'usr-f05', role: 'TITULAR', designationAct: 'Portaria nº 031/2024-DG', designationDate: '2024-04-01', startDate: '2024-04-01', isActive: true },
  { id: 'asg-c06', contractId: 'cnt-c06', fiscalId: 'usr-f06', role: 'TITULAR', designationAct: 'Portaria nº 112/2024-DG', designationDate: '2024-01-15', startDate: '2024-01-15', isActive: true },
  { id: 'asg-c07', contractId: 'cnt-c07', fiscalId: 'usr-f07', role: 'TITULAR', designationAct: 'Portaria nº 058/2023-DG', designationDate: '2023-02-01', startDate: '2023-02-01', isActive: true },
  { id: 'asg-c08', contractId: 'cnt-c08', fiscalId: 'usr-f08', role: 'TITULAR', designationAct: 'Portaria nº 092/2023-DG', designationDate: '2023-01-10', startDate: '2023-01-10', isActive: true },
  { id: 'asg-c09', contractId: 'cnt-c09', fiscalId: 'usr-f09', role: 'TITULAR', designationAct: 'Portaria nº 076/2024-DG', designationDate: '2024-06-01', startDate: '2024-06-01', isActive: true },
  { id: 'asg-c10', contractId: 'cnt-c10', fiscalId: 'usr-f10', role: 'TITULAR', designationAct: 'Portaria nº 018/2025-DG', designationDate: '2025-01-20', startDate: '2025-01-20', isActive: true },
  { id: 'asg-c11', contractId: 'cnt-c11', fiscalId: 'usr-f11', role: 'TITULAR', designationAct: 'Portaria nº 035/2025-DG', designationDate: '2025-05-01', startDate: '2025-05-01', isActive: true },
  { id: 'asg-c12', contractId: 'cnt-c12', fiscalId: 'usr-f12', role: 'TITULAR', designationAct: 'Portaria nº 007/2025-DG', designationDate: '2021-06-01', startDate: '2021-06-01', isActive: true },
  { id: 'asg-c13', contractId: 'cnt-c13', fiscalId: 'usr-f11', role: 'TITULAR', designationAct: 'Portaria nº 097/2022-DG', designationDate: '2022-03-01', startDate: '2022-03-01', isActive: true },
  { id: 'asg-c14', contractId: 'cnt-c14', fiscalId: 'usr-f13', role: 'TITULAR', designationAct: 'Portaria nº 084/2025-DG', designationDate: '2023-09-01', startDate: '2023-09-01', isActive: true },
  { id: 'asg-c15', contractId: 'cnt-c15', fiscalId: 'usr-f13', role: 'TITULAR', designationAct: 'Portaria nº 084/2025-DG', designationDate: '2024-10-05', startDate: '2024-10-05', isActive: true },
  { id: 'asg-c16', contractId: 'cnt-c16', fiscalId: 'usr-f14', role: 'TITULAR', designationAct: 'Portaria nº 053/2026-DG', designationDate: '2025-01-09', startDate: '2025-01-09', isActive: true },
  { id: 'asg-c17', contractId: 'cnt-c17', fiscalId: 'usr-f15', role: 'TITULAR', designationAct: 'Portaria nº 150/2024-DG', designationDate: '2024-01-15', startDate: '2024-01-15', isActive: true },
  { id: 'asg-c18', contractId: 'cnt-c18', fiscalId: 'usr-f16', role: 'TITULAR', designationAct: 'Portaria nº 069/2022-DG', designationDate: '2024-02-01', startDate: '2024-02-01', isActive: true },
  { id: 'asg-c19', contractId: 'cnt-c19', fiscalId: 'usr-f09', role: 'TITULAR', designationAct: 'Portaria nº 076/2024-DG', designationDate: '2024-03-15', startDate: '2024-03-15', isActive: true },
  { id: 'asg-c20', contractId: 'cnt-c20', fiscalId: 'usr-f17', role: 'TITULAR', designationAct: 'Portaria nº 078/2026-DG', designationDate: '2022-06-01', startDate: '2022-06-01', isActive: true },
  { id: 'asg-c21', contractId: 'cnt-c21', fiscalId: 'usr-f19', role: 'TITULAR', designationAct: 'Portaria nº 092/2025-DG', designationDate: '2024-02-01', startDate: '2024-02-01', isActive: true },
  { id: 'asg-c22', contractId: 'cnt-c22', fiscalId: 'usr-f20', role: 'TITULAR', designationAct: 'Portaria nº 021/2026-DG', designationDate: '2023-06-01', startDate: '2023-06-01', isActive: true },
  { id: 'asg-c23', contractId: 'cnt-c23', fiscalId: 'usr-f16', role: 'TITULAR', designationAct: 'Portaria nº 069/2022-DG', designationDate: '2024-10-01', startDate: '2024-10-01', isActive: true },
  { id: 'asg-c24', contractId: 'cnt-c24', fiscalId: 'usr-f19', role: 'TITULAR', designationAct: 'Portaria nº 092/2025-DG', designationDate: '2025-02-19', startDate: '2025-02-19', isActive: true },
  { id: 'asg-c25', contractId: 'cnt-c25', fiscalId: 'usr-f18', role: 'TITULAR', designationAct: 'Portaria nº 056/2026-DG', designationDate: '2025-07-01', startDate: '2025-07-01', isActive: true },
  { id: 'asg-c26', contractId: 'cnt-c26', fiscalId: 'usr-f21', role: 'TITULAR', designationAct: 'Portaria nº 146/2025-DG', designationDate: '2025-03-01', startDate: '2025-03-01', isActive: true },
  { id: 'asg-c27', contractId: 'cnt-c27', fiscalId: 'usr-f22', role: 'TITULAR', designationAct: 'Portaria nº 066/2025-DG', designationDate: '2025-07-15', startDate: '2025-07-15', isActive: true },
  { id: 'asg-c28', contractId: 'cnt-c28', fiscalId: 'usr-f04', role: 'TITULAR', designationAct: 'Portaria nº 023/2024-DG', designationDate: '2025-04-01', startDate: '2025-04-01', isActive: true },
  { id: 'asg-c29', contractId: 'cnt-c29', fiscalId: 'usr-f10', role: 'TITULAR', designationAct: 'Portaria nº 018/2025-DG', designationDate: '2025-06-01', startDate: '2025-06-01', isActive: true },
  { id: 'asg-c30', contractId: 'cnt-c30', fiscalId: 'usr-f08', role: 'TITULAR', designationAct: 'Portaria nº 092/2023-DG', designationDate: '2025-03-01', startDate: '2025-03-01', isActive: true },
  { id: 'asg-c31', contractId: 'cnt-c31', fiscalId: 'usr-f17', role: 'TITULAR', designationAct: 'Portaria nº 078/2026-DG', designationDate: '2024-01-02', startDate: '2024-01-02', isActive: true },
  { id: 'asg-c32', contractId: 'cnt-c32', fiscalId: 'usr-f02', role: 'TITULAR', designationAct: 'Portaria nº 054/2026-DG', designationDate: '2025-09-10', startDate: '2025-09-10', isActive: true },
  { id: 'asg-c33', contractId: 'cnt-c33', fiscalId: 'usr-f21', role: 'TITULAR', designationAct: 'Portaria nº 146/2025-DG', designationDate: '2025-10-01', startDate: '2025-10-01', isActive: true },
  { id: 'asg-c34', contractId: 'cnt-c34', fiscalId: 'usr-f22', role: 'TITULAR', designationAct: 'Portaria nº 066/2025-DG', designationDate: '2025-10-15', startDate: '2025-10-15', isActive: true },
  { id: 'asg-c35', contractId: 'cnt-c35', fiscalId: 'usr-f20', role: 'TITULAR', designationAct: 'Portaria nº 088/2026-DG', designationDate: '2025-11-08', startDate: '2025-11-08', isActive: true },
  { id: 'asg-c36', contractId: 'cnt-c36', fiscalId: 'usr-f02', role: 'TITULAR', designationAct: 'Portaria nº 054/2026-DG', designationDate: '2026-05-01', startDate: '2026-05-01', isActive: true },
];

// SEED_OCCURRENCES/SEED_MEASUREMENTS/SEED_ALTERATIONS/SEED_PROCESS_PHASES/
// SEED_COMMUNICATIONS foram removidos: essas entidades são 100% atendidas
// pelo backend real (REAL_CRUD_PREFIXES) e, no LocalDB abaixo, só existiam
// para preencher o objeto "em branco" usado em dois cenários — SSR e uma
// falha total do fetchLiveDB(). Nenhum bloco vivo do fallback os lê mais
// diretamente, então o objeto em branco agora usa listas vazias em vez de
// dados fictícios (evita "inventar" contratações/medições/etc. mesmo nesse
// cenário raro de indisponibilidade total do backend).

const SEED_AI_INSIGHTS: AIInsight[] = [
  { id: 'ai-1', type: 'RISK', severity: 'WARNING', title: 'Contrato próximo do vencimento', description: 'O contrato IQUEGO-CTR-2025/00052 vence em aproximadamente 150 dias. Recomenda-se iniciar processo de prorrogação ou nova contratação.', contractId: 'cnt-52', confidence: 0.94, suggestedAction: 'Abrir processo de renovação com 180 dias de antecedência.', createdAt: '2026-06-10T06:00:00Z' },
  { id: 'ai-2', type: 'ALERT', severity: 'CRITICAL', title: 'Ocorrência de alta gravidade sem resposta', description: 'A ocorrência "Divergência em laudo de pureza química" está aberta há 13 dias sem resolução. Contratos com ocorrências críticas abertas aumentam risco de autuação.', contractId: 'cnt-45', confidence: 0.89, suggestedAction: 'Acionar fiscalização imediata e solicitar laudo contraditório.', createdAt: '2026-06-10T06:00:00Z' },
  { id: 'ai-3', type: 'PREDICTION', severity: 'WARNING', title: 'Processo pode ter atraso na fase 1', description: 'O processo IQUEGO-PRC-2026/00140 está 10 dias após o prazo planejado para a Fase 1. Com base em processos similares, há 72% de chance de impactar o cronograma geral.', processId: 'prc-140', confidence: 0.72, suggestedAction: 'Priorizar conclusão do Estudo Técnico Preliminar esta semana.', createdAt: '2026-06-10T06:00:00Z' },
  { id: 'ai-4', type: 'SUGGESTION', severity: 'INFO', title: 'Medição aguardando aprovação há 9 dias', description: 'A medição de junho do contrato IQUEGO-CTR-2026/00045 está aguardando homologação. O prazo médio de aprovação neste contrato é de 5 dias.', contractId: 'cnt-45', confidence: 0.85, suggestedAction: 'Revisar e homologar a medição de R$ 125.000.', createdAt: '2026-06-10T06:00:00Z' },
];

// ── LocalDB ────────────────────────────────────────────────────────────────────

interface LocalDB {
  users: User[]; contractors: Contractor[]; processes: ProcurementProcess[];
  contracts: Contract[]; assignments: FiscalAssignment[]; occurrences: Occurrence[];
  measurements: InspectionMeasurement[]; alterations: ContractAlteration[];
  contractAlerts: ContractAlert[];
  processPhases: ProcessPhase[]; communications: Communication[];
  aiInsights: AIInsight[];
}

const DB_VERSION = '3.4';

function getLocalDB(): LocalDB {
  const blank: LocalDB = { users: SEED_USERS, contractors: [], processes: [], contracts: SEED_CONTRACTS, assignments: SEED_ASSIGNMENTS, occurrences: [], measurements: [], alterations: [], contractAlerts: [], processPhases: [], communications: [], aiInsights: SEED_AI_INSIGHTS };
  if (typeof window === 'undefined') return blank;
  // Reset localStorage when seed data changes (version bump)
  if (localStorage.getItem('sigecontratos_db_version') !== DB_VERSION) {
    localStorage.setItem('sigecontratos_db', JSON.stringify(blank));
    localStorage.setItem('sigecontratos_db_version', DB_VERSION);
    return blank;
  }
  const raw = localStorage.getItem('sigecontratos_db');
  if (!raw) { localStorage.setItem('sigecontratos_db', JSON.stringify(blank)); return blank; }
  const db = JSON.parse(raw) as LocalDB;
  if (!db.contractAlerts) db.contractAlerts = [];
  if (!db.processPhases) db.processPhases = [];
  if (!db.communications) db.communications = [];
  if (!db.aiInsights) db.aiInsights = [...SEED_AI_INSIGHTS];
  return db;
}

function saveLocalDB(data: LocalDB) {
  if (typeof window !== 'undefined') localStorage.setItem('sigecontratos_db', JSON.stringify(data));
}

export function getStoredToken(): string | null { return typeof window !== 'undefined' ? localStorage.getItem('sigecontratos_token') : null; }
export function setStoredToken(t: string | null) { if (typeof window !== 'undefined') t ? localStorage.setItem('sigecontratos_token', t) : localStorage.removeItem('sigecontratos_token'); }
export function getStoredUser(): User | null { if (typeof window === 'undefined') return null; const u = localStorage.getItem('sigecontratos_user'); return u ? JSON.parse(u) : null; }
export function setStoredUser(user: User | null) { if (typeof window !== 'undefined') user ? localStorage.setItem('sigecontratos_user', JSON.stringify(user)) : localStorage.removeItem('sigecontratos_user'); }

// ── Helpers ────────────────────────────────────────────────────────────────────

function daysUntil(d: string) { return Math.ceil((new Date(d.length === 10 ? d + 'T12:00:00Z' : d).getTime() - Date.now()) / 86400000); }
function daysSince(d: string) { return Math.ceil((Date.now() - new Date(d).getTime()) / 86400000); }
function fmtDate(d: string) { try { return new Date(d.length === 10 ? d + 'T12:00:00Z' : d).toLocaleDateString('pt-BR'); } catch { return d; } }
function fmtCur(v: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v); }

function createDefaultPhases(processId: string): ProcessPhase[] {
  return PHASE_NAMES.map((name, i) => ({ id: `ph-${processId}-${i+1}`, processId, phaseNumber: i+1, name, status: 'PENDING' as PhaseStatus, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
}

// ── Motor de Alertas ───────────────────────────────────────────────────────────

function runAlertEngine(db: LocalDB): ContractAlert[] {
  const newAlerts: ContractAlert[] = [];
  const existing = db.contractAlerts || [];
  const dup = (check: (a: ContractAlert) => boolean) => existing.some(check) || newAlerts.some(check);
  const pushIf = (cond: boolean, alert: ContractAlert) => { if (cond) newAlerts.push(alert); };

  for (const c of db.contracts.filter(c => c.status === 'ACTIVE')) {
    const dtEnd = daysUntil(c.endDate);
    const asgmts = db.assignments.filter(a => a.contractId === c.id && a.isActive);
    const gestores = db.users.filter(u => u.role === 'GESTOR');

    // Alerta 1: 180 dias → Fiscal
    if (dtEnd > 0 && dtEnd <= 180) {
      for (const a of asgmts) {
        pushIf(!dup(x => x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_180' && x.targetUserId === a.fiscalId), {
          id: `cal-180-${c.id}-${a.fiscalId}`, contractId: c.id, targetUserId: a.fiscalId,
          type: 'CONTRACT_EXPIRING_180', status: 'PENDING',
          title: 'ATENÇÃO — Contrato se encerra em breve',
          message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dia${dtEnd !== 1 ? 's' : ''} (${fmtDate(c.endDate)}). Informe a providência desejada.`,
          metadata: { contractNumber: c.contractNumber, daysUntilEnd: dtEnd, contractId: c.id },
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      }
    }

    // Alerta 2: 90 dias → Fiscal + Gestor (somente se prorrogação aprovada)
    if (dtEnd > 0 && dtEnd <= 90 && existing.some(x => x.contractId === c.id && x.type === 'RENEWAL_REQUESTED' && x.response === 'APPROVE')) {
      for (const a of asgmts) {
        pushIf(!dup(x => x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_90' && x.targetUserId === a.fiscalId), {
          id: `cal-90f-${c.id}-${a.fiscalId}`, contractId: c.id, targetUserId: a.fiscalId,
          type: 'CONTRACT_EXPIRING_90', status: 'PENDING', title: 'URGENTE — Providenciar Termo Aditivo',
          message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dias. Providencie o Termo Aditivo de prorrogação.`,
          metadata: { contractId: c.id, contractNumber: c.contractNumber, daysUntilEnd: dtEnd },
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      }
      for (const g of gestores) {
        pushIf(!dup(x => x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_90' && x.targetUserId === g.id), {
          id: `cal-90g-${c.id}-${g.id}`, contractId: c.id, targetUserId: g.id,
          type: 'CONTRACT_EXPIRING_90', status: 'PENDING', title: 'URGENTE — Termo Aditivo Pendente',
          message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dias e o Termo Aditivo de prorrogação não foi formalizado.`,
          metadata: { contractId: c.id, contractNumber: c.contractNumber, daysUntilEnd: dtEnd },
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      }
    }

    // Alerta 3: Medição pendente > 5 dias → Gestor
    for (const m of db.measurements.filter(m => m.contractId === c.id && m.status === 'PENDING_GESTOR')) {
      if (daysSince(m.createdAt) >= 5) {
        for (const g of gestores) {
          pushIf(!dup(x => x.type === 'MEASUREMENT_OVERDUE' && x.metadata?.measurementId === m.id), {
            id: `cal-msr-${m.id}-${g.id}`, contractId: c.id, targetUserId: g.id,
            type: 'MEASUREMENT_OVERDUE', status: 'PENDING', title: 'Medição com Homologação Pendente',
            message: `A medição de ${fmtCur(Number(m.measurementValue))} do contrato ${c.contractNumber} aguarda homologação há ${daysSince(m.createdAt)} dias.`,
            metadata: { measurementId: m.id, contractId: c.id, contractNumber: c.contractNumber },
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          });
        }
      }
    }

    // Alerta 4: Ocorrência crítica/grave aberta > 7 dias → Gestor
    for (const o of db.occurrences.filter(o => o.contractId === c.id && o.status !== 'RESOLVED' && (o.severity === 'CRITICAL' || o.severity === 'HIGH'))) {
      if (daysSince(o.createdAt) >= 7) {
        for (const g of gestores) {
          pushIf(!dup(x => x.type === 'OCCURRENCE_CRITICAL_OPEN' && x.metadata?.occurrenceId === o.id), {
            id: `cal-occ-${o.id}-${g.id}`, contractId: c.id, targetUserId: g.id,
            type: 'OCCURRENCE_CRITICAL_OPEN', status: 'PENDING',
            title: `Ocorrência ${o.severity === 'CRITICAL' ? 'Crítica' : 'Grave'} sem Resolução`,
            message: `"${o.title}" está aberta há ${daysSince(o.createdAt)} dias no contrato ${c.contractNumber}.`,
            metadata: { occurrenceId: o.id, contractId: c.id, contractNumber: c.contractNumber },
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          });
        }
      }
    }

    // Alerta 5: Aditivo pendente > 7 dias → Gestor
    for (const alt of db.alterations.filter(a => a.contractId === c.id && a.status === 'PENDING_APPROVAL')) {
      if (daysSince(alt.createdAt) >= 7) {
        for (const g of gestores) {
          pushIf(!dup(x => x.type === 'ALTERATION_OVERDUE' && x.metadata?.alterationId === alt.id), {
            id: `cal-alt-${alt.id}-${g.id}`, contractId: c.id, targetUserId: g.id,
            type: 'ALTERATION_OVERDUE', status: 'PENDING', title: 'Termo Aditivo Pendente de Aprovação',
            message: `"${alt.alterationNumber || alt.type}" do contrato ${c.contractNumber} aguarda aprovação há ${daysSince(alt.createdAt)} dias.`,
            metadata: { alterationId: alt.id, contractId: c.id, contractNumber: c.contractNumber },
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          });
        }
      }
    }
  }

  // Alerta 6: Fase do processo em atraso → Gestor
  for (const ph of (db.processPhases || [])) {
    if (ph.plannedEnd && ph.status !== 'COMPLETED' && ph.status !== 'BLOCKED' && daysUntil(ph.plannedEnd) < 0) {
      const proc = db.processes.find(p => p.id === ph.processId);
      if (proc && proc.status !== 'CONCLUDED' && proc.status !== 'CANCELED') {
        for (const g of db.users.filter(u => u.role === 'GESTOR')) {
          pushIf(!dup(x => x.type === 'PROCESS_PHASE_OVERDUE' && x.metadata?.phaseId === ph.id), {
            id: `cal-phase-${ph.id}-${g.id}`, processId: ph.processId, targetUserId: g.id,
            type: 'PROCESS_PHASE_OVERDUE', status: 'PENDING', title: 'Fase do Processo em Atraso',
            message: `A fase "${ph.name}" do processo ${proc.processNumber} ultrapassou o prazo em ${Math.abs(daysUntil(ph.plannedEnd))} dias.`,
            metadata: { phaseId: ph.id, processId: ph.processId, phaseName: ph.name, processNumber: proc.processNumber },
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          });
        }
      }
    }
  }

  // Alerta 7: Comunicado obrigatório não lido → Fiscal
  for (const comm of (db.communications || []).filter(c => c.isMandatory)) {
    const asgmts = db.assignments.filter(a => a.contractId === comm.contractId && a.isActive);
    const targets = comm.recipientId ? [comm.recipientId] : asgmts.map(a => a.fiscalId);
    for (const fiscalId of targets) {
      if (!(comm.readBy || []).includes(fiscalId)) {
        pushIf(!dup(x => x.type === 'COMMUNICATION_MANDATORY' && x.metadata?.communicationId === comm.id && x.targetUserId === fiscalId), {
          id: `cal-comm-${comm.id}-${fiscalId}`, contractId: comm.contractId, targetUserId: fiscalId,
          type: 'COMMUNICATION_MANDATORY', status: 'PENDING', title: 'Comunicado Obrigatório — Leitura Pendente',
          message: comm.subject,
          metadata: { communicationId: comm.id, subject: comm.subject, fullMessage: comm.message, senderName: db.users.find(u => u.id === comm.senderId)?.name || 'Gestor' },
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      }
    }
  }

  return newAlerts;
}

// ── Resposta a Alerta ──────────────────────────────────────────────────────────

function processAlertResponse(alertId: string, response: ContractAlertResponse, db: LocalDB, user: User): ContractAlert {
  const alert = db.contractAlerts.find(a => a.id === alertId);
  if (!alert) throw new Error('Alerta não encontrado (Simulado)');
  alert.status = 'RESPONDED'; alert.response = response;
  alert.respondedAt = new Date().toISOString(); alert.respondedById = user.id; alert.updatedAt = new Date().toISOString();

  const contract = alert.contractId ? db.contracts.find(c => c.id === alert.contractId) : null;
  const now = new Date().toISOString();

  if (alert.type === 'CONTRACT_EXPIRING_180' && response === 'EXTEND_CONTRACT') {
    for (const g of db.users.filter(u => u.role === 'GESTOR')) {
      db.contractAlerts.push({ id: `cal-renew-${Date.now()}-${g.id}`, contractId: alert.contractId, targetUserId: g.id, type: 'RENEWAL_REQUESTED', status: 'PENDING', title: 'Solicitação de Prorrogação Pendente', message: `O Fiscal ${user.name} solicitou prorrogação do contrato ${contract?.contractNumber}. Informe a providência.`, metadata: { contractId: alert.contractId, contractNumber: contract?.contractNumber, fiscalId: user.id, fiscalName: user.name }, createdAt: now, updatedAt: now });
    }
  }

  if (alert.type === 'CONTRACT_EXPIRING_180' && response === 'NEW_PROCESS') {
    const newProcId = `prc-auto-${Date.now()}`;
    const np: ProcurementProcess = { id: newProcId, processNumber: `IQUEGO-PRC-${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`, subject: `Nova contratação — substituição do contrato ${contract?.contractNumber}`, description: `Processo iniciado automaticamente por ${user.name} em virtude do encerramento do contrato ${contract?.contractNumber}.`, status: 'PLANNING', modality: 'LICITACAO_13303', estimatedValue: contract?.currentValue ?? 0, requesterDepartment: 'Iniciativa Automática — SIGECONTRATOS', requesterId: user.id };
    db.processes.push(np);
    db.processPhases = [...(db.processPhases || []), ...createDefaultPhases(newProcId)];
    for (const g of db.users.filter(u => u.role === 'GESTOR')) {
      db.contractAlerts.push({ id: `cal-newp-${Date.now()}-${g.id}`, processId: newProcId, contractId: alert.contractId, targetUserId: g.id, type: 'NEW_PROCESS_AUTO_CREATED', status: 'PENDING', title: 'Novo Processo Criado Automaticamente', message: `O Fiscal ${user.name} optou por nova contratação. Processo ${np.processNumber} criado em Planejamento.`, metadata: { processId: newProcId, processNumber: np.processNumber, contractNumber: contract?.contractNumber }, createdAt: now, updatedAt: now });
    }
  }

  if (alert.type === 'RENEWAL_REQUESTED' && response === 'APPROVE') {
    for (const a of db.assignments.filter(a => a.contractId === alert.contractId && a.isActive)) {
      db.contractAlerts.push({ id: `cal-rok-${Date.now()}-${a.fiscalId}`, contractId: alert.contractId, targetUserId: a.fiscalId, type: 'RENEWAL_APPROVED', status: 'PENDING', title: 'Prorrogação Aprovada — Providenciar Termo Aditivo', message: `O Gestor aprovou a prorrogação do contrato ${contract?.contractNumber}. Providencie o Termo Aditivo de extensão de prazo.`, metadata: { contractId: alert.contractId, contractNumber: contract?.contractNumber }, createdAt: now, updatedAt: now });
    }
  }

  if (alert.type === 'RENEWAL_REQUESTED' && response === 'REJECT') {
    const newProcId = `prc-auto-${Date.now()}`;
    const np: ProcurementProcess = { id: newProcId, processNumber: `IQUEGO-PRC-${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`, subject: `Nova contratação — substituição do contrato ${contract?.contractNumber}`, description: `Processo criado após rejeição de prorrogação para o contrato ${contract?.contractNumber}.`, status: 'PLANNING', modality: 'LICITACAO_13303', estimatedValue: contract?.currentValue ?? 0, requesterDepartment: 'Iniciativa Automática — SIGECONTRATOS', requesterId: user.id };
    db.processes.push(np);
    db.processPhases = [...(db.processPhases || []), ...createDefaultPhases(newProcId)];
    for (const a of db.assignments.filter(a => a.contractId === alert.contractId && a.isActive)) {
      db.contractAlerts.push({ id: `cal-rno-${Date.now()}-${a.fiscalId}`, contractId: alert.contractId, processId: newProcId, targetUserId: a.fiscalId, type: 'NEW_PROCESS_AUTO_CREATED', status: 'PENDING', title: 'Prorrogação Rejeitada — Novo Processo Iniciado', message: `O Gestor rejeitou a prorrogação do contrato ${contract?.contractNumber}. Processo ${np.processNumber} criado automaticamente.`, metadata: { processId: newProcId, processNumber: np.processNumber, contractNumber: contract?.contractNumber }, createdAt: now, updatedAt: now });
    }
  }

  if (alert.type === 'COMMUNICATION_MANDATORY' && response === 'ACKNOWLEDGED') {
    const comm = db.communications.find(c => c.id === alert.metadata?.communicationId);
    if (comm) { if (!comm.readBy) comm.readBy = []; if (!comm.readBy.includes(user.id)) comm.readBy.push(user.id); }
  }

  saveLocalDB(db);
  return alert;
}

// ── Requisição HTTP ────────────────────────────────────────────────────────────

// O frontend usa /api/* — o Next.js proxy (next.config.ts rewrites) encaminha
// esses requests para o backend NestJS em localhost:3001 no servidor.
// Isso funciona para todos os usuários da intranet sem hardcodar IPs.
const BACKEND_URL = '/api';

// Endpoints de CRUD real que devem ir direto ao backend (sem fallback localStorage)
// '/audit-logs' inclui também /audit-logs/summary e /audit-logs/filters (mesmo prefixo).
// A trilha de auditoria é institucional: um erro (rede, permissão) deve aparecer
// como erro real na tela, nunca cair em dado fictício de localStorage.
const REAL_CRUD_PREFIXES = ['/auth/', '/users', '/contractors', '/contracts', '/processes', '/occurrences', '/measurements', '/alterations', '/communications', '/payments', '/audit-logs'];

async function request(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });
    if (res.status === 401) { setStoredToken(null); setStoredUser(null); throw new Error('Não autorizado'); }
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || 'Erro na requisição'); }
    return await res.json();
  } catch (error: any) {
    if (error.message === 'Não autorizado') throw error;
    // Endpoints de CRUD real: propagam o erro sem fallback
    const isRealEndpoint = REAL_CRUD_PREFIXES.some(p => endpoint.startsWith(p));
    if (isRealEndpoint) throw new Error(error.message || 'Backend indisponível');
    // Endpoints computados (dashboard, painel de risco, alertas, IA): fallback local
    return await handleLocalFallback(endpoint, options, error.message);
  }
}

// ── Fallback para Endpoints Computados ────────────────────────────────────────
// Endpoints como /dashboard/gestor, /risk-panel e /alerts não existem no backend —
// são calculados no cliente. Este fallback busca dados reais do backend e computa.

// Cache de módulo: evita múltiplas chamadas simultâneas ao backend (TTL = 5 min)
let _liveDBCache: { data: LocalDB; ts: number } | null = null;
let _liveDBInFlight: Promise<LocalDB> | null = null;
const LIVE_DB_TTL = 300_000;

async function fetchLiveDB(): Promise<LocalDB> {
  const now = Date.now();
  if (_liveDBCache && now - _liveDBCache.ts < LIVE_DB_TTL) return _liveDBCache.data;
  if (_liveDBInFlight) return _liveDBInFlight;

  _liveDBInFlight = (async () => {
    try {
      const token = getStoredToken();
      const h: Record<string, string> = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
      const get = async (path: string) => {
        try { const r = await fetch(`${BACKEND_URL}${path}`, { headers: h }); return r.ok ? r.json() : null; }
        catch { return null; }
      };
      const [users, contractors, contracts, processes] = await Promise.all([
        get('/users'), get('/contractors'), get('/contracts'), get('/processes'),
      ]);
      const local = getLocalDB();
      let result: LocalDB;
      if (users && contracts) {
        const normContracts = (contracts as any[]).map((c: any) => ({
          ...c,
          initialValue: Number(c.initialValue) || 0,
          currentValue: Number(c.currentValue) || 0,
        }));
        const normProcesses = (processes as any[] || []).map((p: any) => ({
          ...p,
          estimatedValue: Number(p.estimatedValue) || 0,
        }));
        const assignments: FiscalAssignment[] = normContracts.flatMap((c: any) => c.fiscalAssignments || []);
        const occurrences: Occurrence[]        = normContracts.flatMap((c: any) => c.occurrences || []);
        const measurements: InspectionMeasurement[] = normContracts.flatMap((c: any) =>
          (c.measurements || []).map((m: any) => ({ ...m, measurementValue: Number(m.measurementValue) || 0 }))
        );
        const alterations: ContractAlteration[]     = normContracts.flatMap((c: any) => c.alterations || []);
        const processPhases: ProcessPhase[]         = normProcesses.flatMap((p: any) => p.phases || []);
        result = {
          users: users || [], contractors: contractors || [],
          contracts: normContracts, processes: normProcesses,
          assignments, occurrences, measurements, alterations,
          processPhases,
          contractAlerts: local.contractAlerts || [],
          communications: normContracts.flatMap((c: any) => c.communications || []),
          aiInsights: local.aiInsights || [],
        };
      } else {
        result = local;
      }
      _liveDBCache = { data: result, ts: Date.now() };
      return result;
    } finally {
      _liveDBInFlight = null;
    }
  })();
  return _liveDBInFlight;
}

async function handleLocalFallback(endpoint: string, options: RequestInit = {}, originalError: string): Promise<any> {
  // Para endpoints computados, tenta buscar dados reais do backend
  const isComputed = ['/dashboard', '/risk-panel', '/pending-dashboard', '/alerts'].some(p => endpoint.startsWith(p));
  const db = isComputed ? await fetchLiveDB() : getLocalDB();
  const user = getStoredUser();
  const method = options.method || 'GET';

  // Login já vai sempre ao backend real ('/auth/' está em REAL_CRUD_PREFIXES);
  // este fallback só trata os endpoints computados listados abaixo.
  if (!user) throw new Error('Não autorizado');

  // ── Alertas ──────────────────────────────────────────────────────────────────

  if (endpoint === '/alerts' && method === 'GET') {
    return (db.contractAlerts || []).filter(a => a.targetUserId === user.id && a.status === 'PENDING');
  }

  if (endpoint === '/alerts/run-engine' && method === 'POST') {
    const newAlerts = runAlertEngine(db);
    if (newAlerts.length > 0) { db.contractAlerts = [...(db.contractAlerts || []), ...newAlerts]; saveLocalDB(db); }
    return { created: newAlerts.length, alerts: (db.contractAlerts || []).filter(a => a.targetUserId === user.id && a.status === 'PENDING') };
  }

  if (endpoint.match(/^\/alerts\/[^/]+\/respond$/) && method === 'POST') {
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const targetAlert = db.contractAlerts.find(a => a.id === id);
    if (targetAlert && targetAlert.targetUserId !== user.id && user.role !== 'ADMIN') throw new Error('Acesso negado');
    return processAlertResponse(id, body.response as ContractAlertResponse, db, user);
  }

  if (endpoint.match(/^\/alerts\/[^/]+\/dismiss$/) && method === 'POST') {
    const id = endpoint.split('/')[2];
    const alert = db.contractAlerts.find(a => a.id === id);
    if (alert) { alert.status = 'DISMISSED'; alert.updatedAt = new Date().toISOString(); saveLocalDB(db); }
    return alert;
  }

  if (endpoint === '/alerts/all' && method === 'GET') {
    if (user.role === 'GESTOR' || user.role === 'ADMIN') return db.contractAlerts || [];
    return (db.contractAlerts || []).filter(a => a.targetUserId === user.id);
  }

  // Alertas enviados pelo gestor (para monitorar respostas dos fiscais)
  if (endpoint === '/alerts/sent-by-gestor' && method === 'GET') {
    if (user.role !== 'GESTOR') return [];
    return (db.contractAlerts || []).filter(a =>
      a.metadata?.senderRole === 'GESTOR' || a.metadata?.senderName
    ).map(a => ({
      ...a,
      targetUser: db.users.find(u => u.id === a.targetUserId),
      contract: a.contractId ? db.contracts.find(c => c.id === a.contractId) : null,
    }));
  }

  // Confirmar recebimento / fechar como não enviado (para o gestor)
  if (endpoint.match(/^\/alerts\/[^/]+\/confirm-receipt$/) && method === 'POST') {
    const id = endpoint.split('/')[2];
    const alert = db.contractAlerts.find(a => a.id === id);
    if (alert) { alert.status = 'CONFIRMED'; alert.updatedAt = new Date().toISOString(); saveLocalDB(db); }
    return alert;
  }

  if (endpoint.match(/^\/alerts\/[^/]+\/close-not-sent$/) && method === 'POST') {
    const id = endpoint.split('/')[2];
    const alert = db.contractAlerts.find(a => a.id === id);
    if (alert) { alert.status = 'CLOSED_NOT_SENT'; alert.updatedAt = new Date().toISOString(); saveLocalDB(db); }
    return alert;
  }

  if (endpoint === '/alerts/send-to-fiscal' && method === 'POST') {
    if (user.role !== 'GESTOR' && user.role !== 'ADMIN') throw new Error('Acesso negado');
    const body = JSON.parse(options.body as string);
    const isAssigned = db.assignments.some(a => a.contractId === body.contractId && a.fiscalId === body.fiscalId && a.isActive);
    if (!isAssigned) throw new Error('Fiscal não está designado a este contrato');
    const now = new Date().toISOString();
    const alertTypeLabels: Record<string, string> = {
      DATA_CHANGE_REQUEST: 'Solicitação de Alteração de Dados',
      REPORT_REQUEST: 'Solicitação de Relatório',
      DEADLINE_NOTICE: 'Notificação de Prazo',
      COMPLIANCE_NOTICE: 'Notificação de Inconformidade',
      GENERAL_NOTICE: 'Comunicado Geral',
    };
    const title = `${alertTypeLabels[body.alertType] || 'Comunicado'} — Gestor`;
    const newAlert = {
      id: `cal-gsnd-${Date.now()}`,
      contractId: body.contractId,
      targetUserId: body.fiscalId,
      type: 'COMMUNICATION_MANDATORY' as const,
      status: 'PENDING' as const,
      title,
      message: body.message,
      metadata: { alertType: body.alertType, senderName: user.name, senderRole: 'GESTOR', contractId: body.contractId },
      createdAt: now,
      updatedAt: now,
    };
    db.contractAlerts.push(newAlert);
    const newComm: Communication = { id: `comm-gsnd-${Date.now()}`, contractId: body.contractId, senderId: user.id, recipientId: body.fiscalId, subject: title, message: body.message, isMandatory: true, readBy: [user.id], createdAt: now };
    db.communications.push(newComm);
    saveLocalDB(db);
    return newAlert;
  }

  // Contratos, processos, medições, ocorrências, alterações, comunicados e
  // contratadas são todos entidades reais (REAL_CRUD_PREFIXES) — o simulador
  // local que existia aqui para elas foi removido; request() nunca cai neste
  // fallback para esses endpoints.

  // Designações de fiscal (criação, desativação e agora também a exclusão
  // definitiva) — assim como edição de aditivo, documentos, conclusão/
  // exclusão de contrato, exclusão de processo e todo o módulo de Usuários —
  // são todas reais (REAL_CRUD_PREFIXES); o simulador local que existia aqui
  // foi removido.

  // ── Central de Pendências ─────────────────────────────────────────────────────

  if (endpoint === '/pending-dashboard' && method === 'GET') {
    const pendingAlerts = (db.contractAlerts || []).filter(a => a.targetUserId === user.id && a.status === 'PENDING');
    const result: any = { alerts: pendingAlerts, items: [] };

    if (user.role === 'FISCAL') {
      const myContractIds = db.assignments.filter(a => a.fiscalId === user.id && a.isActive).map(a => a.contractId);
      const openOccs = db.occurrences.filter(o => myContractIds.includes(o.contractId) && o.status !== 'RESOLVED');
      openOccs.forEach(o => { const c = db.contracts.find(c => c.id === o.contractId); result.items.push({ type: 'OCCURRENCE', priority: o.severity === 'CRITICAL' ? 'HIGH' : o.severity === 'HIGH' ? 'HIGH' : 'MEDIUM', title: o.title, detail: c?.contractNumber, daysOpen: daysSince(o.createdAt), id: o.id, contractId: o.contractId }); });
      const myPhases = (db.processPhases || []).filter(ph => ph.responsibleId === user.id && ph.status !== 'COMPLETED' && ph.plannedEnd && daysUntil(ph.plannedEnd) < 0);
      myPhases.forEach(ph => { const p = db.processes.find(p => p.id === ph.processId); result.items.push({ type: 'PHASE', priority: 'HIGH', title: ph.name, detail: p?.processNumber, daysLate: Math.abs(daysUntil(ph.plannedEnd!)), id: ph.id, processId: ph.processId }); });
      myContractIds.forEach(cId => { const c = db.contracts.find(c => c.id === cId); if (c) { const d = daysUntil(c.endDate); if (d <= 180 && d > 0) result.items.push({ type: 'CONTRACT_EXPIRY', priority: d <= 30 ? 'CRITICAL' : d <= 90 ? 'HIGH' : 'MEDIUM', title: `Contrato ${c.contractNumber} encerra em ${d} dias`, detail: fmtDate(c.endDate), daysUntil: d, id: c.id, contractId: c.id }); } });
    }

    if (user.role === 'GESTOR' || user.role === 'ADMIN') {
      const pendMsrs = db.measurements.filter(m => m.status === 'PENDING_GESTOR');
      pendMsrs.forEach(m => { const c = db.contracts.find(c => c.id === m.contractId); result.items.push({ type: 'MEASUREMENT', priority: daysSince(m.createdAt) > 10 ? 'HIGH' : 'MEDIUM', title: `Medição pendente: ${fmtCur(Number(m.measurementValue))}`, detail: c?.contractNumber, daysPending: daysSince(m.createdAt), id: m.id, contractId: m.contractId }); });
      const pendAlts = db.alterations.filter(a => a.status === 'PENDING_APPROVAL');
      pendAlts.forEach(alt => { const c = db.contracts.find(c => c.id === alt.contractId); result.items.push({ type: 'ALTERATION', priority: 'MEDIUM', title: `Aditivo pendente: ${alt.alterationNumber || alt.type}`, detail: c?.contractNumber, daysPending: daysSince(alt.createdAt), id: alt.id, contractId: alt.contractId }); });
      const critOccs = db.occurrences.filter(o => o.status !== 'RESOLVED' && (o.severity === 'CRITICAL' || o.severity === 'HIGH'));
      critOccs.forEach(o => { const c = db.contracts.find(c => c.id === o.contractId); result.items.push({ type: 'OCCURRENCE', priority: o.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH', title: o.title, detail: c?.contractNumber, daysOpen: daysSince(o.createdAt), id: o.id, contractId: o.contractId }); });
      db.contracts.filter(c => c.status === 'ACTIVE').forEach(c => { const d = daysUntil(c.endDate); if (d <= 90 && d > 0) result.items.push({ type: 'CONTRACT_EXPIRY', priority: d <= 30 ? 'CRITICAL' : 'HIGH', title: `Contrato ${c.contractNumber} encerra em ${d} dias`, detail: fmtDate(c.endDate), daysUntil: d, id: c.id, contractId: c.id }); });
    }

    result.items.sort((a: any, b: any) => { const p: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }; return (p[a.priority] ?? 3) - (p[b.priority] ?? 3); });
    return result;
  }

  // ── Dashboard Gestor ─────────────────────────────────────────────────────────

  if (endpoint === '/dashboard/gestor' && method === 'GET') {
    const contracts = db.contracts;
    const active = contracts.filter(c => c.status === 'ACTIVE');
    const exp180 = active.filter(c => { const d = daysUntil(c.endDate); return d <= 180 && d > 0; });
    const exp90 = active.filter(c => { const d = daysUntil(c.endDate); return d <= 90 && d > 0; });
    const expired = contracts.filter(c => daysUntil(c.endDate) <= 0 && c.status === 'ACTIVE');
    const processes = db.processes;
    const inProgress = processes.filter(p => p.status !== 'CONCLUDED' && p.status !== 'CANCELED');
    const delayed = (db.processPhases || []).filter(ph => ph.plannedEnd && ph.status !== 'COMPLETED' && daysUntil(ph.plannedEnd) < 0).map(ph => ph.processId);
    const uniqueDelayed = [...new Set(delayed)];
    const pendFisc = db.measurements.filter(m => m.status === 'PENDING_GESTOR').length;
    const pendRenewals = (db.contractAlerts || []).filter(a => a.type === 'RENEWAL_REQUESTED' && a.status === 'PENDING').length;
    const pendComms = (db.communications || []).filter(c => c.isMandatory && !(c.readBy || []).includes('usr-gestor')).length;

    const modalityMap: Record<string, string> = { LICITACAO_13303: 'Licitação', DISPENSA_13303: 'Dispensa', INEXIGIBILIDADE: 'Inexigibilidade', PREGAO_ELETRONICO: 'Pregão', OUTROS: 'Outros' };
    const byModality = Object.entries(processes.reduce((acc, p) => { const k = modalityMap[p.modality] || p.modality; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
    const statusMap: Record<string, string> = { DRAFT: 'Rascunho', ACTIVE: 'Ativo', SUSPENDED: 'Suspenso', CONCLUDED: 'Concluído', RESCINDED: 'Rescindido' };
    const byStatus = Object.entries(contracts.reduce((acc, c) => { const k = statusMap[c.status] || c.status; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
    const fiscalContracts: Record<string, { count: number; fiscalId: string; fullName: string }> = {};
    db.assignments.filter(a => a.isActive && a.role === 'TITULAR').forEach(a => { const u = db.users.find(u => u.id === a.fiscalId); if (u) { if (!fiscalContracts[u.id]) fiscalContracts[u.id] = { count: 0, fiscalId: u.id, fullName: u.name }; fiscalContracts[u.id].count++; } });
    const byFiscal = Object.values(fiscalContracts).sort((a, b) => b.count - a.count).map(({ count, fiscalId, fullName }) => { const parts = fullName.split(' '); const short = parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : fullName; return { name: short, value: count, fiscalId, fullName }; });
    const deptAbbrev: Record<string, string> = { 'Segurança do Trabalho': 'Seg. Trabalho', 'Gerência de Gestão de Pessoas': 'Gest. Pessoas', 'Coordenação de Serviços Gerais': 'Serv. Gerais', 'Gerência de Logística': 'Logística', 'Tecnologia da Informação e Comunicação': 'TIC', 'Gerência de Engenharia': 'Engenharia', 'Assessoria de Compras Governamentais': 'Compras Gov.', 'Assessoria Especial da Presidência': 'Assessoria Pres.', 'Gerência Jurídica': 'Jurídica', 'Diretoria Comercial': 'Comercial', 'Coordenação Administrativa': 'Coord. Admin.', 'Gerência de Recursos Humanos': 'RH', 'Gestão de Contratos': 'Gest. Contr.', 'Gerência de Controle da Qualidade': 'Contr. Qual.', 'Gerência de Contabilidade': 'Contabilidade' };
    const byUnit = Object.entries(active.reduce((acc, c) => { const k = deptAbbrev[(c as any).department || ''] || (c as any).department || 'Outros'; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
    const phaseStatusMap: Record<string, string> = { PENDING: 'Pendente', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluída', OVERDUE: 'Atrasada', BLOCKED: 'Bloqueada' };
    const byPhaseStatus = Object.entries((db.processPhases || []).reduce((acc, ph) => { const k = phaseStatusMap[ph.status] || ph.status; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
    const _monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const _now6 = new Date();
    const _dynMonths = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(_now6.getFullYear(), _now6.getMonth() - 5 + i, 1);
      return { label: _monthLabels[d.getMonth()], year: d.getFullYear(), month: d.getMonth() };
    });
    const monthlyEvolution = _dynMonths.map(({ label, year, month }) => {
      const mStart = new Date(year, month, 1);
      const mEnd = new Date(year, month + 1, 0, 23, 59, 59);
      const activeInMonth = contracts.filter(c => {
        if (c.status === 'DRAFT' || c.status === 'RESCINDED') return false;
        const cStart = new Date((c as any).startDate || (c as any).signingDate || '2020-01-01');
        const cEnd = new Date(c.endDate);
        return cStart <= mEnd && cEnd >= mStart;
      });
      const measured = db.measurements
        .filter(m => {
          if (m.status !== 'APPROVED') return false;
          const d = new Date(m.periodEnd);
          return d.getFullYear() === year && d.getMonth() === month;
        })
        .reduce((s, m) => s + Number(m.measurementValue), 0);
      return { name: label, contracts: activeInMonth.length, value: activeInMonth.reduce((s, c) => s + c.currentValue, 0), measured };
    });

    // ── Financial ──
    const totalContracted = active.reduce((s, c) => s + c.currentValue, 0);
    const totalExecuted = db.measurements.filter(m => m.status === 'APPROVED').reduce((s, m) => s + Number(m.measurementValue), 0);
    const balance = totalContracted - totalExecuted;
    const executionPercent = totalContracted > 0 ? Math.round((totalExecuted / totalContracted) * 100) : 0;
    const savingsEstimate = db.processes.reduce((s, p) => {
      const rel = db.contracts.find(c => c.processId === p.id);
      if (rel && p.estimatedValue) return s + Math.max(0, p.estimatedValue - rel.initialValue);
      return s;
    }, 0);
    const avgContractValue = active.length > 0 ? Math.round(totalContracted / active.length) : 0;

    // ── Extended Alerts ──
    const expiring30 = active.filter(c => { const d = daysUntil(c.endDate); return d <= 30 && d > 0; }).length;
    const expiring60 = active.filter(c => { const d = daysUntil(c.endDate); return d <= 60 && d > 0; }).length;
    const contractsWithoutFiscal = active.filter(c => !db.assignments.some(a => a.contractId === c.id && a.isActive && a.role === 'TITULAR')).length;
    const openCriticalOccurrences = db.occurrences.filter(o => o.status !== 'RESOLVED' && o.severity === 'CRITICAL').length;
    const pendingAlterations = db.alterations.filter(a => a.status === 'PENDING_APPROVAL').length;

    // ── Health Score ──
    let healthScore = 100;
    const healthFactors: { label: string; deduction: number }[] = [];
    const addFactor = (label: string, pts: number) => { healthScore -= pts; healthFactors.push({ label, deduction: pts }); };
    if (expired.length > 0) addFactor(`${expired.length} contrato(s) vencido(s)`, Math.min(expired.length * 15, 30));
    if (openCriticalOccurrences > 0) addFactor(`${openCriticalOccurrences} ocorrência(s) crítica(s)`, Math.min(openCriticalOccurrences * 10, 20));
    if (pendFisc > 0) addFactor(`${pendFisc} medição(ões) pendente(s)`, Math.min(pendFisc * 4, 15));
    if (uniqueDelayed.length > 0) addFactor(`${uniqueDelayed.length} processo(s) atrasado(s)`, Math.min(uniqueDelayed.length * 6, 15));
    if (contractsWithoutFiscal > 0) addFactor(`${contractsWithoutFiscal} contrato(s) sem fiscal`, Math.min(contractsWithoutFiscal * 4, 12));
    if (exp90.length > 0) addFactor(`${exp90.length} contrato(s) vencendo em 90d`, Math.min(exp90.length * 2, 8));
    healthScore = Math.max(0, Math.min(100, healthScore));
    const healthLevel = healthScore >= 80 ? 'EXCELLENT' : healthScore >= 60 ? 'GOOD' : healthScore >= 40 ? 'ATTENTION' : 'CRITICAL';

    // ── Fiscal Workload ──
    const fiscalWorkload = db.users.filter(u => u.role === 'FISCAL').map(u => {
      const cIds = db.assignments.filter(a => a.fiscalId === u.id && a.isActive).map(a => a.contractId);
      const myActive = active.filter(c => cIds.includes(c.id));
      if (myActive.length === 0) return null;
      const parts = u.name.split(' ');
      const shortName = parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : u.name;
      return {
        id: u.id, name: u.name, shortName, contracts: myActive.length,
        totalValue: myActive.reduce((s, c) => s + c.currentValue, 0),
        pendingMeasurements: db.measurements.filter(m => cIds.includes(m.contractId) && m.status === 'PENDING_FISCAL').length,
        pendingOccurrences: db.occurrences.filter(o => cIds.includes(o.contractId) && o.status === 'OPEN').length,
      };
    }).filter(Boolean).sort((a, b) => (b as any).contracts - (a as any).contracts) as any[];

    // ── Upcoming Events ──
    const upcomingEvents = [
      ...active.filter(c => { const d = daysUntil(c.endDate); return d >= 0 && d <= 90; })
        .sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate)).slice(0, 8)
        .map(c => { const d = daysUntil(c.endDate); return { type: 'EXPIRATION', contractId: c.id, contractNumber: c.contractNumber, description: 'Vencimento contratual', daysUntil: d, severity: d <= 30 ? 'red' : d <= 60 ? 'amber' : 'green' }; }),
      ...(db.processPhases || []).filter(ph => ph.plannedEnd && ph.status !== 'COMPLETED' && daysUntil(ph.plannedEnd) >= 0 && daysUntil(ph.plannedEnd) <= 30)
        .slice(0, 4)
        .map(ph => { const p = db.processes.find(p => p.id === ph.processId); const d = daysUntil(ph.plannedEnd!); return { type: 'PROCESS', contractId: '', contractNumber: p?.processNumber || '', description: ph.name, daysUntil: d, severity: d <= 7 ? 'red' : 'amber' }; }),
    ].sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 12);

    // ── Risk Summary ──
    const riskSummary = active.reduce((acc, c) => {
      let score = 0;
      const d = daysUntil(c.endDate);
      if (d <= 0) score += 40; else if (d <= 30) score += 35; else if (d <= 90) score += 20; else if (d <= 180) score += 10;
      db.occurrences.filter(o => o.contractId === c.id && o.status !== 'RESOLVED').forEach(o => { score += o.severity === 'CRITICAL' ? 30 : o.severity === 'HIGH' ? 15 : 5; });
      score += db.measurements.filter(m => m.contractId === c.id && (m.status === 'PENDING_FISCAL' || m.status === 'PENDING_GESTOR')).length * 10;
      score += (db.contractAlerts || []).filter(a => a.contractId === c.id && a.status === 'PENDING').length * 8;
      const clampedScore = Math.min(100, score);
      if (clampedScore >= 60) acc.critical++; else if (clampedScore >= 40) acc.high++; else if (clampedScore >= 20) acc.medium++; else acc.low++;
      return acc;
    }, { critical: 0, high: 0, medium: 0, low: 0 });

    const result: GestorDashboard = {
      kpis: { activeContracts: active.length, expiringIn180: exp180.length, expiringIn90: exp90.length, expiredContracts: expired.length, processesInProgress: inProgress.length, delayedProcesses: uniqueDelayed.length, pendingFiscalizacoes: pendFisc, pendingRenewals: pendRenewals, communicationsPendingReply: pendComms },
      financial: { totalContracted, totalExecuted, balance, savingsEstimate, executionPercent, avgContractValue },
      health: { score: healthScore, level: healthLevel as any, factors: healthFactors },
      extendedAlerts: { expiring30, expiring60, contractsWithoutFiscal, openCriticalOccurrences, pendingAlterations },
      fiscalWorkload, upcomingEvents, riskSummary,
      charts: { byModality, byStatus, byFiscal, byUnit, processesByPhase: byPhaseStatus, monthlyEvolution },
    };
    return result;
  }

  // ── Dashboard Fiscal ─────────────────────────────────────────────────────────

  if (endpoint === '/dashboard/fiscal' && method === 'GET') {
    const myContractIds = db.assignments.filter(a => a.fiscalId === user.id && a.isActive).map(a => a.contractId);
    const myContracts = db.contracts.filter(c => myContractIds.includes(c.id)).map(c => ({
      ...c, contractor: db.contractors.find(ct => ct.id === c.contractorId),
      fiscalAssignments: db.assignments.filter(a => a.contractId === c.id).map(a => ({ ...a, fiscal: db.users.find(u => u.id === a.fiscalId) })),
    }));
    const myProcessIds = [...new Set(myContracts.filter(c => c.processId).map(c => c.processId!))];
    const myProcesses = db.processes.filter(p => myProcessIds.includes(p.id) || db.processPhases?.some(ph => ph.processId === p.id && ph.responsibleId === user.id));
    const measurements = db.measurements.filter(m => myContractIds.includes(m.contractId) && m.status === 'PENDING_FISCAL').length;
    const occurrences = db.occurrences.filter(o => myContractIds.includes(o.contractId) && o.status === 'OPEN').length;
    const alterations = db.alterations.filter(a => myContractIds.includes(a.contractId) && a.status === 'DRAFT').length;
    const pendingAlerts = (db.contractAlerts || []).filter(a => a.targetUserId === user.id && a.status === 'PENDING');
    const upcoming = myContracts.filter(c => { const d = daysUntil(c.endDate); return d > 0 && d <= 180; }).map(c => ({ contractId: c.id, contractNumber: c.contractNumber, daysUntil: daysUntil(c.endDate) })).sort((a, b) => a.daysUntil - b.daysUntil);
    const gestorComms = (db.communications || []).filter(c => myContractIds.includes(c.contractId) && c.senderId !== user.id).slice(0, 5).map(c => ({ ...c, sender: db.users.find(u => u.id === c.senderId) }));
    return { myContracts, myProcesses, pendingItems: { measurements, occurrences, alterations }, pendingAlerts, upcomingExpirations: upcoming, gestorCommunications: gestorComms };
  }

  // ── Painel de Risco ──────────────────────────────────────────────────────────

  if (endpoint === '/risk-panel' && method === 'GET') {
    const items: RiskItem[] = db.contracts.filter(c => c.status === 'ACTIVE' || c.status === 'SUSPENDED').map(c => {
      const factors: string[] = [];
      let score = 0;
      const d = daysUntil(c.endDate);
      if (d <= 0) { factors.push('Contrato vencido'); score += 40; }
      else if (d <= 30) { factors.push(`Vence em ${d} dias`); score += 35; }
      else if (d <= 90) { factors.push(`Vence em ${d} dias`); score += 20; }
      else if (d <= 180) { factors.push(`Vence em ${d} dias`); score += 10; }
      const openOccs = db.occurrences.filter(o => o.contractId === c.id && o.status !== 'RESOLVED');
      openOccs.forEach(o => { if (o.severity === 'CRITICAL') { factors.push('Ocorrência crítica aberta'); score += 30; } else if (o.severity === 'HIGH') { factors.push('Ocorrência alta aberta'); score += 15; } else { factors.push('Ocorrência em aberto'); score += 5; } });
      const pendMsr = db.measurements.filter(m => m.contractId === c.id && (m.status === 'PENDING_FISCAL' || m.status === 'PENDING_GESTOR'));
      if (pendMsr.length > 0) { factors.push(`${pendMsr.length} medição(ões) pendente(s)`); score += 10 * pendMsr.length; }
      const pendAlt = db.alterations.filter(a => a.contractId === c.id && a.status === 'PENDING_APPROVAL');
      if (pendAlt.length > 0) { factors.push(`${pendAlt.length} aditivo(s) pendente(s)`); score += 5 * pendAlt.length; }
      const alerts = (db.contractAlerts || []).filter(a => a.contractId === c.id && a.status === 'PENDING');
      if (alerts.length > 0) { factors.push(`${alerts.length} alerta(s) ativo(s)`); score += 8 * alerts.length; }
      const riskLevel: RiskLevel = score >= 40 ? 'RED' : score >= 20 ? 'YELLOW' : 'GREEN';
      const lastActivity = [
        ...db.occurrences.filter(o => o.contractId === c.id).map(o => o.createdAt),
        ...db.measurements.filter(m => m.contractId === c.id).map(m => m.createdAt),
        c.signingDate,
      ].sort().reverse()[0] || c.signingDate;
      return { id: c.id, contractId: c.id, contractNumber: c.contractNumber, riskLevel, riskScore: Math.min(100, score), factors, daysUntilExpiry: d > 0 ? d : 0, pendingItems: openOccs.length + pendMsr.length + pendAlt.length, lastActivity };
    });
    items.sort((a, b) => b.riskScore - a.riskScore);
    return { items, summary: { red: items.filter(i => i.riskLevel === 'RED').length, yellow: items.filter(i => i.riskLevel === 'YELLOW').length, green: items.filter(i => i.riskLevel === 'GREEN').length } };
  }

  // Exclusão de medições/ocorrências/aditivos e a trilha de auditoria
  // ('/audit-logs') também são reais — o simulador local foi removido.

  if (endpoint.match(/^\/alerts\/[^/]+$/) && method === 'DELETE') {
    if (user.role !== 'ADMIN') throw new Error('Acesso negado');
    const id = endpoint.split('/')[2];
    db.contractAlerts = (db.contractAlerts || []).filter(a => a.id !== id);
    saveLocalDB(db);
    return { ok: true };
  }

  // ── IA ───────────────────────────────────────────────────────────────────────

  if (endpoint === '/ai/insights' && method === 'GET') {
    return { insights: db.aiInsights || [], status: 'MOCK', provider: 'LocalEngine', message: 'Motor de IA local ativo. Para IA avançada, configure OPENAI_API_KEY no backend.' };
  }

  if (endpoint === '/ai/analyze-contract' && method === 'POST') {
    const body = JSON.parse((options?.body as string) || '{}');
    const contract = db.contracts.find(c => c.id === body.contractId);
    if (!contract) throw new Error('Contrato não encontrado');
    return { contractId: body.contractId, analysis: `Análise simulada do contrato ${contract.contractNumber}. Risco: MÉDIO. Recomendação: monitorar vencimento e ocorrências abertas.`, risks: ['Ocorrência em aberto', 'Medição pendente'], suggestions: ['Resolver ocorrências', 'Homologar medições em atraso'], status: 'MOCK' };
  }

  throw new Error(`Endpoint não implementado: ${endpoint} [${method}] — ${originalError}`);
}

// ── API Object ─────────────────────────────────────────────────────────────────

export const api = {
  auth: {
    login: (creds: { email: string; password: string }) => request('/auth/login', { method: 'POST', body: JSON.stringify(creds) }),
    me: () => request('/auth/me'),
  },

  alerts: {
    list: () => request('/alerts'),
    all: () => request('/alerts/all'),
    sentByGestor: () => request('/alerts/sent-by-gestor'),
    runEngine: () => request('/alerts/run-engine', { method: 'POST' }),
    respond: (id: string, response: ContractAlertResponse) => request(`/alerts/${id}/respond`, { method: 'POST', body: JSON.stringify({ response }) }),
    dismiss: (id: string) => request(`/alerts/${id}/dismiss`, { method: 'POST' }),
    delete: (id: string) => request(`/alerts/${id}`, { method: 'DELETE' }),
    sendToFiscal: (data: { contractId: string; fiscalId: string; alertType: string; message: string }) => request('/alerts/send-to-fiscal', { method: 'POST', body: JSON.stringify(data) }),
    confirmReceipt: (id: string) => request(`/alerts/${id}/confirm-receipt`, { method: 'POST' }),
    closeNotSent: (id: string) => request(`/alerts/${id}/close-not-sent`, { method: 'POST' }),
  },
  communications: {
    listByContract: (cId: string) => request(`/contracts/${cId}/communications`),
    listAll: () => request('/communications/all'),
    create: (data: any) => request('/communications', { method: 'POST', body: JSON.stringify(data) }),
    reply: (data: any) => request('/communications', { method: 'POST', body: JSON.stringify(data) }),
    complete: (id: string) => request(`/communications/${id}/complete`, { method: 'POST' }),
  },
  measurements: {
    create: (data: any) => request('/measurements', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: string) => request(`/measurements/${id}/approve`, { method: 'POST' }),
    reject: (id: string, reason: string) => request(`/measurements/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
    listByContract: (cId: string) => request(`/measurements/contract/${cId}`),
    delete: (id: string) => request(`/measurements/${id}`, { method: 'DELETE' }),
  },
  occurrences: {
    create: (data: any) => request('/occurrences', { method: 'POST', body: JSON.stringify(data) }),
    resolve: (id: string, resolutionDescription: string) => request(`/occurrences/${id}/resolve`, { method: 'POST', body: JSON.stringify({ resolutionDescription }) }),
    listByContract: (cId: string) => request(`/occurrences/contract/${cId}`),
    delete: (id: string) => request(`/occurrences/${id}`, { method: 'DELETE' }),
  },
  alterations: {
    create: (data: any) => request('/alterations', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: string) => request(`/alterations/${id}/approve`, { method: 'POST' }),
    reject: (id: string, reason: string) => request(`/alterations/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
    update: (id: string, data: any) => request(`/alterations/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    listByContract: (cId: string) => request(`/alterations/contract/${cId}`),
    delete: (id: string) => request(`/alterations/${id}`, { method: 'DELETE' }),
  },
  contractors: {
    list: () => request('/contractors'),
    create: (data: any) => request('/contractors', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/contractors/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },
  payments: {
    create: (data: any) => request('/payments', { method: 'POST', body: JSON.stringify(data) }),
    listByContract: (contractId: string) => request(`/payments/contract/${contractId}`),
    delete: (id: string) => request(`/payments/${id}`, { method: 'DELETE' }),
  },
  contracts: {
    list: () => request('/contracts'),
    get: (id: string) => request(`/contracts/${id}`),
    report: () => request('/contracts/report'),
    create: (data: any) => request('/contracts', { method: 'POST', body: JSON.stringify(data) }),
    assignFiscal: (id: string, data: any) => request(`/contracts/${id}/assign-fiscal`, { method: 'POST', body: JSON.stringify(data) }),
    stats: () => request('/contracts/stats'),
    updateData: (id: string, data: any) => request(`/contracts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    conclude: (id: string) => request(`/contracts/${id}`, { method: 'PATCH', body: JSON.stringify({ status: 'CONCLUDED' }) }),
    delete: (id: string) => request(`/contracts/${id}`, { method: 'DELETE' }),
    deactivateAssignment: (contractId: string, assignmentId: string) =>
      request(`/contracts/${contractId}/assignments/${assignmentId}/deactivate`, { method: 'PATCH' }),
    // Exclusão real (não soft-delete) de uma designação da comissão de
    // fiscalização — diferente de deactivateAssignment.
    removeAssignment: (contractId: string, assignmentId: string) =>
      request(`/contracts/${contractId}/assignments/${assignmentId}`, { method: 'DELETE' }),
  },
  processes: {
    list: () => request('/processes'),
    get: (id: string) => request(`/processes/${id}`),
    create: (data: any) => request('/processes', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => request(`/processes/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    update: (id: string, data: any) => request(`/processes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    getPhases: (id: string) => request(`/processes/${id}/phases`),
    addPhase: (id: string, data: any) => request(`/processes/${id}/phases`, { method: 'POST', body: JSON.stringify(data) }),
    updatePhase: (processId: string, phaseId: string, data: any) => request(`/processes/${processId}/phases/${phaseId}`, { method: 'PATCH', body: JSON.stringify(data) }),
    updateData: (id: string, data: any) => request(`/processes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/processes/${id}`, { method: 'DELETE' }),
  },
  users: {
    listAll: () => request('/users'),
    create: (data: any) => request('/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    toggleStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => request(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    delete: (id: string) => request(`/users/${id}`, { method: 'DELETE' }),
  },
  pendingDashboard: {
    get: () => request('/pending-dashboard'),
  },
  dashboard: {
    gestor: () => request('/dashboard/gestor'),
    fiscal: () => request('/dashboard/fiscal'),
  },
  risk: {
    panel: () => request('/risk-panel'),
  },
  audit: {
    // Trilha de auditoria real, persistida no backend (backend/src/audit).
    // Não existe endpoint de exclusão: registros são imutáveis por design.
    list: (query?: AuditLogQuery): Promise<AuditLogPage> => {
      const params = new URLSearchParams();
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.set(key, String(value));
          }
        });
      }
      const qs = params.toString();
      return request(`/audit-logs${qs ? `?${qs}` : ''}`);
    },
    summary: (): Promise<{ eventsToday: number; eventsLast7Days: number; activeUsers: number; criticalActions: number }> =>
      request('/audit-logs/summary'),
    filters: (): Promise<{ modules: string[]; actions: string[]; entities: string[] }> =>
      request('/audit-logs/filters'),
  },
  ai: {
    insights: () => request('/ai/insights'),
    analyzeContract: (contractId: string) => request('/ai/analyze-contract', { method: 'POST', body: JSON.stringify({ contractId }) }),
  },
  utils: {
    getContractors: () => request('/contractors'),
    getProcesses: () => request('/processes'),
    getFiscais: () => request('/users/fiscais'),
    getGestores: () => request('/users/gestores'),
  },
};
