import { Link } from "react-router-dom";

import { paths } from "../../app/router/Paths";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="text-center">
        <p className="text-7xl font-bold text-amber-500">
          403
        </p>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Acesso não autorizado
        </h1>

        <p className="mt-2 text-slate-500">
          Não tens permissão para visualizar esta
          página.
        </p>

        <Link
          to={paths.app.dashboard}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Voltar ao dashboard
        </Link>
      </section>
    </main>
  );
}