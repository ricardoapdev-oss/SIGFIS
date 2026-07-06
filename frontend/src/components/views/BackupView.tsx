'use client';

import { useState, useRef } from 'react';
import { Database, Download, Upload, AlertTriangle, CheckCircle2, Loader2, Shield, X, Clock } from 'lucide-react';
import { getStoredToken, User } from '@/lib/api';

interface BackupViewProps { user: User; }

export function BackupView({ user }: BackupViewProps) {
  const [backupStatus, setBackupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'confirming' | 'loading' | 'success' | 'error'>('idle');
  const [backupError, setBackupError] = useState('');
  const [restoreError, setRestoreError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateBackup = async () => {
    setBackupStatus('loading');
    setBackupError('');
    try {
      const token = getStoredToken();
      const response = await fetch('/api/backup', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(err.message || `HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '-');
      const filename = `sigfis_backup_${dateStr}_${timeStr}.dump`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setLastBackupTime(now.toLocaleString('pt-BR'));
      setBackupStatus('success');
      setTimeout(() => setBackupStatus('idle'), 5000);
    } catch (e: any) {
      setBackupError(e.message || 'Falha ao gerar backup.');
      setBackupStatus('error');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setRestoreStatus('idle');
      setRestoreError('');
    }
  };

  const handleRestoreClick = () => {
    if (!selectedFile) return;
    setRestoreStatus('confirming');
  };

  const handleConfirmRestore = async () => {
    if (!selectedFile) return;
    setRestoreStatus('loading');
    setRestoreError('');
    try {
      const token = getStoredToken();
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/backup/restore', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(err.message || `HTTP ${response.status}`);
      }
      setRestoreStatus('success');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (e: any) {
      setRestoreError(e.message || 'Falha ao restaurar backup.');
      setRestoreStatus('error');
    }
  };

  const canUse = user.role === 'ADMIN' || user.role === 'GESTOR';

  if (!canUse) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <Shield className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-red-700">Acesso Restrito</p>
          <p className="text-xs text-red-600 mt-1">Apenas ADMIN e GESTOR podem acessar o backup do sistema.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Database className="h-4 w-4 text-gray-500" /> Backup do Sistema
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Geração e restauração do banco de dados completo do SIGFIS
        </p>
      </div>

      {/* Aviso de segurança */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Operação Crítica</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            O backup exporta todos os dados do sistema (contratos, processos, usuários, medições, etc.) para um arquivo seguro no formato <code className="bg-amber-100 px-1 rounded">.dump</code>.
            A restauração <strong>substitui permanentemente</strong> todos os dados atuais pelos dados do arquivo selecionado. Execute com cautela.
          </p>
        </div>
      </div>

      {/* ── GERAR BACKUP ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Download className="h-4 w-4 text-emerald-500" /> Gerar Backup
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Exporta o banco de dados completo para download. O arquivo gerado pode ser usado para restauração.
            </p>
          </div>
          {lastBackupTime && (
            <div className="text-right shrink-0">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Último backup</p>
              <p className="text-[10px] text-gray-600 font-medium flex items-center gap-1 justify-end">
                <Clock className="h-2.5 w-2.5" /> {lastBackupTime}
              </p>
            </div>
          )}
        </div>

        {backupStatus === 'success' && (
          <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">Backup gerado e download iniciado com sucesso!</p>
          </div>
        )}
        {backupStatus === 'error' && backupError && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">{backupError}</p>
          </div>
        )}

        <button
          onClick={handleGenerateBackup}
          disabled={backupStatus === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
        >
          {backupStatus === 'loading' ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Gerando backup...</>
          ) : (
            <><Download className="h-4 w-4" /> Gerar e Baixar Backup</>
          )}
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-3">
          Formato: PostgreSQL Custom Dump (.dump) · Compatível com pg_restore
        </p>
      </div>

      {/* ── RESTAURAR BACKUP ─────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-1">
          <Upload className="h-4 w-4 text-orange-500" /> Restaurar Backup
        </h3>
        <p className="text-xs text-gray-500 mb-5">
          Selecione um arquivo <code className="bg-gray-100 px-1 rounded text-gray-700">.dump</code> gerado pelo SIGFIS.
          Todos os dados atuais serão substituídos.
        </p>

        {/* Zona de upload */}
        <label className="block cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            accept=".dump,.sql,.backup"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${selectedFile ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
            {selectedFile ? (
              <div>
                <Database className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  type="button"
                  onClick={e => { e.preventDefault(); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; setRestoreStatus('idle'); }}
                  className="mt-2 text-[10px] text-red-500 hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                >
                  <X className="h-3 w-3" /> Remover arquivo
                </button>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600">Clique para selecionar o arquivo</p>
                <p className="text-xs text-gray-400 mt-1">Formatos aceitos: .dump</p>
              </div>
            )}
          </div>
        </label>

        {/* Status messages */}
        {restoreStatus === 'success' && (
          <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">Banco de dados restaurado com sucesso! Recarregue a página.</p>
          </div>
        )}
        {restoreStatus === 'error' && restoreError && (
          <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">{restoreError}</p>
          </div>
        )}

        {/* Modal de confirmação */}
        {restoreStatus === 'confirming' && (
          <div className="mt-4 bg-red-50 border border-red-300 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800">Confirmar Restauração</p>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  Você está prestes a <strong>substituir todos os dados atuais</strong> do SIGFIS
                  pelos dados do arquivo <strong>{selectedFile?.name}</strong>.
                  Esta operação <strong>não pode ser desfeita</strong>.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmRestore}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs cursor-pointer transition-colors"
              >
                Sim, restaurar agora
              </button>
              <button
                onClick={() => setRestoreStatus('idle')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-xs cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {selectedFile && restoreStatus === 'idle' && (
          <button
            onClick={handleRestoreClick}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <Upload className="h-4 w-4" /> Restaurar Banco de Dados
          </button>
        )}

        {restoreStatus === 'loading' && (
          <div className="mt-4 flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 rounded-xl py-4">
            <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
            <p className="text-sm font-semibold text-orange-700">Restaurando banco de dados...</p>
          </div>
        )}
      </div>

      {/* Info técnica */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Informações Técnicas</p>
        <div className="space-y-1 text-[10px] text-gray-500">
          <p>• O backup utiliza <strong>pg_dump</strong> com formato custom binário comprimido</p>
          <p>• A restauração utiliza <strong>pg_restore --clean</strong> para substituir os objetos existentes</p>
          <p>• O sistema detecta automaticamente o PostgreSQL instalado localmente ou via Docker</p>
          <p>• Após a restauração, recarregue a página para garantir dados atualizados</p>
        </div>
      </div>
    </div>
  );
}
