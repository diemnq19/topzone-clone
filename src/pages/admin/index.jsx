import React from "react";
import Header from "./components/header";
import SiteNav from "./components/sidenav";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "./product";
import Order from "./order";
import Cookies from "js-cookie";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate()
  if(!Cookies.get('admin-token')) return navigate("/admin/auth")
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
