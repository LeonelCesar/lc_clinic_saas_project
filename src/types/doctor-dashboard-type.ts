import type { Doctor } from "../types/doctor.types";

export type DoctorSortDirection = "asc" | "desc";
export type DoctorSortField = "name" | "specialty" | "consultationPrice";

export interface DoctorTableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialty: string;
  status: Doctor["status"];
  consultationPrice: number;
  scheduleDays: number;
  doctor: Doctor;
}

export type DoctorFormValues = Pick<
  Doctor,
  | "name"
  | "email"
  | "phone"
  | "licenseNumber"
  | "specialty"
  | "consultationPrice"
  | "status"
  | "schedule"
>;
