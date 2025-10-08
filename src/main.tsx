import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import TestAntdEffects from "./pages/test";
import UserLayout from "./pages/user/UserAppLayout";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthWrapper } from "./components/context/auth.context";

import AdminLayout from "./pages/admin/AdminAppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true, // ho tro hien thi thang con o trang /
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // {
      //   element: ,
      // },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "test",
    element: <TestAntdEffects />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>
);
