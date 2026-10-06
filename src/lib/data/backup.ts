import type { AppData } from './types';

export interface BackupEnvelope {
  format: 'api-cuaderno-backup';
  formatVersion: 1;
  exportedAt: string;
  schemaVersion: number;
  data: AppData;
}

export function createBackup(data: AppData): BackupEnvelope {
  return {
    format: 'api-cuaderno-backup',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    schemaVersion: data.schemaVersion,
    data,
  };
}

export function validateBackup(value: unknown): value is BackupEnvelope {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<BackupEnvelope>;
  return item.format === 'api-cuaderno-backup'
    && item.formatVersion === 1
    && typeof item.schemaVersion === 'number'
    && !!item.data
    && typeof item.data === 'object';
}

export function downloadBackup(backup: BackupEnvelope): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `api-cuaderno-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
