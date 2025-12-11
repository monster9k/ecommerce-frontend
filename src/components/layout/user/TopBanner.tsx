// import React from "react";
import { Link } from "react-router-dom";

const TopBanner = () => {
  return (
    <div className="w-full bg-black text-white text-xs md:text-sm flex justify-center items-center py-2 px-4">
      Sign up and get 20% off to your first order.
      <Link to="/register" className="text-white underline ml-2">
        Sign up now
      </Link>
    </div>
  );
};

export default TopBanner;
