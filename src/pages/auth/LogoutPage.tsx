import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { paths } from "../../app/router/Paths";
import { useAuth } from "../../stores/auth.store";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    async function handleLogout(): Promise<void> {
      await logout();

      navigate(paths.auth.login, {
        replace: true,
      });
    }

    void handleLogout();
  }, [logout, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <p className="text-sm text-slate-500">
        A terminar sessão...
      </p>
    </main>
  );
}