export type PatientGender = "MALE" | "FEMALE" | "OTHER";

export type PatientStatus = "ACTIVE" | "INACTIVE";

export interface PatientAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: PatientGender;
  taxNumber?: string;
  healthNumber?: string;
  identificationNumber?: string;
  address?: PatientAddress;
  emergencyContact?: EmergencyContact;
  status: PatientStatus;
  createdAt: string;
  updatedAt: string;
}
