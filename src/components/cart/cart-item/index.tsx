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
} from '@chakra-ui/react';
import { addToCart, selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';
import CartProductMeta from '../cart-product-meta';

const CartComponent = ({ item }) => {
  const selectProducts = useSelector(selectAllDataFromStore);
  // console.log(selectIdOfTheProduct);
  const dispatch = useDispatch();

  return (
    <Box>
      {/* <hr />
      <Text>{item.title}</Text>
      <Text>Brand: {item.brand}</Text>
      <Box>
        <Button onClick={() => dispatch(incrementQuantity(item))}>+</Button>
        <Text>ilosc: {item.quantity}</Text>
        <Button onClick={() => dispatch(decrementQuantity(item.id))}>-</Button>
      </Box>
      <Button colorScheme={'red'} onClick={() => dispatch(removeItem(item))}>
        x
      </Button>
      <hr /> */}

      <Flex direction='row' alignItems='center' gap='2' justifyContent='center'>
        <HStack mt={2}>
          <Image
            rounded='lg'
            width='160px'
            height='160px'
            fit='cover'
            src={item.coverImage}
            alt={item.title}
            draggable='false'
            loading='lazy'
          />
          <Box pt='4' textAlign='center' justifyContent='center' width='300px'>
            <Stack spacing='0.5'>
              <Text fontWeight='medium'>{item.title}</Text>
              <Text color='gray.400' fontSize='sm'>
                {item.brand}
              </Text>
            </Stack>
          </Box>
          <Stack direction='row' align='center'>
            <Button
              rounded='xl'
              size='sm'
              onClick={() => dispatch(incrementQuantity(item))}
              fontWeight={800}
            >
              +
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              rounded='xl'
              size='sm'
              onClick={() => dispatch(decrementQuantity(item.id))}
              fontWeight={800}
            >
              -
            </Button>
            <Box width='100px' textAlign='center'>
              <Text fontWeight={800} fontSize={'xl'}>
                {item.price}PLN
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
        </HStack>
      </Flex>
    </Box>
  );
};

export default CartComponent;
