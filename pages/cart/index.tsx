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
  const dispatch = useDispatch();
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
              <Box pt={4} overflow='hidden'>
                <Center w='60vw'>
                  <Divider orientation='horizontal' />
                </Center>
                <Button mt={2} onClick={() => dispatch(clearCart())}>
                  Wyczyść koszyk
                </Button>
              </Box>
            )}
            {selectProducts.length < 1 && (
              <MotionBox
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                zIndex='tooltip'
                position='absolute'
                width='400px'
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
