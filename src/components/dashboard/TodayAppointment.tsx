import type { DashboardAppointment } from "../../types/dashboard.types";

interface TodayAppointmentsProps {
  appointments: DashboardAppointment[];
}

const statusLabels = {
  SCHEDULED: "Agendada",
  CONFIRMED: "Confirmada",
  IN_PROGRESS: "Em consulta",
  COMPLETED: "Concluída",
  CANCELLED: "Cancelada",
  NO_SHOW: "Faltou",
  RESCHEDULED: "Reagendada",
};

export function TodayAppointments({
  appointments,
}: TodayAppointmentsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="font-semibold text-slate-900">
          Agenda de hoje
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Consultas programadas para hoje.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-slate-500">
            Não existem consultas agendadas para hoje.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {appointments.map(
            (appointment) => (
              <article
                key={appointment.id}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <div className="min-w-14">
                    <p className="font-semibold text-slate-900">
                      {appointment.startTime}
                    </p>

                    <p className="text-xs text-slate-400">
                      {appointment.endTime}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      {appointment.patientName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {appointment.serviceName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {appointment.doctorName}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {
                    statusLabels[
                      appointment.status
                    ]
                  }
                </span>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}