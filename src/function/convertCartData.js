export const convertCartData = (cartData) => {
  const convertData = cartData.map((item) => ({
    cartID: item.id,
    product: item.product,
    progress: item.progress,
    quantity: item.quantity,
  }));
  return convertData;
};

export const addResCartData = (cartData) => {
  const convert = {
    cartID: cartData.item.id,
    product: cartData.product,
    quantity: cartData.item.quantity,
    progress: cartData.item.progress,
  };
  return convert;
};

export const findCartIDByProductID = (cartData, productID) => {
  const productIndex = cartData.findIndex(
    (item) => item.product.id == productID
  );
  if (productIndex != -1) {
    return cartData[productIndex].cartID;
  } else return null;
};

export const convertOrdeData = (cartOrder, cartData) => {
  const newCartOrder = cartOrder.map((item) => {
    const data = cartData.findIndex((cartItem) => cartItem.cartID === item);
    if (data !== -1) return cartData[data];
  });
  return newCartOrder;
};

export const returnCart = (cartOrder, cartData) => {
  const newCart = cartData.filter((item) => {
    if (cartOrder.includes(item.cartID)) return;
    return item;
  });
  return newCart;
};
