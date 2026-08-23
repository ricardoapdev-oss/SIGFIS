import { SetMetadata } from '@nestjs/common';

export const AUDIT_METADATA_KEY = 'audit_metadata';

export interface AuditMetadata {
  /** Nome de exibição do módulo (ex.: "Contratos", "Usuários"). */
  module: string;
  /** Ação realizada (ex.: CREATE, UPDATE, DELETE, LOGIN, STATUS_CHANGE). */
  action: string;
  /** Entidade/tabela afetada (ex.: "Contract", "User"). */
  entity: string;
}

/**
 * Marca um endpoint de controller para ser auditado automaticamente pelo
 * AuditInterceptor (registrado globalmente em main.ts/app.module.ts).
 * Não requer nenhuma chamada manual no service — a captura de usuário,
 * IP, user-agent e identificador do registro é feita pelo interceptor.
 */
export const Audit = (metadata: AuditMetadata) => SetMetadata(AUDIT_METADATA_KEY, metadata);
