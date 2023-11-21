import {
  CarOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import React from "react";

const Policy = () => {
  return (
    <div className="w-full bg-dark-bg-color py-10">
      <div className="flex max-w-[1280px] mx-auto justify-between">
        <div className="max-w-[160px] text-center text-white text-base">
          <div className="text-[40px] pb-4">
            <CheckCircleOutlined />
          </div>
          <p>Diverse and genuine designs</p>
        </div>
        <div className="max-w-[160px] text-center text-white text-base">
          <div className="text-[40px] pb-4">
            <CarOutlined />
          </div>
          <p>Nationwide Delivery</p>
        </div>
        <div className="max-w-[160px] text-center text-white text-base">
          <div className="text-[40px] pb-4">
            <SafetyCertificateOutlined />
          </div>
          <p>Warranty is up to 12 months</p>
        </div>
        <div className="max-w-[160px] text-center text-white text-base">
          <div className="text-[40px] pb-4">
            <UndoOutlined />
          </div>
          <p>Returns can be made at Thegioididong and DienmayXANH</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
