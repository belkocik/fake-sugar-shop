import React, { useEffect, useState } from 'react';

import { Link, Stack, Avatar, AvatarBadge, Text } from '@chakra-ui/react';
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

  return (
    <Stack direction='row' spacing={4}>
      <NextLink href='/cart' passHref>
        <Link>
          <Avatar
            size='sm'
            src='/assets/images/cart-icon.svg'
            bg='none'
            mr={2}
            name='cart icon'
          >
            {itemsInCart > 0 && (
              <AvatarBadge borderColor='black' bg='teal.200' boxSize='1.7em'>
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
