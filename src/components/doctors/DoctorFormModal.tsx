import { X } from "lucide-react";
import type { Doctor } from "../../types/doctor.types";
import type { DoctorFormValues } from "../../types/doctor-dashboard-type";

import { DoctorForm } from "./DoctorForm";

interface DoctorFormModalProps {
  open: boolean;
  doctor?: Doctor;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: DoctorFormValues) => Promise<void>;
}

export function DoctorFormModal({
  open,
  doctor,
  isSubmitting,
  onClose,
  onSubmit,
}: DoctorFormModalProps) {
  if (!open) {
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
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {doctor ? "Editar médico" : "Cadastrar médico"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Informação profissional e disponibilidade clínica.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="p-6">
          <DoctorForm
            doctor={doctor}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </section>
    </div>
  );
}
