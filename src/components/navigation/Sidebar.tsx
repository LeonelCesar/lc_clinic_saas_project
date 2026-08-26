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
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">
      {/* BRAND */}

      <div className="border-b border-slate-800/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950 shadow-sm">
            LC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-white">
              LC Appointments
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Gestão clínica
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
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
                        focus-visible:ring-offset-slate-950
                      `,

                      isActive
                        ? `
                          bg-white
                          text-slate-950
                          shadow-sm
                        `
                        : `
                          text-slate-400
                          hover:bg-slate-900
                          hover:text-white
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
                            ? "bg-slate-100 text-slate-950"
                            : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-white",
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
                              ? "text-slate-500"
                              : "text-slate-600 group-hover:text-slate-400",
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
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"
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

      <div className="border-t border-slate-800/80 p-4">
        <div className="rounded-xl bg-slate-900/70 px-3 py-3">
          <p className="text-xs font-medium text-slate-300">
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