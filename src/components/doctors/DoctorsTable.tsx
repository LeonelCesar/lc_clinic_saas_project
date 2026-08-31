import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";

import type {
  DoctorTableRow,
  DoctorSortField,
} from "../../types/doctor-dashboard-type";

import { formatDoctorPrice } from "../../utils/doctor.utils";
import { DoctorStatusBadge } from "../../components/doctors/DoctorsStatusBadge";

interface DoctorsTableProps {
  doctors: DoctorTableRow[];
  onView: (doctor: DoctorTableRow) => void;
  onEdit: (doctor: DoctorTableRow) => void;
  onDelete: (doctor: DoctorTableRow) => void;
  onSort: (field: DoctorSortField) => void;
}

export function DoctorsTable({
  doctors,
  onView,
  onEdit,
  onDelete,
  onSort,
}: DoctorsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <SortableHeader label="Médico" onClick={() => onSort("name")} />

            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contacto
            </th>

            <SortableHeader
              label="Especialidade"
              onClick={() => onSort("specialty")}
            />

            <SortableHeader
              label="Consulta"
              onClick={() => onSort("consultationPrice")}
            />

            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Agenda
            </th>

            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Estado
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="transition hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">
                  {doctor.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {doctor.licenseNumber}
                </p>
              </td>

              <td className="px-5 py-4">
                <p className="text-sm text-slate-700">{doctor.email}</p>

                <p className="mt-1 text-xs text-slate-500">{doctor.phone}</p>
              </td>

              <td className="px-5 py-4 text-sm font-medium text-slate-700">
                {doctor.specialty}
              </td>

              <td className="px-5 py-4 text-sm text-slate-700">
                {formatDoctorPrice(doctor.consultationPrice)}
              </td>

              <td className="px-5 py-4 text-sm text-slate-700">
                {doctor.scheduleDays} dia(s)
              </td>

              <td className="px-5 py-4">
                <DoctorStatusBadge status={doctor.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onView(doctor)}
                    title="Ver médico"
                    aria-label={`Ver ${doctor.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(doctor)}
                    title="Editar médico"
                    aria-label={`Editar ${doctor.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(doctor)}
                    title="Eliminar médico"
                    aria-label={`Eliminar ${doctor.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SortableHeaderProps {
  label: string;
  onClick: () => void;
}

function SortableHeader({ label, onClick }: SortableHeaderProps) {
  return (
    <th className="px-5 py-4 text-left">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900"
      >
        {label}

        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    </th>
  );
}
