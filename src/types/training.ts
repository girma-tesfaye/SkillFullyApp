import { Content } from "./material";

export interface Training {
  id: string;
  title: string;
  description?: string;
  type: TrainingType;
  status: TrainingStatus;
  startDate: string;
  endDate?: string;
  deadline?: string;
  isRequired: boolean;
  isEnrolled: boolean;
  progress: number;
  materials: Material[];
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface TrainingAssignment {
  id: string;
  trainingId: string;
  status: AssignmentStatus;
  progress: number;
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  dueDate: string;
}

export enum TrainingStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum TrainingType {
  ONBOARDING = 'ONBOARDING',
  COMPLIANCE = 'COMPLIANCE',
  SKILL_DEVELOPMENT = 'SKILL_DEVELOPMENT',
  SAFETY = 'SAFETY',
  PRODUCT = 'PRODUCT',
  CUSTOM = 'CUSTOM'
}

export enum AssignmentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

export interface CreateTrainingInput {
  title: string;
  description?: string;
  type: TrainingType;
  startDate: string;
  endDate?: string;
  deadline?: string;
  isRequired: boolean;
  targetRoles?: string[];
  materials?: string;
  estimatedDuration: number;
} 


export interface Material {
  id: string;
  title: string;
  description?: string;
  duration: number
  contents: Content[]
}