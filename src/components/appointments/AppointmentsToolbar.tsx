import { Search, SlidersHorizontal } from "lucide-react";
import type { AppointmentStatus } from "../../types/appointment.type";
import {
  appointmentStatuses,
  appointmentStatusLabels,
} from "../../utils/appointments.utils";

export type StatusFilter = AppointmentStatus | "ALL";

interface Props {
  search: string;
  status: StatusFilter;
  date: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onDateChange: (value: string) => void;
}

export default function AppointmentsToolbar({
  search,
  status,
  date,
  onSearchChange,
  onStatusChange,
  onDateChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          aria-label="Pesquisar marcações"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Pesquisar paciente, médico ou serviço..."
          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="relative">
        <SlidersHorizontal
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          aria-label="Filtrar por estado"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 lg:w-48"
        >
          <option value="ALL">Todos os estados</option>

          {appointmentStatuses.map((value) => (
            <option key={value} value={value}>
              {appointmentStatusLabels[value]}
            </option>
          ))}
        </select>
      </div>

      <input
        type="date"
        aria-label="Filtrar por data"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={() => {
          onSearchChange("");
          onStatusChange("ALL");
          onDateChange("");
        }}
        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        Limpar
      </button>
    </div>
  );
}
