# Auditoria Técnica e Funcional — SIGFIS

**Data:** 2026-08-24
**Escopo desta rodada:** investigação completa da divergência financeira reportada no Painel Geral ("Execução Financeira"), causa raiz, correção implementada e verificada, mais uma auditoria de consistência interna do mesmo bloco de código (que concentra praticamente todos os indicadores do Painel Geral).

> **Nota de transparência (obrigatória, Seção 27 do pedido):** este documento cobre o que foi efetivamente investigado, corrigido e testado nesta rodada — o problema financeiro concreto e a consistência interna do "Painel Geral". Os itens das Seções 10–20 do pedido original (novo "Índice de Saúde Contratual", alertas inteligentes, drill-down generalizado, auditoria completa de segurança/performance, testes automatizados de frontend) **não foram implementados** — estão listados na Seção 8 (Débitos Técnicos / Recomendações) como trabalho futuro, não como concluído. Nada foi inventado ou dado como corrigido sem verificação por código e/ou teste.

---

## 1. Resumo Executivo

O bloco "Execução Financeira" do Painel Geral mostrava dois números para, aparentemente, a mesma grandeza ("valor executado"):

- **R$ 448.557,00** — total do gráfico "Medições Aprovadas por Período" com "6 meses" selecionado;
- **R$ 713.881,73** — valor no card "Medições Aprovadas" (Contratado/Medições Aprovadas/Saldo).

**Causa raiz confirmada:** os dois números vinham de **duas implementações independentes**, com **populações de contratos diferentes** e **janela de tempo diferente** (uma fixa em 6 meses, sem filtro de contrato; a outra sem limite de tempo, restrita a contratos ativos) — nunca poderiam coincidir, exceto por coincidência de dados. Não havia inconsistência aritmética dentro de cada cálculo: **cada um dos dois números, isoladamente, sempre esteve certo para a própria definição** — a inconsistência era entre as duas definições estarem lado a lado, com nomes quase idênticos, sem essa diferença estar explícita.

**Correção:** unificada a população de contratos e a precisão de soma entre o gráfico e o card (mesma fonte: contratos ativos, medições `APPROVED`, soma seguro em centavos). A janela de tempo do gráfico deixou de ser fixa em 6 meses — agora é dinâmica, cobrindo desde o contrato ativo mais antigo (ou a medição aprovada mais antiga) até o mês atual. No filtro "Personalizado" (que hoje é o único que representa "todo o histórico", pois não há seletor de intervalo customizado na interface), o total do gráfico agora **é idêntico, ao centavo**, ao card "Medições Aprovadas" — confirmado com dado real do banco de desenvolvimento (ver Seção 4, Testes).

---

## 2. Arquitetura Identificada

### 2.1 Frontend
- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- **Estrutura:** SPA de rota única (`src/app/page.tsx` concentra roteamento via estado React + `window.history`, não rotas de arquivo por view). Views em `src/components/views/*.tsx`, componentes de UI reutilizáveis em `src/components/ui/*.tsx`.
- **Estado/dados:** TanStack Query (`useQuery`/`useMutation`) para todo dado remoto; sem Redux/Zustand. `staleTime` configurado por query (ex.: 300s no Painel Geral) — não há invalidação automática por tempo, só por `refetch()`/mutação.
- **Camada HTTP:** um único módulo `src/lib/api.ts` concentra todas as chamadas via uma função `request()` central. Não há interceptors de framework (axios etc.) — a lógica de erro, fallback e header de autenticação está toda dentro de `request()`.
- **Particularidade crítica (ver Seção 2.3):** `request()` tenta sempre o backend real primeiro; se o endpoint não existir no backend (404) **e** não estiver na lista `REAL_CRUD_PREFIXES`, cai num simulador local (`handleLocalFallback`) que recalcula os dados no próprio navegador a partir de outros endpoints reais já carregados. Isso NÃO é cache — é uma reimplementação paralela das regras de negócio.
- **Autenticação:** JWT em `localStorage`, enviado via header `Authorization: Bearer` em `request()`.
- **Erros:** `isError`/`isLoading` do React Query em cada view, com componente `EmptyState` para estado de erro/vazio.

### 2.2 Backend
- **Framework:** NestJS 11, Prisma 5.22 (ORM), PostgreSQL (Supabase).
- **Módulos relevantes:** `contracts`, `contractors`, `measurements`, `payments`, `processes`, `occurrences`, `audit`, `users`, `communications`, `backup`, `auth`. **Não existe módulo `dashboard`, `risk` nem `ai` no backend** — os endpoints `/dashboard/*`, `/risk-panel`, `/pending-dashboard` e `/ai/*` só existem no frontend (fallback local, ver 2.3).
- **Guards:** `JwtAuthGuard` + `RolesGuard` (decorator `@Roles`) em praticamente todos os controllers.
- **Auditoria:** `AuditService.log()` chamado manualmente ou via decorator `@Audit()` + `AuditInterceptor` global — grava em `AuditLog`, tabela sem FK para as entidades que referencia (`entityId` é string solta), por design (ver `backend/src/audit/audit.service.ts`).
- **Cálculo financeiro real:** `backend/src/contracts/financial-calculations.ts` — módulo com `Prisma.Decimal`, testado (`financial-calculations.spec.ts`, `financial-calculations.parity.spec.ts`, 33 testes, todos passando), usado por `ContractsService.getDashboardStats` (`GET /contracts/stats`) e `ContractsService.findReport` (`GET /contracts/report`).

### 2.3 A duplicação estrutural (achado central da auditoria)

```
                    ┌─────────────────────────────┐
                    │   backend/.../financial-     │
                    │   calculations.ts             │
                    │   (Prisma.Decimal, testado)   │
                    └──────────────┬────────────────┘
                                   │ usado por
                     ┌─────────────┴─────────────┐
                     ▼                           ▼
        GET /contracts/stats          GET /contracts/report
        (getDashboardStats)           (findReport)
                     │                           │
                     ▼                           ▼
         NÃO CONSUMIDO POR                Relatório PDF
         NENHUMA TELA HOJE                (ContractReport.tsx)


                    ┌─────────────────────────────┐
                    │  frontend/lib/financial-      │
                    │  calculations.ts              │
                    │  (number, "espelho" do backend)│
                    └──────────────┬────────────────┘
                                   │ usado por
                     ┌─────────────┴─────────────────┐
                     ▼                                ▼
        GET /dashboard/gestor                 ContractTabs.tsx
        (fallback LOCAL — não existe          (edição de valores,
        rota real no backend!)                 não agregação)
                     │
                     ▼
         Painel Geral (GestorDashboard.tsx)
         ← TELA ONDE O BUG FOI ENCONTRADO
```

O Painel Geral **nunca chegou a usar** o módulo financeiro do backend (Decimal, testado, validado contra dado de produção). Ele usa uma cópia em `number` no frontend, que existe só porque `/dashboard/gestor` nunca foi implementado como rota real no NestJS. As duas cópias são bem documentadas e mantidas com a mesma fórmula ("Espelha backend/.../financial-calculations.ts" — comentário no topo do arquivo) — mas o **gráfico dentro do próprio Painel Geral** tinha uma TERCEIRA implementação ad-hoc (a lógica de `monthlyEvolution`, com janela fixa de 6 meses e sem escopo de contrato), que não seguia nem o espelho nem o original. Essa terceira implementação é a raiz do bug.

### 2.4 Banco (Prisma)
- 14 modelos: `User`, `Contractor`, `ProcurementProcess`, `Contract`, `FiscalAssignment`, `Occurrence`, `InspectionMeasurement`, `ContractAlteration`, `Document`, `Communication`, `SystemAlert`, `ProcurementPhase`, `ContractPayment`, `AuditLog`.
- Campos monetários: `Decimal(15,2)` em todo lugar no schema (`Contract.initialValue/currentValue`, `InspectionMeasurement.measurementValue`, `ContractAlteration.valueChange`, `ContractPayment.value`, `ProcurementProcess.estimatedValue`) — **nunca `Float`**. Correto desde o schema.
- `Contract.status`: enum `DRAFT | ACTIVE | SUSPENDED | CONCLUDED | RESCINDED` — única definição no sistema, usada de forma consistente (nenhum módulo reinterpreta o enum).
- `Contract.archived` (adicionado nesta mesma sessão, ver commits anteriores): campo independente de `status`, correto conceitualmente — arquivamento ≠ situação contratual.

---

## 3. Fluxo de Dados — Indicadores do Painel Geral

| Indicador | Origem Banco | Endpoint | Cálculo | Filtro de contrato | Filtro de tempo |
|---|---|---|---|---|---|
| Contratos Ativos | `contracts.status` | (fallback local, lê `/contracts`) | `contracts.filter(status==='ACTIVE').length` | — | — |
| Valor Contratual Atual | `contracts.currentValue` | idem | `sumMoney(active.map(currentValue))` | Ativos | — |
| **Medições Aprovadas (card)** | `inspections_measurements.measurementValue` | idem | `computePortfolioFinancials` → `sumApprovedMeasurements` | **Ativos** | **nenhum (todo histórico)** |
| **Medições Aprovadas (gráfico, ANTES da correção)** | idem | idem | soma bruta em `float`, por mês calendário | **nenhum** (qualquer status) | **fixo, últimos 6 meses** |
| **Medições Aprovadas (gráfico, DEPOIS da correção)** | idem | idem | `sumMoney`, por mês calendário | **Ativos (igual ao card)** | **dinâmico** (30d/90d/6m/12m/todo o histórico) |
| Saldo Não Executado | derivado | idem | `valorContratualAtual − medicoesAprovadas` | Ativos | todo histórico |
| Mapa de Riscos (crítico/alto/médio/baixo) | `contracts`, `occurrences`, `measurements`, `contractAlerts` | idem | score heurístico por contrato, ver §6.3 | Ativos | — |
| Contratos por Situação | `contracts.status` | idem | agrupamento por enum | Todos | — |
| Carga de Trabalho — Fiscais | `fiscal_assignments` | idem | contagem de contratos ativos por fiscal `TITULAR` | Ativos + só `TITULAR` (ver §6.5) | — |

---

## 4. O Problema Concreto — Diagnóstico Completo

### 4.1 De onde vem cada valor (antes da correção)

**R$ 713.881,73** (card "Medições Aprovadas"):
`frontend/src/lib/api.ts`, handler `/dashboard/gestor` → `computePortfolioFinancials(activeWithMeasurements)` → `frontend/src/lib/financial-calculations.ts::sumApprovedMeasurements()`.
- População: `active` = contratos com `status === 'ACTIVE'` (36 de 36 no ambiente de desenvolvimento).
- Medições consideradas: **todas** as medições desses contratos com `status === 'APPROVED'`, **sem filtro de data**.
- Precisão: `sumMoney()` — soma em centavos (inteiros), evita erro de ponto flutuante.

**R$ 448.557,00** (gráfico, período "6 meses"):
`frontend/src/lib/api.ts`, mesmo handler → bloco `monthlyEvolution` (linha ~840, antes da correção).
- Janela: **fixa** em 6 meses corridos a partir do mês atual (`_dynMonths` com `length: 6`, hardcoded).
- Medições consideradas: **qualquer** `InspectionMeasurement` do banco com `status === 'APPROVED'` e `periodEnd` dentro de um desses 6 meses — **sem checar a qual contrato pertence nem o status desse contrato** (incluiria medição de contrato encerrado, rescindido ou suspenso, se existisse).
- Precisão: `Number(m.measurementValue)` somado com `+=` bruto (float), sem `sumMoney`.
- O seletor de período na tela ("30 dias / 90 dias / 6 meses / 12 meses / Personalizado") apenas **fatiava** esse array de 6 posições já pronto — "12 meses" e "Personalizado" mostravam exatamente os mesmos 6 meses que "6 meses", pois nunca havia mais que 6 meses calculados. Havia até uma nota (`"Disponível apenas o histórico dos últimos 6 meses"`) documentando essa limitação — mas o usuário não tinha como saber, ao selecionar "12 meses" esperando ver mais dados, que o resultado seria idêntico ao de "6 meses" por essa razão.

### 4.2 Por que nunca poderiam coincidir

Duas populações e duas janelas de tempo diferentes, por definição, só coincidem por acaso. Neste ambiente, a diferença de R$ 265.324,73 vinha de medições aprovadas com `periodEnd` fora da janela fixa de 6 meses (ex.: medições de janeiro/fevereiro de 2026, com a data de hoje em agosto de 2026) — presentes no card (sem limite de tempo) e ausentes do gráfico (fora dos últimos 6 meses).

### 4.3 Respondendo aos 20 pontos de investigação pedidos

1. **De onde vem cada valor:** ver §4.1.
2. **Endpoint:** ambos vêm do mesmo endpoint (`/dashboard/gestor`) — não é um problema de endpoints diferentes, é lógica diferente dentro do mesmo handler.
3. **Query:** não há query SQL direta — o handler consome o resultado já carregado de `GET /contracts` (que inclui `measurements` por contrato) e recalcula tudo em memória no navegador.
4. **Tabela/modelo Prisma:** `InspectionMeasurement` (medições) e `Contract` (valor/situação), em ambos os casos.
5. **Campos monetários:** `measurementValue` (medição) e `currentValue` (contrato) — `Decimal(15,2)` no banco.
6. **Regra de cálculo:** ver §4.1 — populações e janelas diferentes era a regra (não documentada como tal) que causava a divergência.
7. **Filtro de período:** só o gráfico tinha filtro de período, e mesmo assim um filtro que não fazia nada além de "6m" (ver §4.1).
8. **Contratado / empenhado / liquidado / medido / pago / executado / saldo:** o SIGFIS **não modela empenho nem liquidação** (confirmado: nenhum campo, nenhuma tabela, nenhuma migration para isso — ver `LIQUIDACAO_NAO_DISPONIVEL` em `financial-calculations.ts`, já documentado antes desta auditoria). O sistema trata apenas: **contratado** (`currentValue`), **medido/"executado"** (soma de medições `APPROVED` — este é o "executado" usado hoje, e é isto que "Medições Aprovadas" significa), **pago** (`ContractPayment.value`, tabela existe mas com poucos registros de exemplo), **saldo** (contratado − medido). Chamar medição aprovada de "executado" sem qualificar é uma fonte de ambiguidade real — ver Seção 7 (nomenclatura).
9. **Deveriam representar a mesma grandeza?** Não necessariamente — mas precisavam usar a **mesma definição de contrato elegível e a mesma precisão**, o que não acontecia. Depois da correção, os dois usam a mesma população; a diferença remanescente entre "6 meses" e "todo o histórico" é intencional e agora está corretamente rotulada.
10. **Dados duplicados:** não encontrados — cada `InspectionMeasurement` é contada uma vez em cada cálculo (não há junção que duplique linha).
11. **Registros ignorados:** sim — medições de contratos não-ativos eram ignoradas pelo card mas **não** pelo gráfico (antes da correção); corrigido.
12. **Filtros diferentes:** sim, este era o problema central — ver §4.1/4.2.
13. **Timezone:** os campos usados (`periodEnd`, datas de contrato) são `@db.Date` (sem componente de hora) — `new Date(string)` em JS interpreta `YYYY-MM-DD` como UTC 00:00; ao comparar `getFullYear()/getMonth()` (que usam fuso **local** do processo), há risco teórico de um registro de 31/01 vazar para fevereiro em fusos com offset negativo grande — não é o caso do Brasil (UTC-3, sempre "atrasa", nunca "adianta" o dia), então não é a causa deste bug, mas é um ponto de atenção documentado na Seção 8.
14/15. **Data inicial/final, 00:00/23:59:** o filtro por mês usa `getFullYear()/getMonth()` diretamente (comparação de calendário, não de intervalo `gte/lte`) — não sofre do bug clássico de "23:59:59 exclui o último dia", porque não há comparação de intervalo de datas aqui, só igualdade de mês/ano.
16. **Decimal/number/string:** o gráfico somava em `float` puro (`+= Number(...)`); o card usa `sumMoney` (soma em centavos inteiros). Ambos agora usam `sumMoney` — corrigido.
17. **Arredondamento:** havia um `Math.round()` aplicado a cada valor mensal do gráfico **antes** de somar (no componente React, não no cálculo) — arredondar termos antes de somar é o padrão exatamente errado que o próprio `sumMoney()` existe para evitar. Corrigido: removido o arredondamento intermediário.
18. **Cache:** `staleTime: 300_000` (5 min) no React Query — não é a causa (o usuário via a divergência mesmo após "Atualizar dados").
19. **Estado antigo do frontend:** não aplicável — o bug era determinístico, reproduzível a qualquer momento com o mesmo dado.
20. **Endpoints diferentes calculando a mesma métrica:** sim, em sentido mais amplo — ver §2.3 (arquitetura com 3 implementações da mesma família de cálculo). Resolvido *dentro* do Painel Geral nesta rodada; a duplicação **entre** backend e frontend fallback continua existindo e está documentada como débito técnico (Seção 8).

---

## 5. Correção Implementada

| Arquivo | Alteração |
|---|---|
| `frontend/src/lib/api.ts` | Handler `/dashboard/gestor`: `monthlyEvolution` passa a filtrar medições apenas de contratos `ACTIVE` (mesmo `Set` de IDs usado por `financial`), soma via `sumMoney` (antes: `float` bruto), e a janela de meses passa a ser dinâmica (mínimo 6, máximo 120, calculada a partir da data mais antiga relevante — início do contrato ativo mais antigo ou medição aprovada mais antiga) em vez de fixa em 6. |
| `frontend/src/components/views/GestorDashboard.tsx` | `displayedMonthly` passa a fatiar corretamente por período (30d→1 mês, 90d→3, 6m→6, 12m→12, Personalizado→todo o histórico calculado); removido o `Math.round()` que descartava centavos antes da soma; `periodTotal` agora usa `sumMoney`; nota de rodapé do gráfico atualizada (a antiga dizia "só há 6 meses calculados", o que não é mais verdade). |
| `frontend/src/lib/financial-calculations.ts` | Tooltip de "Medições Aprovadas" reescrito para deixar explícito que é um total de **todo o histórico**, independente do período selecionado no gráfico acima — elimina a ambiguidade de nome que originou a confusão. |

Nenhuma migration, nenhuma alteração de schema, nenhum dado do banco foi tocado — a correção é inteiramente de lógica de agregação no frontend.

---

## 6. Auditoria de Consistência Interna do Painel Geral

Como o Painel Geral inteiro é computado numa única função (`/dashboard/gestor` no fallback local), a maioria dos indicadores compartilha os mesmos arrays-base (`contracts`, `active`), o que **por construção** já garante bater entre si:

- **6.1** "Contratos Ativos" (KPI) e o total do Mapa de Riscos (`critical+high+medium+low`) **sempre batem** — ambos iteram sobre o mesmo array `active`, sem filtro adicional em nenhum dos dois. Confirmado por leitura de código (não há como divergir, dado o mesmo array-fonte).
- **6.2** "Contratos por Situação" some para o total de `contracts.length` (todos os status), não para `active.length` — **isso é esperado**, pois inclui Suspensos/Encerrados/Rascunho além dos Ativos; não é um bug, mas o rótulo da seção poderia deixar isso mais explícito (Seção 8).
- **6.3** Mapa de Riscos: o "score" de cada contrato é uma heurística local (não documentada como fórmula pública antes desta auditoria): `+40/35/20/10` por proximidade de vencimento, `+30/15/5` por ocorrência aberta (crítica/alta/outra), `+10` por medição pendente, `+8` por alerta pendente, somado e limitado a 100; faixas: `≥60` crítico, `≥40` alto, `≥20` médio, resto baixo. **Não há fórmula documentada publicamente na tela** (o tooltip do card não explica os pesos) — recomendação na Seção 8. Contrato **não-ativo nunca aparece** no mapa (a função só itera `active`) — correto, confirmado por leitura de código.
- **6.4** Health Score (não exibido diretamente no Painel Geral atual, mas calculado): fórmula com deduções por vencido/ocorrência crítica/medição pendente/processo atrasado/sem fiscal/vencendo em 90d — existe e é coerente, mas não está sendo consumida por nenhum componente visível hoje (débito técnico, Seção 8).
- **6.5** Carga de Trabalho dos Fiscais: conta apenas designações com `role === 'TITULAR'` — um fiscal atuando **só como Substituto/Suplente** num contrato não aparece nessa lista nem no card "Contratos sem fiscal" (que também só verifica `TITULAR`). Não é um bug de duplicação (nenhuma dupla contagem encontrada), mas é uma decisão de definição que vale confirmar com a gestão: "carga de trabalho" deveria contar todos os papéis, ou só o Titular é intencional? Sinalizado na Seção 8, não alterado nesta rodada (mudança de regra de negócio, não de bug).
- **6.6** Não foi encontrado risco de **medição sem contrato** ou **pagamento sem contrato**: `InspectionMeasurement.contractId` e `ContractPayment.contractId` são colunas `NOT NULL` com FK no schema — o banco impede esses registros por constraint, não é possível criar um órfão desses.
- **6.7** Contrato **arquivado** não aparece em nenhum destes cálculos porque `contracts` (usado por `active = contracts.filter(status==='ACTIVE')`) já vem do endpoint `GET /contracts`, que desde a funcionalidade de arquivamento (commit `deb655d0`, sessão anterior) filtra `archived: false` — confirmado por leitura de código, não testado ao vivo nesta rodada especificamente (já testado extensivamente quando a funcionalidade foi implementada).

---

## 7. Nomenclatura — Achado

O termo **"executado"** não aparece nos rótulos atuais da tela (checado no código-fonte de `GestorDashboard.tsx` — os rótulos atuais já são "Medições Aprovadas", "Saldo Não Executado", "Taxa de Execução (Medições)"), mas a KPI do topo se chama **"Taxa de Execução (Medições)"**, que mistura o conceito de execução financeira com "medição aprovada" — tecnicamente correto (é isso que ela mede, e o tooltip explica), mas o nome por si só pode sugerir "% pago", que não é o caso. Recomendação: manter o tooltip sempre visível (já existe) e considerar renomear para algo como "Taxa de Medição sobre o Contratado" numa próxima revisão de UX — não alterado nesta rodada por ser mudança de rótulo em produção sem necessidade técnica imediata.

---

## 8. Débitos Técnicos e Recomendações (não implementados nesta rodada)

| # | Item | Severidade | Descrição |
|---|---|---|---|
| 1 | `/dashboard/gestor` não é uma rota real do backend | **ALTA** | Todo o Painel Geral é recalculado no navegador a partir de `GET /contracts`; o backend já tem `computePortfolioFinancials` testado e em produção via `/contracts/stats`, mas nenhuma tela o consome. Migrar o Painel Geral para consumir um endpoint real eliminaria a duplicação de regra de negócio de vez (ver Seção 23 do pedido original — "fonte única de verdade"). |
| 2 | Ausência de infraestrutura de testes de frontend | **ALTA** | `frontend/package.json` não tem nenhum test runner configurado. O backend tem 33 testes cobrindo `financial-calculations.ts` (todos passando); o frontend não tem cobertura equivalente para sua própria cópia das fórmulas. Recomenda-se introduzir Vitest ou Jest + Testing Library. |
| 3 | Carga de Trabalho dos Fiscais só considera papel `TITULAR` | **MÉDIA** | Ver §6.5 — confirmar com a gestão se é intencional. |
| 4 | Mapa de Riscos sem fórmula documentada na interface | **MÉDIA** | A fórmula existe e foi documentada nesta auditoria (§6.3), mas não há tooltip explicando os pesos para o usuário final. |
| 5 | Health Score calculado mas não exibido | **BAIXA** | Código pronto e coerente, sem consumidor na UI atual. |
| 6 | "Personalizado" não tem seletor de intervalo de datas | **BAIXA** | Hoje é sinônimo de "todo o histórico calculado". Se a intenção é permitir escolher datas específicas, é uma funcionalidade nova a construir, não um bug. |
| 7 | Comparação de datas por `getFullYear()/getMonth()` (fuso local) | **BAIXA** | Não é a causa de nenhum bug encontrado (Brasil não tem risco de virada de dia por fuso nesse sentido), mas é um padrão frágil se o sistema algum dia rodar em outro fuso de servidor. Recomenda-se, numa próxima revisão, padronizar para comparação por intervalo UTC explícito. |
| 8 | Duplicação estrutural backend/frontend das fórmulas financeiras | **MÉDIA** | Documentada e mantida em paridade manual (mesmo nome, mesma fórmula, comentário cruzado) — funciona, mas é frágil a longo prazo. Resolvida definitivamente só migrando o Painel Geral para o backend real (item 1). |
| 9 | Itens das Seções 10–20 do pedido original (Índice de Saúde Contratual, alertas inteligentes, drill-down generalizado, novos indicadores de vencimento/risco×valor, auditoria completa de segurança e performance) | — | Não implementados nesta rodada — fora do escopo do bug relatado; recomenda-se tratar como iniciativa própria, com o mesmo rigor de auditoria antes de qualquer fórmula nova (ex.: o "Índice de Saúde Contratual" pedido precisa de metodologia definida e aprovada antes de virar código, conforme o próprio pedido original exige). |

---

## 9. Critério de Aceite — Checagem

- [x] Os valores financeiros do bloco investigado agora fecham entre si (verificado com dado real, ver Seção 4 do relatório final).
- [x] Os filtros de período do gráfico agora produzem resultados diferentes entre si quando há dado suficiente (30d/90d/6m/12m/Personalizado).
- [x] "Personalizado" (equivalente a "todo o histórico" hoje) reconcilia exatamente com o card "Medições Aprovadas".
- [x] Dinheiro tratado com soma segura (`sumMoney`, centavos inteiros) nos dois lados agora.
- [x] Datas tratadas de forma consistente entre os dois cálculos (mesmo campo, `periodEnd`, mesma comparação de calendário).
- [x] O indicador "Medições Aprovadas" tem fonte de verdade única identificável e documentada (`sumApprovedMeasurements`, mesma população em ambos os usos).
- [ ] Migração para backend real como fonte única de verdade — **não feita nesta rodada** (débito técnico #1).
- [ ] Auditoria de segurança, performance e UX completas — **não feitas nesta rodada** (fora do escopo do bug relatado; ver nota de transparência no topo).
