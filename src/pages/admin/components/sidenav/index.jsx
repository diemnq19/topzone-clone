import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const SiteNav = () => {
  const location = useLocation();
  const items = [
    {
      label: <Link to="/admin">Product</Link>,
      key: "product",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link to="/admin/order">Order</Link>,
      key: "order",
      icon: <ShoppingCartOutlined />,
    },
  ];

  const selectedKeys = useMemo(() => {
    if (location.pathname.includes("product") || location.pathname === "/admin") {
      return ["product"];
    } else return ["order"];
  }, [location.pathname]);
  return (
    <div>
      <Menu
        style={{ width: 256, minHeight: "100vh" }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </div>
  );
};

export default SiteNav;
