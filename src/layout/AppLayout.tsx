import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import { useAuth } from "../stores/auth.store";

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div>
            <p className="text-sm text-slate-500">Bem-vindo</p>

            <p className="font-semibold text-slate-900">{user?.name}</p>
          </div>

          <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {user?.role}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
