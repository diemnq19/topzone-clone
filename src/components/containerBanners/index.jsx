import { AppleFilled } from "@ant-design/icons";
import React from "react";

const ContainerBanners = ({ title, image }) => {
  return (
    <div className="w-full flex flex-col items-center pt-20">
      <div className="text-white text-[40px] flex items-baseline pb-10 justify-center">
        <div className="relative top-[-4px]">
          <AppleFilled />
        </div>
        <h2>{title}</h2>
      </div>
      <div className="w-full rounded-3xl">
        <img src={image} alt={title} className="rounded-3xl w-full max-h-[320px]" />
      </div>
    </div>
  );
};

export default ContainerBanners;
