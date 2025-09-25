import React, { useContext, useEffect, useMemo } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { AuthContext } from "../context/auth.context";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }

  const { auth, setAuth } = context;

  console.log("auth", auth);
  // Khi auth thay đổi (ví dụ logout), redirect về home
  useEffect(() => {
    if (!auth.isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate, location.pathname]);

  type MenuItem = Required<MenuProps>["items"][number];

  // Tạo menu items dựa vào auth
  const items: MenuItem[] = useMemo(() => {
    return [
      {
        label: <Link to="/">HomePage</Link>,
        key: "/",
        icon: <MailOutlined />,
      },

      {
        label: `Welcome ${auth.user.username || "Guest"}`,
        key: "SubMenu",
        icon: <SettingOutlined />,
        children: auth.isAuthenticated
          ? [
              {
                key: "/logout",
                label: "Đăng xuất",
                onClick: () => {
                  localStorage.removeItem("access_token");
                  setAuth({
                    isAuthenticated: false,
                    user: { username: "", email: "", role: "" },
                  });
                },
              },
            ]
          : [
              {
                key: "/login",
                label: <Link to="/login">Đăng nhập</Link>,
              },
            ],
      },
    ];
  }, [auth, setAuth]);

  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" items={items} />
  );
};

export default Header;
