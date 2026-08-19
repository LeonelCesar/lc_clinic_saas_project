import type { BaseEntity } from "../core/entity.types";

export type PatientGender =
  | "MALE"
  | "FEMALE"
  | "OTHER"
  | "NOT_INFORMED";

export type PatientStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface PatientAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Patient extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: PatientGender;
  taxNumber?: string;
  healthNumber?: string;
  status: PatientStatus;
  address?: PatientAddress;
  notes?: string;
}