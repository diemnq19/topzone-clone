import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Divider, Popover } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItemWrap = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="min-w-[280px] max-h-[400px] overflow-y-auto"></div>
      <Divider />
      <Button
        type="primary"
        className="bg-dark-bg-color font-semibold shadow-none"
        onClick={() => navigate("/cart")}
      >
        View card
      </Button>
    </div>
  );
};

const Cart = () => {
  const [count, setCount] = useState(0);
  return (
    <Popover content={<ProductItemWrap />} placement="bottomRight">
      <Badge
        count={count}
        className="mr-4 cursor-pointer"
        size="default"
        offset={[-4, 10]}
      >
        <Avatar
          icon={<ShoppingCartOutlined />}
          shape="squared"
          size={"large"}
        />
      </Badge>
    </Popover>
  );
};

export default Cart;
