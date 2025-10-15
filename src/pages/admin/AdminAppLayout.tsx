import axios from "../../utils/axios.custiomize";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"; // cai lo de thoat nuoc

import { AuthContext } from "../../components/context/auth.context";

import SidebarPage from "../../components/layout/admin/Sidebar";
import AdminHeader from "../../components/layout/admin/adminHeader";

import { ThemeProvider } from "../../components/context/admin.theme.context";

function AdminLayout() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }
  const { auth, setAuth, appLoading, setAppLoading } = context;
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

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
    <ThemeProvider>
      {" "}
      <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 ">
        <div className="flex h-screen overflow-hidden">
          <SidebarPage
            collapsed={sideBarCollapsed}
            onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader
              sidebarCollapsed={sideBarCollapsed}
              onToggleSideBar={() => setSideBarCollapsed(!sideBarCollapsed)}
            />
            <main className="flex-1 overflow-y-auto bg-transparent">
              <div className="p-6 space-y-6">
                {/* {currentPage === "dashboard" && <Dashboard />} */}
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AdminLayout;
