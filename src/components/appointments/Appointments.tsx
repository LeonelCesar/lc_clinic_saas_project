/* 
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  CheckCheck,
} from "lucide-react";

import type { Appointment } from "../../types/appointment.type";

interface Props {
  appointments: Appointment[];
}

export default function AppointmentsStats({
  appointments,
}: Props) {
  const stats = [
    {
      label: "Total de marcações",
      value: appointments.length,
      icon: CalendarDays,
    },
    {
      label: "Agendadas",
      value: appointments.filter(
        (item) => item.status === "SCHEDULED",
      ).length,
      icon: Clock3,
    },
    {
      label: "Confirmadas",
      value: appointments.filter(
        (item) => item.status === "CONFIRMED",
      ).length,
      icon: CheckCircle2,
    },
    {
      label: "Concluídas",
      value: appointments.filter(
        (item) => item.status === "COMPLETED",
      ).length,
      icon: CheckCheck,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Icon size={21} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
 */