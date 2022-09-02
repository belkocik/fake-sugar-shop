import PageLayout from '@/components/page-layout';

import useCartStore from 'store/zustand';

import { VStack, Box, Text, Image } from '@chakra-ui/react';

const Cart = () => {
  const ProductsInCart = useCartStore((state) => state.carts);
  console.log(ProductsInCart);

  return (
    <PageLayout title='Koszyk' description='Fake Sugar - koszyk'>
      <VStack>
        <Box maxW='300px'>
          {ProductsInCart.map((item) => (
            <Box>
              <Text>{item.title}</Text>
              <Image src={item.coverImage} />
            </Box>
          ))}
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default Cart;
