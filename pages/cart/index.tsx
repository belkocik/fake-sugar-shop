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
} from '@chakra-ui/react';
import { addToCart, selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';
import CartComponent from '@/components/cart/cart-item';
import {
  motion,
  Variants,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from 'framer-motion';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';

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
  const selectProducts = useSelector(selectAllDataFromStore);
  // console.log(selectIdOfTheProduct);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    // console.log('CART.LENGTH is ', cart.length);
  }, []);

  console.log('length of', selectProducts.length);

  return (
    <>
      <PageLayout title='Koszyk' description='Fake Sugar - koszyk'>
        <VStack>
          <AnimatePresence>
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

            {selectProducts.length < 1 && (
              <MotionBox
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
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
            )}
          </AnimatePresence>
        </VStack>
      </PageLayout>
    </>
  );
};

export default Cart;
