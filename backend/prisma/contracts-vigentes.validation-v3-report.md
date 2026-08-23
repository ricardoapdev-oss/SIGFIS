# Relatório de Fechamento de Pendências — ETAPA 3

> Modo exclusivamente de análise/pesquisa. Nenhuma escrita em banco, nenhum INSERT/UPDATE/DELETE, nenhum usuário/contratada/processo/contrato criado, nenhum seed, nenhuma alteração de schema, nenhum commit. Baseado em `contracts-vigentes.validation-v2.json`, preservado integralmente.

---

# 1. Resumo

36 contratos analisados. Nesta etapa: pesquisa adicional para as 6 empresas ainda sem CNPJ, tentativa de resolução das 2 identidades de fiscal ambíguas, dos 19 processos reconstruídos, do número truncado da SANEAGO, da colisão "17/2025" (WORK7/AUDIGESPUB) e da colisão "09/2025" (ZENITE/BIOCIENTIFIC). Resultado: **nenhuma pendência crítica foi 100% confirmada documentalmente nesta rodada** — houve avanço real (mais um candidato forte para BIOCIENTIFIC, via PDF oficial localizado; candidatos plausíveis, mas não confirmados, para 3 das 6 empresas pendentes), mas as regras estritas desta etapa (não aceitar agregador como prova única, não presumir sem documento) mantêm a maior parte das pendências abertas, exatamente como deveria ser dado o padrão de evidência exigido.

## 1.1 O que NÃO foi repetido

Os 30 CNPJs já classificados como HIGH/MEDIUM na ETAPA 2 **não foram pesquisados novamente**. Nenhum valor já confirmado foi alterado.

---

# 2. CNPJs

## Confirmados (herdados da ETAPA 2, sem alteração): 30/36

Sem mudanças. Ver `contracts-vigentes.validation-v2.json` / relatório da ETAPA 2.

## Pendentes: 6/36 — pesquisa adicional desta etapa

| Ordem | Empresa | Candidato encontrado | Fonte | Por que NÃO foi confirmado |
|---|---|---|---|---|
| 2 | HEALTH SAÚDE E SEGURANÇA DO TRABALHO LTDA | 40.978.450/0001-78 (Anápolis-GO) | 7 agregadores convergentes | Regra explícita desta etapa: agregador não é prova única. Nenhum documento oficial (IQUEGO/Goiás/Receita Federal) localizado. |
| 26 | L.A VIAGENS E TURISMO LTDA | — | — | Nenhum resultado relevante em nenhuma fonte. |
| 27 | GÁS E MAIS COMÉRCIO EIRELI | — | — | Nome genérico demais; nenhum resultado específico e confiável. |
| 29 | ÔMEGA LOCADORA DE VEÍCULOS LTDA | — | — | Um agregador referencia a existência da empresa, mas sem número de CNPJ legível; risco de confundir com "Omega Auto Center" (empresa diferente). |
| 30 | MISTER PRAGAS DEDETIZAÇÃO E DESENTUPIDORA LTDA | 55.845.916/0001-34 | Agregadores + **documento oficial do Estado de Goiás (OVG)** citando a mesma razão social | Documento oficial existe e foi localizado, mas a extração de texto do PDF não funcionou nesta sessão — não foi possível ler o CNPJ diretamente da fonte primária. Candidato mais forte dos 6. |
| 34 | AUDIGESPUB - SERVIÇOS DE AUDITORIA, ASSESSORIA E CONSULTORIA LTDA | 24.968.005/0001-70 (Recife-PE) | Agregadores + Portal da Transparência do Governo Federal (fornecedor cadastrado) | Fonte governamental (não agregador comercial) confirma que a empresa existe e contrata com o poder público, mas nenhum documento da própria IQUEGO ou do Estado de Goiás a menciona. |

**Nenhum desses 6 CNPJs foi promovido a "confirmado"** — todos continuam `"NÃO LOCALIZADO"` para fins de classificação, com os candidatos registrados apenas como pista para investigação humana futura.

---

# 3. Fiscais

## Confirmados: 34/36 ocorrências (22 pessoas únicas, ver ETAPA 2)

Sem mudanças nesta etapa.

## Pendentes: 2/36 — investigados nesta etapa

| Identidade | Resultado | Detalhe |
|---|---|---|
| "Cleiton de Sá Silva Vieira" (ord 11) | **REQUER_CONFIRMACAO_HUMANA** | Nenhuma fonte adicional (Diário Oficial, portaria específica) localizada além da planilha oficial já usada na ETAPA 2, que só registra "Cleiton de Sá Silva" (sem "Vieira"). Sem prova documental em nenhum dos dois sentidos. **Mantido bloqueado.** |
| "Gabriel Morais Godinho" (ord 31) | **REQUER_CONFIRMACAO_HUMANA** | Mesma situação — nenhuma fonte adicional além da planilha oficial (que só registra "Moraes", com "e"). **Mantido bloqueado.** |

Nenhuma das duas foi presumida como igual ou diferente da variante do seed.ts/planilha oficial.

---

# 4. Processos

- **Confirmados documentalmente**: 0/19 — nenhum dos 19 `processNumber` reconstruídos de notação científica foi confirmado por um documento primário nesta etapa (a planilha oficial da IQUEGO usa um formato de identificação diferente, que não permite cruzamento direto desse campo específico; nenhuma publicação individual de Diário Oficial foi localizada e lida com sucesso).
- **Reconstruídos, aguardando confirmação**: 19/19 — lista completa abaixo.
- **Pendentes**: os mesmos 19.

| Ordem | Original | Reconstruído | Empresa | Contrato | Fonte tentada | Resultado |
|---|---|---|---|---|---|---|
| 2 | 2.02400055000297E14 | 202400055000297 | HEALTH | 016/2025 | Planilha oficial (empresa não localizada) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 4 | 2.02300055000104E14 | 202300055000104 | PLUXEE | 019/2023 | Planilha oficial (CNPJ ok, processNumber não comparável) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 5 | 2.02300055000401E14 | 202300055000401 | LE CARD | 030/2023 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 8 | 2.02200055000273E14 | 202200055000273 | FONSECA E MARTINS | 019/2022 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 22 | 2.02200055000192E14 | 202200055000192 | AVISO URGENTE | 011/2022 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 23 | 2.02400055000064E14 | 202400055000064 | DELTA ENGENHARIA | 022/2024 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 24 | 2.0240005500033E14 | 202400055000330 | SHIELD | 05/2025 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 25 | 2.02500055000275E14 | 202500055000275 | ZENITE | 09/2025 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 26 | 2.02400055000827E14 | 202400055000827 | L.A VIAGENS | 15/2025 | Empresa não localizada | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 27 | 2.02500055000308E14 | 202500055000308 | GÁS E MAIS | 14/2025 | Empresa não localizada | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 28 | 2.02400055000709E14 | 202400055000709 | BRASILSEG | 13/2025 | Planilha oficial (contrato específico não localizado) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 29 | 2.02500055000328E14 | 202500055000328 | ÔMEGA | 18/2025 | Empresa não localizada | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 30 | 2.02500055000026E14 | 202500055000026 | MISTER PRAGAS | 25/2025 | Candidato de empresa encontrado, processo não confirmado | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 31 | 2.02300055000041E14 | 202300055000041 | NP TECNOLOGIA | 01/2023 | Planilha oficial (CNPJ ok, processNumber não comparável) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 32 | 2.02500055000519E14 | 202500055000519 | DMS CALIBRAÇÕES | 01/2026 | Planilha oficial (idem) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 33 | 2.02500055000168E14 | 202500055000168 | WORK7 | 17/2025 | Planilha oficial (linhagem 017/2020, sem confirmação do processNumber) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 34 | 2.02500055000383E14 | 202500055000383 | AUDIGESPUB | 17/2025 | Empresa não localizada | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 35 | 2.02500055000779E14 | 202500055000779 | INSTITUTO PROMOÇÃO HUMANA | 07/2025 | Planilha oficial (contrato oficial "07/2026" localizado, processNumber não comparável) | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |
| 36 | 2.02600055000186E14 | 202600055000186 | BIOCIENTIFIC | 09/2025 | PDF oficial "CONTRATO-09-2026" localizado, mas texto não extraível | RECONSTRUÍDO — REQUER CONFIRMAÇÃO |

---

# 5. Números de contrato

## Resolvidos: 0/3 (nenhum atingiu o padrão "CONFIRMADO")

| Caso | Hipótese | Resultado desta etapa |
|---|---|---|
| SANEAGO "003/202" | "003/2021" | **NÃO RESOLVIDO.** A planilha oficial (ETAPA 2) mostra "003/2021" para a SANEAGO — hipótese permanece FORTE — mas nenhuma segunda fonte independente (Diário Oficial, documento da SANEAGO) foi localizada nesta etapa para elevar a CONFIRMADO. |
| WORK7 "17/2025" vs. AUDIGESPUB "17/2025" | Uma das duas está incorreta, ou ambas se referem a séries de numeração diferentes | **NÃO RESOLVIDO.** Busca adicional (site:goias.gov.br/iquego) não encontrou nenhuma publicação de 2025 para nenhuma das duas com esse número. Para a WORK7, a única linhagem encontrada é "017/2020" com aditivos anuais até 2024 (vencimento 2025-05-08); para a AUDIGESPUB, nenhuma referência em nenhuma fonte da IQUEGO ou de Goiás. |
| ZENITE "09/2025" vs. BIOCIENTIFIC "09/2025" | BIOCIENTIFIC = "09/2026" | **FORTE INDÍCIO, NÃO CONFIRMADO.** Localizado o PDF oficial `CONTRATO-09-2026.pdf` da BIOCIENTIFIC (publicado pela própria IQUEGO), reforçando a hipótese — mas não foi possível extrair o texto do PDF com as ferramentas desta sessão para ler data/objeto/valor diretamente da fonte primária. A evidência usada (linha da planilha oficial com valor idêntico) já existia desde a ETAPA 2. |

Nenhum número foi alterado na fonte original. Nenhum sufixo foi inventado. Nenhuma colisão foi resolvida automaticamente no arquivo de validação — todas seguem com status explícito de pendência.

---

# 6. Campos estruturais

## requesterId

- **Onde é usado**: exclusivamente como filtro de **visibilidade** — `processes.service.ts` (`findAll`/`findOne`) restringe usuários com papel `FISCAL` a só verem processos onde `requesterId === seu próprio id`. `GESTOR`/`ADMIN`/`ALTA_GESTAO` veem todos os processos, independentemente do valor.
- **É obrigatório?** Sim (`requesterId String @db.Uuid`, sem `?`, FK para `User`).
- **Representa "solicitante" real?** Na aplicação atual, é sempre o usuário autenticado que cria o processo pela API (`create(userId, data)`), nunca escolhido manualmente. Não existe, hoje, nenhuma tela de "selecionar solicitante".
- **Regra institucional documentada?** Não encontrada no código nem em documentação do repositório.
- **Alternativas técnicas possíveis** (nenhuma escolhida automaticamente):

| Opção | Vantagem | Risco |
|---|---|---|
| Atribuir a um único usuário GESTOR (ex.: Jairo) | Mesmo padrão já usado no `seed.ts` para todos os 36 processos de demonstração | Atribui autoria histórica incorreta; concentra "propriedade" de todo o histórico em uma pessoa |
| Atribuir ao ADMIN (Ricardo) | Papel técnico, sem viés operacional | Mesma imprecisão histórica |
| Atribuir ao fiscal do contrato resultante | Torna o processo visível para o fiscal responsável (útil operacionalmente) | Semanticamente incorreto — fiscal fiscaliza, não necessariamente solicitou o processo |

**Classificação: `DECISÃO INSTITUCIONAL PENDENTE`.**

## modality

- Enum atual: `LICITACAO_13303`, `DISPENSA_13303`, `INEXIGIBILIDADE`, `PREGAO_ELETRONICO`, `OUTROS`.
- Valor histórico sem correspondência direta: **"Ata de Registro de Preços nº X/Y"** (JVS, LS PRODUTOS, na planilha oficial).
- **Análise técnica**: uma Ata de Registro de Preços não é, por si, uma modalidade licitatória — é um instrumento contratual gerado a partir de um Pregão Eletrônico (ou outra modalidade) que registra preços para uso futuro. A modalidade que efetivamente selecionou o fornecedor é, em geral, o Pregão.
- **Recomendação técnica** (não implementada, schema não alterado): mapear para `PREGAO_ELETRONICO` e registrar "via Ata de Registro de Preços" como texto em `Contract.observations`, já que o schema atual não tem campo para o instrumento contratual separadamente da modalidade.
- Decisão de modelagem final: pendente de validação institucional.

## signingDate

- Documentado pela planilha oficial (coluna ASSINATURA) para os contratos com casamento HIGH que tinham essa coluna preenchida — ainda assim recomendável confirmar contra o Diário Oficial antes de gravar como fato definitivo.
- Não presumido `start = signingDate` em nenhum caso.
- Onde ausente: `"NÃO INFORMADO NA FONTE"`.
- **Bloqueia a criação do registro?** Sim, tecnicamente — `Contract.signingDate` é `DateTime` obrigatório (sem `?`) no schema atual. Nos casos sem data documentada, a criação do `Contract` exigiria um valor, que não pode ser inventado — **bloqueio estrutural técnico real**, não apenas um "seria bom ter".

## initialValue

- Documentado pela planilha oficial (coluna VALOR) quando não é "-"; usado apenas nesses casos.
- Não presumido `value = initialValue` em nenhum caso.
- **Bloqueia a criação do registro?** Sim, tecnicamente — `Contract.initialValue` é `Decimal` obrigatório. Onde ausente, mesma situação de `signingDate`: bloqueio estrutural técnico real.

## E-mail da contratada

- `Contractor.email` é `String` **obrigatório** (NOT NULL) no schema, **sem** `@unique`.
- **Uso funcional no código**: nenhum (busca em todo `backend/src/contractors/` não encontrou nenhuma leitura de `email`).
- **Pode ser null?** Não, como o schema está hoje.
- **Conclusão**: bloqueio estrutural técnico (o banco rejeitaria um insert sem valor), mas **sem nenhum uso funcional** — a única forma tecnicamente correta de resolver isso sem inventar dado seria alterar o schema para tornar `email` opcional, o que está fora do escopo desta etapa (schema não pode ser alterado). Registrado como `"NÃO INFORMADO NA FONTE"` e como **bloqueio estrutural técnico**, não como mera pendência.

## Demais campos obrigatórios ausentes

Sem mudança em relação à ETAPA 2 (`estimatedValue`, `contractorId`/`processId` dependentes da resolução de CNPJ/processNumber, `fiscalId` dependente de identificador estável do fiscal).

---

# 7. Bloqueios (o que realmente impede uma importação tecnicamente segura)

1. **`Contractor.email` obrigatório sem uso funcional e sem dado disponível** — bloqueio estrutural técnico para os 6 registros sem e-mail (na prática, todos os 36, já que nenhum e-mail foi localizado) — só resolvível por alteração de schema (fora de escopo) ou obtenção do dado real.
2. **`Contract.signingDate` e `Contract.initialValue` obrigatórios, ausentes em parte dos registros** — bloqueio estrutural técnico onde a planilha oficial não documentou esses campos.
3. **2 colisões de `contractNumber`** (09/2025, 17/2025) — violariam a constraint `@unique` se inseridas como estão.
4. **1 número de contrato malformado** (SANEAGO "003/202") — formato inválido, ano incompleto.
5. **2 identidades de fiscal ambíguas** (Cleiton, Gabriel) — risco real de vincular o contrato ao usuário errado.
6. **6 CNPJs não confirmados** por fonte que atenda ao padrão de confiança exigido — impede a criação de `Contractor` sem inventar dado.
7. **19 `processNumber` sem confirmação documental** — risco de gravar um número de processo com dígito incorreto (herdado de artefato de planilha).

# 8. Decisões institucionais (separadas de problema técnico)

- Quem será `requesterId` dos 36 processos (3 alternativas apresentadas, seção 6).
- Como mapear "Ata de Registro de Preços" no campo `modality` (recomendação técnica apresentada, decisão de modelagem pendente).
- Se a IQUEGO fornecerá e-mail real das contratadas, ou se o schema deverá ser alterado para tornar o campo opcional (decisão de arquitetura, não desta etapa).
- Confirmação humana definitiva das 2 identidades de fiscal (Cleiton, Gabriel) junto à área responsável pela IQUEGO.
- Confirmação humana definitiva dos números de contrato colidentes/malformados (SANEAGO, WORK7/AUDIGESPUB, BIOCIENTIFIC) junto à área de contratos da IQUEGO.

---

# 9. Situação dos 36 contratos

| Ordem | Empresa | Processo | Contrato | CNPJ | Fiscal | Processo validado | Nº contrato validado | Bloqueio | Situação |
|---|---|---|---|---|---|---|---|---|---|
| 1 | SESI | 202300055000054 | 011/2023 | 03.786.187/0001-99 | Rogério B. da Silva | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 2 | HEALTH | 202400055000297 | 016/2025 | NÃO LOCALIZADO | Rogério B. da Silva | Reconstruído | Sem colisão | CNPJ ausente + processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 3 | REDEMOB | 202300055000136 | 025/2023 | 10.636.142/0001-01 | Maria do Carmo C. Silva | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 4 | PLUXEE | 202300055000104 | 019/2023 | 69.034.668/0001-56 | Maria do Carmo C. Silva | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 5 | LE CARD | 202300055000401 | 030/2023 | 19.207.352/0001-40 | Edilson Martins Garcia | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 6 | GENESIS PREST. | 202300055000119 | 021/2023 | 31.549.836/0001-73 | Eunice Maria C Oliveira | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 7 | PADA | 202200055000417 | 08/2023 | 12.577.632/0003‐63 | Eunice Maria C Oliveira | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 8 | FONSECA E MARTINS | 202200055000273 | 019/2022 | 00.961.053/0001-79 | Eliety Rodrigues Pereira | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 9 | JVS | 202300055000247 | 09/2022 | 28.028.063/0001-75 | Weverson de Oliveira | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 10 | LS PRODUTOS | 202400055000006 | 29/2023 | 08.532.353/0001-44 | Weverson de Oliveira | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 11 | ALTERDATA | 202400055000728 | 01/2025 | 36.462.778/0001-60 | **Cleiton de Sá Silva Vieira** | Formato direto | Sem colisão | Fiscal ambíguo | BLOQUEADO |
| 12 | INTEGRA | 202000055000104 | 006/2025 | 07.121.081/0001-27 | Cleiton de Sá Silva | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 13 | MPS BRASIL | 202100055000133 | 002/2021 | 33.091.401/0001-53 | Robson Policeno de Rezende | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 14 | GOIASTELECOM | 202200055000327 | 006/2023 | 10.268.439/0001-53 | Robson Policeno de Rezende | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 15 | GOIAS TELECOM | 202400055000042 | 005/2024 | 10.268.439/0001-53 | Robson Policeno de Rezende | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 16 | SANEAGO | 202100055000217 | **003/202** | 01.616.929/0001-02 | Pedro Henrique Martins | Formato direto | **Malformado** | Nº de contrato malformado | BLOQUEADO |
| 17 | EQUATORIAL | 202300055000551 | CCER GOV 325/2019 | 01.543.032/0001-04 | Pedro Henrique Martins | Formato direto | Não-padrão, sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 18 | GENESIS COM. | 202300055000690 | 011/2024 | 17.596.391/0001-51 | Pedro H. S. Martins | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 19 | PRIME | 202300055000144 | 020/2023 | 05.340.639/0001-30 | Weverson de Oliveira | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 20 | GIBBOR | 202100055000360 | 001/2022 | 08.329.433/0001-05 | Sabrina Maria Barbosa | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 21 | WEGH | 202300055000052 | 009/2023 | 65.494.742/0001-66 | Wenderson de Souza | Formato direto | Sem colisão | — | APTO PARA PRÉ-IMPORTAÇÃO |
| 22 | AVISO URGENTE | 202200055000192 | 011/2022 | 14.774.075/0001-34 | Patrícia Sodré | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 23 | DELTA | 202400055000064 | 022/2024 | 54.001.411.0001-20 ⚠ | Thalita Guaribaldine... | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 24 | SHIELD | 202400055000330 | 05/2025 | 15.809.115/0001-07 | Fábio Gonçalves da Silva | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 25 | ZENITE | 202500055000275 | 09/2025 | 86.781.069/0001-15 | Gabriel Moraes Godinho | Reconstruído | **Colisão (via ord 36)** | Colisão de nº de contrato + processo reconstruído | BLOQUEADO |
| 26 | L.A VIAGENS | 202400055000827 | 15/2025 | NÃO LOCALIZADO | Denize Morais | Reconstruído | Sem colisão | CNPJ ausente + processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 27 | GÁS E MAIS | 202500055000308 | 14/2025 | NÃO LOCALIZADO | Eliety Rodrigues Pereira | Reconstruído | Sem colisão | CNPJ ausente + processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 28 | BRASILSEG | 202400055000709 | 13/2025 | 28.196.889/0001-43 (continuidade) | Dalmo Francisco da Costa | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 29 | ÔMEGA | 202500055000328 | 18/2025 | NÃO LOCALIZADO | Weverson de Oliveira | Reconstruído | Sem colisão | CNPJ ausente + processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 30 | MISTER PRAGAS | 202500055000026 | 25/2025 | NÃO LOCALIZADO | Emerson Ferreira dos Anjos | Reconstruído | Sem colisão | CNPJ ausente + processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 31 | NP TECNOLOGIA | 202300055000041 | 01/2023 | 07.797.967/0001-95 | **Gabriel Morais Godinho** | Reconstruído | Sem colisão | Fiscal ambíguo | BLOQUEADO |
| 32 | DMS CALIBRAÇÕES | 202500055000519 | 01/2026 | 32.001.032/0001-06 | Laurindo Damas da Silva Júnior | Reconstruído | Sem colisão | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 33 | WORK7 | 202500055000168 | **17/2025** | 11.689.939/0001-21 | Vera Lúcia Nunes | Reconstruído | **Colisão** | Colisão de nº de contrato + processo reconstruído | BLOQUEADO |
| 34 | AUDIGESPUB | 202500055000383 | **17/2025** | NÃO LOCALIZADO | Alessandro dos Santos | Reconstruído | **Colisão** | CNPJ ausente + colisão + processo reconstruído | BLOQUEADO |
| 35 | INSTITUTO PROMOÇÃO HUMANA | 202500055000779 | 07/2025 | 11.595.331/0001-38 | Vandeir Gonçalves da Silva | Reconstruído | Sem colisão (divergência de ano com fonte oficial) | Processo reconstruído | PENDENTE DE VALIDAÇÃO |
| 36 | BIOCIENTIFIC | 202600055000186 | **09/2025** | 05.153.743/0001-15 | Laurindo Damas da Silva Júnior | Reconstruído | **Colisão** | Colisão de nº de contrato + processo reconstruído | BLOQUEADO |

⚠ CNPJ da DELTA mantém o formato incomum já registrado na ETAPA 2 (separador `.` em vez de `/`), reproduzido tal como consta na planilha oficial.

---

# Checklist de segurança

- [x] banco PROD não alterado
- [x] nenhum INSERT
- [x] nenhum UPDATE
- [x] nenhum DELETE
- [x] nenhum usuário criado
- [x] nenhum contrato criado
- [x] nenhum processo criado
- [x] nenhum seed executado
- [x] schema não alterado
- [x] fonte original preservada
- [x] nenhum dado fictício utilizado
- [x] nenhuma inferência apresentada como fato (candidatos de CNPJ explicitamente marcados como não confirmados; hipóteses de número de contrato explicitamente marcadas como "forte indício" ou "não resolvido")
- [x] todas as fontes externas registradas (`source`/`sourceUrl` em cada achado do v3)
- [x] nenhum commit
- [x] nenhum push
- [x] nenhum deploy
