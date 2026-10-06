import type { DBSchema, IDBPDatabase } from 'idb';
import { DB_NAME, DB_VERSION } from './db';

export const CURRENT_SCHEMA_VERSION = 3;

export async function ensureSchema(db: IDBPDatabase<DBSchema>): Promise<void> {
  // Structural migrations are performed by IndexedDB's versioned upgrade transaction.
  // Existing records are never replaced or cleared.
  if (db.version !== DB_VERSION) {
    throw new Error('Versión de base de datos inesperada.');
  }
}
