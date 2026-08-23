export type MedicalServiceStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface MedicalService {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
  specialty: string;
  status: MedicalServiceStatus;
  createdAt: string;
  updatedAt: string;
}