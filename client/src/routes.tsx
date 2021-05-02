import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import NormalLayout from "./layouts/NormalLayout";
import AboutView from "./views/AboutView";
import AuthView from "./views/AuthView";
import NotFoundView from "./views/NotFoundView";
import QueryDataView from "./views/QueryDataView";
import SettingsView from "./views/SettingsView";

const routes = (isLoggedIn: boolean) => [
  {
    path: "app",
    // element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/auth" />,
    element: <DashboardLayout />,
    children: [
      { path: ":slug", element: <QueryDataView /> },
      { path: "About", element: <AboutView /> },
    ],
  },
  {
    path: "/",
    element: <NormalLayout />,
    children: [
      { path: "Setting", element: <SettingsView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/fred" /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/auth", element: <AuthView /> },
    ],
  },
  // {
  //   path: "/",
  //   element: !isLoggedIn ? <NormalLayout /> : <Navigate to="/app/fred" />,
  //   children: [

  //   ],
  // },
];

export default routes;
