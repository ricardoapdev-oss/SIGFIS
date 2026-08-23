# Plano de Importação — Base Histórica de Contratos (36 registros)

> Documento de planejamento técnico. NÃO é um script. Nenhuma execução foi feita. Baseado em `contracts-vigentes.data.ts`, `validation.json`, `validation-v2.json`, `validation-v3.json`, `schema.prisma` e código atual de `contracts`, `processes`, `contractors`, `auth`/`users`.

---

# 1. Ordem de importação

Ordem tecnicamente exigida pelas dependências de chave estrangeira do `schema.prisma`:

1. **Users (fiscais)** — apenas SE a decisão institucional (seção 9) optar por criar usuários reais para os 22 fiscais. `FiscalAssignment.fiscalId` exige um `User.id` existente; `ProcurementProcess.requesterId` exige um `User.id` existente. Sem isso, nenhuma das etapas seguintes que dependem de usuário pode ser concluída (ainda que `Contract.managerId` seja opcional).
2. **Contractors** — não depende de nenhuma outra entidade nova; `Contract.contractorId` exige que o `Contractor` já exista. CNPJ (`@unique`) deve estar confirmado antes da criação.
3. **ProcurementProcess** — depende de `User` (via `requesterId`, obrigatório). `Contract.processId` é opcional, mas se for preenchido depende do processo já existir.
4. **Contract** — depende de `Contractor` (obrigatório) e opcionalmente de `ProcurementProcess` e `User` (manager).
5. **FiscalAssignment** — depende de `Contract` (obrigatório) e `User` (fiscal, obrigatório).
6. **ContractAlteration** (aditivos, quando aplicável) — depende de `Contract` e de `User` (requestedById, obrigatório).
7. **ContractPayment / InspectionMeasurement / Occurrence / Document / Communication / SystemAlert** — nenhum dado da base histórica alimenta essas entidades hoje; fora do escopo desta importação.

---

# 2. Mapeamento de entidades

| Entidade da base histórica | Modelo Prisma alvo |
|---|---|
| `company` (36 linhas) | `Contractor` |
| `fiscal` (22 pessoas únicas) | `User` (role `FISCAL`) |
| `processNumber` + `unit` + `legalBasis` | `ProcurementProcess` |
| `contractNumber` + `object` + `value` + `start` + `end` + `observation` + `addendum` | `Contract` (+ eventual `ContractAlteration` para o aditivo) |
| `ordinance` + `fiscal` | `FiscalAssignment` |

---

# 3. Mapeamento de campos

## Contractor
| Campo Prisma | Origem | Situação |
|---|---|---|
| `corporateName` | `company` | Disponível para os 36 |
| `cnpjCpf` (`@unique`, obrigatório) | Pesquisa externa (ETAPA 2/3) | Confirmado para 30/36; NÃO LOCALIZADO para 6 |
| `email` (obrigatório) | — | NÃO LOCALIZADO para 36/36 |
| demais campos (`tradeName`, `phone`, endereço, inscrições) | — | Nenhum disponível na fonte histórica; todos opcionais no schema |

## ProcurementProcess
| Campo Prisma | Origem | Situação |
|---|---|---|
| `processNumber` (`@unique`, obrigatório) | `processNumber` | 17/36 em formato direto; 19/36 reconstruídos de notação científica, sem confirmação documental |
| `subject` (obrigatório) | `object` (recuperável da fonte original) | Disponível para os 36 |
| `modality` (obrigatório, enum) | Documentado via planilha oficial para parte dos casamentos HIGH; inferência via `legalBasis` para 6 | Ver seção 7 |
| `estimatedValue` (obrigatório, Decimal) | Não documentado na fonte histórica de forma inequívoca | NÃO INFORMADO — usar `value` do contrato como aproximação exigiria decisão institucional |
| `requesterDepartment` (obrigatório) | `unit` | Disponível para os 36 |
| `requesterId` (obrigatório, FK `User`) | — | **DECISÃO INSTITUCIONAL PENDENTE** (seção 9) |

## Contract
| Campo Prisma | Origem | Situação |
|---|---|---|
| `contractNumber` (`@unique`, obrigatório) | `contractNumber` | 2 colisões (09/2025, 17/2025), 1 malformado (003/202) |
| `contractorId` (obrigatório, FK) | depende do Contractor resolvido | Depende da seção anterior |
| `objectDescription` (obrigatório) | `object` | Disponível para os 36 (recuperado da fonte original nesta etapa) |
| `initialValue` (obrigatório, Decimal) | Coluna VALOR da planilha oficial | Documentado para poucos; ausente na maioria — ver seção 8 |
| `currentValue` (obrigatório, Decimal) | `value` da fonte histórica | Disponível para os 36 (mas é o valor "vigente", não necessariamente o inicial) |
| `signingDate` (obrigatório, Date) | Coluna ASSINATURA da planilha oficial | Documentado para 25/36; ausente para 11/36 — ver seção 8 |
| `startDate` / `endDate` (obrigatórios) | `start` / `end` | Disponível para os 36 |
| `status` (obrigatório, enum) | Não documentado explicitamente | Inferência de negócio (ex.: `ACTIVE`), não confirmada |
| `managerId` (opcional, FK) | — | Não disponível; campo é opcional, então pode ficar `null` sem violar o schema |
| `department` (opcional) | `unit` | Disponível |
| `observations` (opcional) | `observation` | Disponível quando presente |

## FiscalAssignment
| Campo Prisma | Origem | Situação |
|---|---|---|
| `fiscalId` (obrigatório, FK `User`) | `fiscal` | Depende de usuário existir em PROD — hoje nenhum dos 22 existe |
| `designationAct` (obrigatório) | `ordinance` | Disponível para os 36 |
| `designationDate` / `startDate` (obrigatórios) | Não documentado separadamente | Aproximação de `start` exigiria decisão institucional (não presumida aqui) |
| `role` (obrigatório, enum) | Não documentado | `TITULAR` seria uma suposição, não um fato da fonte |

---

# 4. Campos obrigatórios ausentes (consolidado)

| Campo | Registros afetados | Origem do gap |
|---|---|---|
| `Contractor.cnpjCpf` | 6/36 | Não localizado por nenhuma fonte que atenda ao padrão de confiança exigido |
| `Contractor.email` | 36/36 | Nenhuma fonte trouxe e-mail; campo sem uso funcional no código |
| `ProcurementProcess.requesterId` | 36/36 | Nenhuma regra institucional definida |
| `ProcurementProcess.modality` | 9/36 (2 com valor documentado mas sem correspondência segura no enum — "Ata de Registro de Preços"; ~7 sem nenhuma modalidade documentada nem inferível) | Ver seção 7 |
| `ProcurementProcess.estimatedValue` | 36/36 | Não documentado como valor "estimado" distinto do valor contratado |
| `Contract.signingDate` | 11/36 | Planilha oficial não documenta para esses contratos específicos |
| `Contract.initialValue` | 32/36 | Coluna "VALOR" da planilha oficial veio em branco/"-" para a maioria (só a coluna de valor pós-aditivo estava preenchida em muitos casos) |
| `Contract.status` | 36/36 | Não documentado; seria inferência de negócio |
| `FiscalAssignment.fiscalId` (usuário real em PROD) | 36/36 | Nenhum dos 22 fiscais existe hoje como `User` em PROD |

---

# 5. Relações

- `Contract.contractorId → Contractor.id`: bloqueada para 6 contratos sem CNPJ confirmado.
- `Contract.processId → ProcurementProcess.id`: opcional; tecnicamente poderia ser deixado `null` para não bloquear o `Contract`, mas isso descartaria a rastreabilidade do processo — decisão de modelagem, não avaliada como bloqueio aqui.
- `ProcurementProcess.requesterId → User.id`: bloqueada para os 36 (decisão institucional pendente).
- `FiscalAssignment.fiscalId → User.id`: bloqueada para os 36 (nenhum usuário fiscal existe em PROD hoje).
- `FiscalAssignment.contractId → Contract.id`: depende do `Contract` já existir (ordem 4 antes de 5 na seção 1).

---

# 6. Constraints

| Constraint | Registros em risco | Situação |
|---|---|---|
| `Contractor.cnpjCpf @unique` | Nenhum risco de colisão ENTRE os 36 (nomes de empresa distintos); risco só existiria se um CNPJ pesquisado já existir em outro `Contractor` cadastrado no PROD por outro motivo — não verificável sem acesso de leitura ao PROD nesta sessão |
| `ProcurementProcess.processNumber @unique` | Nenhuma duplicidade encontrada entre os 36 próprios registros (verificado programaticamente nesta etapa) |
| `Contract.contractNumber @unique` | **2 colisões reais**: `"09/2025"` (ZENITE ord 25 × BIOCIENTIFIC ord 36) e `"17/2025"` (WORK7 ord 33 × AUDIGESPUB ord 34) |
| `FiscalAssignment` `@@unique([contractId, fiscalId, role])` | Não seria violada pela importação em si (cada fiscal é designado uma vez por contrato nesta base) |

---

# 7. Enums

## BiddingModality (ProcurementProcess.modality)

| Modalidade histórica (fonte: planilha oficial IQUEGO) | Enum atual | Correspondência | Segurança | Observação |
|---|---|---|---|---|
| "Pregão Eletrônico nº X/Y" | `PREGAO_ELETRONICO` | Direta | SEGURA | — |
| "Dispensa de Licitação" / "Dispensa de licitação" | `DISPENSA_13303` | Direta | SEGURA | — |
| "Inexigibilidade de Licitação" / "Inexigibilidade de licitação" | `INEXIGIBILIDADE` | Direta | SEGURA | — |
| **"Ata de Registro de Preços nº X/Y"** (JVS ord 9, LS PRODUTOS ord 10) | *(nenhum)* | **Sem correspondência direta** | **CONFLITO (ENUM_CONFLICT)** | Uma ARP não é, por si, uma modalidade licitatória — é instrumento contratual originado de um Pregão. Recomendação técnica (ETAPA 3, não implementada): mapear para `PREGAO_ELETRONICO` e anotar "via ARP" em `observations`. Decisão de modelagem pendente. |
| Não documentada (nem planilha oficial, nem `legalBasis` na fonte) | — | — | — | ~7 registros sem nenhuma base para modalidade — `MISSING_REQUIRED_FIELD` |
| `legalBasis` citando "Art. 29" (sem modalidade oficial documentada) | `DISPENSA_13303` (inferência) | Indireta | **NÃO VALIDADA** | Inferência da ETAPA 1, nunca confirmada por documento |
| `legalBasis` citando "Art. 30" (sem modalidade oficial documentada) | `INEXIGIBILIDADE` (inferência) | Indireta | **NÃO VALIDADA** | Idem |

**Nenhuma alteração foi feita no enum.** A tabela acima mostra apenas o que aconteceria em cada hipótese de mapeamento.

---

# 8. Problemas encontrados (resumo — detalhe completo em `contracts-vigentes.dry-run.json`)

- **6 CNPJs não confirmados** (bloqueiam `Contractor`, e por consequência `Contract.contractorId`).
- **2 colisões + 1 malformação de `contractNumber`** (bloqueiam `Contract.contractNumber @unique`).
- **19 `processNumber` reconstruídos** sem confirmação documental (risco de gravar dígito incorreto permanentemente em campo `@unique`).
- **2 identidades de fiscal ambíguas** (Cleiton, Gabriel) — `HUMAN_REVIEW_REQUIRED`, nenhuma correspondência automática.
- **11 `Contract.signingDate` ausentes** e **32 `Contract.initialValue` ausentes** — campos obrigatórios sem dado documentado.
- **`Contractor.email` ausente em 100%** dos registros — obrigatório no schema, sem uso funcional no código.
- **`ProcurementProcess.requesterId` indefinido em 100%** — decisão institucional nunca tomada.
- **Nenhum dos 22 usuários fiscais existe hoje em PROD** — `FiscalAssignment.fiscalId` não pode ser preenchido sem criação de usuário (fora do escopo).
- **2 modalidades históricas ("Ata de Registro de Preços") sem correspondência segura no enum atual.**

---

# 9. Decisões institucionais necessárias

## requesterId — três cenários (nenhum escolhido)

| Cenário | Descrição | Impacto técnico | Impacto nos dados | Risco | Recomendação |
|---|---|---|---|---|---|
| **A — Gestor institucional único** | Todos os 36 processos recebem `requesterId` de um único usuário GESTOR (ex.: Jairo Vicente de Melo), replicando o padrão do `seed.ts` | Simples, uma única decisão libera os 36 | Atribui autoria histórica genérica; todo o histórico "pertence" a uma pessoa que pode não ter solicitado a maioria dos processos | Baixo risco técnico, risco de precisão histórica/auditoria | Aceitável como solução pragmática se a IQUEGO confirmar que Jairo (ou equivalente) é o responsável formal por todos os processos de compra |
| **B — Definido individualmente por processo** | Cada um dos 36 processos recebe um `requesterId` correspondente ao real solicitante histórico | Exige pesquisa/confirmação processo a processo (nenhuma fonte hoje traz esse dado) | Máxima fidelidade histórica | Alto esforço, pode não ser viável (dado pode não existir mais) | Ideal em teoria, inviável no prazo/dados atuais sem uma fonte documental específica (ex.: capa do processo SEI) |
| **C — Definido após a importação** | Importar com um valor "provisório" (ex.: ADMIN) e permitir correção posterior via tela de edição | Requer que a aplicação já tenha uma forma de editar `requesterId` pós-criação — não verificado nesta etapa se existe | Mantém rastreabilidade de que o dado é provisório | Risco de o campo nunca ser corrigido na prática (dívida técnica permanente) | Viável apenas se houver compromisso institucional explícito de revisão posterior |

**Nenhum cenário foi escolhido.** Classificação: `DECISÃO INSTITUCIONAL PENDENTE`.

## Demais decisões pendentes
- Mapeamento de "Ata de Registro de Preços" na `modality` (seção 7).
- Fonte definitiva de e-mail das contratadas, ou alteração de schema para tornar `Contractor.email` opcional (decisão de arquitetura, fora desta etapa).
- Se/quando criar os 22 usuários FISCAL em PROD, e com quais dados de contato reais (matrícula/e-mail institucional).
- Confirmação humana definitiva das 2 identidades de fiscal e dos 3 números de contrato em disputa (herdado da ETAPA 3).

---

# 10. Estratégia de rollback

A importação real (quando/se autorizada) deveria ocorrer dentro de uma **única transação Prisma** (`prisma.$transaction([...])` ou `$transaction(async (tx) => {...})`), pelos seguintes motivos:

- Há dependências estritas de FK entre as entidades (seção 1) — uma falha a meio do processo deixaria `Contract`s órfãos de `Contractor`/`ProcurementProcess`/`FiscalAssignment` se não fosse atômico.
- O volume é pequeno (36 registros principais + até 36 `FiscalAssignment` + até 22 `User`) — bem dentro do limite prático de uma transação Prisma única, sem necessidade de particionamento em lotes.
- Rollback automático do Postgres em caso de exceção dentro da transação evita qualquer estado parcialmente importado.
- Recomenda-se, adicionalmente, que o script (quando construído, em etapa futura) rode primeiro em modo `--dry-run` interno (sem `tx.create`, apenas montando os objetos e validando) antes de rodar com a transação real — complementando, e não substituindo, o dry-run já feito nesta etapa.

**Nenhuma transação foi implementada ou executada nesta etapa.**

---

# 11. Estratégia de validação pós-importação

Quando (e se) uma importação real ocorrer, recomenda-se, no mínimo:

1. Contagem: `SELECT COUNT(*)` em `contractors`, `procurement_processes`, `contracts`, `fiscal_assignments` comparado ao número esperado de registros importados (não necessariamente 36, dado que parte permanecerá bloqueada).
2. Amostragem: conferência manual de uma amostra (ex.: 5 contratos) contra o processo físico/SEI da IQUEGO.
3. Checagem de integridade referencial: nenhum `Contract` sem `Contractor` válido; nenhum `FiscalAssignment` sem `User` válido.
4. Checagem de que nenhum valor foi inserido como `NULL`/placeholder disfarçado de dado real (ex.: nenhum e-mail "fictício" foi inventado para satisfazer a constraint).
5. Log de auditoria (`AuditLog`) registrando a importação como evento distinto, com timestamp e origem ("importação de base histórica"), para diferenciar de uso operacional normal do sistema.

**Nenhuma importação foi executada; esta seção é apenas planejamento.**
