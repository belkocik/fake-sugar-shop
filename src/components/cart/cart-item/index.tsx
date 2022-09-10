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
  useNumberInput,
  Input,
  Tooltip,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';

import NextLink from 'next/link';
import { CloseButton } from '@chakra-ui/react';

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

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: item.quantity,
      min: 1,
      max: item.stock,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
                bg='gray.50'
                hasArrow
                placement='bottom'
                aria-label='A tooltip'
              >
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
              </Tooltip>
            </Link>
          </NextLink>
          <Box textAlign='center' justifyContent='center' width='300px'>
            <Stack spacing='0.5' align='center'>
              {item.isOnDiscount && item.isNewProduct ? (
                <Flex gap={1}>
                  <Badge colorScheme='purple'>Nowy</Badge>
                  <Badge colorScheme='red'>
                    Promocja -{item.discountValue}%
                  </Badge>
                </Flex>
              ) : item.isOnDiscount ? (
                <Badge colorScheme='red'>Promocja -{item.discountValue}%</Badge>
              ) : item.isNewProduct ? (
                <Badge colorScheme='purple'>Nowy</Badge>
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
            <Button {...inc} onClick={() => dispatch(incrementQuantity(item))}>
              +
            </Button>
            <Input
              {...input}
              w='80px'
              textAlign='center'
              color='black'
              fontWeight={900}
              disabled={true}
            />
            <Button
              {...dec}
              onClick={() => dispatch(decrementQuantity(item.id))}
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
