import { useRoutes } from "react-router";
import { WelcomeRoutes } from "@features/Welcome/routes";
import { LoginRoutes } from "@features/Login/routes";
import { registerRoutes } from "@features/Register/routes";
import { HomeRoutes } from "@features/Home/routes";
import { EmergenciaRoutes } from "@features/Emergencia/routes";
import PetShopRoutes from "@features/PetShop/routes";
import CitaRoutes from "@features/Cita/routes";
import { equipoRoutes } from "@features/Equipo/routes";
import { gpsRoutes } from "@features/GPS/routes";
import { HistorialClinicoRoutes } from "@features/HistorialClinico/routes";

export const appRoutes = [...WelcomeRoutes, ...LoginRoutes, ...registerRoutes, ...HomeRoutes, ...EmergenciaRoutes, ...PetShopRoutes, ...CitaRoutes, ...equipoRoutes, ...gpsRoutes, HistorialClinicoRoutes];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
