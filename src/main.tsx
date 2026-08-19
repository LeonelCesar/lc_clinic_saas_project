import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { queryClient } from "./providers/query-client";
import { seedDatabase } from "./api";
import { AuthProvider } from "./stores/auth.store";

import "./index.css";

seedDatabase();

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Elemento com id "root" não encontrado.',
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);