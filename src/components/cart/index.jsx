import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Divider, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCartData } from "../../function/convertCartData";
import { getUserCart } from "../../api/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../recoil/user";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import productCartAtom from "../../recoil/productCart";

const ProductItemWrap = ({ cart }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-w-[280px] max-h-[400px] overflow-y-auto">
        {cart?.map((product) => (
          <div
            key={product.product.id}
            className="flex w-full justify-between items-center mb-2"
          >
            <p className="m-0 p-0">{product.product.name}</p>
            <p className="m-0 p-0">x {product.quantity}</p>
          </div>
        ))}
      </div>
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

const getCartFnc = async (user_id) => {
  const res = await getUserCart(user_id);
  return res.data;
};

const Cart = () => {
  const [count, setCount] = useState(0);
  const user = useRecoilValue(userAtom);
  const [cart, setCart] = useRecoilState(productCartAtom);
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["getCart", user.id],
    queryFn: () => getCartFnc(user.id),
    enabled: !!Cookies.get("token"),
    refetchOnWindowFocus: false,
    onSuccess: (value) => setCart(convertCartData(value)),
  });

  useEffect(() => {
    setCount(cart.length);
  }, [cart.length]);

  return (
    <Popover content={<ProductItemWrap cart={cart} />} placement="bottomRight">
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
