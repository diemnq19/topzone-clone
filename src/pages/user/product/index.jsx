import React, { useEffect, useState } from "react";
import CustomLayout from "../../../components/customLayout";
import { Button, Image, InputNumber, Spin } from "antd";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../api/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import productCartAtom from "../../../recoil/productCart";
import userAtom from "../../../recoil/user";
import { addProduct, removeProduct } from "../../../api/cart";
import Cookies from "js-cookie";
import {
  addResCartData,
  findCartIDByProductID,
} from "../../../function/convertCartData";
import { FacebookOutlined } from "@ant-design/icons";

const getProductDetail = async (id) => {
  const res = await getProduct(id);
  return res.data;
};

const addProductToCart = async (payload) => {
  const res = await addProduct(payload);
  return res.data;
};

const deleteProductToCart = async (payload) => {
  const res = await removeProduct(payload);
  return res.data;
};

const Product = () => {
  const params = useParams();
  const productID = params.id;
  const isAuth = Cookies.get("token");
  const user = useRecoilValue(userAtom);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useRecoilState(productCartAtom);

  const handleChange = (value) => {
    setQuantity(value);
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getProduct", productID],
    queryFn: () => getProductDetail(productID),
    refetchOnWindowFocus: false,
  });

  const addProductFnc = useMutation({
    mutationKey: ["addProduct", productID, quantity, user.id],
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: (value) => {
      setCart([...cart, addResCartData(value)]);
    },
    onError: () => console.log(error),
  });

  const removeProductFnc = useMutation({
    mutationKey: ["removeProduct", findCartIDByProductID(cart, productID)],
    mutationFn: (payload) => deleteProductToCart(payload),
    onSuccess: () => {
      const newCart = cart.filter(
        (item) => item.cartID != findCartIDByProductID(cart, productID)
      );
      setCart(newCart);
    },
    onError: () => console.log(error),
  });

  const handleChangeCart = () => {
    if (!isAuth) {
      if (cart.findIndex((item) => item.product.id == productID) === -1) {
        return setCart([...cart, { product, quantity, cartID: product.id }]);
      } else {
        const newCart = cart.filter((item) => item.product.id != productID);
        return setCart(newCart);
      }
    } else {
      if (cart.findIndex((item) => item.product.id == productID) === -1) {
        return addProductFnc.mutate({
          user_id: user.id,
          product_id: +productID,
          quantity,
        });
      } else {
        return removeProductFnc.mutate(findCartIDByProductID(cart, productID));
      }
    }
  };

  if (isLoading)
    return (
      <CustomLayout>
        <Spin />
      </CustomLayout>
    );

  if (isError) return error;

  return (
    <CustomLayout>
      <div className="w-full">
        <div className="w-full max-w-[1280px] mx-auto pt-40">
          <div className="flex w-full gap-4">
            <div className="w-[30%] min-w-[300px] rounded-lg bg-dark-bg-color">
              <Image
                src={product.image_url}
                width={"100%"}
                className="rounded-lg py-4"
              />
            </div>
            <div className="ml-10">
              <h2 className="text-2xl text-white">
                {product.name.toUpperCase()}
              </h2>
              <p className="mt-4 text-white/80">{product.description}</p>
              <p className="mt-4 text-red-400">
                Price:{" "}
                {Number(product.percent_discount) !== 0 ? (
                  <>
                    <span className="line-through mr-2">{product.price}</span>
                    <span>
                      {product.price -
                        (product.price * Number(product.percent_discount)) /
                          100}
                    </span>
                  </>
                ) : (
                  product.price
                )}
                {product.unit}
              </p>
              <div className="mt-4">
                <InputNumber
                  min={1}
                  className="w-40 py-2"
                  value={quantity}
                  onChange={handleChange}
                />
                <Button
                  size="large"
                  type="primary"
                  className="ml-4 bg-cyan-700 border-transparent shadow-none hover:!bg-cyan-400"
                  onClick={handleChangeCart}
                  loading={
                    addProductFnc.isLoading || removeProductFnc.isLoading
                  }
                >
                  {cart.findIndex((item) => item.product.id == productID) !== -1
                    ? "Remove from cart"
                    : "Add to cart"}
                </Button>
              </div>

              <div
                className="fb-share-button mt-4 text-white bg-blue-600 w-fit p-2 rounded-lg flex items-center gap-2"
                data-href={`${window.location.href}`}
                data-layout=""
                data-size=""
              >
                <div className="text-xl">
                  <FacebookOutlined />
                </div>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  className="fb-xfbml-parse-ignore"
                >
                  Share on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Product;
