import {
  Text,
  Button,
  HStack,
  Flex,
  Heading,
  Box,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { insertDecimal } from '@/utils/insertDecimal';
// import { FaArrowRight } from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0';
// import NextLink from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  clearCart,
} from 'src/redux/slices/cartSlice';
import NextLink from 'next/link';

const CheckoutComp = ({ total, shipping }) => {
  const [paymentOk, setPaymentOk] = useState(``);
  const [loading, setIsLoading] = useState(true);
  const [updateStock, setUpdateStock] = useState(false);
  const { user } = useUser();
  const finalPrice = insertDecimal(total + shipping);
  console.log('final price in checkout', finalPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (paymentOk.length > 1) {
      dispatch(clearCart());
    }
    // eslint-disable-next-line
  }, [paymentOk]);

  //   useEffect(() => {
  //     !loading &&

  //     // eslint-disable-next-line
  //   }, [loading]);

  return (
    <Flex direction='column' fontWeight={500} bg='gray.50' p={6} rounded='lg'>
      <Heading as='h3'>Cześć, {user.nickname}👋</Heading>
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
                  return actions.order
                    .capture()

                    .then((details) => {
                      // const name = details.payer.name.given_name;
                      // alert(`Transaction completed by ${name}`);
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
      <Box bg='blue.200' p={6} rounded='lg' mt={4}>
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
