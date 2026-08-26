import type { PatientStatus } from "../../types/patient.types";

interface PatientStatusBadgeProps {
  status: PatientStatus;
}

export function PatientStatusBadge({
  status,
}: PatientStatusBadgeProps) {
  const active =
    status === "ACTIVE";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${
          active
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        }
      `}
    >
      {active
        ? "Ativo"
        : "Inativo"}
    </span>
  );
}