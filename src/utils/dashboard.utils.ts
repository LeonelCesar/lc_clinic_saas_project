export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatDashboardDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isSameMonth(value: string, reference: Date): boolean {
  const date = new Date(`${value}T00:00:00`);

  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth()
  );
}

export function isFutureDate(value: string, reference: Date): boolean {
  const date = new Date(`${value}T00:00:00`);

  const normalizedReference = new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate(),
  );

  return date >= normalizedReference;
}
