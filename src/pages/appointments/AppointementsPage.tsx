import PageContainer from "../../components/PageContainer";

export default function AppointmentsPage() {
  return (
    <PageContainer
      title="Marcações"
      description="Consulte e administre todas as marcações."
      action={
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Nova marcação
        </button>
      }
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          A tabela de marcações será apresentada
          aqui.
        </p>
      </div>
    </PageContainer>
  );
}