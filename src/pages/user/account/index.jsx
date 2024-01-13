import React from "react";
import CustomLayout from "../../../components/customLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

const items = [
  {
    label: (
      <Link to="/account" className="font-semibold">
        Info
      </Link>
    ),
    key: "info",
    icon: <UserOutlined />
  },
  {
    label: (
      <Link to="/account/password" className="font-semibold">
        Password
      </Link>
    ),
    key: "password",
    icon: <SettingOutlined />
  },
];
const Account = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/");

  return (
    <CustomLayout>
      <div className="w-full px-4">
        <div className="w-full max-w-[1280px] mx-auto pt-10 min-h-[400px]">
          <h2 className="text-white text-2xl my-4">Account</h2>
          <div className="flex gap-4">
            <Menu
              items={items}
              className="w-1/5 rounded-lg"
              defaultSelectedKeys={[
                pathNames[2] === "password" ? "password" : "info",
              ]}
            />
            <div className="p-6 w-full bg-white rounded-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Account;
