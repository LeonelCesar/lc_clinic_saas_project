import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";
import AuthLayout from "../../layout/AuthLayout";

import { GuestRoute } from "./GuestRoute";
import { paths } from "./Paths";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * LAZY LOADING
 *
 * Cada página será carregada apenas quando
 * o utilizador aceder à respetiva rota.
 */

const AppointmentsPage = lazy(
  () => import("../../pages/appointments/AppointementsPage"),
);

const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const LogoutPage = lazy(() => import("../../pages/auth/LogoutPage"));
const DashboardPage = lazy(() => import("../../pages/dashboard/DashboardPage"));
const DoctorsPage = lazy(() => import("../../pages/doctors/DoctoresPage"));
const ForbiddenPage = lazy(() => import("../../pages/errors/ForbiddenPage"));
const NotFoundPage = lazy(() => import("../../pages/errors/NotFoundPage"));
const PatientsPage = lazy(() => import("../../pages/patients/PatientsPage"));
const SettingsPage = lazy(() => import("../../pages/settings/SettingsPage"));

/**
 * LOADING FALLBACK
 *
 * Apresentado enquanto o JavaScript
 * da página está a ser carregado.
 */
function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-64 items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          aria-hidden="true"
          className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
        />

        <p className="text-sm font-medium text-slate-500">
          A carregar página...
        </p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
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

            <Route
              path={paths.app.appointments}
              element={<AppointmentsPage />}
            />

            <Route path={paths.app.patients} element={<PatientsPage />} />
            <Route path={paths.app.doctors} element={<DoctorsPage />} />
            <Route path={paths.app.settings} element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Erros */}
        <Route path={paths.errors.forbidden} element={<ForbiddenPage />} />
        <Route path={paths.errors.notFound} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
