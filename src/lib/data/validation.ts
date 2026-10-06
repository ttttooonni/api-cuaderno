import type { FeedingLog, Treatment, VarroaCheck, VeterinaryTreatment } from './types';

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

const validDate = (value: string) => !Number.isNaN(Date.parse(value));

export function validateVarroaCheck(entry: VarroaCheck): ValidationResult {
  const errors: string[] = [];
  if (!entry.id) errors.push('id es obligatorio');
  if (!entry.hiveId) errors.push('hiveId es obligatorio');
  if (!validDate(entry.date)) errors.push('fecha inválida');
  if (!['azucar_glas', 'alcohol', 'caida_natural'].includes(entry.method)) errors.push('método inválido');
  if (entry.sampleSizeBees !== undefined && entry.sampleSizeBees <= 0) errors.push('sampleSizeBees debe ser mayor que 0');
  if (entry.mitesCount < 0) errors.push('mitesCount no puede ser negativo');
  if (entry.infestationRate < 0) errors.push('infestationRate no puede ser negativo');
  return { success: errors.length === 0, errors };
}

export function validateVeterinaryTreatment(entry: VeterinaryTreatment): ValidationResult {
  const errors: string[] = [];
  if (!entry.id || !entry.hiveId) errors.push('id y hiveId son obligatorios');
  if (!validDate(entry.startDate)) errors.push('startDate inválida');
  if (entry.endDate && (!validDate(entry.endDate) || entry.endDate < entry.startDate)) errors.push('endDate inválida');
  if (entry.withdrawalDays < 0) errors.push('withdrawalDays no puede ser negativo');
  return { success: errors.length === 0, errors };
}

export function validateTreatment(entry: Treatment): ValidationResult {
  const errors: string[] = [];
  if (!entry.id || !entry.colonyId) errors.push('id y colonyId son obligatorios');
  if (!validDate(entry.startDate)) errors.push('startDate inválida');
  if (entry.endDate && (!validDate(entry.endDate) || entry.endDate < entry.startDate)) errors.push('endDate inválida');
  if (entry.withdrawalDays < 0) errors.push('withdrawalDays no puede ser negativo');
  return { success: errors.length === 0, errors };
}

export function validateFeedingLog(entry: FeedingLog): ValidationResult {
  const errors: string[] = [];
  if (!entry.id || !entry.hiveId) errors.push('id y hiveId son obligatorios');
  if (!validDate(entry.date)) errors.push('fecha inválida');
  if (entry.quantityKgOrL < 0) errors.push('quantityKgOrL no puede ser negativo');
  return { success: errors.length === 0, errors };
}
