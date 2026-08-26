import { AlertTriangle, CircleAlert, Info } from "lucide-react";
import type { DashboardAlert } from "../../types/dashboard.types";

interface DashboardAlertsProps {
  alerts: DashboardAlert[];
}

export function DashboardAlerts({ alerts }: DashboardAlertsProps) {
  if (alerts.length === 0) {
    return null;
  }

  function getIcon(severity: DashboardAlert["severity"]) {
    switch (severity) {
      case "CRITICAL":
        return CircleAlert;

      case "WARNING":
        return AlertTriangle;

      default:
        return Info;
    }
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-semibold text-slate-900">Atenção necessária</h2>

        <p className="mt-1 text-sm text-slate-500">
          Situações que podem exigir intervenção.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {alerts.map((alert) => {
          const Icon = getIcon(alert.severity);

          return (
            <article
              key={alert.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {alert.title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {alert.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
