import { PhaseStatus, WorkflowItemStatus, WorkflowItemType, WorkflowTargetRole } from '@prisma/client';

export const PHASE_NAMES = [
  'Planejamento da Contratação',
  'Estudo Técnico Preliminar',
  'Termo de Referência',
  'Pesquisa de Preços',
  'Aprovação',
  'Licitação / Contratação Direta',
  'Formalização Contratual',
  'Execução Contratual',
  'Encerramento',
] as const;

type WorkflowBlueprint = {
  phaseNumber: number;
  title: string;
  description: string;
  type: WorkflowItemType;
  targetRole: WorkflowTargetRole;
  status?: WorkflowItemStatus;
};

export const PROCESS_WORKFLOW_BLUEPRINT: WorkflowBlueprint[] = [
  {
    phaseNumber: 1,
    title: 'Abrir ficha de controle do processo',
    description: 'Registrar a demanda, o objeto resumido e a motivação inicial da contratação.',
    type: WorkflowItemType.ACTION,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 1,
    title: 'Justificativa da contratação',
    description: 'Documento inicial com motivação, necessidade pública e escopo do processo.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 2,
    title: 'Estudo Técnico Preliminar',
    description: 'Anexar o ETP com alternativas avaliadas, riscos e solução recomendada.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 3,
    title: 'Termo de Referência / Projeto Básico',
    description: 'Definir requisitos, critérios de aceite, entregáveis e medição.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 4,
    title: 'Consulta de parâmetros e pesquisa de preços',
    description: 'Registrar consultas, cotações e memória de formação do valor estimado.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 5,
    title: 'Parecer e despachos de aprovação',
    description: 'Consolidar parecer jurídico, despachos e aprovações internas.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 6,
    title: 'Nota de empenho / autorização da contratação',
    description: 'Comprovar reserva orçamentária e autorização para contratação.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 7,
    title: 'Contrato assinado',
    description: 'Anexar instrumento contratual assinado e comunicações de assinatura.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 7,
    title: 'Portaria do fiscal',
    description: 'Formalizar a designação do fiscal titular/substituto antes do início da execução.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
  {
    phaseNumber: 8,
    title: 'Fichas de controle e relatórios de fiscalização',
    description: 'Registrar acompanhamento da execução, conformidade e eventuais ocorrências.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.FISCAL,
    status: WorkflowItemStatus.IN_PROGRESS,
  },
  {
    phaseNumber: 8,
    title: 'Medições, evidências e comunicações obrigatórias',
    description: 'Anexar medições, evidências da execução e comunicações relevantes ao gestor.',
    type: WorkflowItemType.ACTION,
    targetRole: WorkflowTargetRole.FISCAL,
    status: WorkflowItemStatus.IN_PROGRESS,
  },
  {
    phaseNumber: 9,
    title: 'Relatório final e encerramento',
    description: 'Formalizar o encerramento contratual, pendências remanescentes e lições aprendidas.',
    type: WorkflowItemType.DOCUMENT,
    targetRole: WorkflowTargetRole.GESTOR,
  },
];

export function buildDefaultPhases(
  processId: string,
  responsibleId?: string | null,
  executionProfile: 'planning' | 'active-contract' = 'planning',
) {
  const now = new Date();

  return PHASE_NAMES.map((name, index) => {
    const phaseNumber = index + 1;
    const isHistorical = executionProfile === 'active-contract' && phaseNumber <= 7;
    const isExecution = executionProfile === 'active-contract' && phaseNumber === 8;

    return {
      processId,
      phaseNumber,
      name,
      status: isHistorical
        ? PhaseStatus.COMPLETED
        : isExecution
          ? PhaseStatus.IN_PROGRESS
          : PhaseStatus.PENDING,
      responsibleId: responsibleId || null,
      actualStart: isHistorical || isExecution ? now : null,
      actualEnd: isHistorical ? now : null,
      isActive: true,
    };
  });
}

export function buildDefaultWorkflowItems(
  processId: string,
  phases: Array<{ id: string; phaseNumber: number }>,
  executionProfile: 'planning' | 'active-contract' = 'planning',
) {
  return PROCESS_WORKFLOW_BLUEPRINT.map((item) => {
    const phase = phases.find((current) => current.phaseNumber === item.phaseNumber);
    const completedByDefault = executionProfile === 'active-contract' && item.phaseNumber <= 7;

    return {
      processId,
      phaseId: phase?.id || null,
      title: item.title,
      description: item.description,
      type: item.type,
      targetRole: item.targetRole,
      status: completedByDefault ? WorkflowItemStatus.COMPLETED : item.status || WorkflowItemStatus.PENDING,
      isRequired: true,
    };
  });
}
