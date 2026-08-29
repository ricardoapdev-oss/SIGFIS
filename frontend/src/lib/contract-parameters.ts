/**
 * Parâmetros contratuais exibidos na Central de Fiscalização.
 *
 * Reúne num ponto só as REFERÊNCIAS LEGAIS (Lei 13.303/2016 — contratos de
 * empresas estatais — e o RILC IQUEGO, Regulamento Interno de Licitações e
 * Contratos) e os PARÂMETROS OPERACIONAIS de alerta do próprio SIGFIS, para
 * não repetir esses números soltos dentro de componentes React e para
 * permitir, no futuro, torná-los configuráveis por entidade/regulamento
 * (não há tela de configuração hoje — isto é apenas a estrutura).
 *
 * Fontes já usadas pelo projeto (nada aqui é novo dispositivo legal):
 *  - 25% / 50% de acréscimo: "Regra R01 (Limite de Aditivos de Valor)" em
 *    backend/src/alterations/alterations.service.ts (limitPercentage 0.25 para
 *    compras/serviços, 0.5 quando o objeto é reforma) e o rodapé legal do
 *    Painel Geral ("Aditivo máx.: 25% serviços — 50% reformas").
 *  - "Lei 13.303/2016 · RILC IQUEGO": Header.tsx e GestorDashboard.tsx.
 *  - "Duração contratual — regra geral": regra geral da Lei 13.303/2016 para
 *    contratos de empresas estatais; há hipóteses e exceções que dependem do
 *    contrato e da legislação/regulamento aplicável — por isso "regra geral".
 *  - 180 e 90 dias: faixas do motor de fiscalização (fiscalizacao-engine.ts)
 *    e do motor de alertas (lib/api.ts). São parâmetros do SIGFIS, NÃO prazos
 *    fixados pela Lei 13.303/2016.
 */

export type ContractParameterKind = 'legal' | 'operacional';

export interface ContractParameter {
  label: string;
  value: string;
  kind: ContractParameterKind;
}

export const CONTRACT_PARAMETERS: ContractParameter[] = [
  {
    label: 'Acréscimos/supressões — compras e serviços',
    value: '25%',
    kind: 'legal',
  },
  {
    label: 'Acréscimos — reformas de edifícios/equipamentos',
    value: '50%',
    kind: 'legal',
  },
  {
    label: 'Duração contratual — regra geral',
    value: '5 anos',
    kind: 'legal',
  },
  {
    label: 'Alerta preventivo de vencimento',
    value: '180 dias',
    kind: 'operacional',
  },
  {
    label: 'Análise de continuidade/prorrogação',
    value: '90 dias',
    kind: 'operacional',
  },
];

export const CONTRACT_PARAMETERS_TITLE =
  'Lei 13.303/2016 — Parâmetros Contratuais';

/** Legenda discreta exibida ao final do quadro. */
export const CONTRACT_PARAMETERS_NOTE =
  '* Parâmetros de alerta do SIGFIS; a aplicação depende do contrato, objeto, legislação e regulamento pertinente.';
