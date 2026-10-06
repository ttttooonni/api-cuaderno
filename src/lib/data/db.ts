import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type {
  ActionRecord, Apiary, Colony, FeedingLog, LossRecord, MaterialAdjustment,
  PhotoRecord, ProductionRecord, Queen, Task, Treatment, VarroaCheck,
  VeterinaryTreatment,
} from './types';

export const DB_NAME = 'api-cuaderno';
export const DB_VERSION = 1;

export const STORES = {
  APIARIES: 'apiaries',
  COLONIES: 'colonies',
  QUEENS: 'queens',
  ACTIONS: 'actions',
  TASKS: 'tasks',
  TREATMENTS: 'treatments',
  PRODUCTION: 'production',
  LOSSES: 'losses',
  MATERIAL_ADJUSTMENTS: 'material_adjustments',
  VARROA_CHECKS: 'varroa_checks',
  VETERINARY_TREATMENTS: 'veterinary_treatments',
  FEEDING: 'feeding',
  PHOTOS: 'photos',
} as const;

interface ApiCuadernoDB extends DBSchema {
  apiaries: { key: string; value: Apiary };
  colonies: { key: string; value: Colony; indexes: { 'apiaryId-date': [string, string] } };
  queens: { key: string; value: Queen; indexes: { 'colonyId-date': [string, string] } };
  actions: { key: string; value: ActionRecord; indexes: { 'colonyId-date': [string, string] } };
  tasks: { key: string; value: Task; indexes: { 'colonyId-date': [string, string]; 'apiaryId-date': [string, string] } };
  treatments: { key: string; value: Treatment; indexes: { 'colonyId-date': [string, string] } };
  production: { key: string; value: ProductionRecord; indexes: { 'colonyId-date': [string, string]; 'apiaryId-date': [string, string] } };
  losses: { key: string; value: LossRecord; indexes: { 'colonyId-date': [string, string] } };
  material_adjustments: { key: string; value: MaterialAdjustment; indexes: { 'date': string } };
  varroa_checks: { key: string; value: VarroaCheck; indexes: { 'hiveId-date': [string, string] } };
  veterinary_treatments: { key: string; value: VeterinaryTreatment; indexes: { 'hiveId-startDate': [string, string] } };
  feeding: { key: string; value: FeedingLog; indexes: { 'hiveId-date': [string, string] } };
  photos: { key: string; value: PhotoRecord; indexes: { 'ownerId': string } };
}

export async function getDb(): Promise<IDBPDatabase<ApiCuadernoDB>> {
  return openDB<ApiCuadernoDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORES.APIARIES)) db.createObjectStore(STORES.APIARIES);
      if (!db.objectStoreNames.contains(STORES.COLONIES)) {
        const s = db.createObjectStore(STORES.COLONIES);
        s.createIndex('apiaryId-date', ['apiaryId', 'updatedAt']);
      }
      if (!db.objectStoreNames.contains(STORES.QUEENS)) {
        const s = db.createObjectStore(STORES.QUEENS);
        s.createIndex('colonyId-date', ['colonyId', 'introductionDate']);
      }
      if (!db.objectStoreNames.contains(STORES.ACTIONS)) {
        const s = db.createObjectStore(STORES.ACTIONS);
        s.createIndex('colonyId-date', ['colonyId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.TASKS)) {
        const s = db.createObjectStore(STORES.TASKS);
        s.createIndex('colonyId-date', ['colonyId', 'date']);
        s.createIndex('apiaryId-date', ['apiaryId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.TREATMENTS)) {
        const s = db.createObjectStore(STORES.TREATMENTS);
        s.createIndex('colonyId-date', ['colonyId', 'startDate']);
      }
      if (!db.objectStoreNames.contains(STORES.PRODUCTION)) {
        const s = db.createObjectStore(STORES.PRODUCTION);
        s.createIndex('colonyId-date', ['colonyId', 'date']);
        s.createIndex('apiaryId-date', ['apiaryId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.LOSSES)) {
        const s = db.createObjectStore(STORES.LOSSES);
        s.createIndex('colonyId-date', ['colonyId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.MATERIAL_ADJUSTMENTS)) {
        const s = db.createObjectStore(STORES.MATERIAL_ADJUSTMENTS);
        s.createIndex('date', 'date');
      }
      if (!db.objectStoreNames.contains(STORES.VARROA_CHECKS)) {
        const s = db.createObjectStore(STORES.VARROA_CHECKS);
        s.createIndex('hiveId-date', ['hiveId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.VETERINARY_TREATMENTS)) {
        const s = db.createObjectStore(STORES.VETERINARY_TREATMENTS);
        s.createIndex('hiveId-startDate', ['hiveId', 'startDate']);
      }
      if (!db.objectStoreNames.contains(STORES.FEEDING)) {
        const s = db.createObjectStore(STORES.FEEDING);
        s.createIndex('hiveId-date', ['hiveId', 'date']);
      }
      if (!db.objectStoreNames.contains(STORES.PHOTOS)) {
        const s = db.createObjectStore(STORES.PHOTOS);
        s.createIndex('ownerId', 'ownerId');
      }
    },
  });
}

export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  try {
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
