
import {
  Eye,
  Pencil,
  Trash2,
 } from "lucide-react";

import type {
  Appointment,
  AppointmentStatus,
} from "../../types/appointment.type";

import {
  appointmentStatusClasses,
  appointmentStatusLabels,
  formatAppointmentDate,
} from "../../utils/appointments.utils";

export interface AppointmentRow {
  appointment: Appointment;
  patientName: string;
  doctorName: string;
  serviceName: string;
}

interface Props {
  rows: AppointmentRow[];
  busy: boolean;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onStatusChange: (
    appointment: Appointment,
    status: AppointmentStatus,
  ) => void;
}

const nextActions: Partial<
  Record<
    AppointmentStatus,
    { status: AppointmentStatus; label: string }[]
  >
> = {
  SCHEDULED: [
    { status: "CONFIRMED", label: "Confirmar" },
    { status: "CANCELLED", label: "Cancelar" },
    { status: "NO_SHOW", label: "Registar falta" },
  ],
  CONFIRMED: [
    { status: "IN_PROGRESS", label: "Iniciar" },
    { status: "CANCELLED", label: "Cancelar" },
    { status: "NO_SHOW", label: "Registar falta" },
  ],
  IN_PROGRESS: [
    { status: "COMPLETED", label: "Concluir" },
    { status: "CANCELLED", label: "Cancelar" },
  ],
  RESCHEDULED: [
    { status: "CONFIRMED", label: "Confirmar" },
    { status: "CANCELLED", label: "Cancelar" },
    { status: "NO_SHOW", label: "Registar falta" },
  ],
};

export default function AppointmentsTable({
  rows,
  busy,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  if (rows.length === 0) {
    return (
      <div className="px-5 py-16 text-center">
        <p className="font-semibold text-slate-800">
          Nenhuma marcação encontrada
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Altera os filtros ou cria uma nova marcação.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {[
              "Paciente",
              "Médico",
              "Serviço",
              "Data / Hora",
              "Estado",
              "Ações",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="whitespace-nowrap px-5 py-4 font-semibold"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map(
            ({
              appointment,
              patientName,
              doctorName,
              serviceName,
            }) => {
              const actions =
                nextActions[appointment.status] ?? [];

              const finalStatus = [
                "COMPLETED",
                "CANCELLED",
                "NO_SHOW",
              ].includes(appointment.status);

              return (
                <tr
                  key={appointment.id}
                  className="hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {patientName}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {doctorName}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {serviceName}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {formatAppointmentDate(
                        appointment.date,
                      )}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {appointment.startTime} –{" "}
                      {appointment.endTime}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        appointmentStatusClasses[
                          appointment.status
                        ]
                      }`}
                    >
                      {
                        appointmentStatusLabels[
                          appointment.status
                        ]
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Ver detalhes"
                        aria-label={`Ver marcação de ${patientName}`}
                        onClick={() => onView(appointment)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        title="Editar"
                        aria-label={`Editar marcação de ${patientName}`}
                        disabled={busy || finalStatus}
                        onClick={() => onEdit(appointment)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        title="Eliminar"
                        aria-label={`Eliminar marcação de ${patientName}`}
                        disabled={busy}
                        onClick={() => onDelete(appointment)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      >
                        <Trash2 size={17} />
                      </button>

                      {actions.length > 0 && (
                        <select
                          aria-label={`Alterar estado da marcação de ${patientName}`}
                          disabled={busy}
                          value=""
                          onChange={(event) => {
                            const status = event.target
                              .value as AppointmentStatus;

                            if (status) {
                              onStatusChange(
                                appointment,
                                status,
                              );
                            }
                          }}
                          className="max-w-28 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-600 disabled:opacity-40"
                        >
                          <option value="">
                            Estado...
                          </option>

                          {actions.map((action) => (
                            <option
                              key={action.status}
                              value={action.status}
                            >
                              {action.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
