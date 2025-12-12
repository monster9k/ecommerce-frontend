import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RegisterPage from "./pages/register";
import HomePage from "./pages/user/home";
import LoginPage from "./pages/login";
import TestAntdEffects from "./pages/test";
import UserLayout from "./pages/user/UserAppLayout";
import Dashboard from "./components/Dashboard/DashBoard";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { App as AntdApp } from "antd";
import { AuthWrapper } from "./components/context/auth.context";

import AdminLayout from "./pages/admin/AdminAppLayout";
import UserListPage from "./pages/admin/Users/UserListPage";
import InventoryPage from "./pages/admin/InventoryPage";
import ProductListPage from "./pages/admin/Products/ProductListPage";
import OrderListPage from "./pages/admin/Orders/OrderListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true, // ho tro hien thi thang con o trang /
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "all-users", element: <UserListPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "orders", element: <OrderListPage /> },
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
    <AntdApp>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </AntdApp>
  </StrictMode>
);
