# Matriz Definitiva de Pendências — Base Histórica de Contratos

> Documento de preparação. Nenhum dado foi importado, nenhum banco alterado, nenhum código alterado. Baseado em `contracts-vigentes.data.ts`, `validation.json`, `validation-v2.json`, `validation-v3.json`, `dry-run.json`/`dry-run-report.md`, `schema.prisma`, `seed.ts` e código atual de `backend/src/**`.

Tipos: `DATA` (obtenível por pesquisa/cadastro externo) · `DOCUMENTAL` (precisa de confirmação contra um documento específico já parcialmente localizado) · `IDENTIDADE` (ambiguidade de pessoa) · `INSTITUCIONAL` (decisão de política/negócio) · `SISTEMA` (mudança de código/schema).

## Matriz

| ID | Tipo | Ord | Campo | Valor atual | O que falta | Fonte necessária | Responsável sugerido | Bloqueia importação? | Ação |
|---|---|---|---|---|---|---|---|---|---|
| P01 | DATA | 2 | Contractor.cnpjCpf | NÃO LOCALIZADO | CNPJ oficial de HEALTH SAÚDE E SEGURANÇA DO TRABALHO LTDA | Cadastro de fornecedor da IQUEGO / Receita Federal | IQUEGO (área de contratos) | Sim | Solicitar à IQUEGO |
| P02 | DATA | 26 | Contractor.cnpjCpf | NÃO LOCALIZADO | CNPJ oficial de L.A VIAGENS E TURISMO LTDA | Idem | IQUEGO | Sim | Solicitar à IQUEGO |
| P03 | DATA | 27 | Contractor.cnpjCpf | NÃO LOCALIZADO | CNPJ oficial de GÁS E MAIS COMÉRCIO EIRELI | Idem | IQUEGO | Sim | Solicitar à IQUEGO |
| P04 | DATA | 29 | Contractor.cnpjCpf | NÃO LOCALIZADO | CNPJ oficial de ÔMEGA LOCADORA DE VEÍCULOS LTDA | Idem | IQUEGO | Sim | Solicitar à IQUEGO |
| P05 | DATA | 30 | Contractor.cnpjCpf | Candidato não confirmado: 55.845.916/0001-34 | Confirmação oficial (candidato veio só de agregadores + 1 documento estadual sem CNPJ legível) | IQUEGO ou confirmação do documento OVG já localizado | IQUEGO | Sim | Solicitar confirmação à IQUEGO |
| P06 | DATA | 34 | Contractor.cnpjCpf | Candidato não confirmado: 24.968.005/0001-70 (Recife-PE) | Confirmação de que é a mesma empresa contratada pela IQUEGO | IQUEGO | IQUEGO | Sim | Solicitar confirmação à IQUEGO |
| P07 | DATA | 36 (todas) | Contractor.email | NÃO LOCALIZADO (36/36) | E-mail institucional real de cada uma das 36 contratadas | Cadastro de fornecedor da IQUEGO | IQUEGO | Sim (bloqueio universal) | Solicitar à IQUEGO — ver também P30 (decisão institucional) |
| P08 | DOCUMENTAL | 2,4,5,8,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36 | ProcurementProcess.processNumber | Reconstruído de notação científica (19 registros) | Confirmação contra processo físico/SEI de cada um dos 19 números | Documentos internos da IQUEGO (processo administrativo) | IQUEGO | Sim (cada um, individualmente) | Solicitar confirmação à IQUEGO (lista completa na seção 8) |
| P09 | DOCUMENTAL | 16 | Contract.contractNumber | "003/202" | Confirmar se o número correto é "003/2021" (hipótese forte via planilha oficial) | Diário Oficial de Goiás ou documento da SANEAGO/IQUEGO | IQUEGO | Sim | Solicitar confirmação à IQUEGO |
| P10 | DOCUMENTAL | 25 e 36 | Contract.contractNumber | Ambos "09/2025" (colisão) | Confirmar número correto de cada um (forte indício de que BIOCIENTIFIC = "09/2026") | Documento oficial da IQUEGO | IQUEGO | Sim (ambos os registros) | Solicitar confirmação à IQUEGO |
| P11 | DOCUMENTAL | 33 e 34 | Contract.contractNumber | Ambos "17/2025" (colisão) | Confirmar número correto de cada um (nenhuma pista documental encontrada até agora) | Documento oficial da IQUEGO | IQUEGO | Sim (ambos os registros) | Solicitar confirmação à IQUEGO |
| P12 | DOCUMENTAL | 2,17,26,27,28,29,30,32,34,35,36 | Contract.signingDate | Ausente (11 registros) | Data de assinatura documentada | Planilha oficial (parcialmente já usada), Diário Oficial, ou o próprio contrato | IQUEGO | Sim (cada um, individualmente) | Solicitar à IQUEGO (lista completa na seção 10) |
| P13 | DOCUMENTAL | 1,2,3,4,5,6,7,8,9,10,13,17,19,20,21,22,26,27,28,29,30,31,34 | Contract.initialValue | Ausente (23 registros — ver nota) | Valor inicial do contrato (não o valor vigente/pós-aditivo) | Planilha oficial (coluna VALOR) ou o próprio contrato assinado | IQUEGO | Sim (cada um, individualmente) | Solicitar à IQUEGO (lista completa na seção 11) |
| P14 | IDENTIDADE | 11 | FiscalAssignment.fiscalId | "Cleiton de Sá Silva Vieira" | Confirmar se é a mesma pessoa que "Cleiton de Sá Silva" (ord 12) ou pessoa diferente | Portaria de designação específica, RH da IQUEGO | IQUEGO (RH/Gestão de Pessoas) | Sim | `HUMAN_REVIEW_REQUIRED` — solicitar à IQUEGO |
| P15 | IDENTIDADE | 31 | FiscalAssignment.fiscalId | "Gabriel Morais Godinho" | Confirmar se é a mesma pessoa que "Gabriel Moraes Godinho" (ord 25) ou pessoa diferente | Idem | IQUEGO (RH/Gestão de Pessoas) | Sim | `HUMAN_REVIEW_REQUIRED` — solicitar à IQUEGO |
| P16 | INSTITUCIONAL | Todas (36) | ProcurementProcess.requesterId | Indefinido | Escolha entre os 3 cenários (seção 6) | Decisão da IQUEGO/gestão do SIGFIS | ADMIN/Gestão do sistema | Sim (bloqueio universal) | Levar decisão à IQUEGO |
| P17 | INSTITUCIONAL | 9,10 | ProcurementProcess.modality | "Ata de Registro de Preços" (sem enum correspondente) | Decisão de mapeamento (recomendação técnica: `PREGAO_ELETRONICO` + observação) | Decisão da equipe responsável pelo SIGFIS | ADMIN/Gestão do sistema | Sim (2 registros) | Levar decisão à IQUEGO/equipe técnica |
| P18 | INSTITUCIONAL | 2,17,26,27,28,29,30,34 | ProcurementProcess.modality | Não documentada nem inferível | Política para contratos sem modalidade conhecida | Decisão da equipe responsável | ADMIN/Gestão do sistema | Sim (8 registros) | Levar decisão à IQUEGO |
| P19 | INSTITUCIONAL | Todas (36) | Contractor.email | Obrigatório no schema, sem dado disponível | Decisão: (a) obter e-mail real da IQUEGO, ou (b) alterar schema para tornar opcional | Decisão da equipe responsável pelo SIGFIS | ADMIN/Gestão do sistema | Sim (bloqueio universal) | Levar decisão à IQUEGO/equipe técnica |
| P20 | INSTITUCIONAL | Todas (22 fiscais) | User (criação) | Nenhum dos 22 fiscais existe em PROD | Decisão de criar os usuários + dados reais de cada um (ver seção 5) | IQUEGO (RH) + decisão de gestão do sistema | ADMIN/Gestão do sistema | Sim (bloqueio universal) | Levar decisão à IQUEGO |
| P21 | SISTEMA | — | Contractor.email | `String` obrigatório no schema | Somente SE a IQUEGO decidir não fornecer e-mail real (ver P19-b): tornar o campo opcional no schema | — | Equipe técnica do SIGFIS | Condicional (só se P19 for resolvido pela via "b") | Não implementar agora — aguardar decisão institucional (P19) |

**Total de linhas de pendência real: 21** (algumas agregam múltiplos registros do mesmo tipo, conforme indicado na coluna "Ord"; o detalhe individual de cada ordem está nas seções 8, 9, 10 e 11 abaixo).

---

## 3. Contratadas — situação das 36

### A) CNPJ confirmado (30/36)
Sem mudança em relação à ETAPA 2/3 — ver `contracts-vigentes.validation-v2.json`.

### B) CNPJ pendente (6/36)

| Empresa | CNPJ candidato | Fonte | Confiança | Informação necessária para confirmação |
|---|---|---|---|---|
| HEALTH SAÚDE E SEGURANÇA DO TRABALHO LTDA | 40.978.450/0001-78 (candidato) | Agregadores (múltiplos, convergentes) | LOW — não atende ao padrão exigido (agregador não é prova única) | Confirmação da IQUEGO ou documento oficial |
| L.A VIAGENS E TURISMO LTDA | — | Nenhuma fonte | NONE | CNPJ completo da IQUEGO |
| GÁS E MAIS COMÉRCIO EIRELI | — | Nenhuma fonte | NONE | CNPJ completo da IQUEGO |
| ÔMEGA LOCADORA DE VEÍCULOS LTDA | — | Referência de existência, sem número legível | NONE | CNPJ completo da IQUEGO |
| MISTER PRAGAS DEDETIZAÇÃO E DESENTUPIDORA LTDA | 55.845.916/0001-34 (candidato) | Agregadores + documento oficial do Estado de Goiás (OVG) citando a empresa (CNPJ não extraído do PDF) | MEDIUM — candidato mais forte dos 6 | Confirmação da IQUEGO |
| AUDIGESPUB - SERVIÇOS DE AUDITORIA, ASSESSORIA E CONSULTORIA LTDA | 24.968.005/0001-70 (Recife-PE, candidato) | Agregadores + Portal da Transparência (fornecedor governamental cadastrado) | LOW-MEDIUM — não confirma vínculo específico com a IQUEGO | Confirmação da IQUEGO |

### C) E-mail pendente

**36/36 — EMAIL AUSENTE.** Nenhuma fonte consultada (planilha oficial da IQUEGO, agregadores, sites institucionais) trouxe e-mail de nenhuma das 36 contratadas. Nenhum e-mail fictício ou genérico foi usado.

### D) Conflitos cadastrais identificados
- Nenhuma duplicidade de CNPJ entre as 36 empresas.
- 2 CNPJs com formatação irregular na própria planilha oficial da IQUEGO (não corrigidos, reportados como estão): PADA (`12.577.632/0003‐63`, hífen Unicode não padrão) e DELTA ENGENHARIA (`54.001.411.0001-20`, separador `.` em vez de `/`).

---

## 4. Fiscais — 22 únicos

| Nome na fonte histórica | Nome correspondente encontrado | Situação | Existe no PROD? | Confirmação humana necessária? |
|---|---|---|---|---|
| Rogério B. da Silva | Rogério Brasilino da Silva | Confirmado (nome completo) | Não | Não |
| Maria do Carmo C. Silva | — | EXACT (seed.ts) | Não | Não |
| Edilson Martins Garcia | — | EXACT (seed.ts) | Não | Não |
| Eunice Maria C Oliveira | Eunice Maria Chagas Oliveira | Confirmado (nome completo) | Não | Não |
| Eliety Rodrigues Pereira | — | EXACT (seed.ts) | Não | Não |
| Weverson de Oliveira | — | EXACT (seed.ts) | Não | Não |
| **Cleiton de Sá Silva Vieira** | Planilha oficial só registra sem "Vieira" | **Ambíguo** | Não | **SIM — `HUMAN_REVIEW_REQUIRED`** |
| Cleiton de Sá Silva | — | EXACT (seed.ts) | Não | Não |
| Robson Policeno de Rezende | — | EXACT (seed.ts) | Não | Não |
| Pedro Henrique Martins | Pedro Henrique Santos Martins | Confirmado (nome completo) | Não | Não |
| Pedro H. S. Martins | Pedro Henrique Santos Martins | Confirmado (mesma pessoa do anterior) | Não | Não |
| Thalita Guaribaldine da Silva Guimaraes | Thalita Guaribaldine da Silva Guimarães | Confirmado (nome completo) | Não | Não |
| Fábio Gonçalves da Silva | — | EXACT (seed.ts) | Não | Não |
| Gabriel Moraes Godinho | — | EXACT (seed.ts) | Não | Não |
| **Gabriel Morais Godinho** | Planilha oficial só registra "Moraes" (com "e") | **Ambíguo** | Não | **SIM — `HUMAN_REVIEW_REQUIRED`** |
| Denize Morais | — | EXACT (seed.ts) | Não | Não |
| Sabrina Maria Barbosa | — | EXACT (seed.ts) | Não | Não |
| Wenderson de Souza | — | EXACT (seed.ts) | Não | Não |
| Patrícia Sodré | — | EXACT (seed.ts) | Não | Não |
| Vandeir Gonçalves da Silva | — | EXACT (seed.ts) | Não | Não |
| Alessandro dos Santos | — | EXACT (seed.ts) | Não | Não |
| Vera Lúcia Nunes | Vera Lúcia Nunes dos Santos | Confirmado (nome completo) | Não | Não |
| Laurindo Damas da Silva Júnior | — | EXACT (seed.ts) | Não | Não |
| Emerson Ferreira dos Anjos | — | EXACT (seed.ts) | Não | Não |
| Dalmo Francisco da Costa | — | EXACT (seed.ts) | Não | Não |

**Nenhuma das 22 pessoas existe hoje como usuário em PROD** (premissa: apenas o ADMIN existe — ver nota da ETAPA 4 sobre ausência de consulta ao vivo nesta sessão). **Nenhum usuário foi criado.**

---

## 5. Ficha do que seria necessário para criar cada usuário (não executado)

Campos obrigatórios de `User` (schema.prisma): `name`, `email` (`@unique`), `passwordHash`, `role`, `status` (default `ACTIVE`), `registrationNumber` (`@unique`, opcional mas único quando presente).

| Campo | Disponível na fonte histórica? | Precisa vir da IQUEGO |
|---|---|---|
| `name` | Sim (nome, com variações a confirmar para 2 casos) | Confirmar grafia oficial |
| `email` | Não | **Sim — e-mail institucional real de cada um dos 22 fiscais** |
| `passwordHash` | Não aplicável | Não deve ser gerado/inventado nesta etapa; senha inicial é decisão de política de acesso, não de dado histórico |
| `role` | Implícito (`FISCAL`) | Não precisa — dedutível do contexto |
| `status` | Implícito (`ACTIVE`, presume-se que sejam servidores ativos) | Confirmar se todos os 22 continuam ativos na IQUEGO hoje |
| `registrationNumber` | Não | **Sim — matrícula institucional de cada um dos 22 fiscais** |

Nenhuma senha foi inventada. Nenhum hash foi gerado. Nenhum usuário foi cadastrado.

---

## 6. requesterId — três cenários

| Cenário | Vantagem | Desvantagem | Impacto na integridade histórica | Impacto no sistema | Impacto na auditoria | Recomendação técnica |
|---|---|---|---|---|---|---|
| **A — Gestor único** | Simples; replica o padrão do `seed.ts`; libera os 36 com uma única decisão | Atribui autoria incorreta a processos que aquele gestor não solicitou de fato | Baixa fidelidade (nome errado como "solicitante" em registros de auditoria) | Nenhum — usa infraestrutura já existente | `AuditLog`/histórico mostrará um único "solicitante" para todo o acervo histórico, o que pode confundir auditoria futura | Aceitável apenas como solução pragmática, documentada como aproximação, se a IQUEGO confirmar formalmente que aceita essa simplificação |
| **B — Requester individual por processo** | Máxima fidelidade histórica | Exige uma fonte de dado que, até agora, não foi localizada para nenhum dos 36 processos | Alta fidelidade, se o dado existir | Nenhum | Auditoria correta, se o dado for real | Ideal em teoria; **inviável nesta rodada** por falta de fonte documental (nenhum arquivo consultado até agora identifica o "solicitante" de cada processo individualmente) |
| **C — Definido após a importação** | Permite importar com um marcador "provisório" e corrigir depois | Risco de o campo nunca ser corrigido (dívida técnica permanente); requer que a aplicação tenha uma tela de edição desse campo — não confirmado se existe | Fidelidade adiada, não perdida (se de fato corrigido depois) | Nenhuma alteração de código identificada como necessária até aqui | Necessita de um processo de acompanhamento pós-importação para não ficar esquecido | Viável somente com compromisso explícito de revisão futura por parte da equipe responsável |

**Nenhum cenário foi escolhido.** Decisão necessária: `DECISÃO INSTITUCIONAL PENDENTE`.

---

## 7. Modalidade — todas as modalidades históricas

| Modalidade histórica | Quantidade | Enum possível | Grau de correspondência | Decisão necessária |
|---|---|---|---|---|
| Pregão Eletrônico nº X/Y | 15 | `PREGAO_ELETRONICO` | Direta/segura | Nenhuma |
| Dispensa de Licitação | 9 | `DISPENSA_13303` | Direta/segura | Nenhuma |
| Inexigibilidade de Licitação | 3 | `INEXIGIBILIDADE` | Direta/segura | Nenhuma |
| **Ata de Registro de Preços nº X/Y** | 2 (ord 9 e 10) | Nenhum enum direto | **Conflito** | Mapear para `PREGAO_ELETRONICO` (recomendação técnica) + registrar "via ARP" como observação, OU manter pendente até decisão de modelagem |
| Não documentada nem inferível | 7 | — | — | Definir política para contratos sem modalidade conhecida (usar `OUTROS`? bloquear até confirmação?) |

**Nenhuma conversão foi feita. O enum não foi alterado.**

---

## 8. Os 19 `processNumber` reconstruídos

| Ord | Original | Reconstruído | Método | Fonte | Confiança | Confirmação necessária |
|---|---|---|---|---|---|---|
| 2 | 2.02400055000297E14 | 202400055000297 | Deslocamento de dígitos da string da mantissa (sem ponto-flutuante) | Nenhuma fonte documental externa confirmou este número especificamente | RECONSTRUÍDO — não confirmado | Sim |
| 4 | 2.02300055000104E14 | 202300055000104 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 5 | 2.02300055000401E14 | 202300055000401 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 8 | 2.02200055000273E14 | 202200055000273 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 22 | 2.02200055000192E14 | 202200055000192 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 23 | 2.02400055000064E14 | 202400055000064 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 24 | 2.0240005500033E14 | 202400055000330 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 25 | 2.02500055000275E14 | 202500055000275 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 26 | 2.02400055000827E14 | 202400055000827 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 27 | 2.02500055000308E14 | 202500055000308 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 28 | 2.02400055000709E14 | 202400055000709 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 29 | 2.02500055000328E14 | 202500055000328 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 30 | 2.02500055000026E14 | 202500055000026 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 31 | 2.02300055000041E14 | 202300055000041 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 32 | 2.02500055000519E14 | 202500055000519 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 33 | 2.02500055000168E14 | 202500055000168 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 34 | 2.02500055000383E14 | 202500055000383 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 35 | 2.02500055000779E14 | 202500055000779 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |
| 36 | 2.02600055000186E14 | 202600055000186 | Idem | Idem | RECONSTRUÍDO — não confirmado | Sim |

**Nenhum foi promovido a "confirmado". Todos permanecem `RECONSTRUCTED_PENDING_CONFIRMATION`.**

---

## 9. Números de contrato problemáticos

| Caso | Evidência já disponível nos arquivos | Resultado |
|---|---|---|
| ord 25 / ZENITE — "09/2025" | Planilha oficial IQUEGO confirma "09/2025" = ZENITE | Este lado está correto; a pendência é sobre o OUTRO lado da colisão (BIOCIENTIFIC) |
| ord 36 / BIOCIENTIFIC — "09/2025" | Planilha oficial mostra "09/2026" para a BIOCIENTIFIC (mesmo valor de R$ 12.000,00); PDF oficial `CONTRATO-09-2026.pdf` localizado (texto não extraído) | Forte indício de que o correto é "09/2026" — **PENDENTE DE CONFIRMAÇÃO DOCUMENTAL** |
| ord 33 / WORK7 — "17/2025" | Planilha oficial só mostra a linhagem "017/2020" (aditivos até 2024); nenhuma linha "17/2025" | Nenhuma evidência resolve o caso — **PENDENTE DE CONFIRMAÇÃO DOCUMENTAL** |
| ord 34 / AUDIGESPUB — "17/2025" | Nenhuma referência à AUDIGESPUB em nenhuma fonte da IQUEGO ou de Goiás | Nenhuma evidência resolve o caso — **PENDENTE DE CONFIRMAÇÃO DOCUMENTAL** |
| ord 16 / SANEAGO — "003/202" | Planilha oficial mostra "003/2021" para a SANEAGO | Forte indício de que falta o dígito "1" — **PENDENTE DE CONFIRMAÇÃO DOCUMENTAL** |

**Nenhum valor foi alterado.**

---

## 10. Os 11 contratos sem `signingDate`

| Ord | Empresa | Fonte histórica tem data alternativa? | Planilha oficial tem data? | Resultado |
|---|---|---|---|---|
| 2 | HEALTH | Não (só `start`/`end` de vigência, que não é data de assinatura) | Empresa não localizada na planilha | `MISSING_REQUIRED_DATA` |
| 17 | EQUATORIAL | Não | Empresa não consta na planilha (concessionária) | `MISSING_REQUIRED_DATA` |
| 26 | L.A VIAGENS | Não | Empresa não localizada | `MISSING_REQUIRED_DATA` |
| 27 | GÁS E MAIS | Não | Empresa não localizada | `MISSING_REQUIRED_DATA` |
| 28 | BRASILSEG | Não | Contrato específico de 2025 não localizado (só histórico anterior) | `MISSING_REQUIRED_DATA` |
| 29 | ÔMEGA | Não | Empresa não localizada | `MISSING_REQUIRED_DATA` |
| 30 | MISTER PRAGAS | Não | Empresa não localizada com confiança suficiente | `MISSING_REQUIRED_DATA` |
| 32 | DMS CALIBRAÇÕES | Não | Campo ASSINATURA veio em branco na planilha oficial | `MISSING_REQUIRED_DATA` |
| 34 | AUDIGESPUB | Não | Empresa não localizada | `MISSING_REQUIRED_DATA` |
| 35 | INSTITUTO PROMOÇÃO HUMANA | Não | Campo ASSINATURA veio em branco na planilha oficial (contrato "07/2026") | `MISSING_REQUIRED_DATA` |
| 36 | BIOCIENTIFIC | Não | Campo ASSINATURA veio em branco na planilha oficial (contrato "09/2026") | `MISSING_REQUIRED_DATA` |

`start` **não foi usado** como substituto de `signingDate` em nenhum caso.

---

## 11. Contratos sem `initialValue` documentalmente disponível

23 registros (ords 1,2,3,4,5,6,7,8,9,10,13,17,19,20,21,22,26,27,28,29,30,31,34) não têm valor inicial documentado — a planilha oficial da IQUEGO trazia, para eles, apenas a coluna "VALOR ALTERADO VIA ADITIVO" (valor **pós**-aditivo, ou seja, o valor **vigente**, não o inicial) ou nenhum valor.

**Nenhum dos três campos abaixo foi usado como `initialValue`, mesmo como auxiliar de decisão:**
- `value` (valor vigente na fonte histórica) — é o valor **atual**, não o inicial; usá-lo seria presumir que nunca houve aditivo de valor, o que contradiz a própria fonte (muitos desses contratos têm aditivo registrado).
- `monthlyValue` — 100% ausente na fonte (nunca preenchido em nenhum dos 36 registros).
- `outstandingBalance` — 100% ausente na fonte (idem).

Todos os 23: `MISSING_REQUIRED_DATA`.

---

## 12. Contractor.email — confirmação final

- **Confirmado no schema**: `email String @db.VarChar(255)` em `model Contractor` — **sem `?`, portanto obrigatório** (NOT NULL no banco).
- **Local confiável no projeto contendo e-mails reais das contratadas**: nenhum encontrado. `seed.ts` tem e-mails, mas são **fictícios/gerados** (padrão `contato@<slug>.com.br`), não confirmados como reais — não foram e não serão usados.
- **Resultado**: `36/36 — EMAIL AUSENTE`.
- Nenhum e-mail fictício ou genérico foi criado nesta etapa. Nenhuma alteração de schema foi feita.

---

## 13. Classificação final dos 36 contratos

| Ord | Empresa | CNPJ | E-mail | Fiscal | Usuário | Processo | Contrato | SigningDate | InitialValue | Modality | Requester | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | SESI | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 2 | HEALTH | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 3 | REDEMOB | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 4 | PLUXEE | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 5 | LE CARD | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 6 | GENESIS PREST. | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DADO (variante) | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 7 | PADA | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DADO (variante) | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 8 | FONSECA E MARTINS | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 9 | JVS | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO (ARP) | PENDENTE_DECISÃO | BLOQUEADO |
| 10 | LS PRODUTOS | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO (ARP) | PENDENTE_DECISÃO | BLOQUEADO |
| 11 | ALTERDATA | RESOLVIDO | PENDENTE_DECISÃO | **HUMAN_REVIEW** | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | **HUMAN_REVIEW** |
| 12 | INTEGRA | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DECISÃO |
| 13 | MPS BRASIL | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 14 | GOIASTELECOM | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DECISÃO |
| 15 | GOIAS TELECOM | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DECISÃO |
| 16 | SANEAGO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 17 | EQUATORIAL | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 18 | GENESIS COM. | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DADO (variante) | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DECISÃO |
| 19 | PRIME | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 20 | GIBBOR | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 21 | WEGH | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 22 | AVISO URGENTE | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 23 | DELTA | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DADO (variante) | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 24 | SHIELD | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 25 | ZENITE | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 26 | L.A VIAGENS | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 27 | GÁS E MAIS | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 28 | BRASILSEG | RESOLVIDO (continuidade) | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 29 | ÔMEGA | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 30 | MISTER PRAGAS | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 31 | NP TECNOLOGIA | RESOLVIDO | PENDENTE_DECISÃO | **HUMAN_REVIEW** | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DECISÃO | **HUMAN_REVIEW** |
| 32 | DMS CALIBRAÇÕES | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 33 | WORK7 | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 34 | AUDIGESPUB | PENDENTE_DADO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DECISÃO | PENDENTE_DECISÃO | BLOQUEADO |
| 35 | INSTITUTO PROMOÇÃO HUMANA | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | RESOLVIDO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |
| 36 | BIOCIENTIFIC | RESOLVIDO | PENDENTE_DECISÃO | RESOLVIDO | PENDENTE_DECISÃO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | PENDENTE_DOCUMENTO | RESOLVIDO | RESOLVIDO | PENDENTE_DECISÃO | BLOQUEADO |

Notas sobre a tabela:
- Coluna "Usuário": `PENDENTE_DECISÃO` para os 36 porque nenhum dos 22 fiscais existe em PROD, e criar usuário é, em si, uma decisão institucional (P20) — mesmo quando o "Fiscal" está `RESOLVIDO` quanto à identidade.
- Coluna "Fiscal" com "PENDENTE_DADO (variante)" (ords 6, 7, 18, 23) indica correspondência EXACT ao seed.ts, porém com uma variação textual menor (abreviação/pontuação) já esclarecida por fonte oficial — não bloqueia, mas foi documentada.
- Status geral "BLOQUEADO" reflete o resultado do dry-run (nenhum registro é `READY_FOR_IMPORT` hoje); "PENDENTE_DECISÃO" foi usado para os 4 registros (12, 14, 15, 18) que, segundo o dry-run, dependem **apenas** de decisões institucionais, sem nenhuma pendência de dado ou documento restante.

---

## 14. INFORMAÇÕES QUE PRECISAMOS SOLICITAR À IQUEGO

### A. Dados cadastrais
- CNPJ de 6 empresas: HEALTH, L.A VIAGENS, GÁS E MAIS, ÔMEGA, MISTER PRAGAS, AUDIGESPUB.
- E-mail institucional das 36 contratadas.

### B. Confirmações documentais
- Confirmação de 19 números de processo reconstruídos (lista completa na seção 8).
- Confirmação de 3 casos de número de contrato: SANEAGO ("003/202"), colisão "09/2025" (ZENITE/BIOCIENTIFIC), colisão "17/2025" (WORK7/AUDIGESPUB).
- Data de assinatura de 11 contratos (lista na seção 10).
- Valor inicial de 23 contratos (lista na seção 11).

### C. Identidades
- Confirmar se "Cleiton de Sá Silva Vieira" é a mesma pessoa que "Cleiton de Sá Silva".
- Confirmar se "Gabriel Morais Godinho" é a mesma pessoa que "Gabriel Moraes Godinho".
- E-mail institucional e matrícula dos 22 fiscais (necessário só se/quando a criação de usuários for decidida).

### D. Decisões institucionais
- Regra para `requesterId` dos processos importados (3 cenários apresentados, seção 6).
- Mapeamento de "Ata de Registro de Preços" na modalidade (2 contratos).
- Política para o campo obrigatório `Contractor.email` sem dado disponível.

Nenhuma informação já confirmada nas etapas anteriores foi reincluída nesta lista.
