export function formatDoctorPrice(
  value: number,
): string {
  return new Intl.NumberFormat(
    "pt-PT",
    {
      style: "currency",
      currency: "EUR",
    },
  ).format(value);
}

export function getScheduleDaysCount(
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[],
): number {
  return new Set(
    schedule.map(
      (item) =>
        item.dayOfWeek,
    ),
  ).size;
}

export function normalizeDoctorSearch(
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

export function getWeekDayLabel(
  day: number,
): string {
  const labels: Record<
    number,
    string
  > = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
  };

  return labels[day] ??
    "Dia desconhecido";
}