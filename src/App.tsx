// import axios from "./utils/axios.custiomize";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom"; // cai lo de thoat nuoc
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // useEffect(() => {
  //   const fetchHello = async () => {
  //     const res = await axios.get(`/api/hello`);
  //     console.log(res);
  //   };
  //   fetchHello();
  // }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;
