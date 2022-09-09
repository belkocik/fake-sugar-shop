import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import useGetCartTotal from '@/utils/useGetCartTotal';
import { useSelector } from 'react-redux';
import PageLayout from '@/components/page-layout';

import CheckoutComp from '@/components/checkout';

const Checkout = () => {
  const selectProducts = useSelector(selectAllDataFromStore);
  const { shipping, total } = useGetCartTotal(selectProducts);

  return (
    <PageLayout title='checkout' description='checkout desc'>
      <CheckoutComp shipping={shipping} total={total} cart={selectProducts} />
    </PageLayout>
  );
};

export default Checkout;
