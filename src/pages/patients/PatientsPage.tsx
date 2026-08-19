import { useState } from "react";

import PageContainer from "../../components/PageContainer";
import { usePatients } from "../../hooks/patients/usePatients";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const patientsQuery = usePatients({
    search,
    searchFields: [
      "name",
      "email",
      "phone",
      "taxNumber",
    ],
    sortBy: "createdAt",
    sortDirection: "desc",
    page,
    pageSize: 5,
  });

  return (
    <PageContainer
      title="Pacientes"
      description="Gestão dos pacientes registados."
    >
      <div className="mb-5">
        <label
          htmlFor="patient-search"
          className="sr-only"
        >
          Pesquisar pacientes
        </label>

        <input
          id="patient-search"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Pesquisar por nome, email ou telefone..."
          className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {patientsQuery.isPending ? (
          <div className="p-6 text-slate-500">
            A carregar pacientes...
          </div>
        ) : null}

        {patientsQuery.isError ? (
          <div className="p-6 text-red-600">
            Não foi possível carregar os pacientes.
          </div>
        ) : null}

        {patientsQuery.data ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Paciente
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Telefone
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      Estado
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {patientsQuery.data.data.map(
                    (patient) => (
                      <tr key={patient.id}>
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-900">
                            {patient.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {patient.email}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {patient.phone}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            <footer className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <p className="text-sm text-slate-500">
                Página{" "}
                {
                  patientsQuery.data.pagination
                    .page
                }{" "}
                de{" "}
                {
                  patientsQuery.data.pagination
                    .totalPages
                }
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={
                    !patientsQuery.data.pagination
                      .hasPreviousPage
                  }
                  onClick={() =>
                    setPage((currentPage) =>
                      Math.max(1, currentPage - 1),
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
                >
                  Anterior
                </button>

                <button
                  type="button"
                  disabled={
                    !patientsQuery.data.pagination
                      .hasNextPage
                  }
                  onClick={() =>
                    setPage(
                      (currentPage) =>
                        currentPage + 1,
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
                >
                  Seguinte
                </button>
              </div>
            </footer>
          </>
        ) : null}
      </div>
    </PageContainer>
  );
}