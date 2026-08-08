import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';
import { PrismaService } from '../prisma/prisma.service';

// Ordem de dependência das tabelas (pai antes de filho, respeitando as FKs
// do schema.prisma). A restauração apaga na ordem inversa e insere nesta ordem.
const TABLES_IN_DEPENDENCY_ORDER = [
  'user',
  'contractor',
  'procurementProcess',
  'contract',
  'fiscalAssignment',
  'occurrence',
  'inspectionMeasurement',
  'contractAlteration',
  'document',
  'communication',
  'systemAlert',
  'procurementPhase',
  'contractPayment',
  'auditLog',
] as const;

const BACKUP_FORMAT = 'sigfis-json-backup';
const BACKUP_VERSION = 1;

/**
 * Backup/restore do banco via Prisma (dump/carga em JSON), em vez de pg_dump/
 * pg_restore ou containers Docker locais. A implementação anterior dependia de
 * binários do PostgreSQL instalados na máquina (ou de um container Docker com
 * o nome fixo "sigecontratos_postgres") — isso não existe em ambiente serverless
 * (Vercel): sem filesystem persistente, sem possibilidade de instalar/rodar
 * binários externos. Esta versão preserva a mesma funcionalidade (baixar um
 * arquivo de backup e restaurar a partir dele) usando apenas o Prisma Client,
 * que já é a única forma de acesso ao banco disponível no runtime serverless.
 *
 * Observação: para bancos muito grandes, prefira o backup automático do
 * próprio Supabase (Point-in-Time Recovery / snapshots diários) como fonte
 * primária de disaster recovery — este endpoint é um utilitário complementar.
 */
@Injectable()
export class BackupService {
  constructor(private prisma: PrismaService) {}

  async createBackupStream(): Promise<Readable> {
    const tables: Record<string, unknown[]> = {};
    for (const table of TABLES_IN_DEPENDENCY_ORDER) {
      tables[table] = await (this.prisma as any)[table].findMany();
    }

    const payload = {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      generatedAt: new Date().toISOString(),
      tables,
    };

    return Readable.from([JSON.stringify(payload, null, 2)]);
  }

  async restoreBackup(fileBuffer: Buffer): Promise<void> {
    let payload: any;
    try {
      payload = JSON.parse(fileBuffer.toString('utf-8'));
    } catch {
      throw new InternalServerErrorException('Arquivo de backup inválido: JSON malformado.');
    }

    if (payload?.format !== BACKUP_FORMAT || !payload.tables) {
      throw new InternalServerErrorException(
        'Arquivo de backup inválido ou de formato incompatível. Use um arquivo gerado por este sistema.',
      );
    }

    const tables = payload.tables as Record<string, unknown[]>;

    await this.prisma.$transaction(
      async (tx) => {
        for (const table of [...TABLES_IN_DEPENDENCY_ORDER].reverse()) {
          await (tx as any)[table].deleteMany({});
        }
        for (const table of TABLES_IN_DEPENDENCY_ORDER) {
          const rows = tables[table];
          if (Array.isArray(rows) && rows.length > 0) {
            await (tx as any)[table].createMany({ data: rows });
          }
        }
      },
      { timeout: 60_000 },
    );
  }
}
