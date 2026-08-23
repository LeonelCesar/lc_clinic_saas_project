import PageContainer from "../../components/PageContainer";

export default function DoctorsPage() {
  return (
    <PageContainer
      title="Médicos, Leonel Helder"
      description="Gestão dos médicos e respetivas especialidades."
      action={
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Adicionar médico
        </button>
      }
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          A lista de médicos será apresentada
          aqui.
        </p>
      </div>
    </PageContainer>
  );
}