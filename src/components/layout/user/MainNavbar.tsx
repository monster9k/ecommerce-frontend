import React, { useContext, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
  Search,
  ShoppingCart,
  UserCircle,
  Settings,
  ClipboardList,
  Home,
  LogIn,
} from "lucide-react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

const MainNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }

  const { auth, setAuth } = context;

  console.log("auth", auth);

  const handlers: Record<string, () => void> = {
    "/": () => navigate("/"),
    "/login": () => navigate("/login"),
    "/logout": () => {
      localStorage.removeItem("access_token");
      setAuth({
        isAuthenticated: false,
        user: { username: "", email: "", role: "" },
      });
      navigate("/");
    },
    profile: () => navigate("/profile"),
    orders: () => navigate("/orders"),
    settings: () => navigate("/settings"),
  };

  useEffect(() => {
    if (!auth.isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate, location.pathname]);

  const userMenuItems: MenuProps["items"] = useMemo(() => {
    // menu chung
    const base = [
      {
        key: "/",
        label: (
          <span className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Homepage
          </span>
        ),
      },
      { type: "divider" as const },
      {
        key: "profile",
        label: (
          <span className="flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            Profile
          </span>
        ),
      },
      {
        key: "orders",
        label: (
          <span className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Orders
          </span>
        ),
      },
      {
        key: "settings",
        label: (
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </span>
        ),
      },
      { type: "divider" as const },
    ];

    // phần thay đổi: login hoặc logout tùy auth.isAuthenticated (dùng ternary/spread)
    const authPart = auth.isAuthenticated
      ? [
          {
            key: "/logout",
            label: (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4 rotate-180" />
                Logout
              </span>
            ),
          },
        ]
      : [
          {
            key: "/login",
            label: (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </span>
            ),
          },
        ];

    return [...base, ...authPart];
  }, [auth.isAuthenticated]);

  const menuProps = {
    items: userMenuItems,
    onClick: ({ key }: { key: string }) => {
      // gọi handler tương ứng nếu có (không dùng if/else)
      handlers[key as string]?.();
    },
  };
  return (
    <nav className="w-full bg-white ">
      {/*container*/}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-black !text-3xl !font-extrabold tracking-wide"
            style={{ textDecoration: "none" }}
          >
            SHOP.DC
          </Link>
        </div>

        {/* Menu+Search */}
        <div className="flex-grow-0 flex items-center gap-6 ml-6  max-w-2xl w-full ">
          {/* Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm  text-gray-600 m-0">
            <Link
              to="/shop"
              className="hover:!text-black cursor-pointer font-medium !no-underline !text-gray-600"
            >
              Shop
            </Link>
            <li className="hover:text-black cursor-pointer font-medium">
              On Sale
            </li>
            <li className="hover:text-black cursor-pointer font-medium">
              New Arrivals
            </li>
            <li className="hover:text-black cursor-pointer font-medium">
              Brands
            </li>
          </ul>

          {/* Search */}
          <div className="flex items-center gap-4 flex-1 max-w-md bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-6 h-6 text-gray-400"></Search>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* RightIcon / user */}
        <div className="flex items-center gap-10">
          <Link to="/cart" className="text-black">
            <ShoppingCart />
          </Link>
          <Dropdown menu={menuProps} trigger={["click"]} placement="bottomLeft">
            <div className="flex items-center gap-2 cursor-pointer">
              <UserCircle className="w-6 h-6" />
              <span className="font-bold">
                Welcome {auth.user?.username || "Guest"} !
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
