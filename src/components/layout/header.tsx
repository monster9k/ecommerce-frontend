import React, { useContext, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import TopBanner from "./user/TopBanner";
import MainNavbar from "./user/MainNavbar";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }

  const { auth } = context;

  console.log("auth", auth);
  // Khi auth thay đổi (ví dụ logout), redirect về home
  useEffect(() => {
    if (!auth.isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate, location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      {!auth.isAuthenticated && <TopBanner />}
      <MainNavbar />
    </div>
  );
};

export default Header;
