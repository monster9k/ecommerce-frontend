// import axios from "./utils/axios.custiomize";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom"; // cai lo de thoat nuoc

import Header from "./components/layout/header";

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
    </div>
  );
}

export default App;
