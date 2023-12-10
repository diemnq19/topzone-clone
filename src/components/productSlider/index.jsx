import { AppleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Spin } from "antd";
import React from "react";
import ProductCard from "../productCard";
import { getAllProductByType } from "../../api/product";
import { useQuery } from "@tanstack/react-query";

const getProductByType = async (brand_id) => {
  const res = await getAllProductByType({brand_id});
  return res.data;
};

const ProductSlider = ({ data }) => {
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getProductByType", data.id],
    queryFn: () => getProductByType(data.id),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });

  return (
    <div className="pb-20 ml-4 pt-10">
      <div className="text-white text-[40px] flex items-baseline pb-10 justify-center">
        <div className="relative top-[-4px]">
          <AppleFilled />
        </div>
        <h2>{data.name}</h2>
      </div>
      <Carousel
        // slidesToShow={4}
        // slidesToScroll={4}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        dots={false}
      >
        {isLoading && <Spin size="large" />}
        {productData && productData?.map((item, index) => (
          <div key={index}>
            <ProductCard
              image={item.image_url}
              title={item.name}
              price={item.price}
              percentDiscount={item.percent_discount}
              unit={item.unit}
              id={item.id}
              brand={data.name}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
