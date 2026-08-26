import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import { useAuth } from "../stores/auth.store";

import { AppHeader } from "../components/Header/AppHeader";

export default function AppLayout() {
  const { user } = useAuth();

  function logout(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader user={user} notificationsCount={2} onLogout={logout} />
    
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
