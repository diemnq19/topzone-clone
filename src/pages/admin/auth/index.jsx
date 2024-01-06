import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React from "react";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import adminAtom from "../../../recoil/admin";

const initialState = {
  email: "",
  password: "",
};

const AdminAuth = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setAdmin = useSetRecoilState(adminAtom);

  const loginFnc = useMutation({
    mutationKey: ["admin-login"],
    mutationFn: async (payload) => await login(payload),
    onSuccess: (res) => {
      Cookies.set("admin-token", res.data.token);
      setAdmin(res.data.user);
      navigate("/auth");
    },
  });

  const onFinish = (values) => {
    loginFnc.mutate(values);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-slate-200">
      <div className="border rounded-lg min-w-[400px] min-h-[400px] bg-white flex items-center justify-center flex-col">
        <h2 className="mb-10 text-2xl uppercase tracking-[8px] font-semibold text-black/80">
          Admin
        </h2>
        <Form
          form={form}
          initialValues={initialState}
          layout="vertical"
          className="w-[300px]"
          onFinish={onFinish}
        >
          <Form.Item
            label={"Email"}
            name="email"
            rules={[
              {
                required: true,
                message: "Please filled this field",
              },
              {
                type: "email",
                message: "Please enter the right email",
              },
            ]}
          >
            <Input
              allowClear
              spellCheck={false}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label={"Password"}
            name="password"
            rules={[
              {
                required: true,
                message: "Please filled this field",
              },
              {
                min: 8,
                message: "Please enter the password at least 8 characters",
              },
            ]}
          >
            <Input.Password allowClear placeholder="Enter your password" />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="bg-normal-bg-color tracking-widest font-semibold"
              loading={loginFnc.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminAuth;
