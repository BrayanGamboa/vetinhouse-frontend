import type { RouteObject } from "react-router";
import LoginView from "./views/LoginView";

export const LoginRoutes: RouteObject[] = [
  {
    path: "/",
    Component: LoginView,
  },
  {
    path: "/login",
    Component: LoginView,
  },
];