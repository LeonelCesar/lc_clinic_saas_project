import type { AppointmentStatusMetric } from "../../types/dashboard.types";

interface AppointmentStatusPanelProps {
  metrics: AppointmentStatusMetric[];
}

export function AppointmentStatusPanel({
  metrics,
}: AppointmentStatusPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-slate-900">Estado das marcações</h2>

      <p className="mt-1 text-sm text-slate-500">
        Distribuição das marcações deste mês.
      </p>

      <div className="mt-6 space-y-5">
        {metrics.length === 0 ? (
          <p className="text-sm text-slate-500">
            Ainda não existem dados este mês.
          </p>
        ) : (
          metrics.map((metric) => (
            <div key={metric.staus}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600">{metric.label}</span>

                <span className="font-medium text-slate-900">
                  {metric.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-700"
                  style={{
                    width: `${metric.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
