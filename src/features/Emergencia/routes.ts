import type { RouteObject } from "react-router";
import EmergenciaView from "./views/EmergenciaView";

export const EmergenciaRoutes: RouteObject[] = [
  {
    path: "/emergencia",
    Component: EmergenciaView,
  },
];