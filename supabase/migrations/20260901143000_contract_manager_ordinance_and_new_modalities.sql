-- Portaria de nomeação do gestor responsável pelo contrato
-- e novas modalidades de contratação (Lei 14.133/2021 / RLCC).
--
-- Rodar no Supabase: `supabase db push` ou colar no SQL Editor do projeto.
-- (PostgreSQL 15 aceita ALTER TYPE ... ADD VALUE dentro de transação; os
--  novos valores só ficam utilizáveis após o commit — o que é o caso aqui,
--  pois nenhuma linha os usa neste script.)

-- 1) Portaria de nomeação do gestor -------------------------------------------
alter table "public"."contracts"
  add column if not exists "managerAppointmentOrdinance" varchar(255);

-- 2) Novas modalidades -------------------------------------------------------
alter type "public"."BiddingModality" add value if not exists 'INAPLICABILIDADE_ART28';
alter type "public"."BiddingModality" add value if not exists 'DISPENSA_ART29_VALOR';
alter type "public"."BiddingModality" add value if not exists 'DISPENSA_ART29_MATERIA';
alter type "public"."BiddingModality" add value if not exists 'INEXIGIBILIDADE_ART30';
alter type "public"."BiddingModality" add value if not exists 'LICITACAO_INTEGRADA_ART32_I';
alter type "public"."BiddingModality" add value if not exists 'LICITACAO_SEMI_INTEGRADA_ART32_II';
alter type "public"."BiddingModality" add value if not exists 'LICITACAO_LEILAO_ART32_III';
alter type "public"."BiddingModality" add value if not exists 'LICITACAO_PREGAO_ART32_IV';
alter type "public"."BiddingModality" add value if not exists 'LICITACAO_PREGAO_SRP_ART32_IV';
