export const convertPurchaseData = (data) => {
  const convertData = data.map((item) => {
    const { shopping_cart_list, ...rest } = item;
    const itemConvert = item.shopping_cart_list.map((shoppingCart) => {
      if (!!shoppingCart.product)
        return { ...rest, shopping_cart: shoppingCart };
    });
    return itemConvert;
  });
  return convertData.flat();
};
