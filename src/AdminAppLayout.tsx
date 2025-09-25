import axios from "./utils/axios.custiomize";
import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom"; // cai lo de thoat nuoc

import { AuthContext } from "./components/context/auth.context";
import DashBoardPage from "./pages/admin/dashboard";

function AdminLayout() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }
  const { auth, setAuth, appLoading, setAppLoading } = context;
  useEffect(() => {
    setAppLoading(true);
    const fetchAccount = async () => {
      const res = await axios.get(`/api/account`);
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            username: res?.data?.username,
            email: res?.data?.email,
            role: res?.data?.role,
          },
        });
      }
      setAppLoading(false);
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  if (appLoading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  //  Nếu chưa login → redirect login
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login nhưng không phải admin → redirect home
  if (auth.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Nếu là admin → cho vào admin layout
  return (
    <div className="flex">
      <DashBoardPage />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
