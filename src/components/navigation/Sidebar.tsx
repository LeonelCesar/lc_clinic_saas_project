
import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  paths,
} from "../../app/router/Paths";

interface NavigationItem {
  label: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    description: "Visão geral",
    path: paths.app.dashboard,
    icon: LayoutDashboard,
  },

  {
    label: "Marcações",
    description: "Agenda clínica",
    path: paths.app.appointments,
    icon: CalendarDays,
  },

  {
    label: "Pacientes",
    description: "Gestão de pacientes",
    path: paths.app.patients,
    icon: Users,
  },

  {
    label: "Médicos",
    description: "Equipa médica",
    path: paths.app.doctors,
    icon: Stethoscope,
  },

  {
    label: "Definições",
    description: "Configurações",
    path: paths.app.settings,
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white text-slate-900">
      {/* BRAND */}

      <div className="border-b border-slate-200/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-sm">
            LC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-900">
              LC Appointments
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Gestão clínica
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Principal
        </p>

        <nav
          aria-label="Navegação principal"
          className="space-y-1"
        >
          {navigationItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    [
                      `
                        group
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        transition
                        duration-150
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-slate-500
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-white
                      `,

                      isActive
                        ? `
                          bg-slate-900
                          text-white
                          shadow-sm
                        `
                        : `
                          text-slate-600
                          hover:bg-slate-100
                          hover:text-slate-950
                        `,
                    ].join(" ")
                  }
                >
                  {({
                    isActive,
                  }) => (
                    <>
                      <div
                        className={[
                          `
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            transition
                          `,

                          isActive
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900",
                        ].join(
                          " ",
                        )}
                      >
                        <Icon
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {
                            item.label
                          }
                        </p>

                        <p
                          className={[
                            "mt-0.5 truncate text-[11px]",

                            isActive
                              ? "text-slate-300"
                              : "text-slate-400 group-hover:text-slate-500",
                          ].join(
                            " ",
                          )}
                        >
                          {
                            item.description
                          }
                        </p>
                      </div>

                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            },
          )}
        </nav>
      </div>

      {/* FOOTER */}

      <div className="border-t border-slate-200/80 p-4">
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <p className="text-xs font-medium text-slate-700">
            Clinic SaaS
          </p>

          <p className="mt-1 text-[11px] leading-4 text-slate-500">
            Sistema de gestão clínica
          </p>
        </div>
      </div>
    </aside>
  );
}
