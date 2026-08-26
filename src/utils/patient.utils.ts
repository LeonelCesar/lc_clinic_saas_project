import type { Appointment } from "../types/appointment.type";

export function calculateAge(
  birthDate: string,
): number {
  const birth = new Date(
    `${birthDate}T00:00:00`,
  );

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age -= 1;
  }

  return age;
}

export function formatPatientDate(
  date: string | null,
): string {
  if (!date) {
    return "Sem consultas";
  }

  return new Intl.DateTimeFormat(
    "pt-PT",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(`${date}T00:00:00`),
  );
}

export function getLastConsultation(
  patientId: string,
  appointments: Appointment[],
): string | null {
  const completed =
    appointments
      .filter(
        (appointment) =>
          appointment.patientId === patientId &&
          appointment.status === "COMPLETED",
      )
      .sort(
        (a, b) =>
          b.date.localeCompare(a.date),
      );

  return completed[0]?.date ?? null;
}

export function normalizeSearch(
  value: string,
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .toLowerCase()
    .trim();
}