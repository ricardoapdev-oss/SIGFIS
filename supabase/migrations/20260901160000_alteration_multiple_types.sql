-- Conjugação de tipos de aditivo: um mesmo termo aditivo pode ser, ao mesmo
-- tempo, de mais de um tipo (ex.: prorrogação de prazo + acréscimo de valor).
--
-- Rodar no Supabase: `supabase db push` ou colar no SQL Editor.

alter table "public"."contract_alterations"
  add column if not exists "types" "public"."AlterationType"[]
  not null default array[]::"public"."AlterationType"[];

-- Registros já existentes: preenche `types` com o `type` atual.
update "public"."contract_alterations"
  set "types" = array["type"]
  where cardinality("types") = 0;
