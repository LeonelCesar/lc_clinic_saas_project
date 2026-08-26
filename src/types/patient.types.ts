export type PatientGender =
  | "MALE"
  | "FEMALE"
  | "OTHER";

export type PatientStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface PatientAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Patient {
  emergencyContact: any;
  identificationNumber: ReactNode;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: PatientGender;
  taxNumber?: string;
  healthNumber?: string;
  status: PatientStatus;
  address?: PatientAddress;
  createdAt?: string;
  updatedAt?: string;
}