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
  Divider,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { insertDecimal } from '@/utils/insertDecimal';
import { FaArrowRight } from 'react-icons/fa';

const CartTotal = ({ total, shipping }) => {
  const finalPrice = insertDecimal(total + shipping);
  return (
    <Flex direction='column' fontWeight={500} bg='gray.50' p={6} rounded='lg'>
      <Heading as='h3'>Podsumowanie zamówienia</Heading>
      <HStack justify='space-between' bg='teal.100' p={2} rounded='lg' mt={1}>
        <Text>Suma częsciowa</Text>
        <Text>{total}PLN</Text>
      </HStack>
      <HStack justify='space-between' bg='cyan.100' p={2} rounded='lg' mt={1}>
        <Text>Dostawa</Text>
        <Text>10PLN</Text>
      </HStack>
      {/* <Divider orientation='horizontal' mt={1} mb={1} /> */}
      <HStack justify='space-between' bg='green.100' p={2} rounded='lg' mt={1}>
        <Text>Suma</Text>
        <Text fontWeight={500}>{finalPrice}PLN</Text>
      </HStack>
      <Button mt={4} colorScheme='green' rightIcon={<FaArrowRight />} size='lg'>
        Zaloguj się aby kontynuować
      </Button>
    </Flex>
  );
};

export default CartTotal;
