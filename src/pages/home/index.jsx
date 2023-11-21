import React from "react";
import CustomLayout from "../../components/customLayout";
import CustomSlider from "../../components/customSlider";
import MenuCard from "../../components/menuCard";
import ProductSlider from "../../components/productSlider";
import { phoneData, macData } from "../../constant/data";
import Policy from "../../components/policy";

const data = [];
data.push({ title: "iPhone", data: phoneData });
data.push({ title: "Mac", data: macData });
data.push({ title: "iPad", data: macData });
data.push({ title: "Watch", data: macData });
data.push({ title: "Sound", data: macData });
data.push({ title: "Accessory", data: macData });

const Home = () => {
  return (
    <CustomLayout>
      <CustomSlider />
      <div className="mx-auto max-w-[1280px]">
        <MenuCard />
        {data.map((product, index) => (
          <div key={index}>
            <ProductSlider title={product.title} data={product.data} />
          </div>
        ))}
      </div>
      <Policy />
    </CustomLayout>
  );
};

export default Home;
