import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { paths } from "../../app/router/Paths";
import { useAuth } from "../../stores/auth.store";

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@clinic.pt");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationState = location.state as LocationState | null;

  const redirectPath = locationState?.from ?? paths.app.dashboard;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      await login({
        email,
        password,
      });

      navigate(redirectPath, {
        replace: true,
      });
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível iniciar sessão.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Palavra-passe
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "A entrar..." : "Entrar"}
      </button>

      <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
        <p>Email: admin@clinic.pt</p>
        <p>Palavra-passe: 123456</p>
      </div>
    </form>
  );
}
