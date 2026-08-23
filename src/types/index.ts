export { authService } from "../api/auth/auth.service";
export { getDatabaseStats } from "../fake-api/database";
export { resetDatabase } from "../fake-api/reset-database";
export { seedDatabase } from "../fake-api/seed";
export { appointmentsService } from "../services/appointment.service";
export { doctorsService } from "../services/doctors.services";
export { medicalServicesService } from "../services/medicalServices.service";
export { patientsService } from "../services/patients.services";
/* export { userService } from "./services/user.services"; */
export { ApiError, isApiError } from "../api/core/api-error";

export type {
  Appointment,
  AppointmentStatus,
} from "./appointment.type";

export type {
  Doctor,
  DoctorSchedule,
  DoctorStatus,
} from "./doctor.types";

export type {
  Patient,
  PatientAddress,
  PatientGender,
  PatientStatus,
} from "./patient.types";

export type {
  MedicalService,
  MedicalServiceStatus,
} from "./services.types";

export type {
  User,
  UserRole,
  UserStatus,
} from "./user.types";

export type { PaginatedResult, QueryOptions } from "../api/core/query.types";
