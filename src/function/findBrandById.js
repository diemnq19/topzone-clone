export const findBrandById = (brands, brandId) => {
  const brand = brands.find((item) => item.id === brandId);
  console.log("brand", brand);
  return brand;
};
