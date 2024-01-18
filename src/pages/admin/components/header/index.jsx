import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('admin-token')
    navigate('/admin/auth')
  }
  return (
    <div className="h-10 w-full flex items-center justify-between px-20 py-8 border-b">
      <div
        className="bg-logo-image bg-no-repeat bg-center bg-cover h-12 w-32 cursor-pointer"
        onClick={() => navigate("/admin")}
      ></div>
      <div>
        <Button icon={<LogoutOutlined />} onClick={handleLogout}/>
      </div>
    </div>
  );
};

export default Header;
