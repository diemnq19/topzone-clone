import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import React from "react";
import { getUserOrder } from "../../../api/order";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { convertPurchaseData } from "../../../function/convertPurchaseData";
import { calculateTotalPriceWithDiscount } from "./helper";

const Order = () => {
  const {
    data: orderData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["orderData"],
    queryFn: () => getUserOrder(),
  });

  const columns = [
    {
      title: "ID",
      key: "user_id",
      dataIndex: "user_id",
    },
    {
      title: "User",
      key: "receiver_name",
      dataIndex: "receiver_name",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "receiver_phone",
    },
    {
      title: "Address",
      key: "Address",
      dataIndex: "shipping_address",
    },
    {
      title: "Created at",
      key: "create_at",
      dataIndex: "created_at",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY HH:mm")}</div>,
    },
    {
      title: "Total price",
      key: "total_price",
      render: (text, record, index) => {
        return (
          <div>
            {calculateTotalPriceWithDiscount(record.shopping_cart_list)}
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "order_status",
      render: (text) => <div>{text === "pending" ? "unpaid" : "paid"}</div>,
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h2>Order</h2>
      </div>
      <div className="mt-4">
        <Table
          loading={isLoading || isRefetching}
          columns={columns}
          dataSource={
            orderData && orderData?.data?.orders ? orderData?.data?.orders : []
          }
        />
      </div>
    </div>
  );
};
export default Order;
