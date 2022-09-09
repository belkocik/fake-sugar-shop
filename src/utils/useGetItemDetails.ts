import { insertDecimal } from './insertDecimal';
const useGetItemDetails = (price, discountValue) => {
  const discountPrice = insertDecimal(price - price * (discountValue / 100));

  // do some stuff to not repeat code
  // wooooooooo
  // WOW

  return {
    discountPrice,
  };
};
export default useGetItemDetails;
