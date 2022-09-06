import React from 'react';
import {
  Box,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  Flex,
  Button,
  HStack,
  BoxProps,
  Badge,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import { addToCart, selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';

import NextLink from 'next/link';

import { motion, Variants, AnimatePresence } from 'framer-motion';

import { AnimateSharedLayout } from 'framer-motion';
import { insertDecimal } from '@/utils/insertDecimal';
import useGetItemDetails from '@/utils/useGetItemDetails';
const MotionBox = motion<BoxProps>(Box);

const CartComponent = ({ item }) => {
  // const selectProducts = useSelector(selectAllDataFromStore);
  // console.log(selectIdOfTheProduct);
  const dispatch = useDispatch();

  // calc price start
  const fullPrice = insertDecimal(item.price * item.quantity);
  const { price, discountValue } = item;
  const { discountPrice } = useGetItemDetails(price, discountValue);
  const discountFullPrice = insertDecimal(discountPrice * item.quantity);
  // calc price end

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems='center'
      gap='2'
      justifyContent='center'
      bg='gray.50'
      p={8}
      rounded='xl'
    >
      <Box>
        <Stack direction={{ base: 'column', md: 'row' }} align='center'>
          <NextLink href={`/products/${item.slug}`} passHref>
            <Link>
              <Image
                rounded='lg'
                width='300px'
                height='160px'
                fit='cover'
                src={item.coverImage.url}
                alt={item.title}
                draggable='false'
                loading='lazy'
              />
            </Link>
          </NextLink>
          <Box textAlign='center' justifyContent='center' width='300px'>
            <Stack spacing='0.5' align='center'>
              {item.isNewProduct ? (
                <Badge colorScheme='pink'>Nowy</Badge>
              ) : item.isOnDiscount ? (
                <Badge colorScheme='purple'>Promocja</Badge>
              ) : null}
              <Text fontWeight='medium'>{item.title}</Text>
              <Text color='gray.400' fontSize='sm'>
                {item.brand}
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Stack direction={{ base: 'column', md: 'row' }} align='center'>
          <HStack mr={{ base: 0, md: 4 }}>
            {' '}
            <Button
              rounded='xl'
              size='sm'
              onClick={() => dispatch(incrementQuantity(item))}
              fontWeight={800}
            >
              +
            </Button>
            <Text fontWeight={500} width='20px' textAlign='center'>
              {item.quantity}
            </Text>
            <Button
              rounded='xl'
              size='sm'
              onClick={() => dispatch(decrementQuantity(item.id))}
              fontWeight={800}
            >
              -
            </Button>
          </HStack>

          <Box width='120px' textAlign='center'>
            <Text fontWeight={800} fontSize={'xl'}>
              {item.isOnDiscount ? discountFullPrice : fullPrice}PLN
            </Text>
          </Box>

          <Button
            colorScheme={'red'}
            onClick={() => dispatch(removeItem(item))}
            rounded='xl'
            size='sm'
            fontWeight={800}
          >
            X
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default CartComponent;
