import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router";
import "@/core/assets/css/App.css";
import "@/core/assets/css/register-animations.css";
import "@/core/assets/css/panel-animations.css";
import "@/core/assets/css/notifications.css";
import { AppRouter } from "./router";
import { BrowserRouter } from "react-router";
import { NotificationProvider } from "@/core/components/NotificationContext";
import NotificationContainer from "@/core/components/NotificationContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AppRouter />
        <NotificationContainer />
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
