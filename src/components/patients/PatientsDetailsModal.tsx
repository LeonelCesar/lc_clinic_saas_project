import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldPlus,
  UserRound,
  X,
} from "lucide-react";

import type { Patient } from "../../types/patient.types";

import { calculateAge } from "../../utils/patient.utils";

interface PatientDetailsModalProps {
  open: boolean;
  patient?: Patient;
  onClose: () => void;
}

export function PatientDetailsModal({
  open,
  patient,
  onClose,
}: PatientDetailsModalProps) {
  if (!open || !patient) {
    return null;
  }

  const age = calculateAge(
    patient.birthDate,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-details-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Perfil do paciente
            </p>

            <h2
              id="patient-details-title"
              className="mt-1 text-xl font-semibold text-slate-900"
            >
              {patient.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do paciente"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-8 p-6">
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Informação pessoal
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                icon={UserRound}
                label="Nome completo"
                value={patient.name}
              />

              <DetailItem
                icon={CalendarDays}
                label="Data de nascimento"
                value={formatDate(
                  patient.birthDate,
                )}
              />

              <DetailItem
                icon={UserRound}
                label="Idade"
                value={`${age} anos`}
              />

              <DetailItem
                icon={UserRound}
                label="Género"
                value={formatGender(
                  patient.gender,
                )}
              />

              <DetailItem
                icon={ShieldPlus}
                label="Estado"
                value={
                  patient.status === "ACTIVE"
                    ? "Ativo"
                    : "Inativo"
                }
              />

              <DetailItem
                icon={ShieldPlus}
                label="Identificação"
                value={
                  patient.identificationNumber ??
                  patient.healthNumber ??
                  patient.taxNumber ??
                  "Não informado"
                }
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Contactos
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                icon={Mail}
                label="Email"
                value={
                  patient.email ||
                  "Não informado"
                }
              />

              <DetailItem
                icon={Phone}
                label="Telefone"
                value={
                  patient.phone ||
                  "Não informado"
                }
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Morada
            </h3>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex gap-3">
                <div className="rounded-xl bg-white p-2.5 shadow-sm">
                  <MapPin className="h-5 w-5 text-slate-600" />
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    {patient.address?.street ||
                      "Morada não informada"}
                  </p>

                  {patient.address && (
                    <p className="mt-1 text-sm text-slate-500">
                      {[
                        patient.address.postalCode,
                        patient.address.city,
                        patient.address.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Contacto de emergência
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              <DetailItem
                icon={UserRound}
                label="Nome"
                value={
                  patient.emergencyContact
                    ?.name ??
                  "Não informado"
                }
              />

              <DetailItem
                icon={Phone}
                label="Telefone"
                value={
                  patient.emergencyContact
                    ?.phone ??
                  "Não informado"
                }
              />

              <DetailItem
                icon={ShieldPlus}
                label="Relação"
                value={
                  patient.emergencyContact
                    ?.relationship ??
                  "Não informado"
                }
              />
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

function DetailItem({
  icon: Icon,
  label,
  value,
}: DetailItemProps) {
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

function formatDate(
  date: string,
): string {
  return new Intl.DateTimeFormat(
    "pt-PT",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(`${date}T00:00:00`),
  );
}

function formatGender(
  gender: Patient["gender"],
): string {
  switch (gender) {
    case "MALE":
      return "Masculino";

    case "FEMALE":
      return "Feminino";

    default:
      return "Outro";
  }
}