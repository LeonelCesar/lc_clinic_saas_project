import type { BaseEntity } from "../core/entity.types";

export type DoctorStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ON_LEAVE";

export interface DoctorSchedule {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
}

export interface Doctor extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialty: string;
  status: DoctorStatus;
  consultationPrice: number;
  schedule: DoctorSchedule[];
  avatarUrl?: string;
}