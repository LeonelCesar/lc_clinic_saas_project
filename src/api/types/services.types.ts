import type { BaseEntity } from "../core/entity.types";

export type MedicalServiceStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface MedicalService extends BaseEntity {
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
  specialty: string;
  status: MedicalServiceStatus;
}