import React, { useEffect, useState } from "react";
import CustomLayout from "../../../components/customLayout";
import CustomSlider from "../../../components/customSlider";
import MenuCard from "../../../components/menuCard";
import ProductSlider from "../../../components/productSlider";
import Policy from "../../../components/policy";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import brandsAtom from "../../../recoil/brands";

const Home = () => {
  const queryClient = useQueryClient();
  const brandData = useRecoilValue(brandsAtom);

  return (
    <CustomLayout>
      <CustomSlider />
      <div className="mx-auto max-w-[1280px]">
        <MenuCard />
        {brandData.map((brand, index) => (
          <div key={index}>
            <ProductSlider data={brand} />
          </div>
        ))}
      </div>
      <Policy />
    </CustomLayout>
  );
};

export default Home;
