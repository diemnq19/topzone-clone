import React from "react";
import CustomLayout from "../../components/customLayout";
import CustomSlider from "../../components/customSlider";
import MenuCard from "../../components/menuCard";
import ProductSlider from "../../components/productSlider";

const Home = () => {
  return (
    <CustomLayout>
      <CustomSlider />
      <div className="mx-auto max-w-[1280px]">
        <MenuCard />
        <ProductSlider title="iPhone" />
      </div>
    </CustomLayout>
  );
};

export default Home;
