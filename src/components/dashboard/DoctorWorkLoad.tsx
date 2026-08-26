import type { DoctorWorkloadItem } from "../../types/dashboard.types";

interface DoctorWorkloadProps {
  doctors: DoctorWorkloadItem[];
}

export function DoctorWorkload({ doctors }: DoctorWorkloadProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="font-semibold text-slate-900">Atividade médica</h2>

        <p className="mt-1 text-sm text-slate-500">
          Carga atual por profissional.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {doctors.map((doctor) => (
          <article
            key={doctor.doctorId}
            className="flex items-center justify-between gap-4 px-6 py-4"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {doctor.doctorName}
              </p>

              <p className="text-xs text-slate-500">{doctor.specialty}</p>
            </div>

            <div className="flex gap-6 text-right">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {doctor.appointmentsToday}
                </p>

                <p className="text-xs text-slate-400">Hoje</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {doctor.appointmentsThisMonth}
                </p>

                <p className="text-xs text-slate-400">Mês</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
