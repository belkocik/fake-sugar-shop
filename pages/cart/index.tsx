import PageLayout from '@/components/page-layout';
import { useSelector, useDispatch } from 'react-redux';
import {
  VStack,
  Box,
  Flex,
  Heading,
  Button,
  BoxProps,
  Divider,
  Center,
} from '@chakra-ui/react';
import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import { clearCart } from 'src/redux/slices/cartSlice';
import CartComponent from '@/components/cart/cart-item';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import NextLink from 'next/link';
import CartTotal from '@/components/cart/cart-total';
import useGetCartTotal from '@/utils/useGetCartTotal';

const MotionBox = motion<BoxProps>(Box);

const Cart = () => {
  const selectProducts = useSelector(selectAllDataFromStore);
  const dispatch = useDispatch();
  const { shipping, total } = useGetCartTotal(selectProducts);

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
                    onClick={() => {
                      toast.error('Usunięto wszystkie produkty z koszyka');
                      dispatch(clearCart());
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
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
