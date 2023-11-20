import { AppleFilled } from "@ant-design/icons";
import { Carousel } from "antd";
import React from "react";
import ProductCard from "../productCard";

const ProductSlider = ({ title, data }) => {
  return (
    <div>
      <div className="text-white text-[40px] flex items-baseline pb-10 justify-center">
        <div className="relative top-[-4px]">
          <AppleFilled />
        </div>
        <h2>{title}</h2>
      </div>
      <Carousel>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Carousel>
    </div>
  );
};

export default ProductSlider;
