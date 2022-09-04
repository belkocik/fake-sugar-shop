import React from 'react';
import { Box, HStack, Icon, Image, Link, Stack, Text } from '@chakra-ui/react';
import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';

const CartProductMeta = ({ item }) => {
  const selectProducts = useSelector(selectAllDataFromStore);
  // console.log(selectIdOfTheProduct);
  const dispatch = useDispatch();
  return (
    <Stack direction='row' spacing='5' width='full'>
      <Image
        rounded='lg'
        width='120px'
        height='120px'
        fit='cover'
        src={item.coverImage}
        alt={item.title}
        draggable='false'
        loading='lazy'
      />
      <Box pt='4'>
        <Stack spacing='0.5'>
          <Text fontWeight='medium'>{item.title}</Text>
          <Text color='gray.400' fontSize='sm'>
            {item.brand}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartProductMeta;
