# Migração do SIGFIS para produção online (Vercel + Supabase)

Este documento registra a migração da arquitetura local/intranet do SIGFIS
(Sistema de Gestão e Fiscalização de Contratos) para uma arquitetura online,
com frontend e backend hospedados na Vercel e banco de dados PostgreSQL no
Supabase.

**Nenhuma funcionalidade, regra de negócio, hierarquia de usuários,
permissão, cálculo ou fluxo foi alterado.** As mudanças são exclusivamente de
infraestrutura/deploy, com duas exceções pontuais documentadas na seção
[Mudanças de código](#mudanças-de-código): o módulo de backup (que dependia
de binários locais) e a configuração de CORS (que passou a ser configurável).

---

## 1. Arquitetura anterior

```
USUÁRIO (rede local/intranet)
  → Frontend Next.js (porta 3000, Docker ou `next start`)
  → next.config.ts rewrites /api/* → BACKEND_URL
  → Backend NestJS (porta 3001, Docker ou `node dist/main`)
  → Prisma
  → PostgreSQL local (Docker, container `sigecontratos_postgres`)
```

Backup: `pg_dump`/`pg_restore` via binário local do PostgreSQL ou, na
ausência dele, via `docker exec` no container `sigecontratos_postgres`.

## 2. Arquitetura nova

```
USUÁRIO (internet)
  → https://[projeto].vercel.app          (um único projeto/domínio Vercel)
  → vercel.json (raiz) — services: frontend + backend
      "/api/(.*)"  → serviço "backend"    (NestJS serverless, prefixo global "api")
      "/(.*)"      → serviço "frontend"   (Next.js)
  → Prisma (DATABASE_URL = Supabase Transaction Pooler)
  → Supabase PostgreSQL (gestao-contratos-iquego-prod)
```

Backup: export/import via Prisma (JSON), sem dependência de binários ou
Docker — ver seção 6.

### Decisão de arquitetura Vercel: "Services" (um projeto) em vez de dois projetos

O plano inicial era dois projetos Vercel independentes (`SIGFIS-FRONTEND` e
`SIGFIS-BACKEND`), cada um com seu próprio domínio, usando o rewrite externo
do `next.config.ts` (`BACKEND_URL`) para o frontend falar com o backend — essa
abordagem continua tecnicamente válida (o `backend/vercel.json` standalone
foi mantido para isso).

Na prática, o fluxo de import da Vercel detectou os dois diretórios de app no
mesmo repositório e ofereceu o modelo **"Services"** (um único projeto,
múltiplos serviços, um domínio só) — recurso atual da Vercel para monorepos
poliglota. Adotamos esse caminho porque:

- É o que a própria Vercel já tinha detectado e ativado na tela de import do
  usuário — seguir o caminho já aberto reduz passos manuais.
- Um domínio único elimina CORS entre frontend e backend (mesma origem) e
  simplifica variáveis de ambiente (não depende mais de descobrir a URL do
  backend depois do primeiro deploy para configurar o frontend).
- Continua sendo dois builds/serviços isolados internamente (cada um com seu
  próprio `root`, instalação e build), preservando o isolamento que o Opção A
  buscava.

**Detalhe técnico importante por trás da mudança:** no roteamento de
"Services" da Vercel, o serviço de destino recebe o **path original da
requisição pública** — uma chamada a `/api/contracts` chega ao serviço
`backend` como `/api/contracts`, não como `/contracts` (confirmado na
documentação oficial: https://vercel.com/docs/services/routing). Como todas
as rotas do NestJS são montadas sem prefixo (`/auth/login`, `/contracts`,
etc.), isso exigiria uma mudança de rota — resolvida sem alterar nenhuma rota
de negócio: `backend/api/index.ts` (o entrypoint serverless, **só ele**)
agora aplica `app.setGlobalPrefix('api')`. O bootstrap local/Docker
(`src/main.ts`) continua sem prefixo, exatamente como sempre foi — o proxy do
`next.config.ts` já removia o `/api` antes de chegar lá, e continua removendo
em dev local. Ver `backend/src/create-app.ts` (parâmetro `globalPrefix`).

## 3. Bancos Supabase

| Ambiente | Projeto Supabase | Status |
|---|---|---|
| Desenvolvimento | `gestao-contratos-iquego-dev` (ref `knoyupszzzmordarnabu`) | ✅ validado (26 usuários, 35 contratadas, 36 processos, 36 contratos, 36 designações, 2 ocorrências, 12 medições, 1 aditivo, 2 alertas) |
| Produção | `gestao-contratos-iquego-prod` (ref `exnqzcrsyvrrqgxeieyr`) | ✅ schema aplicado via `prisma db push` — 14 tabelas criadas, banco **vazio** (0 registros), conectividade testada. Sem seed, conforme instruído. |

O DEV já foi testado com login e `/auth/me` para os 4 perfis (ADMIN, GESTOR,
FISCAL, ALTA_GESTAO) e com os filtros de contrato por papel — **não foi
refeito nesta migração**, conforme indicado.

## 4. Variáveis de ambiente

### Backend (`backend/.env.example`)

| Variável | Uso | Observação |
|---|---|---|
| `DATABASE_URL` | Runtime (todas as queries) | Produção: Supabase **Transaction Pooler**, porta `6543`, com `?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | `prisma migrate`/`db push` (DDL) | Produção: conexão direta ou **Session Pooler** (porta `5432`) — o Transaction Pooler não suporta DDL |
| `JWT_SECRET` | Assinatura dos tokens JWT | Gerar um valor novo e forte para produção |
| `JWT_EXPIRATION` | Expiração do token | Mantido `24h` (padrão atual) |
| `PORT` | Porta do bootstrap local/Docker | Não usada na Vercel |
| `CORS_ORIGINS` | Allowlist de origens (nova) | No deploy "Services" (um domínio só) é dispensável — frontend e backend são same-origin, sem CORS. Relevante só para chamar o backend a partir de outra origem (dev local cross-porta, ferramentas externas, ou um eventual deploy standalone do backend). Se vazia, mantém o comportamento anterior (reflete a origem da requisição) |

### Frontend (`frontend/.env.example`)

| Variável | Uso | Observação |
|---|---|---|
| `BACKEND_URL` | Servidor Next.js — usada em `next.config.ts` para o rewrite `/api/* → ${BACKEND_URL}/*` | **Só é usada em dev local** (`next dev`) e no cenário standalone (dois projetos). No deploy "Services" atual, `/api/*` nunca chega a esse rewrite — o `vercel.json` da raiz intercepta a requisição antes dela alcançar o Next.js e a envia direto ao serviço `backend`. Não precisa ser definida no projeto Vercel de produção. |
| `NEXT_PUBLIC_API_URL` | **Não usada por nenhum código atual** | Mantida apenas por já existir no `.env.local`; todo o frontend chama `fetch('/api/...')` relativo |

Nenhuma credencial de banco, `JWT_SECRET` real ou outro segredo foi colocado
neste documento ou em qualquer arquivo versionado — apenas em `.env`
(gitignored) e, em produção, nas variáveis de ambiente do projeto na Vercel.

## 5. Mudanças de código

Todas preservando 100% das rotas, regras de autorização e comportamento
funcional existentes.

1. **`backend/prisma/schema.prisma`**
   - Adicionado `directUrl = env("DIRECT_URL")` no datasource (necessário
     para separar a conexão de runtime — pooled — da conexão usada por
     migrações — direta).
   - Adicionado `binaryTargets = ["native", "rhel-openssl-3.0.x"]` no
     generator — sem isso, o Prisma Client gerado no Windows/dev não
     encontra o Query Engine ao rodar no runtime Linux da Vercel.
   - **Efeito colateral cuidado:** como `DIRECT_URL` passou a ser exigida
     pelo Prisma em qualquer comando (`generate`, `validate`, `db push`),
     ela foi adicionada também a `backend/.env` (mesmo valor do
     `DATABASE_URL` de DEV) e a `docker-compose.yml`, para não quebrar o
     fluxo local/Docker existente.

2. **`backend/src/create-app.ts` (novo)** — extrai a criação/configuração da
   aplicação Nest (antes só existia dentro de `main.ts`) para ser
   compartilhada entre o bootstrap local/Docker e o novo entrypoint
   serverless. CORS passou a ler `CORS_ORIGINS` (allowlist), com fallback
   para o comportamento anterior (`origin: true`) se a variável não for
   definida.

3. **`backend/src/main.ts`** — inalterado no comportamento; agora apenas
   chama `createNestApp()` e `app.listen()`. Usado só no bootstrap
   local/Docker.

4. **`backend/api/index.ts` (novo)** — entrypoint serverless para a Vercel.
   Cria a aplicação Nest uma vez por instância de função (cache em memória)
   e reaproveita entre invocações. Rotas continuam idênticas (`/auth/login`,
   `/contracts`, etc. — sem prefixo `/api`, que já é removido pelo rewrite
   do frontend).

5. **`backend/vercel.json` (novo)** — todas as requisições são roteadas para
   `api/index.ts`.

6. **`backend/src/backup/backup.service.ts` (reescrito)** — a implementação
   anterior chamava `pg_dump`/`pg_restore` via binário local do PostgreSQL
   (com caminhos fixos do Windows) ou, na ausência, via `docker exec` no
   container `sigecontratos_postgres`. **Nenhuma dessas opções existe em
   ambiente serverless** (sem filesystem persistente, sem possibilidade de
   instalar/rodar binários externos). A nova implementação usa o Prisma
   Client para exportar/importar todas as tabelas em formato JSON, mantendo
   a mesma API (`GET /backup` baixa um arquivo, `POST /backup/restore`
   restaura a partir de um arquivo enviado) e as mesmas permissões (ADMIN,
   GESTOR). O arquivo gerado agora é `.json` em vez de `.dump`.
   - **Recomendação complementar:** para um banco deste porte, considere
     também habilitar o backup automático diário do próprio Supabase
     (Database → Backups) como camada adicional de segurança — gratuito no
     plano Free por tempo limitado, sem custo extra.

7. **`backend/package.json`**
   - `@prisma/client` movido de `devDependencies` para `dependencies`
     (é usado em runtime, não só em build).
   - `express` adicionado explicitamente às `dependencies` (já era usado
     via `@nestjs/platform-express`; tornado explícito para o novo
     entrypoint serverless).
   - Adicionado script `postinstall: "prisma generate"` — garante que o
     Prisma Client seja gerado durante o build da Vercel (rodando lá,
     resolve automaticamente o binário Linux correto).

8. **`docker-compose.yml`** — adicionada `DIRECT_URL` ao serviço `backend`
   (mesmo valor de `DATABASE_URL` local), ver item 1.

9. **`backend/.env.example` e `frontend/.env.example` (novos)** — documentam
   todas as variáveis realmente usadas pelo código, sem valores reais.

10. **`vercel.json` (novo, raiz do repositório)** — define o projeto Vercel
    como "Services": `backend` (root `backend/`, entrypoint
    `api/index.ts`) e `frontend` (root `frontend/`, framework `nextjs`),
    com rewrites de nível superior expondo `/api/(.*)` → `backend` e
    `/(.*)` → `frontend`. Ver seção 2 para o porquê dessa arquitetura e o
    detalhe do prefixo `/api`.

11. **`backend/src/create-app.ts`** — ganhou um segundo parâmetro opcional
    (`{ globalPrefix }`). Sem efeito no bootstrap local/Docker (que não o
    usa). `backend/api/index.ts` passa `{ globalPrefix: 'api' }` para que
    as rotas respondam em `/api/*` quando expostas pelo `vercel.json` da
    raiz.

12. **`backend/vercel.json`** — mantido para o caso de o backend ser
    implantado como projeto Vercel standalone no futuro; fica inerte
    enquanto o deploy usa o `vercel.json` da raiz ("Services"). Um campo
    `_comment` explicativo foi removido de ambos os `vercel.json`
    (raiz e `backend/`) porque o schema da Vercel rejeita propriedades
    desconhecidas (`should NOT have additional property '_comment'`) — a
    explicação agora vive só aqui neste documento.

13. **`backend/package.json`** — scripts `build` e `postinstall` passaram a
    invocar o CLI via `node node_modules/<pacote>/bin.js ...` em vez do
    shim `node_modules/.bin/<comando>`. Corrige um erro real de deploy na
    Vercel (`node_modules/.bin/nest: Permission denied`, exit 126) — a
    causa é um problema conhecido e não-determinístico do cache de build da
    Vercel, que às vezes restaura `node_modules` sem preservar o bit de
    execução dos shims em `.bin/`. Chamar o arquivo `.js` do pacote
    diretamente via `node` não depende desse bit, então o build fica imune
    ao problema independente do estado do cache.

14. **`backend/tsconfig.build.json`** — corrigido um bug latente (pré-existente,
    não introduzido nesta migração, mas descoberto ao validar o item 13):
    sem `rootDir` explícito e sem excluir `api/`/`prisma/`, o `nest build`
    incluía `backend/api/index.ts` e `backend/prisma/seed.ts` no mesmo
    programa TypeScript do `src/`, e o compilador passava a gerar
    `dist/src/main.js` em vez de `dist/main.js` — quebrando silenciosamente
    `node dist/main` (usado pelo `Dockerfile`/`entrypoint.sh` e por
    `npm run start:prod`). Como o dev local sempre usa `start:dev`
    (`nest start --watch`, que não lê de `dist/`), isso nunca tinha sido
    percebido. Corrigido com `rootDir: "./src"` e exclusão de `api` e
    `prisma` do build (nenhum dos dois precisa estar em `dist/`: o `api/`
    é compilado separadamente pela própria Vercel, e o `prisma/seed.ts`
    roda via `ts-node` direto do código-fonte). Confirmado com
    `node dist/main.js` rodando localmente e mapeando as rotas.

### O que foi verificado e **não precisou mudar**

- Não há uso real de Firebase no sistema (as únicas ocorrências da palavra
  no repositório estão dentro de `SIGFIS-deploy/`, um pacote de deploy
  offline legado com `node_modules` vendorizado, fora do controle de
  versão do projeto principal — não faz parte da aplicação Next.js/NestJS
  atual).
- O arquivo `next.config.ts` do frontend não precisou de nenhuma alteração.
  Em dev local continua fazendo o proxy `/api/* → BACKEND_URL` como sempre;
  em produção (deploy "Services") esse rewrite nem chega a ser avaliado,
  porque o `vercel.json` da raiz já intercepta `/api/*` antes da requisição
  alcançar o Next.js — o efeito para o usuário final é o mesmo.
- Autenticação JWT, guards, `RolesGuard`, hierarquia ADMIN/GESTOR/
  FISCAL/ALTA_GESTAO, filtros de contrato por fiscal — inalterados.
- Nenhuma rota de nenhum controller foi renomeada, removida ou teve sua
  assinatura alterada.

## 6. Comandos utilizados nesta etapa

```bash
# Build de validação (local, sem tocar no banco)
cd backend && npm run build
cd frontend && npm run build

# Validação do schema Prisma
cd backend && npx prisma validate
```

## 7. Testes realizados nesta etapa

- ✅ `backend`: `npm run build` (nest build) sem erros.
- ✅ `frontend`: `npm run build` (next build) sem erros.
- ✅ `npx prisma validate` — schema válido com `directUrl` configurada.
- ✅ Checagem de tipos de `backend/api/index.ts` (novo entrypoint) via `tsc --noEmit`.
- ⏳ Testes end-to-end contra o Supabase PROD (login dos 4 perfis, `/auth/me`,
  `/contracts`, `/contracts/stats`, `/users`, `/processes`, `/contractors`,
  `/measurements`, `/occurrences`, `/alterations`, `/communications`,
  `/payments`) — **pendentes até o deploy real na Vercel**, pois dependem de
  URLs e variáveis de ambiente que só existem após os passos manuais abaixo.

## 8. Passos manuais pendentes

1. ~~Obter connection strings do Supabase PROD e rodar `prisma db push`~~ —
   **concluído**: schema aplicado em `exnqzcrsyvrrqgxeieyr`, 14 tabelas,
   banco vazio.
2. Confirmar/criar o projeto único na Vercel no modo "Services" (a Vercel já
   havia detectado essa opção durante o import) com o `vercel.json` da raiz
   deste repositório.
3. Cadastrar as variáveis de ambiente de produção do serviço `backend`
   (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `JWT_EXPIRATION`) — não é
   necessário `BACKEND_URL` no serviço `frontend` nem `CORS_ORIGINS` no
   `backend` neste modelo (mesma origem, ver seção 4).
4. Deploy do projeto (os dois serviços sobem juntos, um domínio só).
5. Rodar a bateria de testes funcionais dos 4 perfis na URL de produção.

## 9. Procedimento de rollback

- **Frontend/Backend (Vercel):** cada deploy fica versionado no painel do
  projeto — usar "Promote to Production" em um deploy anterior reverte
  instantaneamente, sem precisar reverter código.
- **Banco (Supabase PROD):** antes de qualquer `prisma db push`/`migrate`
  em produção, gerar um backup (via `GET /backup` do próprio sistema ou via
  Database → Backups do Supabase) para poder restaurar em caso de problema.
- **Ambiente local:** o PostgreSQL Docker local (`docker-compose.yml`)
  permanece intacto e funcional como contingência, conforme decidido — não
  foi desativado nesta migração.

## 10. URLs de produção

_A preencher após o deploy:_

- Projeto (frontend + backend, mesmo domínio): `https://____________.vercel.app`

## 11.5. Incidente: `TS2305` em `@nestjs/common` no build da Vercel

Depois do deploy inicial funcionar, o build passou a falhar de forma
intermitente com dezenas de erros como
`Module '"@nestjs/common"' has no exported member 'Controller'`.

**Investigação:** validado exaustivamente que não era causa do repositório —
integridade do pacote (SHA512 do tarball baixado do registry batendo com o
`package-lock.json`), `package-lock.json` correto, resolução do TypeScript
correta, ausência de `.npmrc`/aliases, `npm ci`/`npm ci --ignore-scripts`/
`npm install` e npm 10.x/11.x todos produzindo instalação completa em Linux
Node 24 — sempre com sucesso, sem nunca reproduzir a falha localmente. O erro
real, obtido via um diagnóstico temporário publicado num deploy, era
`Cannot find module './core'` dentro de `@nestjs/common/decorators/index.js`
— ou seja, o `npm ci` da Vercel instalava o pacote **parcialmente**
(arquivos externos intactos, subpasta interna `decorators/core/` ausente),
uma classe de falha de extração de tarball já documentada no próprio
`npm/cli` (não específica deste projeto).

**Achado adicional durante a investigação:** o projeto Vercel usava
`Framework Preset: NestJS` com Build/Install Command "automático" — uma
variável nunca coberta pelos testes locais (que sempre rodaram `npm ci`/
`npm run build` manualmente). Como não há como confirmar de fora se esse
preset altera o pipeline de instalação, ele foi neutralizado por segurança.

**Correção aplicada (arquivos):**
- `backend/vercel.json` — adicionado `"framework": null` (desativa qualquer
  pipeline automático específico de framework) e `installCommand`/
  `buildCommand` explícitos (`npm ci` / `npm run build`), eliminando
  qualquer inferência "automática" por parte da Vercel.
- `backend/scripts/verify-nest-common.js` (substituiu o diagnóstico
  temporário `build-diagnostics.js`, removido) — roda antes do `tsc` no
  script `build`. Verifica a presença dos arquivos e exports essenciais de
  `@nestjs/common`; se algo estiver faltando, tenta **uma** reinstalação
  limpa (`npm ci`) e verifica de novo; se ainda assim faltar, falha com a
  mensagem explícita `INSTALAÇÃO INCOMPLETA DE @nestjs/common` em vez de
  deixar o `tsc` gerar dezenas de `TS2305` confusos. Não edita, cria ou
  substitui nenhum arquivo dentro de `node_modules` — a única ação
  corretiva é reinstalar via `npm ci`.

**Confirmado durante a investigação (não alterado):** o Root Directory do
projeto Vercel é `backend` (projeto standalone) — a arquitetura "Services"
descrita na seção 2 deste documento **não está em vigor** neste deployment;
o `vercel.json` da raiz do repositório fica inerte, e quem manda é
`backend/vercel.json`. Mantido registrado aqui para não gerar confusão
futura; se a intenção for reativar "Services", o Root Directory do projeto
precisa apontar para a raiz do repositório, não para `backend`.

## 11.6. Testes que comprovam a correção (Linux/Node 24.19.0/npm 11.17.0)

Reprodução isolada, sem `node_modules`/`dist` pré-existentes:

```
npm ci                              → sucesso (mesmo aviso allow-scripts da Vercel, reproduzido)
npm run build                       → exit 0, "[verify-nest-common] @nestjs/common instalado corretamente."
dist/main.js                        → gerado
node dist/main.js                   → app inicia, todos os módulos e rotas mapeados, Prisma conectado
GET /                                → 200 "Hello World!"
POST /auth/login (credencial inválida) → 401 "E-mail ou senha incorretos" (prova Prisma + AuthService)
GET /contracts (sem token)          → 401 Unauthorized (prova JwtAuthGuard ativo)
GET /users (sem token)              → 401 Unauthorized
tsc --noEmit em api/+src/ juntos    → exit 0
```
Testado contra o Supabase **DEV** (somente leitura — nenhuma escrita, nenhum
`db push`, nenhum seed).

## 11. Checklist final

- [x] Auditoria da arquitetura atual
- [x] Confirmação: sem dependência real de Firebase
- [x] `schema.prisma` preparado para Supabase (directUrl + binaryTargets)
- [x] Backend preparado para execução serverless na Vercel
- [x] Módulo de backup adaptado para ambiente cloud
- [x] CORS configurável por variável de ambiente
- [x] `.env.example` (backend e frontend) documentados
- [x] Build local de backend e frontend validado
- [x] Schema aplicado ao Supabase PROD (`prisma db push`) — 14 tabelas, sem dados
- [x] `vercel.json` (raiz) criado — inerte neste projeto (Root Directory = `backend`, ver seção 11.5); `backend/vercel.json` é o que está em vigor
- [x] Incidente de instalação parcial de `@nestjs/common` investigado e mitigado (seção 11.5)
- [ ] Variáveis de ambiente de produção cadastradas no serviço `backend`
- [ ] Deploy do projeto concluído (frontend + backend) e URL obtida
- [ ] Login validado para ADMIN, GESTOR, FISCAL e ALTA_GESTAO em produção
- [ ] `/auth/me` validado para os 4 perfis em produção
- [ ] Dashboards, contratos, processos, fiscais, medições, ocorrências,
      aditivos, comunicações, pagamentos e usuários validados em produção
- [ ] Permissões (regra de acesso por papel) validadas em produção
