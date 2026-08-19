import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";
import AuthLayout from "../../layout/AuthLayout";

import AppointmentsPage from "../../pages/appointments/AppointementsPage";
import LoginPage from "../../pages/auth/LoginPage";
import LogoutPage from "../../pages/auth/LogoutPage";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import DoctorsPage from "../../pages/doctors/DoctoresPage";
import ForbiddenPage from "../../pages/errors/ForbiddenPage";
import NotFoundPage from "../../pages/errors/NotFoundPage";
import PatientsPage from "../../pages/patients/PatientsPage";
import SettingsPage from "../../pages/settings/SettingsPage";

import { GuestRoute } from "./GuestRoute";
import { paths } from "./Paths";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      {/* Redirecionamento inicial */}
      <Route
        path={paths.root}
        element={<Navigate to={paths.app.dashboard} replace />}
      />

      {/* Rotas exclusivas para visitantes */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={paths.auth.login} element={<LoginPage />} />
        </Route>
      </Route>

      {/* Rota responsável por terminar sessão */}
      <Route path={paths.auth.logout} element={<LogoutPage />} />

      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={paths.app.dashboard} element={<DashboardPage />} />
          <Route path={paths.app.appointments} element={<AppointmentsPage />} />
          <Route path={paths.app.patients} element={<PatientsPage />} />
          <Route path={paths.app.doctors} element={<DoctorsPage />} />
          <Route path={paths.app.settings} element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Erros */}
      <Route path={paths.errors.forbidden} element={<ForbiddenPage />} />
      <Route path={paths.errors.notFound} element={<NotFoundPage />} />
    </Routes>
  );
}
