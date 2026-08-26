import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  paths,
} from "../../app/router/Paths";

import type {
  PublicUser,
} from "../../types/user.types";

interface AppHeaderProps {
  user: PublicUser | null;
  notificationsCount?: number;
}

export function AppHeader({
  user,
  notificationsCount = 0,
}: AppHeaderProps) {
  const navigate = useNavigate();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ): void {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  function handleLogout(): void {
    setMenuOpen(false);

    navigate(
      paths.auth.logout,
    );
  }

  function handleProfile(): void {
    setMenuOpen(false);

    navigate("/profile");
  }

  function handleSettings(): void {
    setMenuOpen(false);

    navigate(
      paths.app.settings,
    );
  }

  const initials =
    getInitials(user?.name);

  const roleLabel =
    getRoleLabel(user?.role);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-4
        backdrop-blur
        sm:px-6
      "
    >
      {/* LEFT */}

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {getGreeting()}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900">
            {user?.name ?? "Utilizador"}
          </h1>

          {user?.role && (
            <span
              className="
                hidden
                rounded-full
                bg-slate-100
                px-2.5
                py-1
                text-xs
                font-medium
                text-slate-600
                sm:inline-flex
              "
            >
              {roleLabel}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-1 sm:gap-2">
        {/* SEARCH */}

        <button
          type="button"
          aria-label="Pesquisar"
          title="Pesquisar"
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-400
            sm:flex
          "
        >
          <Search
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          aria-label={
            notificationsCount > 0
              ? `${notificationsCount} notificações`
              : "Notificações"
          }
          title="Notificações"
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-400
          "
        >
          <Bell
            className="h-5 w-5"
            aria-hidden="true"
          />

          {notificationsCount > 0 && (
            <span
              className="
                absolute
                right-1
                top-1
                flex
                min-h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-bold
                leading-none
                text-white
              "
            >
              {notificationsCount > 9
                ? "9+"
                : notificationsCount}
            </span>
          )}
        </button>

        {/* DIVIDER */}

        <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

        {/* USER MENU */}

        <div
          ref={menuRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current,
              )
            }
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              p-1.5
              pr-2
              transition
              hover:bg-slate-50
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-400
            "
          >
            {/* AVATAR */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-slate-900
                text-xs
                font-bold
                text-white
                shadow-sm
              "
            >
              {initials}
            </div>

            {/* USER INFO */}

            <div className="hidden max-w-44 text-left lg:block">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name ??
                  "Utilizador"}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {user?.email ??
                  roleLabel}
              </p>
            </div>

            <ChevronDown
              aria-hidden="true"
              className={[
                "hidden h-4 w-4 text-slate-400 transition-transform lg:block",

                menuOpen
                  ? "rotate-180"
                  : "",
              ].join(" ")}
            />
          </button>

          {/* DROPDOWN */}

          {menuOpen && (
            <div
              role="menu"
              className="
                absolute
                right-0
                top-[calc(100%+10px)]
                w-72
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
              "
            >
              {/* USER SUMMARY */}

              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-900
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {user?.name ??
                        "Utilizador"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {user?.email ??
                        "Sem email"}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-slate-600
                  "
                >
                  {roleLabel}
                </span>
              </div>

              {/* NAVIGATION */}

              <div className="p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={
                    handleProfile
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    hover:text-slate-900
                  "
                >
                  <UserRound
                    className="h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-medium">
                      Meu perfil
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Informação da conta
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={
                    handleSettings
                  }
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    hover:text-slate-900
                  "
                >
                  <Settings
                    className="h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-medium">
                      Definições
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Preferências da aplicação
                    </p>
                  </div>
                </button>
              </div>

              {/* LOGOUT */}

              <div className="border-t border-slate-100 p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={
                    handleLogout
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                  "
                >
                  <LogOut
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  <div>
                    <p>
                      Terminar sessão
                    </p>

                    <p className="mt-0.5 text-xs font-normal text-red-400">
                      Sair da aplicação
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/*
 * -------------------------------------------
 * HELPERS
 * -------------------------------------------
 */

function getInitials(
  name?: string,
): string {
  if (!name?.trim()) {
    return "U";
  }

  const names =
    name
      .trim()
      .split(/\s+/);

  if (names.length === 1) {
    return names[0]
      .slice(0, 2)
      .toUpperCase();
  }

  const first =
    names[0][0];

  const last =
    names[names.length - 1][0];

  return `${first}${last}`.toUpperCase();
}

function getGreeting(): string {
  const hour =
    new Date().getHours();

  if (hour < 12) {
    return "Bom dia";
  }

  if (hour < 19) {
    return "Boa tarde";
  }

  return "Boa noite";
}

function getRoleLabel(
  role?: string,
): string {
  switch (role) {
    case "ADMIN":
      return "Administrador";

    case "DOCTOR":
      return "Médico";

    case "PATIENT":
      return "Paciente";

    default:
      return "Utilizador";
  }
}