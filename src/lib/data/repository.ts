import { getDb, STORES } from './db';
import { validateFeedingLog, validateTreatment, validateVarroaCheck, validateVeterinaryTreatment } from './validation';
import type { FeedingLog, Treatment, VarroaCheck, VeterinaryTreatment } from './types';

export async function addVarroaCheck(entry: VarroaCheck): Promise<void> {
  const validation = validateVarroaCheck(entry);
  if (!validation.success) throw new Error(`Datos de Varroa inválidos: ${validation.errors.join(', ')}`);
  const db = await getDb();
  await db.put(STORES.VARROA_CHECKS, entry);
}

export async function addVeterinaryTreatment(entry: VeterinaryTreatment): Promise<void> {
  const validation = validateVeterinaryTreatment(entry);
  if (!validation.success) throw new Error(`Tratamiento veterinario inválido: ${validation.errors.join(', ')}`);
  const db = await getDb();
  await db.put(STORES.VETERINARY_TREATMENTS, entry);
}

export async function addTreatment(entry: Treatment): Promise<void> {
  const validation = validateTreatment(entry);
  if (!validation.success) throw new Error(`Tratamiento inválido: ${validation.errors.join(', ')}`);
  const db = await getDb();
  await db.put(STORES.TREATMENTS, entry);
}

export async function addFeedingLog(entry: FeedingLog): Promise<void> {
  const validation = validateFeedingLog(entry);
  if (!validation.success) throw new Error(`Alimentación inválida: ${validation.errors.join(', ')}`);
  const db = await getDb();
  await db.put(STORES.FEEDING, entry);
}
