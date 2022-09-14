import {
  Text,
  Button,
  HStack,
  Flex,
  Heading,
  Box,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { insertDecimal } from '@/utils/insertDecimal';
import { useUser } from '@auth0/nextjs-auth0';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearCart } from 'src/redux/slices/cartSlice';
import NextLink from 'next/link';
import StockManager from '@/utils/StockManager';
import { GraphQLClient, gql } from 'graphql-request';
import { nanoid } from '@reduxjs/toolkit';

const hygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  }
);

const CheckoutComp = ({ total, shipping, cart }) => {
  const [paymentOk, setPaymentOk] = useState(``);
  const [updateStock, setUpdateStock] = useState(false);
  const { user } = useUser();
  console.log(user);
  console.log('checkout cart', cart);

  const qtest = cart.map((item) => {
    return item.quantity;
  });

  console.log('quantity test:', qtest);

  const titleTest = cart.map((item) => {
    return item.title;
  });
  console.log('title test:', titleTest);
  const finalPrice = insertDecimal(total + shipping);
  console.log('final price in checkout', finalPrice);
  console.log('stock manager cart:', cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateStock) {
      StockManager(cart);
    }
  }, [updateStock]);

  useEffect(() => {
    if (paymentOk.length > 1) {
      dispatch(clearCart());
    }
    // eslint-disable-next-line
  }, [paymentOk]);

  return (
    <Flex
      direction='column'
      fontWeight={500}
      bg='gray.50'
      p={6}
      rounded='lg'
      textAlign='center'
    >
      {/* <Heading as='h3'>Cześć, {user.nickname || ''}👋</Heading> */}
      <Heading as='h3'>💰💸👛🤑💲💳</Heading>
      {finalPrice !== 0 && finalPrice > 10 && (
        <Box>
          <HStack
            justify='space-between'
            bg='green.100'
            p={2}
            rounded='lg'
            mt={2}
            fontWeight={700}
          >
            <Text>Do zapłaty</Text>
            {finalPrice == 0 ? 'x' : <Text>{finalPrice}PLN</Text>}
          </HStack>
          <Box mt={4}>
            <PayPalScriptProvider
              options={{
                'client-id': `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
                currency: 'PLN',
              }}
            >
              <PayPalButtons
                style={{
                  color: 'blue',
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: finalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    setUpdateStock(true);
                    const createOrders = hygraphClient.request(CreateOrder, {
                      userId: user.nickname,
                      totalPrice: finalPrice,
                      quantity: qtest,
                      orderTitle: `Zamówienie: ${nanoid()}`,
                      date: new Date(),
                      productTitle: titleTest,
                    });

                    setPaymentOk(`Transakcja przebiegła pomyślnie.`);
                    toast.success(`Transakcja przebiegła pomyślnie.`, {
                      duration: 10000,
                      position: 'top-center',
                    });
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  });
                }}
              />
            </PayPalScriptProvider>
          </Box>
        </Box>
      )}
      <Flex align='center' justify='center' direction='column'>
        <Text color='green.400' fontSize='xl' textAlign='center'>
          {paymentOk}
        </Text>
        {finalPrice === 0 && (
          <NextLink href='/' passHref>
            <Button as='a' mt={2}>
              Powróć do strony głównej
            </Button>
          </NextLink>
        )}
      </Flex>
      <Box bg='gray.100' p={6} rounded='lg' mt={4}>
        <VStack>
          <Heading as='h3'>Testowa karta do płatności</Heading>
          <Text>Numer karty: 4063337070732799</Text>
          <Text>Wygasa: 10/27</Text>
          <Text>Kod CVC: 997</Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CheckoutComp;

const CreateOrder = gql`
  mutation CreateOrder(
    $userId: String
    $totalPrice: Float
    $quantity: [Int!]
    $orderTitle: String
    $date: Date
    $productTitle: [String!]
  ) {
    createOrder(
      data: {
        userId: $userId
        totalPrice: $totalPrice
        quantity: $quantity
        orderTitle: $orderTitle
        date: $date
        productTitle: $productTitle
      }
    ) {
      userId
      totalPrice
      quantity
      orderTitle
      date
      productTitle
    }
  }
`;
