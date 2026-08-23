import type {
  Patient,
  PatientGender,
  PatientStatus,
} from "../types/patient.types";

export type PatientSortField =
  | "name"
  | "age"
  | "lastConsultation"
  | "createdAt";

export type SortDirection =
  | "asc"
  | "desc";

export interface PatientTableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: PatientGender;
  lastConsultation: string | null;
  status: PatientStatus;
  patient: Patient;
}

export interface PatientFormValues {
  name: string;
birthDate: string;
  gender: PatientGender;
  email: string;
  phone: string;
  identificationNumber: string;

  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}