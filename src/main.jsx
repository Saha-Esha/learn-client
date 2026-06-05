import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { routes } from "./Route/Route.jsx";
import { AuthProvider } from "./Provider/AuthContext.jsx.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (typeof global === "undefined") {
  window.global = window;
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
