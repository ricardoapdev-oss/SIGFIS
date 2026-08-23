# Relatório Executivo do Dry-Run — ETAPA 4

> Simulação técnica. Nenhum INSERT/UPDATE/DELETE foi executado. Nenhum usuário, contratada, processo ou contrato foi criado. Nenhum banco (DEV ou PROD) foi alterado.

## Premissa assumida sobre o estado do PROD

Esta etapa não fez nenhuma consulta ao vivo ao Supabase PROD (nenhuma credencial de conexão foi fornecida neste turno). O dry-run assume o último estado confirmado nesta conversa: **1 usuário em PROD (ADMIN, `ricardo.peixoto@iquego.com.br`)**, nenhum GESTOR/FISCAL/ALTA_GESTAO. Se esse estado mudou desde então, os resultados abaixo relacionados a "usuário fiscal não existe em PROD" precisariam ser reconferidos com uma consulta `SELECT` read-only antes de qualquer decisão.

## Resultado quantitativo

| Classificação | Quantidade |
|---|---|
| **READY_FOR_IMPORT** | **0** |
| **BLOCKED_BY_DATA** | **30** |
| **BLOCKED_BY_SCHEMA** | **0** |
| **BLOCKED_BY_INSTITUTIONAL_DECISION** | **4** |
| **HUMAN_REVIEW_REQUIRED** | **2** |
| **Total** | **36** |

### Por que "0 READY_FOR_IMPORT", se a ETAPA 3 apontou 15 "aptos para pré-importação"?

A ETAPA 3 avaliou consistência dos **dados históricos** (CNPJ, fiscal, processo, número de contrato). A ETAPA 4 simula a **inserção real no schema atual**, campo a campo — e isso expõe **3 bloqueios universais** que afetam os 36 registros por igual, independentemente da qualidade do dado histórico:

1. `Contractor.email` é obrigatório no schema e **não existe e-mail real para nenhuma das 36 empresas** (0/36).
2. `ProcurementProcess.requesterId` é obrigatório e **nenhuma regra institucional foi definida** sobre quem deve ocupar esse papel (0/36 decididos).
3. **Nenhum dos 22 usuários fiscais existe hoje em PROD** — mesmo os fiscais com nome **exatamente** confirmado precisariam ser criados antes de qualquer `FiscalAssignment`.

Por isso, **nenhum dos 36 registros** passa por todos os pontos de verificação simultaneamente hoje. Os **4 registros classificados como "somente" `BLOCKED_BY_INSTITUTIONAL_DECISION`** (ordens 12, 14, 15, 18) são os que **já resolveriam todos os problemas de dado** assim que as 3 decisões institucionais acima forem tomadas — são, na prática, os mais próximos de uma importação real.

## Tabela dos 36 contratos

| Ord | Empresa | Contractor | Fiscal | Process | Contract | Resultado | Bloqueio principal |
|---|---|---|---|---|---|---|---|
| 1 | SESI | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 2 | HEALTH | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | CNPJ + processNumber + initialValue |
| 3 | REDEMOB | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 4 | PLUXEE | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 5 | LE CARD | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 6 | GENESIS PREST. | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 7 | PADA | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 8 | FONSECA E MARTINS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 9 | JVS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue + modality (ARP) |
| 10 | LS PRODUTOS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue + modality (ARP) |
| 11 | ALTERDATA | BLOCKED | **HUMAN_REVIEW** | BLOCKED | PASS | **HUMAN_REVIEW_REQUIRED** | Fiscal "Cleiton ... Vieira" ambíguo |
| 12 | INTEGRA | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_INSTITUTIONAL_DECISION | email + requesterId + usuário fiscal |
| 13 | MPS BRASIL | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 14 | GOIASTELECOM | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_INSTITUTIONAL_DECISION | email + requesterId + usuário fiscal |
| 15 | GOIAS TELECOM | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_INSTITUTIONAL_DECISION | email + requesterId + usuário fiscal |
| 16 | SANEAGO | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | contractNumber malformado (003/202) |
| 17 | EQUATORIAL | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 18 | GENESIS COM. | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_INSTITUTIONAL_DECISION | email + requesterId + usuário fiscal |
| 19 | PRIME | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 20 | GIBBOR | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 21 | WEGH | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | initialValue ausente |
| 22 | AVISO URGENTE | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 23 | DELTA | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_DATA | processNumber reconstruído |
| 24 | SHIELD | BLOCKED | BLOCKED | BLOCKED | PASS | BLOCKED_BY_DATA | processNumber reconstruído |
| 25 | ZENITE | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | colisão "09/2025" + processNumber |
| 26 | L.A VIAGENS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | CNPJ + processNumber + initialValue |
| 27 | GÁS E MAIS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | CNPJ + processNumber + initialValue |
| 28 | BRASILSEG | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 29 | ÔMEGA | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | CNPJ + processNumber + initialValue |
| 30 | MISTER PRAGAS | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | CNPJ + processNumber + initialValue |
| 31 | NP TECNOLOGIA | BLOCKED | **HUMAN_REVIEW** | BLOCKED | BLOCKED | **HUMAN_REVIEW_REQUIRED** | Fiscal "Gabriel Morais" ambíguo |
| 32 | DMS CALIBRAÇÕES | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 33 | WORK7 | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | colisão "17/2025" + processNumber |
| 34 | AUDIGESPUB | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | colisão "17/2025" + CNPJ + processNumber |
| 35 | INSTITUTO PROMOÇÃO HUMANA | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | processNumber + initialValue |
| 36 | BIOCIENTIFIC | BLOCKED | BLOCKED | BLOCKED | BLOCKED | BLOCKED_BY_DATA | colisão "09/2025" + processNumber |

(`contractor` e `fiscal` aparecem `BLOCKED` na maioria das linhas por causa dos 3 bloqueios universais — e-mail, usuário fiscal inexistente em PROD — que afetam os 36 por igual; o que diferencia cada linha é o bloqueio **adicional** mostrado na última coluna.)

## Bloqueios encontrados (consolidado)

**Universais (36/36):**
- `Contractor.email` obrigatório, sem dado real.
- `ProcurementProcess.requesterId` obrigatório, sem decisão institucional.
- Nenhum usuário FISCAL existe em PROD hoje.

**Específicos:**
- CNPJ não localizado: 6 registros (2, 26, 27, 29, 30, 34).
- `processNumber` reconstruído sem confirmação: 19 registros.
- `contractNumber` colidente ou malformado: 5 registros (16, 25, 33, 34, 36).
- Identidade de fiscal ambígua: 2 registros (11, 31).
- `Contract.signingDate` ausente: 11 registros.
- `Contract.initialValue` ausente: 32 registros.
- `modality` sem correspondência segura no enum (Ata de Registro de Preços): 2 registros (9, 10).

## Decisões institucionais necessárias

1. Quem será `requesterId` dos 36 processos — 3 cenários apresentados no plano de importação, nenhum escolhido.
2. Como mapear "Ata de Registro de Preços" na `modality` — recomendação técnica apresentada (usar `PREGAO_ELETRONICO` + observação), não implementada.
3. Fonte de e-mail real das contratadas, ou decisão de alterar o schema para tornar `Contractor.email` opcional.
4. Se/quando criar os 22 usuários FISCAL em PROD, com quais dados de contato reais.
5. Confirmação humana definitiva das 2 identidades de fiscal e dos números de contrato em disputa (herdado da ETAPA 3).

## Alterações de sistema eventualmente necessárias

- **Nenhuma foi proposta como necessária além de uma possível revisão futura de `Contractor.email` (tornar opcional)** — e isso só se a IQUEGO confirmar que não haverá e-mail real disponível para fornecedores históricos. Não é uma alteração proposta para "eliminar uma pendência de dado por conveniência"; é uma constatação de que o campo, como está, não tem uso funcional em nenhum lugar do código, tornando sua obrigatoriedade uma característica de modelagem passível de revisão — decisão que cabe à equipe responsável pelo sistema, não a esta etapa.

## Separação pedida (seção 17)

### A. Problemas resolvíveis por dado (não exigem decisão institucional nem mudança de sistema)
- CNPJ das 6 empresas pendentes.
- Confirmação documental dos 19 `processNumber` reconstruídos.
- Resolução das 2 colisões e 1 malformação de `contractNumber`.
- Confirmação das 2 identidades de fiscal ambíguas.
- `Contract.signingDate` e `Contract.initialValue` ausentes (recuperáveis, em parte, revisitando a planilha oficial já usada, ou outros documentos).

### B. Problemas que exigem decisão institucional
- `requesterId` (3 cenários apresentados).
- Mapeamento de "Ata de Registro de Preços" na `modality`.
- Política sobre `Contractor.email` obrigatório sem dado disponível.
- Se/quando criar os 22 usuários fiscais em PROD.

### C. Problemas que exigem alteração do sistema
- Nenhum identificado como estritamente necessário nesta etapa. (A eventual revisão de `Contractor.email` está listada em B, pois é primariamente uma decisão de política antes de ser uma alteração de código.)

---

## Checklist de segurança

- [x] nenhum INSERT
- [x] nenhum UPDATE
- [x] nenhum DELETE
- [x] nenhum upsert
- [x] nenhum seed
- [x] nenhum usuário criado
- [x] nenhum contractor criado
- [x] nenhum process criado
- [x] nenhum contract criado
- [x] nenhum banco alterado
- [x] schema não alterado
- [x] código da aplicação não alterado
- [x] fonte histórica preservada
- [x] nenhum dado fictício utilizado
- [x] nenhuma decisão institucional presumida
- [x] nenhum commit
- [x] nenhum push
- [x] nenhum deploy
