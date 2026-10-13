
import type {
  Appointment,
  AppointmentStatus,
} from "../types/appointment.type";

export const appointmentStatusLabels: Record<
  AppointmentStatus,
  string
> = {
  SCHEDULED: "Agendada",
  CONFIRMED: "Confirmada",
  IN_PROGRESS: "Em curso",
  COMPLETED: "Concluída",
  CANCELLED: "Cancelada",
  NO_SHOW: "Falta",
  RESCHEDULED: "Reagendada",
};

export const appointmentStatusClasses: Record<
  AppointmentStatus,
  string
> = {
  SCHEDULED: "bg-blue-50 text-blue-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-red-50 text-red-700",
  NO_SHOW: "bg-orange-50 text-orange-700",
  RESCHEDULED: "bg-violet-50 text-violet-700",
};

export const appointmentStatuses = Object.keys(
  appointmentStatusLabels,
) as AppointmentStatus[];

export function formatAppointmentDate(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) return date;

  return `${day}/${month}/${year}`;
}

export function getAppointmentTimestamp(
  appointment: Pick<Appointment, "date" | "startTime">,
) {
  return `${appointment.date}T${appointment.startTime}`;
}

export function getTodayLocal() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function normalizeAppointmentSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-PT")
    .trim();
}

export function isAppointmentActive(
  status: AppointmentStatus,
) {
  return !["CANCELLED", "NO_SHOW", "COMPLETED"].includes(
    status,
  );
}
