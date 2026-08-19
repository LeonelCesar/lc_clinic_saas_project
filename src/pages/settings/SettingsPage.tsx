import PageContainer from "../../components/PageContainer";

export default function SettingsPage() {
  return (
    <PageContainer
      title="Definições"
      description="Configure as preferências da aplicação."
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">
          Preferências gerais
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Aqui poderás configurar idioma, tema,
          notificações e dados da clínica.
        </p>
      </div>
    </PageContainer>
  );
}