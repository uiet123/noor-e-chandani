import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
const Body = () => {
  return (
     <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
