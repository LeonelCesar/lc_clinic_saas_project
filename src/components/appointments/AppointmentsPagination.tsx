
interface Props {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AppointmentsPagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: Props) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize),
  );

  const firstItem =
    totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const lastItem = Math.min(
    page * pageSize,
    totalItems,
  );

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        A mostrar {firstItem}–{lastItem} de{" "}
        {totalItems} marcações
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:opacity-40"
        >
          Anterior
        </button>

        <span className="text-xs text-slate-600">
          {page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:opacity-40"
        >
          Seguinte
        </button>
      </div>
    </div>
  );
}
