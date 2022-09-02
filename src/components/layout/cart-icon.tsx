import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { Link, Icon, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';

const CartIcon = () => {
  return (
    <NextLink href='/cart' passHref>
      <Link>
        <Icon as={FiShoppingBag} w={8} h={8} mr={2} mt={2} />
      </Link>
    </NextLink>
  );
};

export default CartIcon;
