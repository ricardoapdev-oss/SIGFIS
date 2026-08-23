alter default privileges for role "postgres" in schema "public" revoke all on sequences from "anon";

alter default privileges for role "postgres" in schema "public" revoke all on sequences from "authenticated";

alter default privileges for role "postgres" in schema "public" revoke all on sequences from "service_role";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "anon";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "authenticated";

alter default privileges for role "postgres" in schema "public" revoke all on tables from "service_role";

create table "public"."audit_logs" (
  "id"        uuid                        not null,
  "userId"    uuid,
  "userEmail" character varying(255),
  "action"    character varying(100)      not null,
  "entity"    character varying(100)      not null,
  "entityId"  character varying(100),
  "detail"    text,
  "createdAt" timestamp(6) with time zone not null default current_timestamp,
  "ipAddress" character varying(64),
  "module"    character varying(100),
  "newValues" jsonb,
  "oldValues" jsonb,
  "userAgent" character varying(255),
  "userName"  character varying(255),
  "userRole"  character varying(50),
  constraint "audit_logs_pkey" primary key (id)
);

create table "public"."communications" (
  "id"          uuid                        not null,
  "contractId"  uuid                        not null,
  "senderId"    uuid                        not null,
  "recipientId" uuid,
  "subject"     character varying(255)      not null,
  "message"     text                        not null,
  "parentId"    uuid,
  "readAt"      timestamp(6) with time zone,
  "createdAt"   timestamp(6) with time zone not null default current_timestamp,
  "completedAt" timestamp(6) with time zone,
  "isCompleted" boolean                     not null default false,
  constraint "communications_pkey" primary key (id)
);

create table "public"."contract_alterations" (
  "id"               uuid                        not null,
  "contractId"       uuid                        not null,
  "alterationNumber" character varying(50),
  "valueChange"      numeric(15,2)               not null default 0.00,
  "newEndDate"       date,
  "justification"    text                        not null,
  "requestedById"    uuid                        not null,
  "reviewedById"     uuid,
  "reviewDate"       timestamp(6) with time zone,
  "reviewNotes"      text,
  "createdAt"        timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"        timestamp(6) with time zone not null,
  constraint "contract_alterations_pkey" primary key (id)
);

create table "public"."contract_payments" (
  "id"             uuid                        not null,
  "contractId"     uuid                        not null,
  "registeredById" uuid                        not null,
  "paymentDate"    date                        not null,
  "value"          numeric(15,2)               not null,
  "invoiceNumber"  character varying(100),
  "description"    text                        not null,
  "createdAt"      timestamp(6) with time zone not null default current_timestamp,
  constraint "contract_payments_pkey" primary key (id)
);

create table "public"."contractors" (
  "id"                   uuid                        not null,
  "corporateName"        character varying(255)      not null,
  "tradeName"            character varying(255),
  "cnpjCpf"              character varying(20)       not null,
  "email"                character varying(255),
  "phone"                character varying(20),
  "postalCode"           character varying(10),
  "addressStreet"        character varying(255),
  "addressNumber"        character varying(20),
  "addressNeighborhood"  character varying(100),
  "addressCity"          character varying(100),
  "addressState"         character varying(2),
  "stateInscription"     character varying(50),
  "municipalInscription" character varying(50),
  "createdAt"            timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"            timestamp(6) with time zone not null,
  constraint "contractors_pkey" primary key (id)
);

create table "public"."contracts" (
  "id"                uuid                        not null,
  "contractNumber"    character varying(100)      not null,
  "processId"         uuid,
  "contractorId"      uuid                        not null,
  "objectDescription" text                        not null,
  "initialValue"      numeric(15,2)               not null,
  "currentValue"      numeric(15,2)               not null,
  "signingDate"       date                        not null,
  "startDate"         date                        not null,
  "endDate"           date                        not null,
  "managerId"         uuid,
  "department"        character varying(150),
  "observations"      text,
  "createdAt"         timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"         timestamp(6) with time zone not null,
  constraint "contracts_pkey" primary key (id)
);

create table "public"."documents" (
  "id"            uuid                        not null,
  "contractId"    uuid,
  "processId"     uuid,
  "occurrenceId"  uuid,
  "measurementId" uuid,
  "title"         character varying(255)      not null,
  "fileKey"       character varying(255)      not null,
  "fileSize"      integer                     not null,
  "mimeType"      character varying(100)      not null,
  "uploadedById"  uuid                        not null,
  "createdAt"     timestamp(6) with time zone not null default current_timestamp,
  constraint "documents_pkey" primary key (id)
);

create table "public"."fiscal_assignments" (
  "id"              uuid                        not null,
  "contractId"      uuid                        not null,
  "fiscalId"        uuid                        not null,
  "designationAct"  character varying(150)      not null,
  "designationDate" date                        not null,
  "startDate"       date                        not null,
  "endDate"         date,
  "isActive"        boolean                     not null default true,
  "createdAt"       timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"       timestamp(6) with time zone not null,
  constraint "fiscal_assignments_pkey" primary key (id)
);

create table "public"."inspections_measurements" (
  "id"                uuid                        not null,
  "contractId"        uuid                        not null,
  "fiscalId"          uuid                        not null,
  "periodStart"       date                        not null,
  "periodEnd"         date                        not null,
  "measurementValue"  numeric(15,2)               not null,
  "reportDescription" text                        not null,
  "approvedById"      uuid,
  "approvalDate"      timestamp(6) with time zone,
  "rejectionReason"   text,
  "createdAt"         timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"         timestamp(6) with time zone not null,
  constraint "inspections_measurements_pkey" primary key (id)
);

create table "public"."occurrences" (
  "id"                    uuid                        not null,
  "contractId"            uuid                        not null,
  "fiscalId"              uuid                        not null,
  "title"                 character varying(255)      not null,
  "description"           text                        not null,
  "resolutionDescription" text,
  "resolvedById"          uuid,
  "resolvedAt"            timestamp(6) with time zone,
  "createdAt"             timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"             timestamp(6) with time zone not null,
  constraint "occurrences_pkey" primary key (id)
);

create table "public"."procurement_phases" (
  "id"                         uuid                        not null,
  "processId"                  uuid                        not null,
  "phaseNumber"                integer                     not null,
  "name"                       character varying(255)      not null,
  "plannedStart"               date,
  "plannedEnd"                 date,
  "actualStart"                date,
  "actualEnd"                  date,
  "responsibleId"              uuid,
  "isActive"                   boolean                     not null default true,
  "createdAt"                  timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"                  timestamp(6) with time zone not null,
  "alertaAtivo"                boolean                     not null default true,
  "bloqueiaAvancoSemConclusao" boolean                     not null default false,
  "checklistItems"             jsonb,
  "descricao"                  text,
  "documentoObrigatorio"       character varying(255),
  "observacoes"                text,
  "pendenciaCritica"           text,
  "prazoDias"                  integer,
  "responsavelSetor"           character varying(100),
  constraint "procurement_phases_pkey" primary key (id)
);

create table "public"."procurement_processes" (
  "id"                         uuid                        not null,
  "processNumber"              character varying(100)      not null,
  "subject"                    character varying(500)      not null,
  "description"                text,
  "estimatedValue"             numeric(15,2)               not null,
  "requesterDepartment"        character varying(100)      not null,
  "requesterId"                uuid                        not null,
  "createdAt"                  timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"                  timestamp(6) with time zone not null,
  "dataLimiteProcesso"         date,
  "dataSolicitacao"            date,
  "exigeContratoFormal"        boolean                     not null default true,
  "exigeParecerJuridico"       boolean                     not null default true,
  "exigePublicacaoDivulgacao"  boolean                     not null default true,
  "exigeRatificacaoAutoridade" boolean                     not null default true,
  "exigeTR"                    boolean                     not null default true,
  "fiscalDefinido"             boolean                     not null default false,
  "fundamentoLegalPreliminar"  character varying(500),
  "justificativaUrgencia"      text,
  "observacoesGerenciais"      text,
  "possuiPrazoCritico"         boolean                     not null default false,
  "prioridade"                 character varying(20),
  "responsavelDemanda"         character varying(255),
  "tipoContratacao"            character varying(50),
  constraint "procurement_processes_pkey" primary key (id)
);

create table "public"."system_alerts" (
  "id"         uuid                        not null,
  "contractId" uuid,
  "message"    character varying(500)      not null,
  "isRead"     boolean                     not null default false,
  "createdAt"  timestamp(6) with time zone not null default current_timestamp,
  constraint "system_alerts_pkey" primary key (id)
);

create table "public"."users" (
  "id"                 uuid                        not null,
  "name"               character varying(255)      not null,
  "email"              character varying(255)      not null,
  "passwordHash"       character varying(255)      not null,
  "registrationNumber" character varying(50),
  "createdAt"          timestamp(6) with time zone not null default current_timestamp,
  "updatedAt"          timestamp(6) with time zone not null,
  constraint "users_pkey" primary key (id)
);

create type "public"."AlertType" as enum (
  'EXPIRATION_90_DAYS',
  'EXPIRATION_60_DAYS',
  'EXPIRATION_30_DAYS',
  'OCCURRENCE_CRITICAL',
  'MEASUREMENT_PENDING',
  'CONTRACT_LIMIT_WARNING'
);

alter table "public"."system_alerts"
  add column "type" public."AlertType" not null;

create type "public"."AlterationStatus" as enum (
  'DRAFT',
  'PENDING_APPROVAL',
  'APPROVED',
  'REJECTED'
);

alter table "public"."contract_alterations"
  add column "status" public."AlterationStatus" not null default 'DRAFT'::public."AlterationStatus";

create type "public"."AlterationType" as enum (
  'ADDENDUM_VALUE_INCREASE',
  'ADDENDUM_VALUE_DECREASE',
  'ADDENDUM_TIME_EXTENSION',
  'PRICE_REAJUSTE',
  'PRICE_REPACTUACAO',
  'PRICE_REEQUILIBRIO'
);

alter table "public"."contract_alterations"
  add column "type" public."AlterationType" not null;

create type "public"."BiddingModality" as enum (
  'LICITACAO_13303',
  'DISPENSA_13303',
  'INEXIGIBILIDADE',
  'PREGAO_ELETRONICO',
  'OUTROS'
);

alter table "public"."procurement_processes"
  add column "modality" public."BiddingModality" not null;

create type "public"."ContractStatus" as enum (
  'DRAFT',
  'ACTIVE',
  'SUSPENDED',
  'CONCLUDED',
  'RESCINDED'
);

alter table "public"."contracts"
  add column "status" public."ContractStatus" not null default 'DRAFT'::public."ContractStatus";

create type "public"."DocumentCategory" as enum (
  'CONTRACT_MINUTA',
  'CONTRACT_SIGNED',
  'FISCAL_PORTARIA',
  'MEASUREMENT_REPORT',
  'INVOICE_NF',
  'OCCURRENCE_EVIDENCE',
  'ADDENDUM_SIGNED',
  'OTHER'
);

alter table "public"."documents"
  add column "category" public."DocumentCategory" not null;

create type "public"."FiscalRole" as enum (
  'TITULAR',
  'SUBSTITUTO',
  'SUPLENTE'
);

alter table "public"."fiscal_assignments"
  add column "role" public."FiscalRole" not null default 'TITULAR'::public."FiscalRole";

create type "public"."MeasurementStatus" as enum (
  'PENDING_FISCAL',
  'PENDING_GESTOR',
  'APPROVED',
  'REJECTED'
);

alter table "public"."inspections_measurements"
  add column "status" public."MeasurementStatus" not null default 'PENDING_FISCAL'::public."MeasurementStatus";

create type "public"."OccurrenceSeverity" as enum (
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL'
);

alter table "public"."occurrences"
  add column "severity" public."OccurrenceSeverity" not null default 'MEDIUM'::public."OccurrenceSeverity";

create type "public"."OccurrenceStatus" as enum (
  'OPEN',
  'UNDER_REVIEW',
  'RESOLVED',
  'REJECTED'
);

alter table "public"."occurrences"
  add column "status" public."OccurrenceStatus" not null default 'OPEN'::public."OccurrenceStatus";

create type "public"."PhaseStatus" as enum (
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'BLOCKED'
);

alter table "public"."procurement_phases"
  add column "status" public."PhaseStatus" not null default 'PENDING'::public."PhaseStatus";

create type "public"."ProcessStatus" as enum (
  'PLANNING',
  'LEGAL_REVIEW',
  'BIDDING',
  'CONTRACT_PREP',
  'CONCLUDED',
  'CANCELED'
);

alter table "public"."procurement_processes"
  add column "status" public."ProcessStatus" not null default 'PLANNING'::public."ProcessStatus";

create type "public"."UserRole" as enum (
  'ADMIN',
  'GESTOR',
  'FISCAL',
  'ALTA_GESTAO'
);

alter table "public"."system_alerts"
  add column "targetRole" public."UserRole" not null;

alter table "public"."users"
  add column "role" public."UserRole" not null;

create type "public"."UserStatus" as enum (
  'ACTIVE',
  'INACTIVE'
);

alter table "public"."users"
  add column "status" public."UserStatus" not null default 'ACTIVE'::public."UserStatus";

alter table "public"."communications"
  add constraint "communications_parentId_fkey" foreign key ("parentId") references public.communications(id) on update cascade on delete set null;

alter table "public"."contracts"
  add constraint "contracts_contractorId_fkey" foreign key ("contractorId") references public.contractors(id) on update cascade on delete restrict;

alter table "public"."communications"
  add constraint "communications_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."contract_alterations"
  add constraint "contract_alterations_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."contract_payments"
  add constraint "contract_payments_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."documents"
  add constraint "documents_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."fiscal_assignments"
  add constraint "fiscal_assignments_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."inspections_measurements"
  add constraint "inspections_measurements_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."documents"
  add constraint "documents_measurementId_fkey" foreign key ("measurementId") references public.inspections_measurements(id) on update cascade on delete cascade;

alter table "public"."occurrences"
  add constraint "occurrences_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."documents"
  add constraint "documents_occurrenceId_fkey" foreign key ("occurrenceId") references public.occurrences(id) on update cascade on delete cascade;

alter table "public"."contracts"
  add constraint "contracts_processId_fkey" foreign key ("processId") references public.procurement_processes(id) on update cascade on delete set null;

alter table "public"."documents"
  add constraint "documents_processId_fkey" foreign key ("processId") references public.procurement_processes(id) on update cascade on delete cascade;

alter table "public"."procurement_phases"
  add constraint "procurement_phases_processId_fkey" foreign key ("processId") references public.procurement_processes(id) on update cascade on delete cascade;

alter table "public"."system_alerts"
  add constraint "system_alerts_contractId_fkey" foreign key ("contractId") references public.contracts(id) on update cascade on delete cascade;

alter table "public"."communications"
  add constraint "communications_recipientId_fkey" foreign key ("recipientId") references public.users(id) on update cascade on delete set null;

alter table "public"."communications"
  add constraint "communications_senderId_fkey" foreign key ("senderId") references public.users(id) on update cascade on delete restrict;

alter table "public"."contract_alterations"
  add constraint "contract_alterations_requestedById_fkey" foreign key ("requestedById") references public.users(id) on update cascade on delete restrict;

alter table "public"."contract_alterations"
  add constraint "contract_alterations_reviewedById_fkey" foreign key ("reviewedById") references public.users(id) on update cascade on delete set null;

alter table "public"."contract_payments"
  add constraint "contract_payments_registeredById_fkey" foreign key ("registeredById") references public.users(id) on update cascade on delete restrict;

alter table "public"."contracts"
  add constraint "contracts_managerId_fkey" foreign key ("managerId") references public.users(id) on update cascade on delete set null;

alter table "public"."documents"
  add constraint "documents_uploadedById_fkey" foreign key ("uploadedById") references public.users(id) on update cascade on delete restrict;

alter table "public"."fiscal_assignments"
  add constraint "fiscal_assignments_fiscalId_fkey" foreign key ("fiscalId") references public.users(id) on update cascade on delete restrict;

alter table "public"."inspections_measurements"
  add constraint "inspections_measurements_approvedById_fkey" foreign key ("approvedById") references public.users(id) on update cascade on delete set null;

alter table "public"."inspections_measurements"
  add constraint "inspections_measurements_fiscalId_fkey" foreign key ("fiscalId") references public.users(id) on update cascade on delete restrict;

alter table "public"."occurrences"
  add constraint "occurrences_fiscalId_fkey" foreign key ("fiscalId") references public.users(id) on update cascade on delete restrict;

alter table "public"."occurrences"
  add constraint "occurrences_resolvedById_fkey" foreign key ("resolvedById") references public.users(id) on update cascade on delete set null;

alter table "public"."procurement_phases"
  add constraint "procurement_phases_responsibleId_fkey" foreign key ("responsibleId") references public.users(id) on update cascade on delete set null;

alter table "public"."procurement_processes"
  add constraint "procurement_processes_requesterId_fkey" foreign key ("requesterId") references public.users(id) on update cascade on delete restrict;

create unique index "contractors_cnpjCpf_key" on public.contractors using btree ("cnpjCpf");

create unique index "contracts_contractNumber_key" on public.contracts using btree ("contractNumber");

create unique index "fiscal_assignments_contractId_fiscalId_role_key" on public.fiscal_assignments using btree ("contractId", "fiscalId", role);

create index idx_alterations_contract on public.contract_alterations using btree ("contractId");

create index idx_audit_created on public.audit_logs using btree ("createdAt");

create index idx_audit_entity on public.audit_logs using btree (entity, "entityId");

create index idx_audit_user on public.audit_logs using btree ("userId");

create index idx_contracts_contractor on public.contracts using btree ("contractorId");

create index idx_contracts_manager on public.contracts using btree ("managerId");

create index idx_fiscal_assignments_fiscal on public.fiscal_assignments using btree ("fiscalId");

create index idx_measurements_contract on public.inspections_measurements using btree ("contractId");

create index idx_occurrences_contract_severity on public.occurrences using btree ("contractId", severity);

create index idx_payments_contract on public.contract_payments using btree ("contractId");

create index idx_system_alerts_unread on public.system_alerts using btree ("targetRole");

create unique index "procurement_processes_processNumber_key" on public.procurement_processes using btree ("processNumber");

create unique index users_email_key on public.users using btree (email);

create unique index "users_registrationNumber_key" on public.users using btree ("registrationNumber");

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."audit_logs" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."communications" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."contract_alterations" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."contract_payments" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."contractors" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."contracts" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."documents" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."fiscal_assignments" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."inspections_measurements" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."occurrences" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."procurement_phases" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."procurement_processes" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."system_alerts" to "anon", "authenticated", "postgres", "service_role";

grant delete, insert, maintain, references, select, trigger, truncate, update on table "public"."users" to "anon", "authenticated", "postgres", "service_role";

grant usage on type "public"."AlertType" to "postgres";

grant usage on type "public"."AlterationStatus" to "postgres";

grant usage on type "public"."AlterationType" to "postgres";

grant usage on type "public"."BiddingModality" to "postgres";

grant usage on type "public"."ContractStatus" to "postgres";

grant usage on type "public"."DocumentCategory" to "postgres";

grant usage on type "public"."FiscalRole" to "postgres";

grant usage on type "public"."MeasurementStatus" to "postgres";

grant usage on type "public"."OccurrenceSeverity" to "postgres";

grant usage on type "public"."OccurrenceStatus" to "postgres";

grant usage on type "public"."PhaseStatus" to "postgres";

grant usage on type "public"."ProcessStatus" to "postgres";

grant usage on type "public"."UserRole" to "postgres";

grant usage on type "public"."UserStatus" to "postgres";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "anon";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "authenticated";

alter default privileges for role "postgres" in schema "public" grant select, update, usage on sequences to "service_role";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "anon";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "authenticated";

alter default privileges for role "postgres" in schema "public" grant execute on FUNCTIONS to "service_role";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "anon";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "authenticated";

alter default privileges for role "postgres" in schema "public" grant delete, insert, maintain, references, select, trigger, truncate, update on tables to "service_role";

