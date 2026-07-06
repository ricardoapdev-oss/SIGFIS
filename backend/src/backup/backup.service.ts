import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const execAsync = promisify(exec);

interface DbParams { user: string; password: string; host: string; port: string; dbname: string; }

@Injectable()
export class BackupService {

  private parseDbUrl(url: string): DbParams {
    const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:/]+):?(\d*)\/?(.+)/);
    if (!match) throw new InternalServerErrorException('DATABASE_URL inválida.');
    return { user: match[1], password: match[2], host: match[3], port: match[4] || '5432', dbname: match[5] };
  }

  private async findBinary(name: string): Promise<string | null> {
    const candidates = [
      name,
      `C:\\Program Files\\PostgreSQL\\17\\bin\\${name}.exe`,
      `C:\\Program Files\\PostgreSQL\\16\\bin\\${name}.exe`,
      `C:\\Program Files\\PostgreSQL\\15\\bin\\${name}.exe`,
      `C:\\Program Files\\PostgreSQL\\14\\bin\\${name}.exe`,
    ];
    for (const candidate of candidates) {
      try { await execAsync(`"${candidate}" --version`); return candidate; } catch { continue; }
    }
    return null;
  }

  async createBackupStream(): Promise<Readable> {
    const pgDump = await this.findBinary('pg_dump');

    if (pgDump) {
      const { user, password, host, port, dbname } = this.parseDbUrl(process.env.DATABASE_URL);
      return new Promise((resolve, reject) => {
        const proc = spawn(`"${pgDump}"`, ['-h', host, '-p', port, '-U', user, '-Fc', dbname], {
          shell: true,
          env: { ...process.env, PGPASSWORD: password },
        });
        proc.on('error', err => reject(new InternalServerErrorException(`Erro ao iniciar backup: ${err.message}`)));
        proc.stderr.on('data', d => console.warn(`pg_dump: ${d}`));
        resolve(proc.stdout);
      });
    }

    // Fallback: Docker
    return new Promise((resolve, reject) => {
      const proc = spawn('docker', ['exec', 'sigecontratos_postgres', 'pg_dump', '-U', 'sigecontratos_user', '-Fc', 'sigecontratos_db']);
      proc.on('error', err => reject(new InternalServerErrorException(
        `pg_dump e Docker não encontrados. Instale o PostgreSQL ou Docker. Detalhe: ${err.message}`
      )));
      proc.stderr.on('data', d => console.warn(`pg_dump (docker): ${d}`));
      resolve(proc.stdout);
    });
  }

  async restoreBackup(fileBuffer: Buffer): Promise<void> {
    const pgRestore = await this.findBinary('pg_restore');
    const tmpFile = path.join(os.tmpdir(), `sigfis_restore_${Date.now()}.dump`);
    fs.writeFileSync(tmpFile, fileBuffer);

    try {
      if (pgRestore) {
        const { user, password, host, port, dbname } = this.parseDbUrl(process.env.DATABASE_URL);
        await new Promise<void>((resolve, reject) => {
          const proc = spawn(
            `"${pgRestore}"`,
            ['-h', host, '-p', port, '-U', user, '-d', dbname, '--clean', '--if-exists', '--no-owner', '--no-privileges', tmpFile],
            { shell: true, env: { ...process.env, PGPASSWORD: password } }
          );
          let errOut = '';
          proc.stderr.on('data', d => { errOut += d.toString(); console.warn(`pg_restore: ${d}`); });
          proc.on('error', err => reject(new InternalServerErrorException(`Erro ao iniciar restauração: ${err.message}`)));
          proc.on('close', code => {
            if (code === 0 || code === 1) resolve(); // code 1 = non-fatal warnings
            else reject(new InternalServerErrorException(`Falha na restauração (código ${code}): ${errOut.slice(-500)}`));
          });
        });
      } else {
        // Fallback: Docker
        await new Promise<void>((resolve, reject) => {
          const proc = spawn('docker', ['exec', '-i', 'sigecontratos_postgres', 'pg_restore',
            '-U', 'sigecontratos_user', '-d', 'sigecontratos_db', '--clean', '--if-exists', '--no-owner']);
          let errOut = '';
          proc.stderr.on('data', d => { errOut += d.toString(); console.warn(`pg_restore (docker): ${d}`); });
          proc.on('error', err => reject(new InternalServerErrorException(`pg_restore e Docker não encontrados. Detalhe: ${err.message}`)));
          proc.on('close', code => {
            if (code === 0 || code === 1) resolve();
            else reject(new InternalServerErrorException(`Falha na restauração via Docker (código ${code}): ${errOut.slice(-500)}`));
          });
          proc.stdin.write(fileBuffer);
          proc.stdin.end();
        });
      }
    } finally {
      try { fs.unlinkSync(tmpFile); } catch { /* ignore cleanup errors */ }
    }
  }
}
