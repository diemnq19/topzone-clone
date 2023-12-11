import React from "react";
import { Layout } from "antd";
import UserControl from "../userControl";
import { useNavigate } from "react-router-dom";
import Cart from "../cart";
import Menu from "../menu";

const { Header } = Layout;
const CustomHeader = () => {
    const navigate = useNavigate()
  return (
    <Header className="bg-dark-bg-color px-4 sticky top-0 z-[100000]">
      <div className="flex items-center justify-between mx-auto max-w-[1280px] h-full">
        {/* logo */}
        <div className="bg-logo-image bg-no-repeat bg-left-top bg-cover h-12 w-32 cursor-pointer" onClick={() => navigate("/")}></div>
        {/* menu */}
        <Menu />
        {/* cart & user control */}
        <div className="flex items-center">
            {/* cart */}
            <Cart />
            {/* user control */}
            <UserControl />
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
