import { Readable } from 'stream';
export declare class BackupService {
    private parseDbUrl;
    private findBinary;
    createBackupStream(): Promise<Readable>;
    restoreBackup(fileBuffer: Buffer): Promise<void>;
}
