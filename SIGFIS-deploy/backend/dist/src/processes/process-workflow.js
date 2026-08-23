"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHASE_NAMES = void 0;
exports.buildDefaultPhases = buildDefaultPhases;
const client_1 = require("@prisma/client");
exports.PHASE_NAMES = [
    'Planejamento da Contratação',
    'Estudo Técnico Preliminar',
    'Termo de Referência',
    'Pesquisa de Preços',
    'Aprovação',
    'Licitação / Contratação Direta',
    'Formalização Contratual',
    'Execução Contratual',
    'Encerramento',
];
function buildDefaultPhases(processId, responsibleId, executionProfile = 'planning') {
    const now = new Date();
    return exports.PHASE_NAMES.map((name, index) => {
        const phaseNumber = index + 1;
        const isHistorical = executionProfile === 'active-contract' && phaseNumber <= 7;
        const isExecution = executionProfile === 'active-contract' && phaseNumber === 8;
        return {
            processId,
            phaseNumber,
            name,
            status: isHistorical
                ? client_1.PhaseStatus.COMPLETED
                : isExecution
                    ? client_1.PhaseStatus.IN_PROGRESS
                    : client_1.PhaseStatus.PENDING,
            responsibleId: responsibleId || null,
            actualStart: isHistorical || isExecution ? now : null,
            actualEnd: isHistorical ? now : null,
            isActive: true,
        };
    });
}
//# sourceMappingURL=process-workflow.js.map