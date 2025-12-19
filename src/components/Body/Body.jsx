import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation} from "react-router-dom";
import Footer from "../Footer/Footer";
import Coupon from "../Coupon/Coupon";
const Body = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
     <div className="app-shell">
     {isHome && <Coupon />} 
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
