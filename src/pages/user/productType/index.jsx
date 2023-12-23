import React from "react";
import CustomLayout from "../../../components/customLayout";
import { useLocation } from "react-router-dom";
import { data as imageData } from "../../../constant/imageSlider";
import ContainerBanners from "../../../components/containerBanners";

const ProductType = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const dataIndex = imageData.findIndex(
    (data) => data.title.toLowerCase() == pathName
  );

  const selectedData =
    dataIndex !== undefined
      ? imageData[dataIndex]
      : { image: "url('./src/assets/logo-image.webp')", title: "Product" };
  return (
    <CustomLayout>
      <div className="w-full max-w-[1280px] mx-auto">
        <ContainerBanners
          title={selectedData.title}
          image={selectedData.image}
        />
      </div>
    </CustomLayout>
  );
};

export default ProductType;
