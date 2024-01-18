export const calculateTotalPriceWithDiscount = (shoppingCartList) => {
    let totalPrice = 0;

    shoppingCartList.forEach(cartItem => {
        if (cartItem.product && cartItem.product.price) {
            const quantity = cartItem.quantity || 0;
            const price = parseFloat(cartItem.product.price) || 0;
            const percentDiscount = parseFloat(cartItem.product.percent_discount) || 0;

            // Tính giảm giá cho mỗi sản phẩm
            const discountedPrice = price * (1 - percentDiscount / 100);

            // Tổng giá trị sau giảm giá
            totalPrice += quantity * discountedPrice;
        }
    });

    return totalPrice;
}