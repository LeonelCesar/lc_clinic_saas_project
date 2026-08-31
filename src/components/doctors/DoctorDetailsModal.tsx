import {
  BadgeEuro,
  CalendarDays,
  Mail,
  Phone,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";

import type { Doctor } from "../../types/doctor.types";

import { formatDoctorPrice, getWeekDayLabel } from "../../utils/doctor.utils";

interface DoctorDetailsModalProps {
  open: boolean;
  doctor?: Doctor;
  onClose: () => void;
}

export function DoctorDetailsModal({
  open,
  doctor,
  onClose,
}: DoctorDetailsModalProps) {
  if (!open || !doctor) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Perfil profissional
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {doctor.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">{doctor.specialty}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-8 p-6">
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Informação profissional
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                icon={Stethoscope}
                label="Especialidade"
                value={doctor.specialty}
              />

              <DetailItem
                icon={ShieldCheck}
                label="Cédula profissional"
                value={doctor.licenseNumber}
              />

              <DetailItem
                icon={BadgeEuro}
                label="Preço da consulta"
                value={formatDoctorPrice(doctor.consultationPrice)}
              />

              <DetailItem
                icon={ShieldCheck}
                label="Estado"
                value={doctor.status === "ACTIVE" ? "Ativo" : "Inativo"}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Contactos
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem icon={Mail} label="Email" value={doctor.email} />

              <DetailItem icon={Phone} label="Telefone" value={doctor.phone} />
            </div>
          </section>

          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Horário semanal
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Disponibilidade configurada para consultas.
              </p>
            </div>

            <div className="space-y-3">
              {doctor.schedule.map((schedule, index) => (
                <div
                  key={`${schedule.dayOfWeek}-${schedule.startTime}-${index}`}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <CalendarDays className="h-4 w-4 text-slate-600" />
                    </div>

                    <p className="text-sm font-medium text-slate-900">
                      {getWeekDayLabel(schedule.dayOfWeek)}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600">
                    {schedule.startTime} — {schedule.endTime}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Fechar
          </button>
        </footer>
      </section>
    </div>
  );
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex gap-3">
        <div className="rounded-lg bg-slate-100 p-2">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 wrap-break-word text-sm font-medium text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
