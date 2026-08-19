import PageContainer from "../../components/PageContainer";

const metrics = [
  {
    label: "Marcações de hoje",
    value: "24",
  },
  {
    label: "Pacientes",
    value: "1 284",
  },
  {
    label: "Médicos ativos",
    value: "32",
  },
  {
    label: "Faturação mensal",
    value: "€18 420",
  },
];

export default function DashboardPage() {
  return (
    <PageContainer
      title="Dashboard"
      description="Visão geral da atividade da clínica."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
