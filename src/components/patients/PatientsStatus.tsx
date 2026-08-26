import {
  UserCheck,
  UserRound,
  UserX,
} from "lucide-react";

interface PatientsStatsProps {
  total: number;
  active: number;
  inactive: number;
}

const cards = [
  {
    key: "total",
    label: "Total de pacientes",
    icon: UserRound,
  },

  {
    key: "active",
    label: "Pacientes ativos",
    icon: UserCheck,
  },

  {
    key: "inactive",
    label: "Pacientes inativos",
    icon: UserX,
  },
] as const;

export function PatientsStats({
  total,
  active,
  inactive,
}: PatientsStatsProps) {
  const values = {
    total,
    active,
    inactive,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(
        ({
          key,
          label,
          icon: Icon,
        }) => (
          <article
            key={key}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {label}
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {values[key]}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <Icon className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </article>
        ),
      )}
    </section>
  );
}