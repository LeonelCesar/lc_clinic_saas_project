import { databaseCollections } from "../config";
import { ApiError } from "../core/api-error";
import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../core/entity.types";

import { readCollection } from "../core/local-storage";
import type { PaginatedResult, QueryOptions } from "../core/query.types";
import { LocalStorageRepository } from "../core/repository";
import type { Appointment } from "../types/appointements.types";
import type { Doctor } from "../types/doctors.types";
import type { Patient } from "../types/patient.types";
import type { MedicalService } from "../types/services.types";
const appointmentsRepository = new LocalStorageRepository<Appointment>(
  databaseCollections.appointments,
);

function validateRelationships(
  input: CreateEntityInput<Appointment> | UpdateEntityInput<Appointment>,
): void {
  if (input.patientId) {
    const patients = readCollection<Patient>(databaseCollections.patients);

    const patientExists = patients.some(
      (patient) => patient.id === input.patientId,
    );

    if (!patientExists) {
      throw new ApiError({
        code: "VALIDATION_ERROR",
        status: 400,
        message: "O paciente informado não existe.",
      });
    }
  }

  if (input.doctorId) {
    const doctors = readCollection<Doctor>(databaseCollections.doctors);

    const doctorExists = doctors.some((doctor) => doctor.id === input.doctorId);

    if (!doctorExists) {
      throw new ApiError({
        code: "VALIDATION_ERROR",
        status: 400,
        message: "O médico informado não existe.",
      });
    }
  }

  if (input.serviceId) {
    const services = readCollection<MedicalService>(
      databaseCollections.medicalServices,
    );

    const serviceExists = services.some(
      (service) => service.id === input.serviceId,
    );

    if (!serviceExists) {
      throw new ApiError({
        code: "VALIDATION_ERROR",
        status: 400,
        message: "O serviço informado não existe.",
      });
    }
  }
}

function validateAppointmentTime(
  input: CreateEntityInput<Appointment> | UpdateEntityInput<Appointment>,
): void {
  if (input.startTime && input.endTime && input.startTime >= input.endTime) {
    throw new ApiError({
      code: "VALIDATION_ERROR",
      status: 400,
      message: "A hora final deve ser posterior à hora inicial.",
    });
  }
}

function validateDoctorAvailability(
  input: CreateEntityInput<Appointment>,
): void {
  const appointments = readCollection<Appointment>(
    databaseCollections.appointments,
  );

  const conflictingAppointment = appointments.find((appointment) => {
    const sameDoctor = appointment.doctorId === input.doctorId;

    const sameDate = appointment.date === input.date;

    const activeAppointment = appointment.status !== "CANCELLED";

    const hasTimeConflict =
      input.startTime < appointment.endTime &&
      input.endTime > appointment.startTime;

    return sameDoctor && sameDate && activeAppointment && hasTimeConflict;
  });

  if (conflictingAppointment) {
    throw new ApiError({
      code: "VALIDATION_ERROR",
      status: 409,
      message: "O médico já possui uma marcação nesse horário.",
      details: {
        conflictingAppointmentId: conflictingAppointment.id,
      },
    });
  }
}

export const appointmentsService = {
  getAll(
    options?: QueryOptions<Appointment>,
  ): Promise<PaginatedResult<Appointment>> {
    return appointmentsRepository.getAll(options);
  },

  getById(id: string): Promise<Appointment> {
    return appointmentsRepository.getById(id);
  },

  async create(input: CreateEntityInput<Appointment>): Promise<Appointment> {
    validateRelationships(input);
    validateAppointmentTime(input);
    validateDoctorAvailability(input);

    return appointmentsRepository.create(input);
  },

  async update(
    id: string,
    input: UpdateEntityInput<Appointment>,
  ): Promise<Appointment> {
    validateRelationships(input);
    validateAppointmentTime(input);

    return appointmentsRepository.update(id, input);
  },

  remove(id: string): Promise<void> {
    return appointmentsRepository.remove(id);
  },

  count(): Promise<number> {
    return appointmentsRepository.count();
  },
};
