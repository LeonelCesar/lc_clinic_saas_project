import { Stethoscope } from "lucide-react";

interface DoctorsEmptyStateProps {
  onCreate: () => void;
}

export function DoctorsEmptyState({ onCreate }: DoctorsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <Stethoscope className="h-6 w-6 text-slate-500" />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Nenhum médico encontrado
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Não existem médicos que correspondam aos critérios selecionados.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Cadastrar médico
      </button>
    </div>
  );
}
