import type { RouteObject } from "react-router";
import FullLayout from "@/core/layouts/FullLayout";
import WelcomeView from "./views/WelcomeView";
export const WelcomeRoutes: RouteObject[] = [
  {
    path: "/welcome",
    Component: FullLayout,
    children: [
      {
        path: "",
        Component: WelcomeView,
      },
    ],
  },
];
