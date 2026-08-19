export { authService } from "./auth/auth.service";
export { getDatabaseStats } from "./db/database";
export { resetDatabase } from "./db/reset-database";
export { seedDatabase } from "./db/seed";
export { appointmentsService } from "./services/appointment.service";
export { doctorsService } from "./services/doctors.services";
export { medicalServicesService } from "./services/medicalServices.service";
export { patientsService } from "./services/patients.services";
/* export { userService } from "./services/user.services"; */
export { ApiError, isApiError } from "./core/api-error";

export type {
  Appointment,
  AppointmentStatus,
} from "./types/appointements.types";

export type {
  Doctor,
  DoctorSchedule,
  DoctorStatus,
} from "./types/doctors.types";

export type {
  Patient,
  PatientAddress,
  PatientGender,
  PatientStatus,
} from "./types/patient.types";

export type {
  MedicalService,
  MedicalServiceStatus,
} from "./types/services.types";

export type {
  PublicUser,
  User,
  UserRole,
  UserStatus,
} from "./types/user.types";

export type { PaginatedResult, QueryOptions } from "./core/query.types";
