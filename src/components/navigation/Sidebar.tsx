import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { paths } from "../../app/router/Paths";

interface NavigationItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: paths.app.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Marcações",
    path: paths.app.appointments,
    icon: CalendarDays,
  },
  {
    label: "Pacientes",
    path: paths.app.patients,
    icon: Users,
  },
  {
    label: "Médicos",
    path: paths.app.doctors,
    icon: Stethoscope,
  },
  {
    label: "Definições",
    path: paths.app.settings,
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <p className="text-lg font-bold">
          LC Appointments
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Administração
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <NavLink
          to={paths.auth.logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut className="h-5 w-5" />
          Terminar sessão
        </NavLink>
      </div>
    </aside>
  );
}