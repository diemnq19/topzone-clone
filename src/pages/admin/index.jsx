import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct, getBrand } from "../../api/product";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const initialValues = {
  name: "",
  description: "",
  price: null,
  brand_id: null,
  image: null,
  percent_discount: null,
  unit: "$",
};

const getBrands = async () => {
  const res = await getBrand();
  return res.data;
};

const Admin = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [brandID, setBrandID] = useState(null);

  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
    refetchOnWindowFocus: false,
  });

  const submitForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("percent_discount", values.percent_discount);
      images.forEach((image) => {
        formData.append("image", image);
      });
      formData.append("brand_id", brandID);
      formData.append("unit", values.unit);
      const res = await createProduct(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = images.indexOf(file);
      const newFileList = images.slice();
      newFileList.splice(index, 1);
      setImages(newFileList);
    },
    beforeUpload: (file) => {
      setImages([...images, file]);
      return false;
    },
    fileList: images,
    maxCount: 1,
  };

  const handleChangeBrand = (value) => {
    setBrandID(value);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-5">
      <Form
        name="product-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18, offset: 2 }}
        initialValues={initialValues}
        labelAlign="left"
        labelWrap
        form={form}
        onFinish={submitForm}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name of product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description of product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price of product!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Unit"
          name="unit"
          rules={[
            {
              required: true,
              message: "Please input unit price of product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand id"
          name="brand_id"
          rules={[
            {
              required: true,
              message: "Please select brand id of product!",
            },
          ]}
        >
          <Select
            options={brands?.map((brand) => ({
              label: brand?.name,
              value: brand?.id,
            }))}
            onChange={handleChangeBrand}
            value={brandID}
            loading={isLoading}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            () => ({
              validator(_, value) {
                if (images.length > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please select image of product!")
                );
              },
            }),
          ]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Percent discount"
          name="percent_discount"
          rules={[
            {
              required: true,
              message: "Please input percent discount of product!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Button submit">
          <button
            type="submit"
            className="border p-2 bg-dark-bg-color text-white"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
