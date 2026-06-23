// Tipos do Sistema
export type UserRole = 'ADMIN' | 'GESTOR' | 'FISCAL';
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
export type ProcessStatus = 'PLANNING' | 'LEGAL_REVIEW' | 'BIDDING' | 'CONTRACT_PREP' | 'EXECUTION' | 'CONCLUDED' | 'CANCELED';
export type BiddingModality = 'LICITACAO_13303' | 'DISPENSA_13303' | 'INEXIGIBILIDADE' | 'PREGAO_ELETRONICO' | 'OUTROS';
export interface ProcurementProcess {
  id: string; processNumber: string; subject: string; description?: string; status: ProcessStatus;
  modality: BiddingModality; estimatedValue: number; requesterDepartment: string; requesterId: string;
  responsibleFiscalId?: string; relatedProcessNumbers?: string[]; legalBasis?: string; contractReference?: string;
  currentAddendum?: string; fiscalOrdinance?: string; observation?: string; responsibleFiscal?: User;
  phases?: ProcessPhase[]; workflowItems?: ProcessWorkflowItem[];
}
export type ContractStatus = 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'CONCLUDED' | 'RESCINDED';
export interface Contract {
  id: string; contractNumber: string; processId?: string; contractorId: string;
  objectDescription: string; initialValue: number; currentValue: number;
  worksheetOrder?: number; amendmentSummary?: string; monthlyValue?: number; outstandingBalance?: number; observation?: string;
  signingDate: string; startDate: string; endDate: string; status: ContractStatus; managerId?: string;
  contractor?: Contractor; process?: ProcurementProcess; fiscalAssignments?: FiscalAssignment[];
  occurrences?: Occurrence[]; measurements?: InspectionMeasurement[]; alterations?: ContractAlteration[];
  documents?: DocumentFile[]; communications?: Communication[];
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
export interface DocumentFile {
  id: string; contractId?: string; processId?: string; occurrenceId?: string; measurementId?: string;
  category: string; title: string; fileKey: string; fileSize: number; mimeType: string;
  uploadedById: string; createdAt: string;
}
export interface Communication {
  id: string; contractId: string; senderId: string; recipientId?: string; subject: string;
  message: string; parentId?: string; readBy?: string[]; isMandatory?: boolean; createdAt: string;
  sender?: { name: string; role: string }; recipient?: { name: string }; replies?: Communication[];
}
export interface SystemAlert {
  id: string; contractId?: string; type: string; message: string; targetRole: UserRole; isRead: boolean; createdAt: string;
}

// ── Novos Tipos ────────────────────────────────────────────────────────────────

export type ContractAlertType =
  | 'CONTRACT_EXPIRING_180' | 'CONTRACT_EXPIRING_90'
  | 'RENEWAL_REQUESTED' | 'RENEWAL_APPROVED' | 'RENEWAL_REJECTED'
  | 'MEASUREMENT_OVERDUE' | 'ALTERATION_OVERDUE'
  | 'OCCURRENCE_CRITICAL_OPEN' | 'PROCESS_PHASE_OVERDUE'
  | 'NEW_PROCESS_AUTO_CREATED' | 'COMMUNICATION_MANDATORY';

export type ContractAlertStatus = 'PENDING' | 'RESPONDED' | 'DISMISSED' | 'EXPIRED';
export type ContractAlertResponse = 'EXTEND_CONTRACT' | 'NEW_PROCESS' | 'APPROVE' | 'REJECT' | 'ACKNOWLEDGED';

export interface ContractAlert {
  id: string; contractId?: string; processId?: string; targetUserId: string;
  type: ContractAlertType; status: ContractAlertStatus; response?: ContractAlertResponse;
  respondedAt?: string; respondedById?: string; title: string; message: string;
  metadata?: any; expiresAt?: string; createdAt: string; updatedAt: string;
}

export type PhaseStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' | 'BLOCKED';

export interface ProcessPhase {
  id: string; processId: string; phaseNumber: number; name: string; status: PhaseStatus;
  plannedStart?: string; plannedEnd?: string; actualStart?: string; actualEnd?: string;
  responsibleId?: string; observations?: string; isActive: boolean; createdAt: string; updatedAt: string;
  responsible?: User;
  workflowItems?: ProcessWorkflowItem[];
}

export type WorkflowItemType = 'DOCUMENT' | 'ACTION';
export type WorkflowItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'WAIVED';
export type WorkflowTargetRole = 'GESTOR' | 'FISCAL';

export interface ProcessWorkflowItem {
  id: string; processId: string; phaseId?: string; title: string; description?: string;
  type: WorkflowItemType; targetRole: WorkflowTargetRole; status: WorkflowItemStatus; isRequired: boolean;
  dueDate?: string; createdAt: string; updatedAt: string;
}

export const PHASE_NAMES = [
  'Planejamento da Contratação', 'Estudo Técnico Preliminar', 'Termo de Referência',
  'Pesquisa de Preços', 'Aprovação', 'Licitação / Contratação Direta',
  'Formalização Contratual', 'Execução Contratual', 'Encerramento',
];

// ── Tipos de BI / Auditoria / IA ──────────────────────────────────────────────

export type RiskLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface RiskItem {
  id: string; contractId?: string; processId?: string; contractNumber?: string; subject?: string;
  riskLevel: RiskLevel; riskScore: number; factors: string[]; daysUntilExpiry?: number;
  pendingItems: number; lastActivity: string;
}

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT' | 'LOGIN' | 'LOGOUT';

export interface AuditLog {
  id: string; userId: string; userName: string; userRole: UserRole; action: AuditAction;
  entity: string; entityId: string; entityLabel: string; changes?: Record<string, { from: any; to: any }>;
  ipAddress?: string; userAgent?: string; createdAt: string; deletedAt?: string;
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
  charts: {
    byModality: { name: string; value: number }[];
    byStatus: { name: string; value: number }[];
    byFiscal: { name: string; value: number }[];
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
  { id: 'usr-admin', name: 'Auditor Carlos Silva', email: 'admin@sigecontratos.com', role: 'ADMIN', status: 'ACTIVE', registrationNumber: 'IQG-8890' },
  { id: 'usr-gestor', name: 'Gestora Ana Souza', email: 'gestor@sigecontratos.com', role: 'GESTOR', status: 'ACTIVE', registrationNumber: 'IQG-5421' },
  { id: 'usr-fiscal1', name: 'Fiscal João Oliveira', email: 'fiscal1@sigecontratos.com', role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-3312' },
  { id: 'usr-fiscal2', name: 'Fiscal Maria Santos', email: 'fiscal2@sigecontratos.com', role: 'FISCAL', status: 'ACTIVE', registrationNumber: 'IQG-4123' },
];

const SEED_CONTRACTORS: Contractor[] = [
  { id: 'ctr-alfa', corporateName: 'Indústria Química Alfa S.A.', tradeName: 'Alfa Química', cnpjCpf: '12.345.678/0001-90', email: 'contato@alfaquimica.com.br', phone: '(62) 3200-1122', postalCode: '74000-000', addressStreet: 'Avenida das Indústrias', addressNumber: '1000', addressNeighborhood: 'Distrito Industrial', addressCity: 'Goiânia', addressState: 'GO' },
  { id: 'ctr-dharma', corporateName: 'Dharma Distribuidora de Reagentes Eireli', tradeName: 'Dharma Reagentes', cnpjCpf: '98.765.432/0001-10', email: 'vendas@dharmareagentes.com.br', phone: '(62) 3541-9988', postalCode: '74110-020', addressStreet: 'Rua T-55', addressNumber: '450', addressNeighborhood: 'Setor Bueno', addressCity: 'Goiânia', addressState: 'GO' },
];

const SEED_PROCESSES: ProcurementProcess[] = [
  { id: 'prc-123', processNumber: 'IQUEGO-PRC-2026/00123', subject: 'Aquisição de insumos químicos para produção de medicamentos essenciais', description: 'Processo destinado à compra de matéria-prima para formulações farmacêuticas em atendimento ao SUS.', status: 'CONCLUDED', modality: 'LICITACAO_13303', estimatedValue: 1200000.00, requesterDepartment: 'Gerência de Produção', requesterId: 'usr-fiscal1' },
  { id: 'prc-140', processNumber: 'IQUEGO-PRC-2026/00140', subject: 'Contratação de serviços de calibração de equipamentos laboratoriais', description: 'Manutenção de centrífugas e aparelhos HPLC do laboratório.', status: 'PLANNING', modality: 'DISPENSA_13303', estimatedValue: 48000.00, requesterDepartment: 'Controle de Qualidade', requesterId: 'usr-fiscal2' },
];

// cnt-52 encerra em ~150 dias (2026-11-07) → dentro da janela de 180 dias
const SEED_CONTRACTS: Contract[] = [
  { id: 'cnt-45', contractNumber: 'IQUEGO-CTR-2026/00045', processId: 'prc-123', contractorId: 'ctr-alfa', objectDescription: 'Fornecimento parcelado de sais minerais e princípios ativos farmacêuticos para formulações sólidas.', initialValue: 1200000.00, currentValue: 1250000.00, signingDate: '2026-01-05', startDate: '2026-01-10', endDate: '2027-01-09', status: 'ACTIVE', managerId: 'usr-gestor' },
  { id: 'cnt-52', contractNumber: 'IQUEGO-CTR-2025/00052', contractorId: 'ctr-dharma', objectDescription: 'Prestação de serviços de calibração, qualificação e manutenção de equipamentos laboratoriais HPLC, centrífugas e sistemas de purificação de água.', initialValue: 48000.00, currentValue: 48000.00, signingDate: '2025-11-15', startDate: '2025-11-20', endDate: '2026-11-07', status: 'ACTIVE', managerId: 'usr-gestor' },
];

const SEED_ASSIGNMENTS: FiscalAssignment[] = [
  { id: 'asg-1', contractId: 'cnt-45', fiscalId: 'usr-fiscal1', role: 'TITULAR', designationAct: 'Portaria nº 012/2026-DG', designationDate: '2026-01-06', startDate: '2026-01-10', isActive: true },
  { id: 'asg-2', contractId: 'cnt-45', fiscalId: 'usr-fiscal2', role: 'SUBSTITUTO', designationAct: 'Portaria nº 012/2026-DG', designationDate: '2026-01-06', startDate: '2026-01-10', isActive: true },
  { id: 'asg-3', contractId: 'cnt-52', fiscalId: 'usr-fiscal2', role: 'TITULAR', designationAct: 'Portaria nº 089/2025-DG', designationDate: '2025-11-17', startDate: '2025-11-20', isActive: true },
];

const SEED_OCCURRENCES: Occurrence[] = [
  { id: 'occ-1', contractId: 'cnt-45', fiscalId: 'usr-fiscal1', title: 'Atraso de 48h na entrega do Lote 02', description: 'O fornecedor entregou a matéria-prima com 2 dias de atraso em relação ao cronograma.', severity: 'MEDIUM', status: 'RESOLVED', resolutionDescription: 'A empresa justificou atraso alfandegário e comprometeu-se a compensar na próxima remessa.', resolvedById: 'usr-gestor', resolvedAt: '2026-03-15T14:30:00Z', createdAt: '2026-03-10T09:00:00Z' },
  { id: 'occ-2', contractId: 'cnt-45', fiscalId: 'usr-fiscal1', title: 'Divergência em laudo de pureza química', description: 'O reagente X apresentou teor de pureza de 97.5% no laudo interno, enquanto o fabricante alegava 99.0%.', severity: 'HIGH', status: 'OPEN', createdAt: '2026-05-28T10:15:00Z' },
];

const SEED_MEASUREMENTS: InspectionMeasurement[] = [
  { id: 'msr-1', contractId: 'cnt-45', fiscalId: 'usr-fiscal1', periodStart: '2026-01-10', periodEnd: '2026-02-09', measurementValue: 100000.00, reportDescription: 'Primeira entrega realizada com sucesso.', status: 'APPROVED', approvedById: 'usr-gestor', approvalDate: '2026-02-15T16:00:00Z', createdAt: '2026-02-12T11:00:00Z' },
  { id: 'msr-2', contractId: 'cnt-45', fiscalId: 'usr-fiscal1', periodStart: '2026-05-10', periodEnd: '2026-06-09', measurementValue: 125000.00, reportDescription: 'Medição referente à quinta parcela. Documentação e certidões negativas anexadas.', status: 'PENDING_GESTOR', createdAt: '2026-06-01T17:30:00Z' },
];

const SEED_ALTERATIONS: ContractAlteration[] = [
  { id: 'alt-1', contractId: 'cnt-45', type: 'ADDENDUM_VALUE_INCREASE', alterationNumber: '1º Termo Aditivo', valueChange: 50000.00, justification: 'Acréscimo para aquisição complementar de embalagens especiais resistentes a humidade.', status: 'APPROVED', requestedById: 'usr-fiscal1', reviewedById: 'usr-gestor', reviewDate: '2026-04-20T10:00:00Z', reviewNotes: 'Parecer jurídico nº 45/2026 favorável.', createdAt: '2026-04-12T14:00:00Z' },
];

const SEED_ALERTS: SystemAlert[] = [
  { id: 'al-1', contractId: 'cnt-45', type: 'OCCURRENCE_CRITICAL', message: 'Ocorrência de alta gravidade: Divergência em laudo de pureza química no Contrato IQUEGO-CTR-2026/00045.', targetRole: 'GESTOR', isRead: false, createdAt: '2026-05-28T10:15:00Z' },
  { id: 'al-2', contractId: 'cnt-45', type: 'MEASUREMENT_PENDING', message: 'Medição pendente de homologação no valor de R$ 125.000,00 para o Contrato IQUEGO-CTR-2026/00045.', targetRole: 'GESTOR', isRead: false, createdAt: '2026-06-01T17:30:00Z' },
];

const SEED_PROCESS_PHASES: ProcessPhase[] = [
  // prc-123 (CONCLUDED) — todas as fases concluídas
  ...[1,2,3,4,5,6,7,8,9].map((n): ProcessPhase => ({
    id: `phase-123-${n}`, processId: 'prc-123', phaseNumber: n, name: PHASE_NAMES[n-1], status: 'COMPLETED',
    plannedStart: `2025-0${Math.min(9,5+Math.floor((n-1)/2))}-01`, plannedEnd: `2025-0${Math.min(9,5+Math.floor((n-1)/2))}-28`,
    actualStart: `2025-0${Math.min(9,5+Math.floor((n-1)/2))}-01`, actualEnd: `2025-0${Math.min(9,5+Math.floor((n-1)/2))}-25`,
    responsibleId: 'usr-fiscal1', isActive: true, createdAt: '2025-06-01T00:00:00Z', updatedAt: '2025-12-01T00:00:00Z',
  })),
  // prc-140 (PLANNING) — fase 1 em atraso, demais pendentes
  { id: 'phase-140-1', processId: 'prc-140', phaseNumber: 1, name: PHASE_NAMES[0], status: 'IN_PROGRESS', plannedStart: '2026-05-15', plannedEnd: '2026-05-31', actualStart: '2026-05-16', responsibleId: 'usr-fiscal2', observations: 'Em andamento. Aguardando validação do ETP interno.', isActive: true, createdAt: '2026-05-15T00:00:00Z', updatedAt: '2026-05-16T00:00:00Z' },
  ...[2,3,4,5,6,7,8,9].map((n): ProcessPhase => ({
    id: `phase-140-${n}`, processId: 'prc-140', phaseNumber: n, name: PHASE_NAMES[n-1], status: 'PENDING',
    responsibleId: 'usr-fiscal2', isActive: true, createdAt: '2026-05-15T00:00:00Z', updatedAt: '2026-05-15T00:00:00Z',
  })),
];

const SEED_COMMUNICATIONS: Communication[] = [
  { id: 'comm-1', contractId: 'cnt-45', senderId: 'usr-gestor', recipientId: 'usr-fiscal1', subject: 'Início da execução contratual', message: 'Prezado Fiscal João Oliveira, favor iniciar os registros mensais de fiscalização e atentar-se às conformidades de pureza química.', isMandatory: false, readBy: ['usr-gestor', 'usr-fiscal1'], createdAt: '2026-01-11T09:00:00Z' },
  { id: 'comm-2', contractId: 'cnt-45', senderId: 'usr-gestor', subject: 'URGENTE — Relatório de Fiscalização Semestral', message: 'Todos os fiscais do contrato devem submeter o relatório de fiscalização semestral até o dia 30/06/2026. O não cumprimento será registrado como infração funcional.', isMandatory: true, readBy: ['usr-gestor'], createdAt: '2026-06-01T08:00:00Z' },
];

const SEED_AUDIT_LOGS: AuditLog[] = [
  { id: 'aud-1', userId: 'usr-gestor', userName: 'Gestora Ana Souza', userRole: 'GESTOR', action: 'CREATE', entity: 'Contract', entityId: 'cnt-45', entityLabel: 'IQUEGO-CTR-2026/00045', createdAt: '2026-01-05T10:00:00Z' },
  { id: 'aud-2', userId: 'usr-fiscal1', userName: 'Fiscal João Oliveira', userRole: 'FISCAL', action: 'CREATE', entity: 'Occurrence', entityId: 'occ-2', entityLabel: 'Divergência em laudo de pureza química', createdAt: '2026-05-28T10:15:00Z' },
  { id: 'aud-3', userId: 'usr-gestor', userName: 'Gestora Ana Souza', userRole: 'GESTOR', action: 'APPROVE', entity: 'Measurement', entityId: 'msr-1', entityLabel: 'Medição Jan/2026 — R$ 100.000', createdAt: '2026-02-15T16:00:00Z', changes: { status: { from: 'PENDING_GESTOR', to: 'APPROVED' } } },
  { id: 'aud-4', userId: 'usr-gestor', userName: 'Gestora Ana Souza', userRole: 'GESTOR', action: 'APPROVE', entity: 'Alteration', entityId: 'alt-1', entityLabel: '1º Termo Aditivo — R$ 50.000', createdAt: '2026-04-20T10:00:00Z', changes: { status: { from: 'PENDING_APPROVAL', to: 'APPROVED' } } },
  { id: 'aud-5', userId: 'usr-fiscal1', userName: 'Fiscal João Oliveira', userRole: 'FISCAL', action: 'CREATE', entity: 'Measurement', entityId: 'msr-2', entityLabel: 'Medição Jun/2026 — R$ 125.000', createdAt: '2026-06-01T17:30:00Z' },
  { id: 'aud-6', userId: 'usr-gestor', userName: 'Gestora Ana Souza', userRole: 'GESTOR', action: 'LOGIN', entity: 'Session', entityId: 'sess-1', entityLabel: 'Login realizado', createdAt: '2026-06-10T08:00:00Z' },
];

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
  alerts: SystemAlert[]; contractAlerts: ContractAlert[];
  processPhases: ProcessPhase[]; communications: Communication[];
  auditLogs: AuditLog[]; aiInsights: AIInsight[];
}

function getLocalDB(): LocalDB {
  const blank: LocalDB = { users: SEED_USERS, contractors: SEED_CONTRACTORS, processes: SEED_PROCESSES, contracts: SEED_CONTRACTS, assignments: SEED_ASSIGNMENTS, occurrences: SEED_OCCURRENCES, measurements: SEED_MEASUREMENTS, alterations: SEED_ALTERATIONS, alerts: SEED_ALERTS, contractAlerts: [], processPhases: SEED_PROCESS_PHASES, communications: SEED_COMMUNICATIONS, auditLogs: SEED_AUDIT_LOGS, aiInsights: SEED_AI_INSIGHTS };
  if (typeof window === 'undefined') return blank;
  const raw = localStorage.getItem('sigecontratos_db');
  if (!raw) { localStorage.setItem('sigecontratos_db', JSON.stringify(blank)); return blank; }
  const db = JSON.parse(raw) as LocalDB;
  // Backfill new collections for existing sessions
  if (!db.contractAlerts) db.contractAlerts = [];
  if (!db.processPhases) db.processPhases = [...SEED_PROCESS_PHASES];
  if (!db.communications) db.communications = [...SEED_COMMUNICATIONS];
  if (!db.auditLogs) db.auditLogs = [...SEED_AUDIT_LOGS];
  if (!db.aiInsights) db.aiInsights = [...SEED_AI_INSIGHTS];
  // Backfill new contract
  if (!db.contracts.find(c => c.id === 'cnt-52')) db.contracts.push(SEED_CONTRACTS[1]);
  if (!db.assignments.find(a => a.id === 'asg-3')) db.assignments.push(SEED_ASSIGNMENTS[2]);
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

function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000); }
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

// ── Requisição HTTP com Fallback ───────────────────────────────────────────────

// Em Docker: o browser chama /api/* e o Next.js server faz o proxy para o backend.
// Em dev local sem backend: a conexão falha e o fallback para localStorage assume.
const BACKEND_URL = '/api';

async function request(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });
    if (res.status === 401) { setStoredToken(null); setStoredUser(null); throw new Error('Não autorizado'); }
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || 'Erro na requisição'); }
    return await res.json();
  } catch (error: any) {
    return handleLocalFallback(endpoint, options, error.message);
  }
}

// ── Fallback Simulado ──────────────────────────────────────────────────────────

function handleLocalFallback(endpoint: string, options: RequestInit = {}, originalError: string): any {
  const db = getLocalDB();
  const user = getStoredUser();
  const method = options.method || 'GET';

  // Login
  if (endpoint === '/auth/login' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const found = db.users.find(u => u.email === body.email);
    if (!found) throw new Error('E-mail ou senha incorretos');
    const pass = body.password ?? body.passwordHash ?? '';
    const ok = (found.role === 'ADMIN' && pass === 'admin123') || (found.role === 'GESTOR' && pass === 'gestor123') || (found.role === 'FISCAL' && pass === 'fiscal123');
    if (!ok) throw new Error('E-mail ou senha incorretos');
    return { access_token: 'local-jwt-simulated', user: found };
  }

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
    return processAlertResponse(id, body.response as ContractAlertResponse, db, user);
  }

  if (endpoint.match(/^\/alerts\/[^/]+\/dismiss$/) && method === 'POST') {
    const id = endpoint.split('/')[2];
    const alert = db.contractAlerts.find(a => a.id === id);
    if (alert) { alert.status = 'DISMISSED'; alert.updatedAt = new Date().toISOString(); saveLocalDB(db); }
    return alert;
  }

  if (endpoint === '/alerts/all' && method === 'GET') {
    return (db.contractAlerts || []).filter(a => a.targetUserId === user.id);
  }

  // ── Stats ─────────────────────────────────────────────────────────────────────

  if (endpoint === '/contracts/stats' && method === 'GET') {
    let contracts = db.contracts;
    if (user.role === 'FISCAL') {
      const ids = db.assignments.filter(a => a.fiscalId === user.id && a.isActive).map(a => a.contractId);
      contracts = contracts.filter(c => ids.includes(c.id));
    }
    let totalValue = 0, totalMeasured = 0, openOccurrences = 0;
    contracts.forEach(c => {
      totalValue += Number(c.currentValue);
      db.measurements.filter(m => m.contractId === c.id && m.status === 'APPROVED').forEach(m => totalMeasured += Number(m.measurementValue));
      openOccurrences += db.occurrences.filter(o => o.contractId === c.id && o.status === 'OPEN').length;
    });
    const alerts = db.alerts.filter(a => a.targetRole === user.role && !a.isRead).slice(0, 5);
    const pendingAlerts = (db.contractAlerts || []).filter(a => a.targetUserId === user.id && a.status === 'PENDING').length;
    return { totalContracts: contracts.length, activeContracts: contracts.filter(c => c.status === 'ACTIVE').length, totalValue, totalMeasured, openOccurrences, alerts, pendingAlerts };
  }

  // ── Contratos ─────────────────────────────────────────────────────────────────

  if (endpoint === '/contracts' && method === 'GET') {
    let contracts = db.contracts;
    if (user.role === 'FISCAL') {
      const ids = db.assignments.filter(a => a.fiscalId === user.id && a.isActive).map(a => a.contractId);
      contracts = contracts.filter(c => ids.includes(c.id));
    }
    return contracts.map(c => ({ ...c, contractor: db.contractors.find(ct => ct.id === c.contractorId), fiscalAssignments: db.assignments.filter(a => a.contractId === c.id && a.isActive).map(a => ({ ...a, fiscal: db.users.find(u => u.id === a.fiscalId) })) }));
  }

  if (endpoint.match(/^\/contracts\/[^/]+$/) && method === 'GET') {
    const id = endpoint.split('/')[2];
    const c = db.contracts.find(c => c.id === id);
    if (!c) throw new Error('Contrato não encontrado');
    if (user.role === 'FISCAL' && !db.assignments.some(a => a.contractId === id && a.fiscalId === user.id && a.isActive)) throw new Error('Acesso negado');
    return {
      ...c,
      contractor: db.contractors.find(ct => ct.id === c.contractorId),
      process: db.processes.find(p => p.id === c.processId),
      fiscalAssignments: db.assignments.filter(a => a.contractId === id).map(a => ({ ...a, fiscal: db.users.find(u => u.id === a.fiscalId) })),
      occurrences: db.occurrences.filter(o => o.contractId === id).map(o => ({ ...o, fiscal: db.users.find(u => u.id === o.fiscalId), resolver: o.resolvedById ? db.users.find(u => u.id === o.resolvedById) : null })),
      measurements: db.measurements.filter(m => m.contractId === id).map(m => ({ ...m, fiscal: db.users.find(u => u.id === m.fiscalId), approver: m.approvedById ? db.users.find(u => u.id === m.approvedById) : null })),
      alterations: db.alterations.filter(alt => alt.contractId === id).map(alt => ({ ...alt, requester: db.users.find(u => u.id === alt.requestedById), reviewer: alt.reviewedById ? db.users.find(u => u.id === alt.reviewedById) : null })),
      documents: [{ id: 'doc-1', title: 'Contrato Assinado.pdf', category: 'CONTRACT_SIGNED', fileSize: 3415020, mimeType: 'application/pdf', uploadedById: 'usr-gestor', createdAt: c.signingDate }],
      communications: db.communications.filter(cm => cm.contractId === id).map(cm => ({ ...cm, sender: db.users.find(u => u.id === cm.senderId), recipient: cm.recipientId ? db.users.find(u => u.id === cm.recipientId) : null })),
    };
  }

  if (endpoint === '/contracts' && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const body = JSON.parse(options.body as string);
    const nc: Contract = { id: `cnt-${Date.now()}`, contractNumber: body.contractNumber, processId: body.processId || undefined, contractorId: body.contractorId, objectDescription: body.objectDescription, initialValue: Number(body.initialValue), currentValue: Number(body.initialValue), signingDate: body.signingDate, startDate: body.startDate, endDate: body.endDate, status: 'ACTIVE', managerId: user.id };
    db.contracts.push(nc); saveLocalDB(db); return nc;
  }

  if (endpoint.endsWith('/assign-fiscal') && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const contractId = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    if (body.role === 'TITULAR' || body.role === 'SUBSTITUTO') db.assignments.forEach(a => { if (a.contractId === contractId && a.role === body.role) a.isActive = false; });
    const na: FiscalAssignment = { id: `asg-${Date.now()}`, contractId, fiscalId: body.fiscalId, role: body.role, designationAct: body.designationAct, designationDate: body.designationDate, startDate: body.startDate, endDate: body.endDate || undefined, isActive: true };
    db.assignments.push(na); saveLocalDB(db); return na;
  }

  // ── Medições ──────────────────────────────────────────────────────────────────

  if (endpoint === '/measurements' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const nm: InspectionMeasurement = { id: `msr-${Date.now()}`, contractId: body.contractId, fiscalId: user.id, periodStart: body.periodStart, periodEnd: body.periodEnd, measurementValue: Number(body.measurementValue), reportDescription: body.reportDescription, status: 'PENDING_GESTOR', createdAt: new Date().toISOString() };
    db.measurements.push(nm);
    const c = db.contracts.find(c => c.id === body.contractId);
    db.alerts.push({ id: `al-${Date.now()}`, contractId: body.contractId, type: 'MEASUREMENT_PENDING', message: `Medição pendente de ${fmtCur(Number(body.measurementValue))} para o contrato ${c?.contractNumber}.`, targetRole: 'GESTOR', isRead: false, createdAt: new Date().toISOString() });
    saveLocalDB(db); return nm;
  }

  if (endpoint.endsWith('/approve') && endpoint.includes('/measurements/') && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const id = endpoint.split('/')[2];
    const m = db.measurements.find(m => m.id === id);
    if (!m) throw new Error('Medição não encontrada');
    m.status = 'APPROVED'; m.approvedById = user.id; m.approvalDate = new Date().toISOString();
    // Dismiss related overdue alert
    db.contractAlerts.filter(a => a.type === 'MEASUREMENT_OVERDUE' && a.metadata?.measurementId === id).forEach(a => { a.status = 'DISMISSED'; a.updatedAt = new Date().toISOString(); });
    saveLocalDB(db); return m;
  }

  if (endpoint.endsWith('/reject') && endpoint.includes('/measurements/') && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const m = db.measurements.find(m => m.id === id);
    if (!m) throw new Error('Medição não encontrada');
    m.status = 'REJECTED'; m.rejectionReason = body.reason;
    saveLocalDB(db); return m;
  }

  // ── Ocorrências ───────────────────────────────────────────────────────────────

  if (endpoint === '/occurrences' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const no: Occurrence = { id: `occ-${Date.now()}`, contractId: body.contractId, fiscalId: user.id, title: body.title, description: body.description, severity: body.severity || 'MEDIUM', status: 'OPEN', createdAt: new Date().toISOString() };
    db.occurrences.push(no);
    if (body.severity === 'HIGH' || body.severity === 'CRITICAL') {
      const c = db.contracts.find(c => c.id === body.contractId);
      db.alerts.push({ id: `al-${Date.now()}`, contractId: body.contractId, type: 'OCCURRENCE_CRITICAL', message: `Ocorrência ${body.severity} registrada: "${body.title}" — ${c?.contractNumber}.`, targetRole: 'GESTOR', isRead: false, createdAt: new Date().toISOString() });
    }
    saveLocalDB(db); return no;
  }

  if (endpoint.endsWith('/resolve') && endpoint.includes('/occurrences/') && method === 'POST') {
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const o = db.occurrences.find(o => o.id === id);
    if (!o) throw new Error('Ocorrência não encontrada');
    o.status = 'RESOLVED'; o.resolutionDescription = body.resolutionDescription; o.resolvedById = user.id; o.resolvedAt = new Date().toISOString();
    db.contractAlerts.filter(a => a.type === 'OCCURRENCE_CRITICAL_OPEN' && a.metadata?.occurrenceId === id).forEach(a => { a.status = 'DISMISSED'; a.updatedAt = new Date().toISOString(); });
    saveLocalDB(db); return o;
  }

  // ── Alterações ────────────────────────────────────────────────────────────────

  if (endpoint === '/alterations' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const contract = db.contracts.find(c => c.id === body.contractId);
    if (!contract) throw new Error('Contrato não encontrado');
    const valueChange = Number(body.valueChange || 0);
    if (body.type === 'ADDENDUM_VALUE_INCREASE') {
      const isReform = contract.objectDescription.toLowerCase().includes('reforma');
      const limit = contract.initialValue * (isReform ? 0.50 : 0.25);
      const current = db.alterations.filter(a => a.contractId === contract.id && a.type === 'ADDENDUM_VALUE_INCREASE' && a.status === 'APPROVED').reduce((s, a) => s + a.valueChange, 0);
      if (current + valueChange > limit) throw new Error(`Limite de aditivo excedido. Permitido: ${fmtCur(limit)} (${isReform ? '50%' : '25%'})`);
    }
    const na: ContractAlteration = { id: `alt-${Date.now()}`, contractId: body.contractId, type: body.type, alterationNumber: body.alterationNumber, valueChange, newEndDate: body.newEndDate, justification: body.justification, status: 'PENDING_APPROVAL', requestedById: user.id, createdAt: new Date().toISOString() };
    db.alterations.push(na); saveLocalDB(db); return na;
  }

  if (endpoint.endsWith('/approve') && endpoint.includes('/alterations/') && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const id = endpoint.split('/')[2];
    const alt = db.alterations.find(a => a.id === id);
    if (!alt) throw new Error('Alteração não encontrada');
    const c = db.contracts.find(c => c.id === alt.contractId);
    if (!c) throw new Error('Contrato não encontrado');
    alt.status = 'APPROVED'; alt.reviewedById = user.id; alt.reviewDate = new Date().toISOString();
    c.currentValue = Number(c.currentValue) + Number(alt.valueChange);
    if (alt.newEndDate) { c.endDate = alt.newEndDate; db.contractAlerts.filter(a => a.contractId === c.id && (a.type === 'CONTRACT_EXPIRING_90' || a.type === 'CONTRACT_EXPIRING_180') && a.status === 'PENDING').forEach(a => { a.status = 'DISMISSED'; }); }
    db.contractAlerts.filter(a => a.type === 'ALTERATION_OVERDUE' && a.metadata?.alterationId === id).forEach(a => { a.status = 'DISMISSED'; });
    saveLocalDB(db); return alt;
  }

  if (endpoint.endsWith('/reject') && endpoint.includes('/alterations/') && method === 'POST') {
    if (user.role !== 'GESTOR') throw new Error('Acesso negado');
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const alt = db.alterations.find(a => a.id === id);
    if (!alt) throw new Error('Alteração não encontrada');
    alt.status = 'REJECTED'; alt.reviewedById = user.id; alt.reviewDate = new Date().toISOString(); alt.reviewNotes = body.reason;
    saveLocalDB(db); return alt;
  }

  // ── Processos ─────────────────────────────────────────────────────────────────

  if (endpoint === '/processes' && method === 'GET') {
    let procs = db.processes;
    if (user.role === 'FISCAL') procs = procs.filter(p => p.requesterId === user.id);
    return procs.map(p => ({ ...p, requester: db.users.find(u => u.id === p.requesterId), contracts: db.contracts.filter(c => c.processId === p.id).map(c => ({ id: c.id, contractNumber: c.contractNumber, status: c.status })), phases: (db.processPhases || []).filter(ph => ph.processId === p.id) }));
  }

  if (endpoint.match(/^\/processes\/[^/]+$/) && method === 'GET') {
    const id = endpoint.split('/')[2];
    const p = db.processes.find(p => p.id === id);
    if (!p) throw new Error('Processo não encontrado');
    if (user.role === 'FISCAL' && p.requesterId !== user.id) throw new Error('Acesso negado');
    return { ...p, requester: db.users.find(u => u.id === p.requesterId), contracts: db.contracts.filter(c => c.processId === id), phases: (db.processPhases || []).filter(ph => ph.processId === id).map(ph => ({ ...ph, responsible: ph.responsibleId ? db.users.find(u => u.id === ph.responsibleId) : null })) };
  }

  if (endpoint === '/processes' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const newProcId = `prc-${Date.now()}`;
    const np: ProcurementProcess = { id: newProcId, processNumber: body.processNumber, subject: body.subject, description: body.description, status: 'PLANNING', modality: body.modality, estimatedValue: Number(body.estimatedValue), requesterDepartment: body.requesterDepartment, requesterId: user.id };
    db.processes.push(np);
    db.processPhases = [...(db.processPhases || []), ...createDefaultPhases(newProcId)];
    saveLocalDB(db); return np;
  }

  if (endpoint.match(/^\/processes\/[^/]+\/status$/) && method === 'PATCH') {
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const p = db.processes.find(p => p.id === id);
    if (!p) throw new Error('Processo não encontrado');
    p.status = body.status; saveLocalDB(db); return p;
  }

  // ── Fases do Processo ─────────────────────────────────────────────────────────

  if (endpoint.match(/^\/processes\/[^/]+\/phases$/) && method === 'GET') {
    const id = endpoint.split('/')[2];
    return (db.processPhases || []).filter(ph => ph.processId === id).map(ph => ({ ...ph, responsible: ph.responsibleId ? db.users.find(u => u.id === ph.responsibleId) : null }));
  }

  if (endpoint.match(/^\/processes\/[^/]+\/phases\/[^/]+$/) && method === 'PATCH') {
    const parts = endpoint.split('/');
    const phaseId = parts[4];
    const body = JSON.parse(options.body as string);
    const ph = (db.processPhases || []).find(p => p.id === phaseId);
    if (!ph) throw new Error('Fase não encontrada');
    Object.assign(ph, body, { updatedAt: new Date().toISOString() });
    // Auto-dismiss overdue alert if phase is marked completed
    if (body.status === 'COMPLETED') {
      db.contractAlerts.filter(a => a.type === 'PROCESS_PHASE_OVERDUE' && a.metadata?.phaseId === phaseId && a.status === 'PENDING').forEach(a => { a.status = 'DISMISSED'; });
    }
    saveLocalDB(db); return ph;
  }

  // ── Comunicados ───────────────────────────────────────────────────────────────

  if (endpoint.match(/^\/contracts\/[^/]+\/communications$/) && method === 'GET') {
    const contractId = endpoint.split('/')[2];
    return db.communications.filter(c => c.contractId === contractId).map(c => ({ ...c, sender: db.users.find(u => u.id === c.senderId), recipient: c.recipientId ? db.users.find(u => u.id === c.recipientId) : null, replies: db.communications.filter(r => r.parentId === c.id).map(r => ({ ...r, sender: db.users.find(u => u.id === r.senderId) })) }));
  }

  if (endpoint === '/communications/all' && method === 'GET') {
    let comms = db.communications;
    if (user.role === 'FISCAL') {
      const myContractIds = db.assignments.filter(a => a.fiscalId === user.id && a.isActive).map(a => a.contractId);
      comms = comms.filter(c => myContractIds.includes(c.contractId) && (!c.parentId) && (!c.recipientId || c.recipientId === user.id || c.senderId === user.id));
    } else if (user.role === 'GESTOR') {
      comms = comms.filter(c => !c.parentId);
    }
    return comms.map(c => ({ ...c, sender: db.users.find(u => u.id === c.senderId), recipient: c.recipientId ? db.users.find(u => u.id === c.recipientId) : null, contract: db.contracts.find(ct => ct.id === c.contractId), replies: db.communications.filter(r => r.parentId === c.id).map(r => ({ ...r, sender: db.users.find(u => u.id === r.senderId) })) }));
  }

  if (endpoint === '/communications' && method === 'POST') {
    if (user.role === 'ADMIN') throw new Error('Perfil administrativo não pode enviar comunicados');
    const body = JSON.parse(options.body as string);
    const now = new Date().toISOString();
    const newComm: Communication = { id: `comm-${Date.now()}`, contractId: body.contractId, senderId: user.id, recipientId: body.recipientId || undefined, subject: body.subject, message: body.message, parentId: body.parentId || undefined, isMandatory: body.isMandatory || false, readBy: [user.id], createdAt: now };
    db.communications.push(newComm);
    // Se obrigatório, criar alertas para destinatários
    if (body.isMandatory && !body.parentId) {
      const asgmts = db.assignments.filter(a => a.contractId === body.contractId && a.isActive);
      const targets = body.recipientId ? [body.recipientId] : asgmts.map(a => a.fiscalId);
      for (const fiscalId of targets) {
        db.contractAlerts.push({ id: `cal-comm-${newComm.id}-${fiscalId}`, contractId: body.contractId, targetUserId: fiscalId, type: 'COMMUNICATION_MANDATORY', status: 'PENDING', title: 'Comunicado Obrigatório — Leitura Pendente', message: body.subject, metadata: { communicationId: newComm.id, subject: body.subject, fullMessage: body.message, senderName: user.name }, createdAt: now, updatedAt: now });
      }
    }
    saveLocalDB(db); return newComm;
  }

  // ── Usuários ──────────────────────────────────────────────────────────────────

  if (endpoint === '/users/fiscais' && method === 'GET') return db.users.filter(u => u.role === 'FISCAL');
  if (endpoint === '/users' && method === 'GET') return db.users;

  if (endpoint === '/users' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const nu: User = { id: `usr-${Date.now()}`, name: body.name, email: body.email, role: body.role, status: 'ACTIVE', registrationNumber: body.registrationNumber };
    db.users.push(nu); saveLocalDB(db); return nu;
  }

  if (endpoint.match(/^\/users\/[^/]+\/status$/) && method === 'PATCH') {
    const id = endpoint.split('/')[2];
    const body = JSON.parse(options.body as string);
    const u = db.users.find(u => u.id === id);
    if (u) { u.status = body.status; saveLocalDB(db); }
    return u;
  }

  if (endpoint === '/contractors' && method === 'GET') return db.contractors;

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

    if (user.role === 'GESTOR') {
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
    const fiscalContracts: Record<string, number> = {};
    db.assignments.filter(a => a.isActive && a.role === 'TITULAR').forEach(a => { const u = db.users.find(u => u.id === a.fiscalId); if (u) fiscalContracts[u.name] = (fiscalContracts[u.name] || 0) + 1; });
    const byFiscal = Object.entries(fiscalContracts).map(([name, value]) => ({ name: name.split(' ').slice(-1)[0], value }));
    const byUnit = [{ name: 'Prod.', value: 1 }, { name: 'Controle Q.', value: 1 }];
    const phaseStatusMap: Record<string, string> = { PENDING: 'Pendente', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluída', OVERDUE: 'Atrasada', BLOCKED: 'Bloqueada' };
    const byPhaseStatus = Object.entries((db.processPhases || []).reduce((acc, ph) => { const k = phaseStatusMap[ph.status] || ph.status; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const monthlyEvolution = months.map((name, i) => ({
      name, contracts: active.length, value: Math.round(active.reduce((s, c) => s + c.currentValue, 0) / 100000) * 100000,
      measured: db.measurements.filter(m => m.status === 'APPROVED' && new Date(m.periodEnd).getMonth() === i).reduce((s, m) => s + Number(m.measurementValue), 0),
    }));

    const result: GestorDashboard = {
      kpis: { activeContracts: active.length, expiringIn180: exp180.length, expiringIn90: exp90.length, expiredContracts: expired.length, processesInProgress: inProgress.length, delayedProcesses: uniqueDelayed.length, pendingFiscalizacoes: pendFisc, pendingRenewals: pendRenewals, communicationsPendingReply: pendComms },
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

  // ── Auditoria ────────────────────────────────────────────────────────────────

  if (endpoint === '/audit-logs' && method === 'GET') {
    return { logs: [...(db.auditLogs || [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), total: (db.auditLogs || []).length };
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
  contracts: {
    list: () => request('/contracts'),
    get: (id: string) => request(`/contracts/${id}`),
    create: (data: any) => request('/contracts', { method: 'POST', body: JSON.stringify(data) }),
    assignFiscal: (id: string, data: any) => request(`/contracts/${id}/assign-fiscal`, { method: 'POST', body: JSON.stringify(data) }),
    stats: () => request('/contracts/stats'),
  },
  measurements: {
    create: (data: any) => request('/measurements', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: string) => request(`/measurements/${id}/approve`, { method: 'POST' }),
    reject: (id: string, reason: string) => request(`/measurements/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
    listByContract: (cId: string) => request(`/measurements/contract/${cId}`),
  },
  occurrences: {
    create: (data: any) => request('/occurrences', { method: 'POST', body: JSON.stringify(data) }),
    resolve: (id: string, resolutionDescription: string) => request(`/occurrences/${id}/resolve`, { method: 'POST', body: JSON.stringify({ resolutionDescription }) }),
    listByContract: (cId: string) => request(`/occurrences/contract/${cId}`),
  },
  alterations: {
    create: (data: any) => request('/alterations', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: string) => request(`/alterations/${id}/approve`, { method: 'POST' }),
    reject: (id: string, reason: string) => request(`/alterations/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
    listByContract: (cId: string) => request(`/alterations/contract/${cId}`),
  },
  processes: {
    list: () => request('/processes'),
    get: (id: string) => request(`/processes/${id}`),
    create: (data: any) => request('/processes', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => request(`/processes/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    getPhases: (id: string) => request(`/processes/${id}/phases`),
    updatePhase: (processId: string, phaseId: string, data: any) => request(`/processes/${processId}/phases/${phaseId}`, { method: 'PATCH', body: JSON.stringify(data) }),
    updateWorkflowItem: (processId: string, itemId: string, data: any) => request(`/processes/${processId}/workflow-items/${itemId}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },
  alerts: {
    list: () => request('/alerts'),
    all: () => request('/alerts/all'),
    runEngine: () => request('/alerts/run-engine', { method: 'POST' }),
    respond: (id: string, response: ContractAlertResponse) => request(`/alerts/${id}/respond`, { method: 'POST', body: JSON.stringify({ response }) }),
    dismiss: (id: string) => request(`/alerts/${id}/dismiss`, { method: 'POST' }),
  },
  communications: {
    listByContract: (cId: string) => request(`/contracts/${cId}/communications`),
    listAll: () => request('/communications/all'),
    create: (data: any) => request('/communications', { method: 'POST', body: JSON.stringify(data) }),
    reply: (data: any) => request('/communications', { method: 'POST', body: JSON.stringify(data) }),
  },
  users: {
    listAll: () => request('/users'),
    create: (data: any) => request('/users', { method: 'POST', body: JSON.stringify(data) }),
    toggleStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => request(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
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
    list: () => request('/audit-logs'),
  },
  ai: {
    insights: () => request('/ai/insights'),
    analyzeContract: (contractId: string) => request('/ai/analyze-contract', { method: 'POST', body: JSON.stringify({ contractId }) }),
  },
  utils: {
    getContractors: () => request('/contractors'),
    getProcesses: () => request('/processes'),
    getFiscais: () => request('/users/fiscais'),
  },
};
