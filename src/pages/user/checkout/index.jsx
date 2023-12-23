import React, { useEffect, useState } from "react";
import CustomLayout from "../../../components/customLayout";
import { Button, Form, Input, Select, Table, message } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import productCartAtom from "../../../recoil/productCart";
import userAtom from "../../../recoil/user";
import productSelectAtom from "../../../recoil/selectedProduct";
import { createOrder } from "../../../api/order";
import { useNavigate } from "react-router-dom";
import { calculateTotalPrice } from "../../../function/calculateTotalPrice";
import { convertOrdeData, returnCart } from "../../../function/convertCartData";
import { PayPalButtons } from "@paypal/react-paypal-js";

const options = [
  {
    label: "Ship code",
    value: 1,
  },
  {
    label: "Paypal",
    value: 2,
  },
];

const Checkout = () => {
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
          {value} {record.product.unit}
        </div>
      ),
    },
    {
      title: "Percent discount",
      key: "percent_discount",
      dataIndex: ["product", "percent_discount"],
      width: "8%",
      render: (value) => <div>{value}%</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: "12%",
    },
    {
      title: "Total price",
      key: "totalPrice",
      align: "left",
      width: "16%",
      render: (value, record, index) => (
        <div>
          {(record.quantity *
            record.product.price *
            (100 - record.product.percent_discount * 1)) /
            100}{" "}
          {record.product.unit}
        </div>
      ),
    },
  ];
  const [cart, setCart] = useRecoilState(productCartAtom);
  const [form] = Form.useForm();
  const user = useRecoilValue(userAtom);
  const [productSelect, setProductSelect] = useRecoilState(productSelectAtom);
  const navigate = useNavigate();
  const [optionValue, setOptionValue] = useState(!!user.id ? 1 : 2);
  const [orderPayPalID, setOrderPaypalID] = useState("");
  const [success, setSuccess] = useState(false);

  const initialValues = {
    shipping_address: user.address,
    receiver_name: user.name,
    receiver_phone: user.phone,
  };

  const cartOrder = convertOrdeData(productSelect, cart);

  const handleSubmit = async (values) => {
    if (!success) return message.error("Please purchase the product");
    try {
      const res = await createOrder({
        ...values,
        order_status: !!orderPayPalID ? "paid" : "pending",
        shopping_cart_list: JSON.stringify(productSelect),
      });
      message.success("Create order success");
      if (!user.id) {
        const newCart = returnCart(productSelect, cart);
        setCart(newCart);
      }
      setProductSelect([]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const createOrderPaypal = async (data, actions) => {
    const orderID = await actions.order.create({
      purchase_units: [
        {
          items: cartOrder.map((product) => ({
            name: product.product.name,
            description: product.product.name,
            quantity: product.quantity,
            unit_amount: {
              currency_code: "USD",
              value: product.product.price,
            },
          })),
          amount: {
            currency_code: "USD",
            value: calculateTotalPrice(productSelect, cart),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: calculateTotalPrice(productSelect, cart),
              },
            },
          },
          description: "Buy product",
        },
      ],
    });
    setOrderPaypalID(orderID);
    return orderID;
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      setSuccess(true);
      return details;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      message.success("Payment success!");
    }
  }, [success]);

  return (
    <CustomLayout>
      <div className="w-full">
        <div className="w-full max-w-[1280px] mx-auto pt-40">
          <h2 className="text-white font-bold text-3xl mb-8">Your order</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <div className="w-full bg-white py-8 px-4 rounded-xl">
              <Form.Item
                label="Username"
                name="receiver_name"
                rules={[
                  { required: true, message: "Please filled this field" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="receiver_phone"
                rules={[
                  { required: true, message: "Please filled this field" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Please enter the right phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="shipping_address"
                rules={[
                  { required: true, message: "Please filled this field" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="w-full pt-4 min-h-[300px]">
              <Table
                columns={columns}
                dataSource={cartOrder.map((item) => ({
                  ...item,
                  key: item.cartID,
                }))}
                pagination={false}
              />
              <div className="w-full flex justify-between items-center px-8 mt-4 bg-white py-2 rounded-xl">
                <div>
                  <Form.Item className="m-0 p-0 w-[150px] mb-4">
                    <Select
                      options={options}
                      value={optionValue}
                      onChange={(value) => setOptionValue(value)}
                      disabled={!user.id}
                    />
                  </Form.Item>
                  {success && (
                    <p className="mb-2 text-green-600">Payment sucess!</p>
                  )}
                  {optionValue === 2 && (
                    <PayPalButtons
                      onApprove={onApprove}
                      createOrder={createOrderPaypal}
                    />
                  )}
                </div>
                <p>
                  <span className="font-bold mr-2">Total price:</span>
                  <span className="">
                    {calculateTotalPrice(productSelect, cart)}$
                  </span>
                </p>
              </div>
              <div className="w-full flex justify-end px-8 mt-4">
                <Form.Item>
                  <Button
                    className="my-4 bg-black border-none text-white "
                    // type="primary"
                    htmlType="submit"
                  >
                    Create order
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Checkout;
