import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';
import { AUDIT_METADATA_KEY, AuditMetadata } from './audit-log.decorator';

/**
 * Intercepta toda rota decorada com @Audit(...) e grava um registro de
 * auditoria real no banco após a resposta ser produzida com sucesso —
 * sem exigir nenhuma chamada manual dentro do service da rota.
 *
 * Registrado globalmente (ver app.module.ts). Rotas sem @Audit não geram
 * nenhum registro (evita auditar GETs de consulta em massa).
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.getAllAndOverride<AuditMetadata>(AUDIT_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!meta || context.getType() !== 'http') return next.handle();

    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((result) => {
        // Login não passa pelo JwtAuthGuard, então req.user não existe —
        // nesse caso o usuário vem do próprio corpo da resposta de login.
        const authUser = req.user;
        const resultUser = result?.user;
        const userId = authUser?.id ?? resultUser?.id ?? null;
        const userName = authUser?.name ?? resultUser?.name ?? null;
        const userRole = authUser?.role ?? resultUser?.role ?? null;
        const userEmail = authUser?.email ?? resultUser?.email ?? null;

        const entityId: string | null =
          req.params?.id ??
          result?.id ??
          resultUser?.id ??
          null;

        const ip = (req.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || req.socket?.remoteAddress || null;

        this.auditService.log({
          userId,
          userEmail,
          userName,
          userRole,
          action: meta.action,
          module: meta.module,
          entity: meta.entity,
          entityId,
          detail: `${meta.action} em ${meta.module}${entityId ? ` (registro ${entityId})` : ''}`,
          newValues: meta.action === 'CREATE' ? (result ?? null) : null,
          ipAddress: ip,
          userAgent: req.headers?.['user-agent'] || null,
        });
      }),
    );
  }
}
