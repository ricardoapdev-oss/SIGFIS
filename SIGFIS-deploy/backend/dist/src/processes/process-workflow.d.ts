export declare const PHASE_NAMES: readonly ["Planejamento da Contratação", "Estudo Técnico Preliminar", "Termo de Referência", "Pesquisa de Preços", "Aprovação", "Licitação / Contratação Direta", "Formalização Contratual", "Execução Contratual", "Encerramento"];
export declare function buildDefaultPhases(processId: string, responsibleId?: string | null, executionProfile?: 'planning' | 'active-contract'): {
    processId: string;
    phaseNumber: number;
    name: "Planejamento da Contratação" | "Estudo Técnico Preliminar" | "Termo de Referência" | "Pesquisa de Preços" | "Aprovação" | "Licitação / Contratação Direta" | "Formalização Contratual" | "Execução Contratual" | "Encerramento";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    responsibleId: string;
    actualStart: Date;
    actualEnd: Date;
    isActive: boolean;
}[];
