import React, { useEffect, useState } from "react";
import CustomLayout from "../../../components/customLayout";
import { useLocation } from "react-router-dom";
import { data as imageData } from "../../../constant/imageSlider";
import ContainerBanners from "../../../components/containerBanners";
import { useQuery } from "@tanstack/react-query";
import { getAllProductByType } from "../../../api/product";
import { useRecoilValue } from "recoil";
import brandsAtom from "../../../recoil/brands";
import { Select, Spin } from "antd";
import ProductCard from "../../../components/productCard";
import { findBrandById } from "../../../function/findBrandById";

const options = [
  {
    label: "Price high to low",
    value: "pricedown",
  },
  {
    label: "Price low to high",
    value: "priceup",
  },
];

const ProductType = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const dataIndex = imageData.findIndex(
    (data) => data.title.toLowerCase() == pathName
  );
  const searchParams = new URLSearchParams(location.search);
  const searchValue = decodeURI(searchParams.get("q"));
  const brandData = useRecoilValue(brandsAtom);
  const thisBrand = brandData.filter(
    (brand) => brand.name.toLowerCase() == pathName
  )[0];
  const [sortValue, setSortValue] = useState(options[0].value);
  const [payloadGet, setPayloadGet] = useState({
    sort_by: undefined,
    brand_id: undefined,
    name: undefined,
  });

  useEffect(() => {
    if (brandData.length > 0) {
      setPayloadGet({
        sort_by: sortValue,
        brand_id: thisBrand?.id,
        name: searchValue !== "null" ? searchValue : undefined,
      });
    }
  }, [sortValue, thisBrand, searchValue, brandData]);

  const selectedData =
    dataIndex !== undefined ? imageData[dataIndex] : undefined;

  const {
    data: ProductData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getProductByType", payloadGet],
    queryFn: () => getAllProductByType(payloadGet),
    enabled: brandData.length > 0 && payloadGet.sort_by !== undefined,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const handleChangeSortValue = (value) => {
    setSortValue(value);
  };

  useEffect(() => {
    if (sortValue !== options[0].value) {
      setSortValue(options[0].value);
    }
  }, [pathName]);
  return (
    <CustomLayout>
      <div className="w-full max-w-[1280px] mx-auto">
        {selectedData && (
          <ContainerBanners
            title={selectedData?.title}
            image={selectedData?.image}
          />
        )}
        <div className="mt-20">
          {/* control */}
          <div className="flex items-center justify-between mb-8">
            <p className="mr-4 text-xl text-white">Filter: </p>
            <Select
              options={options}
              value={sortValue}
              onChange={(value) => handleChangeSortValue(value)}
            />
          </div>
          {/* product */}
          <Spin spinning={isLoading}>
            <div className="flex flex-wrap gap-4 min-h-[360px]">
              {isError && <p>Something went wrong! Please try again later</p>}
              {ProductData && ProductData?.data?.length === 0 && (
                <p className="text-xl text-white">No products were found!</p>
              )}
              {ProductData &&
                ProductData?.data?.map((product) => (
                  <div key={product?.id}>
                    <ProductCard
                      image={product.image_url}
                      title={product.name}
                      price={product.price}
                      percentDiscount={product.percent_discount}
                      unit={product.unit}
                      id={product.id}
                      brand={
                        pathName !== "product"
                          ? thisBrand?.name
                          : findBrandById(brandData, product.brand_id)?.name
                      }
                    />
                  </div>
                ))}
            </div>
          </Spin>
        </div>
      </div>
    </CustomLayout>
  );
};

export default ProductType;
