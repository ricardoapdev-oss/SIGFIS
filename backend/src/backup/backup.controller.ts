import { Controller, Get, Post, Res, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('backup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
  async downloadBackup(@Res() res: Response) {
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
  async restoreBackup(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    try {
      await this.backupService.restoreBackup(file.buffer);
      return { message: 'Banco de dados restaurado com sucesso!' };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Erro ao restaurar o banco de dados.');
    }
  }
}
