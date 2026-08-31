import type { DoctorStatus } from "../../types/doctor.types";

interface DoctorStatusBadgeProps {
  status: DoctorStatus;
}

export function DoctorStatusBadge({ status }: DoctorStatusBadgeProps) {
  const isActive = status === "ACTIVE";

  return (
    <span
      className={[
        `
          inline-flex
          rounded-full
          px-2.5
          py-1
          text-xs
          font-semibold
        `,
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {isActive ? "Ativo" : "Inativo"}
    </span>
  );
}
