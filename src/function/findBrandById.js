export const findBrandById = (brands, brandId) => {
  const brand = brands.find((item) => item.id === brandId);
  return brand;
};
