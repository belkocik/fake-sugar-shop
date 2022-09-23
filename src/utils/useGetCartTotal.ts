const useGetCartTotal = (selectProducts) => {
  let shipping = 10;

  const allItemsSubtotals = selectProducts.map((item) => {
    const subtotal = item.isOnDiscount
      ? item.price * item.quantity -
        item.price * item.quantity * (item.discountValue / 100)
      : item.price * item.quantity;

    return subtotal;
  });

  const initialAmount = 0;
  const allSubtotals = allItemsSubtotals.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );
  const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;
  total > 0 ? (shipping = 10) : (shipping = 0);

  return { shipping, total };
};

export default useGetCartTotal;
