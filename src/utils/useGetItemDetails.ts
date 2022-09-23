import { insertDecimal } from './insertDecimal';
const useGetItemDetails = (price, discountValue) => {
  const discountPrice = insertDecimal(price - price * (discountValue / 100));

  return {
    discountPrice,
  };
};
export default useGetItemDetails;
