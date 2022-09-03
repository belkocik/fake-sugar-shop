import React, { useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import {
  Link,
  Icon,
  Flex,
  Box,
  Stack,
  Avatar,
  AvatarBadge,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { selectAllDataFromStore } from 'src/redux/slices/cartSlice';

const CartIcon = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const selectProducts = useSelector(selectAllDataFromStore);

  const allItemsFromCart = [];

  if (!loading) {
    selectProducts.map((item) => {
      allItemsFromCart.push(item.quantity);
    });
  }

  const initialAmount = 0;
  const itemsInCart = allItemsFromCart.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );

  console.log('items in cart', itemsInCart);

  return (
    // <Flex direction='row' align='center'>
    //   {itemsInCart > 0 && (
    //     <Box bg='gray.100' p='1'>
    //       {itemsInCart}
    //     </Box>
    //   )}
    //   <NextLink href='/cart' passHref>
    //     <Link>
    //       <Icon as={FiShoppingBag} w={8} h={8} mr={2} mt={2} />
    //     </Link>
    //   </NextLink>
    // </Flex>
    <Stack direction='row' spacing={4}>
      {/* You can also change the borderColor and bg of the badge */}
      <NextLink href='/cart' passHref>
        <Link>
          <Avatar
            size='sm'
            // src='https://icons.veryicon.com/png/o/miscellaneous/unicons/cart-38.png'
            src='/assets/images/cart-icon.svg'
            bg='gray.50'
          >
            {itemsInCart > 0 && (
              <AvatarBadge borderColor='gray.100' bg='teal.200' boxSize='1.7em'>
                <Text>{itemsInCart}</Text>
              </AvatarBadge>
            )}
          </Avatar>
        </Link>
      </NextLink>
    </Stack>
  );
};

export default CartIcon;
