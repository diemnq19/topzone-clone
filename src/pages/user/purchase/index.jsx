import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../../recoil/user";
import { getUserOrder } from "../../../api/order";
import CustomLayout from "../../../components/customLayout";
import Cookies from "js-cookie";
import { Menu, Spin, Table } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { convertPurchaseData } from "../../../function/convertPurchaseData";

const items = [
  {
    label: (
      <Link to="/purchase" className="font-semibold">
        All
      </Link>
    ),
    key: "all",
    icon: <ShoppingOutlined />,
  },
  {
    label: (
      <Link to="/purchase?status=paid" className="font-semibold">
        Paid
      </Link>
    ),
    key: "paid",
    icon: <CheckCircleOutlined />,
  },
  {
    label: (
      <Link to="/purchase?status=unpaid" className="font-semibold">
        Unpaid
      </Link>
    ),
    key: "unpaid",
    icon: <CloseCircleOutlined />,
  },
];

const Purchase = () => {
  const isAuthen = Boolean(Cookies.get("token"));
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const [tableData, setTableData] = useState([]);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_user_order", user.id],
    queryFn: async () => getUserOrder({ user_id: user.id }),
    enabled: isAuthen,
  });

  useEffect(() => {
    if (!(!status || status === "paid" || status === "unpaid")) {
      navigate("/purchase");
    }
  }, [status]);

  useEffect(() => {
    if (orders?.data) {
      if (status) {
        const data = convertPurchaseData(orders?.data?.order).map((item) => ({
          ...item,
          order_status: item.order_status === "pending" ? "unpaid" : "paid",
        }));
        const filter = data.filter((item) => item.order_status === status);
        setTableData(filter);
      } else setTableData(convertPurchaseData(orders?.data?.order));
    }
  }, [status, orders?.data]);

  const tableColumns = [
    {
      title: "ID",
      key: "ID",
      render: (text, record, index) => record.id,
    },
    {
      title: "Product",
      key: "product",
      dataIndex: ["shopping_cart", "product", "name"],
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: ["shopping_cart", "quantity"],
    },
    {
      title: "Price",
      key: "price",
      dataIndex: ["shopping_cart", "product", "price"],
      render: (text, record) => (
        <div>
          {text}
          {record.shopping_cart.product.unit}
        </div>
      ),
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: ["shopping_cart", "product", "percent_discount"],
      render: (text, record) => <div>{text}%</div>,
    },
    {
      title: "Total price",
      key: "total_price",
      render: (text, record) => (
        <div>
          {(record.shopping_cart.product.price *
            (100 - record.shopping_cart.product.percent_discount)) /
            100}
          {record.shopping_cart.product.unit}
        </div>
      ),
    },
  ];

  if (status !== "paid" && status !== "unpaid") {
    tableColumns.push({
      title: "Status",
      key: "status",
      dataIndex: "order_status",
      render: (text) => <div>{text === "paid" ? text : "unpaid"}</div>,
    });
  }

  return (
    <CustomLayout>
      <Spin spinning={isLoading}>
        <div className="w-full px-4">
          <div className="w-full max-w-[1280px] mx-auto pt-10 min-h-[400px]">
            <h2 className="text-white text-2xl my-4">Purchase</h2>
            <div className="flex gap-4">
              <Menu
                items={items}
                className="w-1/5 rounded-lg"
                defaultSelectedKeys={[
                  status === "paid" || status === "unpaid" ? status : "all",
                ]}
              />
              <div className="w-full bg-white rounded-lg">
                <Table columns={tableColumns} dataSource={tableData} />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </CustomLayout>
  );
};

export default Purchase;
