import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import productCartAtom from "../../recoil/productCart";
import CustomLayout from "../../components/customLayout";
import { Button, InputNumber, Table } from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import productSelectAtom from "../../recoil/selectedProduct";
import Cookies from "js-cookie";
import userAtom from "../../recoil/user";
import { useMutation } from "@tanstack/react-query";
import { removeProduct, updateCart } from "../../api/cart";
import { useNavigate } from "react-router-dom";

const updateCartByID = async (payload) => {
  const res = await updateCart(payload);
  return res.data;
};

const deleteCardByID = async (id) => {
  const res = await removeProduct(id);
  return res.data;
};

const CartCustom = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState(productCartAtom);
  const [productsChange, setProductsChange] = useState(
    cart.map((item) => item.quantity)
  );
  const [delCart, setDelCart] = useState(null);

  const [selectedProduct, setSeletedProduct] =
    useRecoilState(productSelectAtom);

  const isAuthen = Cookies.get("token");
  const user = useRecoilValue(userAtom);

  const update = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: (payload) => updateCartByID(payload),
    onSuccess: (value) => {
      const index = cart.findIndex((item) => item.cartID == value.item.id);
      const newProductCart = [...cart];
      newProductCart[index] = {
        ...newProductCart[index],
        quantity: value.item.quantity,
      };
      setCart(newProductCart);
    },
  });

  const deleteCart = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: (payload) => deleteCardByID(payload),
    onSuccess: () => {
      const newProductCart = cart.filter(
        (product) => product.cartID != delCart
      );
      console.log(newProductCart);
      setCart(newProductCart);
      setDelCart(null);
    },
  });

  const handleIncreaseQuantity = (index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] += 1;
    setProductsChange(newProductsChange);
  };

  const handleDecreaseQuantity = (index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] -= 1;
    setProductsChange(newProductsChange);
  };

  const handleChangeValue = (value, index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] = value;
    setProductsChange(newProductsChange);
  };

  const handleSaveValue = (index) => {
    const newProductCart = [...cart];
    newProductCart[index] = {
      ...newProductCart[index],
      quantity: productsChange[index],
    };
    if (!isAuthen) {
      return setCart(newProductCart);
    }
    const payload = {
      id: newProductCart[index].cartID,
      user_id: user.id,
      product_id: newProductCart[index].product.id,
      quantity: productsChange[index],
      progress: newProductCart[index].progress,
    };
    update.mutate(payload);
  };

  const handleDeleteProduct = (id) => {
    if (!isAuthen) {
      const newProductCart = cart.filter((product) => product.cartID != id);
      setCart(newProductCart);
    } else {
      deleteCart.mutate(id);
    }
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: "8%",
      render: (value, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Image",
      dataIndex: ["product", "image_url"],
      key: "image",
      width: "8%",
      render: (value, record, index) => (
        <div>
          <img src={value} alt={record.name} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: ["product", "price"],
      key: "price",
      width: "12%",
      render: (value, record, index) => (
        <div>
          {value}
          {record.product.unit}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: "12%",
      render: (value, record, index) => (
        <div className="flex justify-center gap-4">
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleDecreaseQuantity(index)}
            disabled={productsChange[index] == 1}
          />
          <InputNumber
            controls={false}
            value={productsChange[index]}
            onChange={(value) => handleChangeValue(value, index)}
            className="mx-2"
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleIncreaseQuantity(index)}
          />
        </div>
      ),
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      width: "12%",
      render: (text, record, index) => (
        <div className="flex justify-center">
          <Button
            icon={<SaveOutlined />}
            className="mr-2"
            size="large"
            disabled={cart[index].quantity == productsChange[index]}
            onClick={() => {
              handleSaveValue(index);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            size="large"
            onClick={() => {
              setDelCart(record.cartID);
              handleDeleteProduct(record.cartID);
            }}
          />
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSeletedProduct(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedProduct,
    onChange: onSelectChange,
  };

  return (
    <CustomLayout>
      <div className="w-full">
        <div className="w-full max-w-[1280px] mx-auto pt-40">
          <h2 className="text-2xl text-white">Your cart</h2>
          <div className="w-full pt-12 min-h-[300px]">
            <Table
              columns={columns}
              dataSource={cart.map((item) => ({ ...item, key: item.cartID }))}
              pagination={false}
              rowSelection={{ type: "checkbox", ...rowSelection }}
            />
            <div className="w-full flex justify-end border-t border-black bg-white border-dashed px-8">
              <Button
                className="my-4 bg-black border-none"
                type="primary"
                disabled={selectedProduct.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default CartCustom;
