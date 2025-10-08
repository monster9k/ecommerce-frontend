import axios from "../../utils/axios.custiomize";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom"; // cai lo de thoat nuoc

import Header from "../../components/layout/header";
import { AuthContext } from "../../components/context/auth.context";

function UserLayout() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }
  const { setAuth, appLoading, setAppLoading } = context;
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
  }, []);

  return (
    <div>
      {appLoading === true ? (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default UserLayout;
