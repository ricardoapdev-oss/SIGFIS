# Dicionário de Indicadores — Painel Geral (SIGFIS)

Referência para evitar divergências futuras. Sempre que um indicador financeiro for adicionado ou alterado, atualize esta tabela e importe a fórmula de `frontend/src/lib/financial-calculations.ts` (frontend) / `backend/src/contracts/financial-calculations.ts` (backend) — nunca reimplemente a soma em outro lugar.

---

### Valor Contratual Atual

**Definição:** Soma do valor atual (`currentValue`) de todos os contratos da carteira considerada (hoje: contratos com `status = ACTIVE`).
**Fonte:** `contracts.currentValue` (tabela `contracts`, coluna `Decimal(15,2)`).
**Query:** `GET /contracts` (via `ContractsService.findAll`, filtro `archived: false`), filtrado no cliente por `status === 'ACTIVE'`.
**Fórmula:** `sumMoney(contratosAtivos.map(c => c.currentValue))`
**Filtros:** apenas contratos ativos; não tem filtro de período (é um valor de "foto" do momento, não uma soma ao longo do tempo).
**Periodicidade:** tempo real (recalculado a cada carregamento da tela).
**Responsável pelo cálculo:** `frontend/src/lib/financial-calculations.ts::computePortfolioFinancials` (mirror do backend); versão original com `Decimal` em `backend/src/contracts/financial-calculations.ts`.
**Observações:** o backend já expõe esse cálculo via `GET /contracts/stats`, mas o Painel Geral hoje usa a cópia recalculada no cliente (ver AUDITORIA-SIGFIS.md, débito técnico #1).

---

### Medições Aprovadas (card "Contratado / Medições Aprovadas / Saldo")

**Definição:** Soma de todas as medições (`InspectionMeasurement`) com `status = APPROVED`, pertencentes a contratos ativos, **em todo o histórico** — não é limitado por período.
**Fonte:** `inspections_measurements.measurementValue`, filtrado por `status = 'APPROVED'` e `contractId` pertencente a um contrato ativo.
**Tabela:** `inspections_measurements` (Prisma model `InspectionMeasurement`).
**Campo:** `measurementValue` (`Decimal(15,2)`).
**Query:** medições já vêm embutidas em cada contrato retornado por `GET /contracts` (`include: { measurements: true }` no backend).
**Fórmula:** `sumApprovedMeasurements(contratosAtivos.flatMap(c => c.measurements))` = `sumMoney(medições.filter(m => m.status === 'APPROVED').map(m => m.measurementValue))`.
**Filtros:** contrato deve estar `ACTIVE`; medição deve estar `APPROVED`. **Sem filtro de data.**
**Periodicidade:** tempo real.
**Responsável pelo cálculo:** mesmo módulo do indicador anterior.
**Observações:** **nunca equivale a "valor pago"** — é uma medição técnica aprovada pelo fiscal/gestor, anterior a qualquer fluxo de nota fiscal/liquidação/pagamento, que o SIGFIS não modela hoje (ver `LIQUIDACAO_NAO_DISPONIVEL`). Antes da correção de 2026-08-24, o gráfico "Medições Aprovadas por Período" (ver próximo indicador) usava uma definição diferente (sem filtro de contrato ativo, com janela fixa de 6 meses) — por isso os dois números divergiam. Corrigido: agora as duas fontes usam a mesma população de contratos e a mesma soma segura; a única diferença remanescente e intencional é a janela de tempo.

---

### Medições Aprovadas por Período (gráfico "Execução Financeira")

**Definição:** Mesma população e mesma soma do indicador anterior (medições `APPROVED` de contratos ativos), mas agregada por mês de `periodEnd` e filtrada pelo período selecionado na tela (30 dias, 90 dias, 6 meses, 12 meses ou "Personalizado" = todo o histórico calculado).
**Fonte:** idêntica ao indicador anterior.
**Tabela/Campo:** idênticos.
**Query:** idem — dado já carregado por `GET /contracts`; agregação mensal feita no cliente.
**Fórmula:** `sumMoney` por mês (`Array` de `{ name, measured }`, um item por mês, desde o contrato ativo mais antigo — ou a medição aprovada mais antiga, o que for anterior — até o mês atual, mínimo 6 meses, máximo 120); o total exibido é `sumMoney(mesesNoPeríodoSelecionado.map(m => m.measured))`.
**Filtros:** contrato ativo (igual ao card); medição `APPROVED`; **período selecionado na tela** filtra por mês de `periodEnd`.
**Periodicidade:** tempo real, recalculado a cada seleção de período (client-side, sem nova chamada à API).
**Responsável pelo cálculo:** `frontend/src/lib/api.ts`, handler `/dashboard/gestor`, bloco `monthlyEvolution`; consumido e fatiado por período em `frontend/src/components/views/GestorDashboard.tsx`.
**Observações:** com "Personalizado" selecionado, o total deste indicador é **idêntico, ao centavo**, ao "Medições Aprovadas" do card acima — confirmado com dado real em 2026-08-24. Para qualquer outro período (30d/90d/6m/12m), o total é **menor ou igual** ao card, nunca maior, por definição (é um subconjunto de tempo do mesmo total).

---

### Saldo Contratual Não Executado

**Definição:** Valor Contratual Atual menos Medições Aprovadas (todo o histórico, contratos ativos). Pode ser negativo (medição aprovada acima do valor contratual) — isso é tratado como sinal de inconsistência a investigar, não como erro de cálculo; o backend já impede a aprovação de uma medição que ultrapasse o valor contratual sem justificativa (`MeasurementsService.approve` + `checkMeasurementApproval`).
**Fonte:** derivado dos dois indicadores acima.
**Fórmula:** `valorContratualAtual − medicoesAprovadas` (ambos em `sumMoney`/`Decimal`, nunca subtraídos em ponto flutuante bruto).
**Filtros:** os mesmos dos dois indicadores de origem.
**Periodicidade:** tempo real.
**Responsável pelo cálculo:** mesmo módulo.
**Observações:** "não executado" aqui significa "não medido/aprovado" — não é o mesmo que "não pago" nem "não liquidado" (conceitos que o SIGFIS não modela hoje).

---

### Estimativa Mensal Calculada (Carteira) / Média Mensal Calculada por Contrato

**Definição:** Valor mensal estimado de cada contrato = valor contratual atual dividido pela duração contratual (mês comercial de 30 dias, fracionário). A "Estimativa da Carteira" é a soma desses valores mensais entre todos os contratos ativos com datas válidas; a "Média por Contrato" é essa soma dividida pela quantidade de contratos considerados.
**Fonte:** `contracts.currentValue`, `contracts.startDate`, `contracts.endDate`.
**Fórmula:** `contractMonthlyValue(currentValue, startDate, endDate) = currentValue / max(dias/30, 1)`; soma direta em ponto flutuante (não em centavos — ver nota de precisão no próprio código-fonte, `financial-calculations.ts`), pois é resultado de divisão, não um valor monetário "limpo".
**Filtros:** contrato ativo; excluído do cálculo se `endDate ≤ startDate` ou datas inválidas (contabilizado em `contratosComValorMensalInvalido`).
**Periodicidade:** tempo real.
**Responsável pelo cálculo:** mesmo módulo.
**Observações:** **é uma estimativa calculada, não um campo cadastrado** — o schema do banco não tem nenhuma coluna de "valor mensal" (auditado contra a migration real de produção). Nunca deve ser chamado de "desembolso mensal" nem tratado como prognóstico de caixa — é só o valor contratual dividido pela duração.

---

### Taxa de Execução (Medições)

**Definição:** Medições Aprovadas dividido pelo Valor Contratual Atual, em percentual.
**Fórmula:** `(medicoesAprovadas / valorContratualAtual) × 100`; retorna 0 se não houver valor contratual.
**Filtros/Periodicidade:** os mesmos de "Medições Aprovadas" (card, todo o histórico).
**Responsável pelo cálculo:** mesmo módulo.
**Observações:** o nome "Execução" aqui significa especificamente "medição aprovada sobre contratado" — não é uma taxa de desembolso financeiro. Ver recomendação de nomenclatura em AUDITORIA-SIGFIS.md, Seção 7.

---

### Contratos Ativos / Contratos por Situação

**Definição:** Contagem de contratos por `status` (`DRAFT`, `ACTIVE`, `SUSPENDED`, `CONCLUDED`, `RESCINDED`).
**Fonte:** `contracts.status`.
**Fórmula:** contagem simples por valor do enum.
**Filtros:** "Contratos Ativos" (KPI) considera só `ACTIVE`; "Contratos por Situação" (gráfico) considera todos os status, sobre o mesmo conjunto de contratos (`archived: false`).
**Observações:** os dois nunca divergem entre si por definição — usam o mesmo array-fonte, sem filtro adicional em nenhum dos dois cálculos.

---

### Mapa de Riscos Contratuais (Crítico/Alto/Médio/Baixo)

**Definição:** Classificação heurística de risco por contrato ativo, baseada em proximidade de vencimento, ocorrências abertas, medições pendentes e alertas pendentes.
**Fórmula (score por contrato, somado e limitado a 100):**
- Vencimento: `+40` se vencido, `+35` se ≤30 dias, `+20` se ≤90 dias, `+10` se ≤180 dias;
- Ocorrência aberta: `+30` (crítica), `+15` (alta), `+5` (outra severidade), por ocorrência;
- Medição pendente (fiscal ou gestor): `+10` por medição;
- Alerta pendente: `+8` por alerta.
- Faixas finais: `≥60` Crítico, `≥40` Alto, `≥20` Médio, resto Baixo.
**Filtros:** apenas contratos ativos.
**Responsável pelo cálculo:** `frontend/src/lib/api.ts`, handler `/dashboard/gestor`, bloco `riskSummary`.
**Observações:** fórmula documentada aqui pela primeira vez de forma centralizada (não havia documentação pública anterior) — não há tooltip explicando os pesos na interface hoje (recomendação em AUDITORIA-SIGFIS.md).

---

### Carga de Trabalho — Fiscais

**Definição:** Quantidade de contratos ativos sob responsabilidade de cada fiscal, e valor contratual somado desses contratos.
**Fonte:** `fiscal_assignments` (papel `TITULAR`, `isActive = true`) cruzado com `contracts` ativos.
**Fórmula:** contagem e soma de `currentValue` dos contratos vinculados.
**Filtros:** **apenas designações com papel `TITULAR`** — fiscal atuando só como Substituto/Suplente não é contado aqui nem em "contratos sem fiscal".
**Observações:** decisão de definição sinalizada para confirmação com a gestão (AUDITORIA-SIGFIS.md, item 3). Não há risco de contagem duplicada de contrato (verificado por código).
