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
  BoxProps,
  Divider,
  Center,
} from '@chakra-ui/react';
import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  clearCart,
} from 'src/redux/slices/cartSlice';
import CartComponent from '@/components/cart/cart-item';
import {
  motion,
  Variants,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from 'framer-motion';

import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import CartTotal from '@/components/cart/cart-total';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const children = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const MotionBox = motion<BoxProps>(Box);

const Cart = () => {
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const selectProducts = useSelector(selectAllDataFromStore);
  const dispatch = useDispatch();

  // ------------- calc total amount start ------------------------
  let shipping = 10;
  const allItemsSubtotals = [];
  !loading &&
    selectProducts.length &&
    selectProducts.map((item) => {
      const subtotal = item.onDiscount
        ? item.price * item.quantity -
          item.price * item.quantity * (item.discountValue / 100)
        : item.price * item.quantity;
      allItemsSubtotals.push(subtotal);
    });

  const initialAmount = 0;
  const allSubtotals = allItemsSubtotals.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );
  const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;
  total > 0 ? (shipping = 10) : (shipping = 0);

  console.log('total amount:', total);
  // ------------- calc total amount end ------------------------

  return (
    <>
      <PageLayout title='Koszyk' description='Fake Sugar - koszyk'>
        <VStack position='relative'>
          <AnimatePresence>
            {selectProducts.map((item) => {
              return (
                <MotionBox
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -200 }}
                  key={item.slug}
                >
                  <CartComponent item={item} />
                </MotionBox>
              );
            })}
            {selectProducts.length > 0 && (
              <Box p={4} overflow='hidden'>
                <Flex justify='space-between' mt={2}>
                  <NextLink href='/' passHref>
                    <Button>Kontynuuj zakupy</Button>
                  </NextLink>
                  <Button
                    colorScheme='red'
                    onClick={() => dispatch(clearCart())}
                  >
                    Wyczyść koszyk
                  </Button>
                </Flex>
                <Center mt={4} mb={4}>
                  <Divider orientation='horizontal' />
                </Center>
                <CartTotal total={total} shipping={shipping} />
              </Box>
            )}
            {selectProducts.length < 1 && (
              <MotionBox
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                zIndex='tooltip'
                position='absolute'
                width='400px'
                mt={10}
              >
                <Flex direction='column' align='center' justify='center'>
                  <Heading as='h3' fontSize='3xl' textAlign='center'>
                    Twój koszyk jest pusty.
                  </Heading>
                  <NextLink href='/' passHref>
                    <Button colorScheme='gray'>Przeglądaj produkty</Button>
                  </NextLink>
                </Flex>
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
      </PageLayout>
    </>
  );
};

export default Cart;

{
  /* <AnimatePresence>
{selectProducts.map((item) => {
  return (
    <motion.div
      key={item.slug}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <CartComponent item={item} />
    </motion.div>
  );
})}
</AnimatePresence> */
}

{
  /* {selectProducts.length < 1 && (
              <MotionBox
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
                zIndex='tooltip'
              >
                <Flex direction='column' align='center' justify='center'>
                  <Heading as='h3' fontSize='3xl'>
                    Twój koszyk jest pusty.
                  </Heading>
                  <NextLink href='/' passHref>
                    <Button colorScheme='gray'>Przeglądaj produkty</Button>
                  </NextLink>
                </Flex>
              </MotionBox>
            )} */
}
