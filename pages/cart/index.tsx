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

  return (
    <PageLayout title='Koszyk' description='Fake Sugar - koszyk'>
      <VStack>
        <AnimatePresence>
          {selectProducts.map((item) => {
            return (
              // <AnimatePresence>
              //   <MotionBox variants={container} initial='hidden' animate='show'>
              //     <motion.div variants={children} key={item.slug}>
              //       <CartComponent item={item} />
              //     </motion.div>
              //   </MotionBox>
              // </AnimatePresence>
              <motion.div
                key={item.slug}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -200 }}
              >
                <CartComponent item={item} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </VStack>
    </PageLayout>
  );
};

export default Cart;
