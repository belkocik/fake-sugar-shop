import React from 'react';
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  HStack,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const CartTotal = ({ total, shipping }) => {
  return (
    <Flex direction='column'>
      <Heading as='h3'>Podsumowanie zamówienia</Heading>
      <HStack justify='space-between'>
        <Text>Suma częsciowa</Text>
        <Text>{total}PLN</Text>
      </HStack>
      <HStack justify='space-between'>
        <Text>Dostawa</Text>
        <Text>10PLN</Text>
      </HStack>
      <HStack justify='space-between'>
        <Text>Suma</Text>
        <Text>{total + shipping}PLN</Text>
      </HStack>
      <Button mt={4} colorScheme='green'>
        Zaloguj się aby kontynuować
      </Button>
    </Flex>
  );
};

export default CartTotal;
