import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  address: "",
  phone: "",
};

const FormRegister = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { confirmPassword, ...payload } = values;
      const res = await register(payload);
      if (res.status === 200) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-4/5 px-8 pb-12 pt-8 rounded-lg">
      <h2 className="w-full text-center uppercase font-semibold tracking-widest text-2xl mb-8 ">
        Register
      </h2>
      <Form
        name="auth-form"
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
            { required: true, message: "Please input your name" },
            {
              max: 255,
              message: "Please input your name less than 255 characters",
            },
          ]}
        >
          <Input spellCheck="false" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input the right email!",
            },
          ]}
        >
          <Input spellCheck="false" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Please input your password at least 8 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
            {
              min: 8,
              message: "Please input your password at least 8 characters!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input spellCheck="false" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input spellCheck="false" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-dark-bg-color w-1/2 font-semibold tracking-widest"
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <p className="w-full text-center text-xl font-semibold uppercase mb-6">
        or
      </p>
      <div className="w-full text-center">
        <Button
          type="primary"
          size="large"
          className="bg-dark-bg-color w-[34%] font-semibold tracking-widest"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
