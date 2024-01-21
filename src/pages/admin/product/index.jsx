import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import AddProductForm from "./addProductForm";
import Cookies from "js-cookie";
import {
  deleteProduct,
  getAllProductByType,
  getBrand,
} from "../../../api/product";
import { findBrandById } from "../../../function/findBrandById";

const Product = () => {
  const [open, setOpen] = useState(false);

  const {
    data: brandData,
    isLoading: brandDataLoading,
    isError: brandDataError,
  } = useQuery({
    queryKey: ["getBrand"],
    queryFn: getBrand,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: ProductData,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["getProductByType"],
    queryFn: () => getAllProductByType(),
    enabled: !!Cookies.get("admin-token"),
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const handleDeleteProduct = useMutation(
    ["deleteProduct"],
    async (payload) => deleteProduct(payload),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const columns = [
    {
      title: "ID",
      key: "id",
      render: (text, record, index) => <div>{record.id}</div>,
    },
    {
      title: "Product",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image_url",
      render: (text) => <img src={text} className="w-10 h-16" />,
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand_id",
      render: (text, record, index) => (
        <div>{findBrandById(brandData?.data, text).name}</div>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (text, record) => (
        <div>
          {text}
          {record.unit}
        </div>
      ),
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "percent_discount",
      render: (text) => <div>{text}%</div>,
    },
    {
      title: "Action",
      key: "Action",
      render: (text, record, index) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteProduct.mutate(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h2>Product</h2>
        <Button icon={<PlusOutlined />} onClick={() => setOpen(!open)}>
          Add product
        </Button>
      </div>
      <div className="mt-4">
        <Table
          loading={isLoading || brandDataLoading || isRefetching}
          columns={columns}
          dataSource={ProductData && ProductData?.data ? ProductData?.data : []}
        />
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(!open)}
        footer={false}
        className="p-10"
        title="New product"
        centered
        styles={{
          width: '640px'
        }}
      >
        <AddProductForm setOpen={setOpen} refetch={refetch} />
      </Modal>
    </div>
  );
};

export default Product;
