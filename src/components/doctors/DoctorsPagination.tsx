import { ChevronLeft, ChevronRight } from "lucide-react";

interface DoctorsPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;

  onPageChange: (page: number) => void;
}

export function DoctorsPagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: DoctorsPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">{totalItems} resultado(s)</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="px-2 text-sm text-slate-600">
          Página {page} de {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
