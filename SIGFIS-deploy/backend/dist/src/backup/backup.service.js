"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let BackupService = class BackupService {
    parseDbUrl(url) {
        const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:/]+):?(\d*)\/?(.+)/);
        if (!match)
            throw new common_1.InternalServerErrorException('DATABASE_URL inválida.');
        return { user: match[1], password: match[2], host: match[3], port: match[4] || '5432', dbname: match[5] };
    }
    async findBinary(name) {
        const candidates = [
            name,
            `C:\\Program Files\\PostgreSQL\\17\\bin\\${name}.exe`,
            `C:\\Program Files\\PostgreSQL\\16\\bin\\${name}.exe`,
            `C:\\Program Files\\PostgreSQL\\15\\bin\\${name}.exe`,
            `C:\\Program Files\\PostgreSQL\\14\\bin\\${name}.exe`,
        ];
        for (const candidate of candidates) {
            try {
                await execAsync(`"${candidate}" --version`);
                return candidate;
            }
            catch {
                continue;
            }
        }
        return null;
    }
    async createBackupStream() {
        const pgDump = await this.findBinary('pg_dump');
        if (pgDump) {
            const { user, password, host, port, dbname } = this.parseDbUrl(process.env.DATABASE_URL);
            return new Promise((resolve, reject) => {
                const proc = (0, child_process_1.spawn)(`"${pgDump}"`, ['-h', host, '-p', port, '-U', user, '-Fc', dbname], {
                    shell: true,
                    env: { ...process.env, PGPASSWORD: password },
                });
                proc.on('error', err => reject(new common_1.InternalServerErrorException(`Erro ao iniciar backup: ${err.message}`)));
                proc.stderr.on('data', d => console.warn(`pg_dump: ${d}`));
                resolve(proc.stdout);
            });
        }
        return new Promise((resolve, reject) => {
            const proc = (0, child_process_1.spawn)('docker', ['exec', 'sigecontratos_postgres', 'pg_dump', '-U', 'sigecontratos_user', '-Fc', 'sigecontratos_db']);
            proc.on('error', err => reject(new common_1.InternalServerErrorException(`pg_dump e Docker não encontrados. Instale o PostgreSQL ou Docker. Detalhe: ${err.message}`)));
            proc.stderr.on('data', d => console.warn(`pg_dump (docker): ${d}`));
            resolve(proc.stdout);
        });
    }
    async restoreBackup(fileBuffer) {
        const pgRestore = await this.findBinary('pg_restore');
        const tmpFile = path.join(os.tmpdir(), `sigfis_restore_${Date.now()}.dump`);
        fs.writeFileSync(tmpFile, fileBuffer);
        try {
            if (pgRestore) {
                const { user, password, host, port, dbname } = this.parseDbUrl(process.env.DATABASE_URL);
                await new Promise((resolve, reject) => {
                    const proc = (0, child_process_1.spawn)(`"${pgRestore}"`, ['-h', host, '-p', port, '-U', user, '-d', dbname, '--clean', '--if-exists', '--no-owner', '--no-privileges', tmpFile], { shell: true, env: { ...process.env, PGPASSWORD: password } });
                    let errOut = '';
                    proc.stderr.on('data', d => { errOut += d.toString(); console.warn(`pg_restore: ${d}`); });
                    proc.on('error', err => reject(new common_1.InternalServerErrorException(`Erro ao iniciar restauração: ${err.message}`)));
                    proc.on('close', code => {
                        if (code === 0 || code === 1)
                            resolve();
                        else
                            reject(new common_1.InternalServerErrorException(`Falha na restauração (código ${code}): ${errOut.slice(-500)}`));
                    });
                });
            }
            else {
                await new Promise((resolve, reject) => {
                    const proc = (0, child_process_1.spawn)('docker', ['exec', '-i', 'sigecontratos_postgres', 'pg_restore',
                        '-U', 'sigecontratos_user', '-d', 'sigecontratos_db', '--clean', '--if-exists', '--no-owner']);
                    let errOut = '';
                    proc.stderr.on('data', d => { errOut += d.toString(); console.warn(`pg_restore (docker): ${d}`); });
                    proc.on('error', err => reject(new common_1.InternalServerErrorException(`pg_restore e Docker não encontrados. Detalhe: ${err.message}`)));
                    proc.on('close', code => {
                        if (code === 0 || code === 1)
                            resolve();
                        else
                            reject(new common_1.InternalServerErrorException(`Falha na restauração via Docker (código ${code}): ${errOut.slice(-500)}`));
                    });
                    proc.stdin.write(fileBuffer);
                    proc.stdin.end();
                });
            }
        }
        finally {
            try {
                fs.unlinkSync(tmpFile);
            }
            catch { }
        }
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = __decorate([
    (0, common_1.Injectable)()
], BackupService);
//# sourceMappingURL=backup.service.js.map