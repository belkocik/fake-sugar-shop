import { insertDecimal } from './insertDecimal';
const useGetItemDetails = (price, discountValue) => {
  //   const isPromoProd = isOnDiscount;
  const discountPrice = insertDecimal(price - price * (discountValue / 100));

  // const price = insertDecimal(item.price);
  // const tempPrice = item.price;
  // const discount = item.discountValue;
  // const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));

  return {
    discountPrice,
  };
};
export default useGetItemDetails;
