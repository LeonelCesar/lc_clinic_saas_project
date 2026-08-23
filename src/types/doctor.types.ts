export type DoctorStatus = "ACTIVE" | "INACTIVE";

export interface DoctorSchedule {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialty: string;
  status: DoctorStatus;
  consultationPrice: number;
  schedule: DoctorSchedule[];
  createdAt: string;
  updatedAt: string;
}