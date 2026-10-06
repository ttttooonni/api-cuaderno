export type ColonyKind = 'hive' | 'nucleus';
export type TaskPriority = 'low' | 'normal' | 'high';
export type TaskStatus = 'pending' | 'done';
export type TreatmentStatus = 'pending' | 'applied' | 'completed';

export interface Apiary {
  id: string;
  name: string;
  location?: string;
  coordinates?: { latitude: number; longitude: number };
  description?: string;
  photoId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Colony {
  id: string;
  apiaryId: string;
  number: string;
  name?: string;
  kind: ColonyKind;
  state?: string;
  type?: string;
  location?: string;
  observations?: string;
  photoId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Queen {
  id: string;
  colonyId: string;
  identifier?: string;
  origin?: string;
  introductionDate?: string;
  raceOrEcotype?: string;
  status?: string;
  observations?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionRecord {
  id: string;
  colonyId: string;
  date: string;
  type: string;
  observations?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  date: string;
  priority: TaskPriority;
  status: TaskStatus;
  colonyId?: string;
  apiaryId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: string;
  colonyId: string;
  product: string;
  batch?: string;
  startDate: string;
  endDate?: string;
  dose: string;
  method?: string;
  withdrawalDays: number;
  noHarvestBefore?: string;
  observations?: string;
  status: TreatmentStatus;
  createdAt: string;
}

export interface ProductionRecord {
  id: string;
  colonyId: string;
  apiaryId: string;
  date: string;
  kg: number;
  batch?: string;
  season: number;
  observations?: string;
  createdAt: string;
}

export interface LossRecord {
  id: string;
  colonyId: string;
  date: string;
  reason: string;
  observations?: string;
  createdAt: string;
}

export interface MaterialInventory {
  normalFrames: number;
  halfSuperFrames: number;
  halfSupers: number;
  supers: number;
}

export interface MaterialAdjustment {
  id: string;
  date: string;
  previous: MaterialInventory;
  next: MaterialInventory;
  reason: string;
  createdAt: string;
}

export interface VarroaCheck {
  id: string;
  hiveId: string;
  date: string;
  method: 'azucar_glas' | 'alcohol' | 'caida_natural';
  sampleSizeBees?: number;
  mitesCount: number;
  infestationRate: number;
}

export interface VeterinaryTreatment {
  id: string;
  hiveId: string;
  startDate: string;
  endDate?: string;
  productName: string;
  activeSubstance: string;
  batchNumber: string;
  dosage: string;
  prescriptionRequired: boolean;
  withdrawalDays: number;
}

export interface FeedingLog {
  id: string;
  hiveId: string;
  date: string;
  type: 'jarabe_1_1' | 'jarabe_2_1' | 'torta_proteica' | 'azucar_fondant';
  quantityKgOrL: number;
}

export interface PhotoRecord {
  id: string;
  ownerType: 'apiary' | 'colony' | 'inspection' | 'note';
  ownerId: string;
  blob: Blob;
  mimeType: string;
  createdAt: string;
}

export interface AppData {
  schemaVersion: number;
  apiaries: Apiary[];
  colonies: Colony[];
  queens: Queen[];
  actions: ActionRecord[];
  tasks: Task[];
  treatments: Treatment[];
  production: ProductionRecord[];
  losses: LossRecord[];
  materialInventory: MaterialInventory;
  materialAdjustments: MaterialAdjustment[];
  varroaChecks: VarroaCheck[];
  veterinaryTreatments: VeterinaryTreatment[];
  feedingLogs: FeedingLog[];
  photos: PhotoRecord[];
}
