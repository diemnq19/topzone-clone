import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useSetRecoilState } from "recoil";
import userAtom from "../../recoil/user";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

const FormLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUserState = useSetRecoilState(userAtom);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const res = await login(values);
      if (res.status === 200) {
        setUserState(res.data.user);
        setLoading(false);
        Cookies.set("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-w-fit w-3/5 px-8 pb-12 pt-8 rounded-lg">
      <h2 className="w-full text-center uppercase font-semibold tracking-widest text-2xl mb-8 ">
        Login
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
          <Input />
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
          >
            Login
          </Button>
        </Form.Item>
        <p className="w-full text-center text-xl font-semibold uppercase mb-6">
          or
        </p>
        <div className="w-full text-center">
          <Button
            type="primary"
            size="large"
            className="bg-dark-bg-color w-[34%] font-semibold tracking-widest"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormLogin;
