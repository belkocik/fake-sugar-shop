import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { addToCart, selectId } from 'src/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'src/redux/slices/cartSlice';

const CartComponent = ({ item }) => {
  const selectProducts = useSelector(selectId);
  // console.log(selectIdOfTheProduct);
  const dispatch = useDispatch();

  return (
    <Box>
      <hr />
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
      <hr />
    </Box>
  );
};

export default CartComponent;
