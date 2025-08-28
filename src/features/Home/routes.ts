import type { RouteObject } from "react-router";
import HomeView from "./views/HomeView";
import PaseadorView from "./views/PaseadorView";

export const HomeRoutes: RouteObject[] = [
  {
    path: "/home",
    Component: HomeView,
  },
  {
    path: "/paseador",
    Component: PaseadorView,
  },
];