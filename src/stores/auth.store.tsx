import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import {
  authService,
  type PublicUser,
} from "../api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (
    credentials: LoginCredentials,
  ) => Promise<PublicUser>;
  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const initialSession = authService.getSession();

  const [user, setUser] = useState<PublicUser | null>(
    initialSession?.user ?? null,
  );

  const [isInitializing] = useState(false);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
    ): Promise<PublicUser> => {
      const session =
        await authService.login(credentials);

      setUser(session.user);

      return session.user;
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      logout,
    }),
    [isInitializing, login, logout, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider.",
    );
  }

  return context;
}