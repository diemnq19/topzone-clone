import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../../../recoil/user";
import { useMutation } from "@tanstack/react-query";
import { updateInfo } from "../../../api/user";

const Info = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useRecoilState(userAtom);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    email: user.email,
  });
  const handleFormChange = () => {
    const currentValues = form.getFieldsValue();
    const isChanged = Object.keys(currentValues).some(
      (key) => currentValues[key] !== initialValues[key]
    );
    setIsFormChanged(isChanged);
  };

  const update = useMutation({
    mutationKey: ["update-info", user.id],
    mutationFn: async (payload) => updateInfo(payload, user.id),
    onSuccess: (data) => {
      message.success("Update your info success!");
      setUser(data.data.user);
      setInitialValues({
        name: data.data.user.name,
        phone: data.data.user.phone,
        address: data.data.user.address,
        email: data.data.user.email,
      });
      setIsFormChanged(false);
    },
    onError: () => {
      message.error("Update error!")
      form.resetFields()
    },
  });

  const handleUpdate = (values) => {
    update.mutate(values);
  };

  return (
    <Form
      name="account-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18, offset: 0 }}
      initialValues={initialValues}
      labelAlign="left"
      labelWrap
      form={form}
      onFieldsChange={handleFormChange}
      onFinish={handleUpdate}
      className="w-full"
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
        <Input spellCheck="false" disabled />
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
      <Form.Item className="w-full flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isFormChanged}
          className="bg-normal-bg-color"
          loading={update.isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Info;
