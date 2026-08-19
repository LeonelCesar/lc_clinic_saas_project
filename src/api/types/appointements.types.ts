import type { BaseEntity } from "../core/entity.types";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Appointment extends BaseEntity {
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason: string;
  observations?: string;
}