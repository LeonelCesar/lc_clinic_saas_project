import { CalendarDays } from "lucide-react";
import type { DashboardAppointment } from "../../types/dashboard.types";
import { formatDate } from "../../utils/dashboard.utils";

interface UpcomingAppointmentsProps {
  appointments: DashboardAppointment[];
}

export function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="font-semibold text-slate-900">
          Próximas marcações
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Próximas consultas da clínica.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-slate-500">
          Nenhuma marcação futura encontrada.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {appointments.map(
            (appointment) => (
              <article
                key={appointment.id}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div className="rounded-xl bg-slate-100 p-2.5">
                  <CalendarDays className="h-4 w-4 text-slate-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {appointment.patientName}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {appointment.doctorName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">
                    {formatDate(
                      appointment.date,
                    )}
                  </p>

                  <p className="text-xs text-slate-400">
                    {appointment.startTime}
                  </p>
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}