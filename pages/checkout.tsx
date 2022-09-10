import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import useGetCartTotal from '@/utils/useGetCartTotal';
import { useSelector } from 'react-redux';
import PageLayout from '@/components/page-layout';
import { useUser } from '@auth0/nextjs-auth0';

import CheckoutComp from '@/components/checkout';
import { useRouter } from 'next/router';

const Checkout = () => {
  const selectProducts = useSelector(selectAllDataFromStore);
  const { shipping, total } = useGetCartTotal(selectProducts);
  const { user } = useUser();
  const router = useRouter();

  // route protection
  if (user) {
    if (!user.email_verified) {
      router.push('/');
    }
  } else {
    // if !user
    router.push('/');
  }

  //

  return (
    <PageLayout title='checkout' description='checkout desc'>
      <CheckoutComp shipping={shipping} total={total} cart={selectProducts} />
    </PageLayout>
  );
};

export default Checkout;
