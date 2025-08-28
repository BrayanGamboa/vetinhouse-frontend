import { useRoutes } from "react-router";
import { WelcomeRoutes } from "@features/Welcome/routes";
import { LoginRoutes } from "@features/Login/routes";
import { HomeRoutes } from "@features/Home/routes";
import { EmergenciaRoutes } from "@features/Emergencia/routes";

export const appRoutes = [...WelcomeRoutes, ...LoginRoutes, ...HomeRoutes, ...EmergenciaRoutes];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
