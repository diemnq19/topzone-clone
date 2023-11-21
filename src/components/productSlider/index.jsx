import { AppleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React from "react";
import ProductCard from "../productCard";

const ProductSlider = ({ title, data }) => {
  return (
    <div className="pb-20 ml-4 pt-10">
      <div className="text-white text-[40px] flex items-baseline pb-10 justify-center">
        <div className="relative top-[-4px]">
          <AppleFilled />
        </div>
        <h2>{title}</h2>
      </div>
      <Carousel
        slidesToShow={4}
        slidesToScroll={4}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        dots={false}
      >
        {data.map((phone, index) => (
          <div key={index}>
            <ProductCard
              image={phone.image}
              title={phone.title}
              price={phone.price}
              percentDiscount={phone.percentDiscount}
              unit={phone.unit}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
