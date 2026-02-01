
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./hooks/useAuth";
import App from "./App.tsx";
import "./index.css";
import { initGA } from "./utils/analytics";
import { initErrorReporter } from "./utils/errorReporter";

// Initialize production error reporting (before anything else)
initErrorReporter();

// Initialize Google Analytics
initGA();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
