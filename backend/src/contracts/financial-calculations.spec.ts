import {
  sumDecimal,
  sumApprovedMeasurements,
  sumPayments,
  contractualBalanceNotExecuted,
  executionRateByMeasurement,
  contractDurationMonths,
  contractMonthlyValue,
  computePortfolioFinancials,
  assertsBalancePlusMeasuredEqualsContractValue,
  checkMeasurementApproval,
  checkSuppressionWithoutRecord,
  outstandingLiquidatedBalance,
  CAMPO_MENSAL_CADASTRADO_EXISTE,
  ESTIMATIVA_MENSAL_TOOLTIP,
} from './financial-calculations';

describe('financial-calculations', () => {
  describe('sumDecimal', () => {
    it('soma valores sem arredondar termos intermediários', () => {
      // Soma clássica de "erro de ponto flutuante": 0.1 + 0.2 !== 0.3 em JS puro.
      expect(sumDecimal([0.1, 0.2]).toNumber()).toBeCloseTo(0.3, 10);
    });
    it('trata null/undefined como zero', () => {
      expect(sumDecimal([100, null, undefined, 50]).toNumber()).toBe(150);
    });
  });

  describe('sumApprovedMeasurements', () => {
    it('soma apenas medições com status APPROVED', () => {
      const total = sumApprovedMeasurements([
        { status: 'APPROVED', measurementValue: 1000 },
        { status: 'PENDING_GESTOR', measurementValue: 5000 },
        { status: 'REJECTED', measurementValue: 3000 },
        { status: 'APPROVED', measurementValue: 250.5 },
      ]);
      expect(total.toNumber()).toBe(1250.5);
    });
  });

  describe('sumPayments', () => {
    it('soma os valores pagos — nunca deve ser confundido com medição aprovada', () => {
      expect(sumPayments([{ value: 100 }, { value: 200.25 }]).toNumber()).toBe(
        300.25,
      );
    });
  });

  describe('contractualBalanceNotExecuted', () => {
    it('valor contratual atual menos medições aprovadas', () => {
      expect(contractualBalanceNotExecuted(10000, 4000).toNumber()).toBe(6000);
    });
    it('pode ser negativo (sinal de medição acima do valor contratual)', () => {
      expect(contractualBalanceNotExecuted(1000, 1500).toNumber()).toBe(-500);
    });
  });

  describe('executionRateByMeasurement', () => {
    it('medido / contratual atual × 100', () => {
      expect(executionRateByMeasurement(200000, 50000)).toBe(25);
    });
    it('retorna 0 quando o valor contratual é 0', () => {
      expect(executionRateByMeasurement(0, 500)).toBe(0);
    });
  });

  describe('contractDurationMonths', () => {
    // Revisão técnica (Etapa 3, Ponto 1): sem campo de valor mensal
    // cadastrado no schema real de produção, a duração usa mês comercial de
    // 30 dias, fracionário (sem arredondar para mês inteiro) — validado
    // contra o relatório de referência de 25/08/2026 (36 contratos reais):
    // ficou a 0,03% do valor de referência, contra 1,4% da fórmula anterior
    // (30,44 dias/mês com arredondamento a mês inteiro).
    it('calcula meses fracionários a partir de mês comercial de 30 dias', () => {
      // 2025-01-01 a 2026-01-01 = 365 dias corridos (2025 não é bissexto) / 30
      expect(contractDurationMonths('2025-01-01', '2026-01-01')).toBeCloseTo(
        12.1667,
        4,
      );
    });
    it('nunca fica abaixo de 1 mês, mesmo para contratos de poucos dias', () => {
      expect(contractDurationMonths('2026-01-01', '2026-01-05')).toBe(1);
    });
    it('retorna null quando término é anterior ou igual ao início', () => {
      expect(contractDurationMonths('2025-01-01', '2025-01-01')).toBeNull();
      expect(contractDurationMonths('2025-06-01', '2025-01-01')).toBeNull();
    });
    it('retorna null para datas inválidas', () => {
      expect(contractDurationMonths('data-invalida', '2025-01-01')).toBeNull();
    });
  });

  describe('contractMonthlyValue', () => {
    it('valor contratual atual / duração em meses (fracionária)', () => {
      const monthly = contractMonthlyValue(120000, '2025-01-01', '2026-01-01');
      // 120000 / (365/30) — não é mais um número redondo, ver nota acima.
      expect(monthly?.toNumber()).toBeCloseTo(9863.0137, 4);
    });
    it('retorna null (contrato excluído da média) quando as datas são inválidas', () => {
      expect(
        contractMonthlyValue(120000, '2025-01-01', '2025-01-01'),
      ).toBeNull();
    });
  });

  describe('outstandingLiquidatedBalance', () => {
    it('retorna null — liquidação não é suportada pelo SIGFIS hoje', () => {
      expect(outstandingLiquidatedBalance()).toBeNull();
    });
  });

  describe('computePortfolioFinancials', () => {
    // Fixture com a MESMA carteira e medições aprovadas do relatório de
    // referência de 25/08/2026 informado pelo usuário — carteira
    // R$ 15.008.205,71 e medições aprovadas R$ 713.881,73 são somas diretas
    // (valor contratual atual e medição aprovada, sem dependência de datas),
    // então dá para reproduzi-las exatamente aqui. Saldo e taxa de execução
    // são consequência aritmética direta dessas duas.
    //
    // Já "valor mensal estimado da carteira" e "média mensal por contrato"
    // dependem da duração (início/fim) de cada um dos contratos reais — dado
    // que só existe no banco de produção. Por isso NÃO fixamos esses dois
    // números aqui (ver teste próprio abaixo, que valida a fórmula com uma
    // fixture com durações variadas, não os valores do relatório). A
    // conferência desses dois contra o relatório de 25/08/2026 deve ser
    // feita chamando `/contracts/stats` ou `/contracts/report` no ambiente
    // real.
    it('reproduz carteira, medições aprovadas, saldo e taxa de execução do relatório de 25/08/2026', () => {
      const contracts = Array.from({ length: 36 }, (_, i) => ({
        id: `c${i}`,
        contractNumber: `${i + 1}/2026`,
        initialValue: 400000,
        currentValue: 15008205.71 / 36,
        startDate: '2025-01-01',
        endDate: '2026-01-01',
        measurements:
          i === 0 ? [{ status: 'APPROVED', measurementValue: 713881.73 }] : [],
      }));

      const result = computePortfolioFinancials(contracts);

      expect(result.valorContratualAtual).toBeCloseTo(15008205.71, 1);
      expect(result.medicoesAprovadas).toBeCloseTo(713881.73, 2);
      expect(result.saldoContratualNaoExecutado).toBeCloseTo(14294323.98, 1);
      // "aproximadamente 4,8%" no relatório — arredondado a 1 casa decimal.
      expect(Number(result.taxaExecucaoMedicoes.toFixed(1))).toBe(4.8);
      expect(assertsBalancePlusMeasuredEqualsContractValue(result)).toBe(true);
    });

    it('valor mensal estimado da carteira = soma dos valores mensais por contrato (durações variadas)', () => {
      // Fixture ilustrativa, não os números do relatório — ver comentário acima.
      // Duração em mês comercial de 30 dias (fracionária): A e C têm a mesma
      // razão valor/dias (C é o dobro de A em valor e em dias), logo o mesmo
      // valor mensal calculado — não é mais 10.000,00 redondo por contrato.
      const contracts = [
        {
          id: 'a',
          contractNumber: 'A/2026',
          initialValue: 120000,
          currentValue: 120000,
          startDate: '2025-01-01',
          endDate: '2026-01-01',
          measurements: [],
        }, // 365 dias / 30 = 12,1667m => 9.863,01/mês
        {
          id: 'b',
          contractNumber: 'B/2026',
          initialValue: 60000,
          currentValue: 60000,
          startDate: '2025-01-01',
          endDate: '2025-07-01',
          measurements: [],
        }, // 181 dias / 30 = 6,0333m => 9.944,75/mês
        {
          id: 'c',
          contractNumber: 'C/2026',
          initialValue: 240000,
          currentValue: 240000,
          startDate: '2025-01-01',
          endDate: '2027-01-01',
          measurements: [],
        }, // 730 dias / 30 = 24,3333m => 9.863,01/mês
      ];
      const result = computePortfolioFinancials(contracts);
      expect(result.contratosComValorMensalValido).toBe(3);
      expect(result.valorMensalEstimadoCarteira).toBeCloseTo(29670.78, 1);
      expect(result.mediaMensalPorContrato).toBeCloseTo(9890.26, 1);
      // Nunca chamar "média mensal por contrato" de desembolso de caixa: é
      // carteira/contratos válidos, não uma previsão de pagamento.
      expect(result.mediaMensalPorContrato).toBeCloseTo(
        result.valorMensalEstimadoCarteira /
          result.contratosComValorMensalValido,
        6,
      );
    });

    it('exclui contratos com datas inválidas do valor mensal e os lista em contratosComValorMensalInvalido', () => {
      const contracts = [
        {
          id: 'a',
          contractNumber: 'A/2026',
          initialValue: 1000,
          currentValue: 1000,
          startDate: '2025-01-01',
          endDate: '2026-01-01',
          measurements: [],
        },
        {
          id: 'b',
          contractNumber: 'B/2026',
          initialValue: 1000,
          currentValue: 1000,
          startDate: '2025-01-01',
          endDate: '2025-01-01',
          measurements: [],
        },
      ];
      const result = computePortfolioFinancials(contracts);
      expect(result.contratosComValorMensalValido).toBe(1);
      expect(result.contratosComValorMensalInvalido).toEqual(['B/2026']);
    });

    it('satisfaz a invariante saldo + medido = contratual mesmo com muitos contratos e casas decimais', () => {
      const contracts = Array.from({ length: 50 }, (_, i) => ({
        id: `x${i}`,
        contractNumber: `${i}/2026`,
        initialValue: 1234.56,
        currentValue: 1234.56 + i * 0.11,
        startDate: '2025-01-01',
        endDate: '2025-07-01',
        measurements: [
          { status: 'APPROVED', measurementValue: (i * 3.33) % 100 },
          { status: 'PENDING_GESTOR', measurementValue: 99999 },
        ],
      }));
      const result = computePortfolioFinancials(contracts);
      expect(assertsBalancePlusMeasuredEqualsContractValue(result)).toBe(true);
    });
  });

  describe('checkMeasurementApproval', () => {
    it('não sinaliza excedente quando a soma projetada está dentro do valor contratual', () => {
      const check = checkMeasurementApproval(100000, 40000, 30000);
      expect(check.exceedsContractValue).toBe(false);
      expect(check.excessAmount).toBe(0);
    });
    it('sinaliza excedente e calcula o valor exato acima do contrato — impede aprovação sem justificativa', () => {
      const check = checkMeasurementApproval(100000, 90000, 20000);
      expect(check.exceedsContractValue).toBe(true);
      expect(check.projectedTotal).toBe(110000);
      expect(check.excessAmount).toBe(10000);
    });
    it('trata o limite exato (projetado === contratual) como não excedente', () => {
      const check = checkMeasurementApproval(100000, 60000, 40000);
      expect(check.exceedsContractValue).toBe(false);
    });
  });

  describe('campo mensal cadastrado (Etapa 3, Ponto 1)', () => {
    it('documenta que não há campo de valor mensal cadastrado no schema real de produção', () => {
      // Auditado em supabase/migrations/20260823134034_remote_schema.sql —
      // a tabela "contracts" não tem monthlyValue/estimatedMonthlyValue/
      // valorMensal nem equivalente. Se um campo desses for adicionado ao
      // schema, este teste (e a constante) devem ser atualizados, e a
      // fórmula de valorMensalEstimadoCarteira deve passar a somar o campo
      // cadastrado em vez de calcular por vigência (ver instruções da
      // Etapa 3, Ponto 1 — "SE EXISTIR CAMPO MENSAL CADASTRADO").
      expect(CAMPO_MENSAL_CADASTRADO_EXISTE).toBe(false);
      expect(ESTIMATIVA_MENSAL_TOOLTIP).toMatch(
        /divisão do valor contratual atual pela duração contratual cadastrada/,
      );
    });
  });

  describe('checkSuppressionWithoutRecord', () => {
    it('não alerta quando o valor atual é igual ou maior que o original', () => {
      expect(checkSuppressionWithoutRecord(100000, 100000, [])).toBe(false);
      expect(checkSuppressionWithoutRecord(100000, 120000, [])).toBe(false);
    });
    it('alerta quando o valor caiu sem nenhum aditivo de supressão registrado', () => {
      expect(checkSuppressionWithoutRecord(100000, 80000, [])).toBe(true);
    });
    it('não alerta quando a queda está integralmente coberta por aditivos de redução aprovados', () => {
      expect(checkSuppressionWithoutRecord(100000, 80000, [-20000])).toBe(
        false,
      );
    });
    it('alerta quando a cobertura dos aditivos é parcial', () => {
      expect(checkSuppressionWithoutRecord(100000, 70000, [-20000])).toBe(true);
    });
  });
});
