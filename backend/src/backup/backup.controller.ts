import { Controller, Get, Post, Res, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Req } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { AuditService } from '../audit/audit.service';

@Controller('backup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BackupController {
  constructor(private readonly backupService: BackupService, private readonly auditService: AuditService) {}

  // @Res() assume o controle total da resposta HTTP, o que faz o
  // AuditInterceptor genérico não enxergar um "resultado" normal — por isso
  // este endpoint registra a auditoria manualmente, e não via @Audit().
  @Get()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  async downloadBackup(@Res() res: Response, @Req() req) {
    this.auditService.log({
      userId: req.user?.id, userEmail: req.user?.email, userName: req.user?.name, userRole: req.user?.role,
      action: 'EXPORT', module: 'Backup', entity: 'Database',
      detail: `Backup completo exportado por ${req.user?.name}`,
      ipAddress: req.ip, userAgent: req.headers?.['user-agent'],
    });
    try {
      const stream = await this.backupService.createBackupStream();
      
      const dateStr = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const filename = `sigecontratos_backup_${dateStr}.json`;

      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      });

      stream.pipe(res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  @Post('restore')
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  @UseInterceptors(FileInterceptor('file'))
  async restoreBackup(@UploadedFile() file: any, @Req() req) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    const auditBase = {
      userId: req.user?.id, userEmail: req.user?.email, userName: req.user?.name, userRole: req.user?.role,
      module: 'Backup', entity: 'Database',
      ipAddress: req.ip, userAgent: req.headers?.['user-agent'],
    };

    try {
      await this.backupService.restoreBackup(file.buffer);
      this.auditService.log({ ...auditBase, action: 'RESTORE', detail: `Banco restaurado a partir de backup por ${req.user?.name}` });
      return { message: 'Banco de dados restaurado com sucesso!' };
    } catch (error: any) {
      // Operação crítica: mesmo uma tentativa que falhou fica registrada.
      this.auditService.log({ ...auditBase, action: 'RESTORE_FAILED', detail: `Tentativa de restauração falhou: ${error.message}` });
      throw new BadRequestException(error.message || 'Erro ao restaurar o banco de dados.');
    }
  }
}
