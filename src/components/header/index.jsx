import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Modal } from "antd";
import UserControl from "../userControl";
import { useNavigate } from "react-router-dom";
import Cart from "../cart";
import Menu from "../menu";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAllProductByType } from "../../api/product";

const { Header } = Layout;
const { Search } = Input;
const CustomHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  const handleSearch = (value) => {
    if (value === "") return;
    navigate(`/product?q=${encodeURI(value)}`)
  };

  return (
    <Header className="bg-dark-bg-color px-4 sticky top-0 z-[999]">
      <div className="flex items-center justify-between mx-auto max-w-[1280px] h-full">
        {/* logo */}
        <div
          className="bg-logo-image bg-no-repeat bg-center bg-cover h-12 w-32 cursor-pointer"
          onClick={() => navigate("/")}
        ></div>
        {/* menu */}
        <Menu />
        {/* cart & user control */}
        <div className="flex items-center">
          {/* search */}
          <Button
            icon={<SearchOutlined />}
            size="large"
            className="text-white border-transparent !rounded-full hover:!text-white hover:!border-transparent mr-4 hover:!bg-white/20"
            onClick={() => setOpen(!open)}
          />
          {/* cart */}
          <Cart />
          {/* user control */}
          <UserControl />
        </div>
      </div>
      <Modal
        open={open}
        destroyOnClose
        onCancel={handleClose}
        centered
        footer={false}
        className="w-1/2"
        title={<p>Search product</p>}
      >
        <Search onSearch={handleSearch} />
      </Modal>
    </Header>
  );
};

export default CustomHeader;
