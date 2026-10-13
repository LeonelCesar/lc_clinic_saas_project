import { databaseCollections } from "../types/config";
import { ApiError } from "../api/core/api-error";

import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../api/core/entity.types";

import { readCollection } from "../api/core/local-storage";
import type { PaginatedResult, QueryOptions } from "../api/core/query.types";
import { LocalStorageRepository } from "../api/core/repository";
import type { Appointment, AppointmentStatus } from "../types/appointment.type";
import type { Doctor } from "../types/doctor.types";
import type { Patient } from "../types/patient.types";
import type { MedicalService } from "../types/services.types";

const repository = new LocalStorageRepository<Appointment>(
  databaseCollections.appointments,
);

function validationError(message: string): never {
  throw new ApiError({
    code: "VALIDATION_ERROR",
    status: 400,
    message,
  });
}

const statusTransitions: Record<AppointmentStatus, AppointmentStatus[]> = {
  SCHEDULED: ["CONFIRMED", "CANCELLED", "NO_SHOW", "RESCHEDULED"],
  CONFIRMED: ["IN_PROGRESS", "CANCELLED", "NO_SHOW", "RESCHEDULED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
  RESCHEDULED: ["CONFIRMED", "CANCELLED", "NO_SHOW"],
};

function validateRelationships(
  appointment: Pick<Appointment, "patientId" | "doctorId" | "serviceId">,
) {
  const patients = readCollection<Patient>(databaseCollections.patients);
  const doctors = readCollection<Doctor>(databaseCollections.doctors);
  const services = readCollection<MedicalService>(
    databaseCollections.medicalServices,
  );

  if (!patients.some((p) => p.id === appointment.patientId)) {
    validationError("O paciente selecionado não existe.");
  }

  if (!doctors.some((d) => d.id === appointment.doctorId)) {
    validationError("O médico selecionado não existe.");
  }

  if (!services.some((s) => s.id === appointment.serviceId)) {
    validationError("O serviço selecionado não existe.");
  }
}

function validateAppointment(
  appointment: Pick<
    Appointment,
    | "patientId"
    | "doctorId"
    | "serviceId"
    | "date"
    | "startTime"
    | "endTime"
    | "status"
  >,
  excludeId?: string,
) {
  validateRelationships(appointment);

  if (!appointment.date || !/^\d{4}-\d{2}-\d{2}$/.test(appointment.date)) {
    validationError("Indica uma data válida.");
  }

  const parsedDate = new Date(`${appointment.date}T00:00:00`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getFullYear() !== Number(appointment.date.slice(0, 4)) ||
    parsedDate.getMonth() + 1 !== Number(appointment.date.slice(5, 7)) ||
    parsedDate.getDate() !== Number(appointment.date.slice(8, 10))
  ) {
    validationError("A data da marcação é inválida.");
  }

  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (
    !timePattern.test(appointment.startTime) ||
    !timePattern.test(appointment.endTime)
  ) {
    validationError("O horário deve estar no formato HH:mm.");
  }

  if (appointment.startTime >= appointment.endTime) {
    validationError("A hora final deve ser posterior à hora inicial.");
  }

  if (!["CANCELLED", "NO_SHOW", "COMPLETED"].includes(appointment.status)) {
    const appointments = readCollection<Appointment>(
      databaseCollections.appointments,
    );

    const conflict = appointments.find((existing) => {
      if (existing.id === excludeId) return false;

      if (
        existing.doctorId !== appointment.doctorId ||
        existing.date !== appointment.date
      ) {
        return false;
      }

      if (["CANCELLED", "NO_SHOW", "COMPLETED"].includes(existing.status)) {
        return false;
      }

      return (
        appointment.startTime < existing.endTime &&
        appointment.endTime > existing.startTime
      );
    });

    if (conflict) {
      throw new ApiError({
        code: "VALIDATION_ERROR",
        status: 409,
        message: "O médico já possui uma marcação neste horário.",
        details: {
          conflictingAppointmentId: conflict.id,
        },
      });
    }
  }
}

export const appointmentsService = {
  getAll(
    options?: QueryOptions<Appointment>,
  ): Promise<PaginatedResult<Appointment>> {
    return repository.getAll(options);
  },

  getById(id: string): Promise<Appointment> {
    return repository.getById(id);
  },

  async create(input: CreateEntityInput<Appointment>): Promise<Appointment> {
    validateAppointment(input);

    return repository.create(input);
  },

  async update(
    id: string,
    input: UpdateEntityInput<Appointment>,
  ): Promise<Appointment> {
    const existing = await repository.getById(id);

    const next: Appointment = {
      ...existing,
      ...input,
      id: existing.id,
    };

    if (
      input.status !== undefined &&
      input.status !== existing.status &&
      !statusTransitions[existing.status].includes(input.status)
    ) {
      validationError(
        `Não é possível mudar o estado de ${existing.status} para ${input.status}.`,
      );
    }

    if (["COMPLETED", "CANCELLED", "NO_SHOW"].includes(existing.status)) {
      validationError("Não é possível alterar uma marcação finalizada.");
    }

    validateAppointment(next, id);

    return repository.update(id, input);
  },

  remove(id: string): Promise<void> {
    return repository.remove(id);
  },

  count(): Promise<number> {
    return repository.count();
  },
};
