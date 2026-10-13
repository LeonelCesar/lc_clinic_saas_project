
import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";

import type { Appointment } from "../../types/appointment.type";
import type { Patient } from "../../types/patient.types";
import type { Doctor } from "../../types/doctor.types";
import type { MedicalService } from "../../types/services.types";

import { getTodayLocal } from "../../utils/appointments.utils";

export interface AppointmentFormValues {
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface Props {
  appointment: Appointment | null;
  patients: Patient[];
  doctors: Doctor[];
  services: MedicalService[];
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (values: AppointmentFormValues) => void;
}

function getInitialValues(
  appointment: Appointment | null,
): AppointmentFormValues {
  return {
    patientId: appointment?.patientId ?? "",
    doctorId: appointment?.doctorId ?? "",
    serviceId: appointment?.serviceId ?? "",
    date: appointment?.date ?? getTodayLocal(),
    startTime: appointment?.startTime ?? "09:00",
    endTime: appointment?.endTime ?? "09:30",
    reason: appointment?.reason ?? "",
  };
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function AppointmentFormModal({
  appointment,
  patients,
  doctors,
  services,
  saving,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<AppointmentFormValues>(
    () => getInitialValues(appointment),
  );

  useEffect(() => {
    setValues(getInitialValues(appointment));
  }, [appointment]);

  function updateField<K extends keyof AppointmentFormValues>(
    field: K,
    value: AppointmentFormValues[K],
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.startTime >= values.endTime) return;

    onSubmit(values);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2
              id="appointment-form-title"
              className="text-lg font-semibold text-slate-900"
            >
              {appointment
                ? "Editar marcação"
                : "Nova marcação"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preencha os dados da consulta.
            </p>
          </div>

          <button
            type="button"
            aria-label="Fechar formulário"
            disabled={saving}
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Paciente *
              <select
                required
                value={values.patientId}
                onChange={(event) =>
                  updateField("patientId", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Selecionar paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Médico *
              <select
                required
                value={values.doctorId}
                onChange={(event) =>
                  updateField("doctorId", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Selecionar médico</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Serviço *
              <select
                required
                value={values.serviceId}
                onChange={(event) =>
                  updateField("serviceId", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Selecionar serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Data da consulta *
              <input
                required
                type="date"
                value={values.date}
                onChange={(event) =>
                  updateField("date", event.target.value)
                }
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Hora inicial *
              <input
                required
                type="time"
                value={values.startTime}
                onChange={(event) =>
                  updateField("startTime", event.target.value)
                }
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Hora final *
              <input
                required
                type="time"
                value={values.endTime}
                min={values.startTime}
                onChange={(event) =>
                  updateField("endTime", event.target.value)
                }
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Motivo da consulta
              <textarea
                rows={3}
                value={values.reason}
                onChange={(event) =>
                  updateField("reason", event.target.value)
                }
                placeholder="Descrição opcional..."
                className={inputClass}
              />
            </label>
          </div>

          {values.startTime >= values.endTime && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              A hora final deve ser posterior à inicial.
            </p>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                values.startTime >= values.endTime
              }
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "A guardar..."
                : appointment
                  ? "Guardar alterações"
                  : "Criar marcação"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
