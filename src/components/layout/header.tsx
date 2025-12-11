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
    <div>
      {!auth.isAuthenticated && <TopBanner />}
      <MainNavbar />
    </div>
  );
};

export default Header;
