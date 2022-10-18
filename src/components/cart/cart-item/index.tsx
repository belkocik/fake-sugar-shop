import React from 'react';
import {
  Box,
  Image,
  Link,
  Stack,
  Text,
  Flex,
  Button,
  HStack,
  Badge,
  Tooltip,
  CloseButton,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';

import NextLink from 'next/link';

import { insertDecimal } from '@/utils/insertDecimal';
import useGetItemDetails from '@/utils/useGetItemDetails';

const CartComponent = ({ item }) => {
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
              <Tooltip
                label='Zobacz produkt'
                fontSize='md'
                bg='gray.100'
                hasArrow
                placement='bottom'
                aria-label='A tooltip'
              >
                <Image
                  rounded='lg'
                  width='300px'
                  height='160px'
                  fit='cover'
                  src={item.coverImage}
                  alt={item.title}
                  draggable='false'
                  loading='lazy'
                />
              </Tooltip>
            </Link>
          </NextLink>
          <Box textAlign='center' justifyContent='center' width='300px'>
            <Stack spacing='0.5' align='center'>
              {item.isOnDiscount && item.isNewProduct ? (
                <Flex gap={1}>
                  <Badge colorScheme='teal'>Nowy</Badge>
                  <Badge colorScheme='red'>
                    Promocja -{item.discountValue}%
                  </Badge>
                </Flex>
              ) : item.isOnDiscount ? (
                <Badge colorScheme='red'>Promocja -{item.discountValue}%</Badge>
              ) : item.isNewProduct ? (
                <Badge colorScheme='teal'>Nowy</Badge>
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

          <CloseButton
            onClick={() => dispatch(removeItem(item))}
            colorScheme='red'
          />
        </Stack>
      </Box>
    </Flex>
  );
};

export default CartComponent;
