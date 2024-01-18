import React from "react";
import Header from "./components/header";
import SiteNav from "./components/sidenav";
import { useLocation } from "react-router-dom";
import Product from "./product";
import Order from "./order";

const Home = () => {
  const location = useLocation();
  return (
    <div className="w-full">
      <Header />
      <div className="flex">
        <SiteNav />
        {(location.pathname.includes("product") ||
          location.pathname === "/admin") && <Product />}
        {location.pathname.includes("order") && <Order />}
      </div>
    </div>
  );
};

export default Home;
