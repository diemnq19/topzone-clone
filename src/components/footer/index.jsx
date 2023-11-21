import React from "react";
import { Layout } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer className="min-h-[200px] bg-normal-bg-color">
      <div className="flex max-w-[1280px] mx-auto pt-16 text-white justify-between">
        <div className="w-80 bg-topzone-image bg-no-repeat bg-contain min-h-[190px]"></div>
        <div className="text-base">
          <h2 className="text-lg mb-2">Contact infomation:</h2>
          <ul>
            <li className="flex items-center">
              <span className="w-20 block">Buy: </span>
              <a className="text-blue-400 mr-2">1900-969-642</a> (7:30 - 22:00)
            </li>
            <li className="flex items-center">
              <span className="w-20 block">Complain: </span>
              <a className="text-blue-400 mr-2">1900-986-843</a> (7:30 - 22:00)
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg mb-2">Social</h2>
          <ul className="text-xl">
            <li className="flex items-baseline pb-1">
              <a>
                <FacebookOutlined /> <span className="text-base">Facebook</span>
              </a>
            </li>
            <li className="flex items-baseline pb-1">
              <a>
                <InstagramOutlined />{" "}
                <span className="text-base">Instagram</span>
              </a>
            </li>
            <li className="flex items-baseline pb-1">
              <a>
                <TwitterOutlined /> <span className="text-base">Twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
