import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            LC Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sistema de gestão de marcações
          </p>
        </header>

        <Outlet />
      </section>
    </main>
  );
}