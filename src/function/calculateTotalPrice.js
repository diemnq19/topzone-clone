export const calculateTotalPrice = (cartOrder, cartData) => {
  const total = cartOrder.reduce((acc, current) => {
    const index = cartData.findIndex((item) => item?.cartID == current);
    return (
      acc +
      ((cartData[index]?.product?.price *
        (100 - cartData[index]?.product?.percent_discount * 1)) /
        100) *
        cartData[index]?.quantity
    );
  }, 0);
  return total;
};
