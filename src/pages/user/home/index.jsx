import React, { useEffect } from "react";
import CustomLayout from "../../../components/customLayout";
import CustomSlider from "../../../components/customSlider";
import MenuCard from "../../../components/menuCard";
import ProductSlider from "../../../components/productSlider";
import Policy from "../../../components/policy";
import { getBrand } from "../../../api/product";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { getUserCart } from "../../../api/cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../../recoil/user";
import Cookies from "js-cookie";
import productCartAtom from "../../../recoil/productCart";
import { convertCartData } from "../../../function/convertCartData";

const getBrands = async () => {
  const res = await getBrand();
  return res.data;
};

const getCartFnc = async (user_id) => {
  const res = await getUserCart(user_id);
  return res.data;
};

const Home = () => {
  const user = useRecoilValue(userAtom);
  const setCart = useSetRecoilState(productCartAtom);
  const {
    data: brandData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getBrand"],
    queryFn: getBrands,
    refetchOnWindowFocus: false,
  });

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["getCart", user.id],
    queryFn: () => getCartFnc(user.id),
    enabled: !!Cookies.get("token"),
    refetchOnWindowFocus: false,
    onSuccess: (value) => setCart(convertCartData(value)),
  });

  return (
    <CustomLayout>
      <CustomSlider />
      <div className="mx-auto max-w-[1280px]">
        <MenuCard />
        {isLoading && (
          <div className="w-full flex mx-auto">
            <Spin size="large" />
          </div>
        )}
        {brandData &&
          brandData?.map((brand, index) => (
            <div key={index}>
              <ProductSlider data={brand} />
            </div>
          ))}
      </div>
      <Policy />
    </CustomLayout>
  );
};

export default Home;
