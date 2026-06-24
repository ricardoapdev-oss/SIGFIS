import { PhaseStatus } from '@prisma/client';

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
