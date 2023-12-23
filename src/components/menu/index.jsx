import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getBrand } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import brandsAtom from "../../recoil/brands";

const getBrands = async () => {
  const res = await getBrand();
  return res.data;
};
const Menu = () => {
  const location = useLocation();
  const pathRoute = location.pathname.split("/")[1];
  const setBrandData = useSetRecoilState(brandsAtom);

  const {
    data: brandData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getBrand"],
    queryFn: getBrands,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (value) => setBrandData(value),
  });

  return (
    <div className="text-base text-white flex items-center">
      {brandData &&
        brandData?.map((brand) => (
          <Link
            key={brand?.id}
            to={`/${encodeURI(brand?.name.toLowerCase())}`}
            className={`${
              decodeURI(pathRoute) === brand?.name.toLowerCase()
                ? "bg-white/20"
                : "hover:bg-white/20"
            } p-6 h-full min-w-[100px] text-center hover:text-white`}
          >
            {brand?.name}
          </Link>
        ))}
    </div>
  );
};

export default Menu;
