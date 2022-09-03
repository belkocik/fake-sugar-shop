import PageLayout from '@/components/page-layout';
import { useSelector, useDispatch } from 'react-redux';
import {
  VStack,
  Text,
  Image,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Button,
} from '@chakra-ui/react';
import { addToCart, selectId } from 'src/redux/slices/cartSlice';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';
import CartComponent from '@/components/cart-item';

const Cart = () => {
  const selectProducts = useSelector(selectId);
  // console.log(selectIdOfTheProduct);

  return (
    <PageLayout title='Koszyk' description='Fake Sugar - koszyk'>
      <VStack>
        <Box maxW='300px'>
          {selectProducts.map((item) => {
            return <CartComponent item={item} />;
          })}
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default Cart;
