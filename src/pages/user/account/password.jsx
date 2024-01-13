import { Button, Form, Input, message } from "antd";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../../recoil/user";
import { useMutation } from "@tanstack/react-query";
import { updatePass } from "../../../api/user";

const Password = () => {
  const [form] = Form.useForm();
  const user = useRecoilValue(userAtom);

  const update = useMutation({
    mutationKey: ["update-password", user.id],
    mutationFn: async (payload) => updatePass(payload),
    onSuccess: () => {
      message.success("Update your password success!");
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const handleUpdate = (values) => {
    const { confirm_password, ...rest } = values;
    update.mutate({ ...rest, user_id: user.id });
  };

  return (
    <Form
      name="password-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18, offset: 0 }}
      labelAlign="left"
      labelWrap
      form={form}
      onFinish={handleUpdate}
      className="w-full"
    >
      <Form.Item
        label="Old password"
        name="old_password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
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
        label="New password"
        name="new_password"
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
        label="Confirm new password"
        name="confirm_password"
        dependencies={["new_password"]}
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
              if (!value || getFieldValue("new_password") === value) {
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
      <Form.Item className="w-full flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-normal-bg-color"
          loading={update.isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Password;
