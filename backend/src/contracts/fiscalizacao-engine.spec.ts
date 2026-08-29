import {
  deriveFiscalizacaoCentral,
  deriveContractDiagnostic,
  EngineContract,
  EngineData,
  CentralInput,
} from './fiscalizacao-engine';

/**
 * Cenários obrigatórios da Central de Fiscalização Inteligente (spec §19).
 * "Agora" fixo para determinismo.
 */
const NOW = Date.parse('2026-08-29T12:00:00Z');
const opts = { now: NOW };

function iso(daysFromNow: number): string {
  return new Date(NOW + daysFromNow * 86400000).toISOString().slice(0, 10);
}

function baseContract(over: Partial<EngineContract> = {}): EngineContract {
  return {
    id: 'c1',
    contractNumber: '001/2025',
    status: 'ACTIVE',
    startDate: iso(-400),
    endDate: iso(400),
    initialValue: 100000,
    currentValue: 100000,
    managerId: 'gestor-1',
    ...over,
  };
}

function emptyData(over: Partial<EngineData> = {}): EngineData {
  return {
    contracts: [],
    assignments: [],
    occurrences: [],
    measurements: [],
    alterations: [],
    payments: [],
    ...over,
  };
}

function titular(contractId: string): EngineData['assignments'][number] {
  return {
    id: `asg-${contractId}`,
    contractId,
    fiscalId: 'fiscal-1',
    role: 'TITULAR',
    isActive: true,
    endDate: null,
  };
}

function managerInput(data: EngineData): CentralInput {
  return { ...data, viewerId: 'gestor-1', viewerRole: 'GESTOR' };
}

describe('deriveFiscalizacaoCentral', () => {
  it('1. contrato próximo do vencimento → pendência de PRAZO priorizada', () => {
    const c = baseContract({ endDate: iso(45) });
    const data = emptyData({ contracts: [c], assignments: [titular('c1')] });
    const { items } = deriveFiscalizacaoCentral(managerInput(data), opts);
    const prazo = items.find((i) => i.category === 'PRAZO');
    expect(prazo).toBeDefined();
    expect(prazo.priority).toBe('ALTA');
    expect(prazo.reason).toContain('45 dia(s)');
    expect(prazo.reason).toContain('análise de continuidade');
  });

  it('2. contrato vencido → PRAZO crítica', () => {
    const c = baseContract({ endDate: iso(-10) });
    const data = emptyData({ contracts: [c], assignments: [titular('c1')] });
    const { items, summary } = deriveFiscalizacaoCentral(
      managerInput(data),
      opts,
    );
    const prazo = items.find((i) => i.category === 'PRAZO');
    expect(prazo.priority).toBe('CRITICA');
    expect(prazo.reason).toContain('vencido há 10 dia(s)');
    expect(summary.CRITICA).toBeGreaterThanOrEqual(1);
  });

  it('3. medição pendente → item MEDICAO, nunca tratada como pagamento', () => {
    const c = baseContract();
    const data = emptyData({
      contracts: [c],
      assignments: [titular('c1')],
      measurements: [
        {
          id: 'm1',
          contractId: 'c1',
          fiscalId: 'fiscal-1',
          measurementValue: 51000,
          status: 'PENDING_GESTOR',
          createdAt: iso(-40),
        },
      ],
    });
    const { items } = deriveFiscalizacaoCentral(managerInput(data), opts);
    const med = items.find((i) => i.category === 'MEDICAO');
    expect(med).toBeDefined();
    expect(med.priority).toBe('ALTA'); // > 30 dias pendente
    expect(med.amount).toBe(51000);
    expect(med.reason.toLowerCase()).toContain('não representa pagamento');
  });

  it('4. sem cadastro de obrigações → dimensão OBRIGAÇÕES = SEM_DADOS (não inventa)', () => {
    const c = baseContract();
    const diag = deriveContractDiagnostic(
      c,
      emptyData({ contracts: [c], assignments: [titular('c1')] }),
      opts,
    );
    const obg = diag.dimensions.find((d) => d.key === 'obrigacoes');
    expect(obg.status).toBe('SEM_DADOS');
  });

  it('5. sem controle de validade de documentos → dimensão DOCUMENTAÇÃO = SEM_DADOS', () => {
    const c = baseContract();
    const diag = deriveContractDiagnostic(
      c,
      emptyData({ contracts: [c], assignments: [titular('c1')] }),
      opts,
    );
    const doc = diag.dimensions.find((d) => d.key === 'documentacao');
    expect(doc.status).toBe('SEM_DADOS');
  });

  it('6. sem cadastro de garantias → dimensão GARANTIAS = SEM_DADOS', () => {
    const c = baseContract();
    const diag = deriveContractDiagnostic(
      c,
      emptyData({ contracts: [c], assignments: [titular('c1')] }),
      opts,
    );
    const gar = diag.dimensions.find((d) => d.key === 'garantias');
    expect(gar.status).toBe('SEM_DADOS');
  });

  it('7. ocorrência reincidente → prioridade escalonada e reason explica a reincidência', () => {
    const c = baseContract();
    const mkOcc = (
      id: string,
      days: number,
      sev = 'MEDIUM',
      status = 'OPEN',
    ) => ({
      id,
      contractId: 'c1',
      fiscalId: 'fiscal-1',
      title: 'Atraso na entrega',
      severity: sev,
      status,
      createdAt: iso(days),
    });
    const data = emptyData({
      contracts: [c],
      assignments: [titular('c1')],
      occurrences: [mkOcc('o1', -10), mkOcc('o2', -40), mkOcc('o3', -80)],
    });
    const { items } = deriveFiscalizacaoCentral(managerInput(data), opts);
    const occItems = items.filter((i) => i.category === 'OCORRENCIA');
    expect(occItems.length).toBe(3);
    // MEDIUM normalmente é MEDIA; com reincidência sobe para ALTA
    expect(occItems.every((i) => i.priority === 'ALTA')).toBe(true);
    expect(occItems[0].reason).toContain('últimos 120 dias');
  });

  it('8. execução financeira elevada → FINANCEIRO crítica quando ≥ 100%', () => {
    const c = baseContract({ currentValue: 100000 });
    const data = emptyData({
      contracts: [c],
      assignments: [titular('c1')],
      measurements: [
        {
          id: 'm1',
          contractId: 'c1',
          measurementValue: 60000,
          status: 'APPROVED',
          createdAt: iso(-90),
        },
        {
          id: 'm2',
          contractId: 'c1',
          measurementValue: 45000,
          status: 'APPROVED',
          createdAt: iso(-30),
        },
      ],
    });
    const { items } = deriveFiscalizacaoCentral(managerInput(data), opts);
    const fin = items.find((i) => i.category === 'FINANCEIRO');
    expect(fin).toBeDefined();
    expect(fin.priority).toBe('CRITICA');
    expect(fin.reason).toContain('105.0%');
  });

  it('9. contrato sem dados suficientes → diagnóstico sem nota geral', () => {
    const c = baseContract({
      currentValue: 0,
      startDate: iso(-20),
      endDate: iso(300),
    });
    const diag = deriveContractDiagnostic(
      c,
      emptyData({ contracts: [c] }),
      opts,
    );
    expect(diag.overallScore).toBeNull();
    expect(diag.overallLabel).toContain('Dados insuficientes');
  });

  it('10. contrato completamente regular → sem pendências e diagnóstico "Situação regular"', () => {
    const c = baseContract({ startDate: iso(-200), endDate: iso(400) });
    const data = emptyData({
      contracts: [c],
      assignments: [titular('c1')],
      measurements: [
        {
          id: 'm1',
          contractId: 'c1',
          measurementValue: 20000,
          status: 'APPROVED',
          createdAt: iso(-60),
        },
      ],
    });
    const { items, summary } = deriveFiscalizacaoCentral(
      managerInput(data),
      opts,
    );
    expect(summary.CRITICA).toBe(0);
    expect(summary.ALTA).toBe(0);
    expect(
      items.filter((i) => i.priority === 'MEDIA' || i.priority === 'BAIXA')
        .length,
    ).toBe(0);

    const diag = deriveContractDiagnostic(c, data, opts);
    expect(diag.overallScore).not.toBeNull();
    expect(diag.overallLabel).toBe('Situação regular');
    expect(diag.recommendations).toHaveLength(0);
  });
});

describe('deriveFiscalizacaoCentral — escopo por papel', () => {
  it('FISCAL só vê pendências dos contratos em que é designado ativo', () => {
    const c1 = baseContract({
      id: 'c1',
      contractNumber: '001',
      endDate: iso(20),
    });
    const c2 = baseContract({
      id: 'c2',
      contractNumber: '002',
      endDate: iso(20),
    });
    const data = emptyData({
      contracts: [c1, c2],
      assignments: [
        {
          id: 'a1',
          contractId: 'c1',
          fiscalId: 'fiscal-1',
          role: 'TITULAR',
          isActive: true,
          endDate: null,
        },
        {
          id: 'a2',
          contractId: 'c2',
          fiscalId: 'fiscal-2',
          role: 'TITULAR',
          isActive: true,
          endDate: null,
        },
      ],
    });
    const { items } = deriveFiscalizacaoCentral(
      { ...data, viewerId: 'fiscal-1', viewerRole: 'FISCAL' },
      opts,
    );
    expect(items.every((i) => i.contractId === 'c1')).toBe(true);
  });

  it('itens vêm ordenados por prioridade', () => {
    const c = baseContract({ endDate: iso(-5) });
    const data = emptyData({
      contracts: [c],
      assignments: [titular('c1')],
      occurrences: [
        {
          id: 'o1',
          contractId: 'c1',
          title: 'x',
          severity: 'LOW',
          status: 'OPEN',
          createdAt: iso(-3),
        },
      ],
    });
    const { items } = deriveFiscalizacaoCentral(managerInput(data), opts);
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1];
      const cur = items[i];
      const order = { CRITICA: 0, ALTA: 1, MEDIA: 2, BAIXA: 3, INFORMATIVA: 4 };
      expect(order[prev.priority]).toBeLessThanOrEqual(order[cur.priority]);
    }
  });
});
