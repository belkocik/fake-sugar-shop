import PageLayout from '@/components/page-layout';
import {
  Box,
  Heading,
  Text,
  Progress,
  Button,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { gql } from 'graphql-request';
import hygraph from '@/utils/graphqlRequestClient';
import { GetServerSideProps } from 'next';
import OrderDetailsCard from '@/components/order-details-card';
import NextLink from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const OrderDetails = ({ orderDetails }) => {
  const productTitles = orderDetails.productTitle.map((item) => item);
  const productQuantity = orderDetails.quantity.map((item) => item);
  const productImageUrl = orderDetails.imageUrl.map((item) => item);

  const merged = productTitles.map((title, i) => [
    title,
    productQuantity[i],
    productImageUrl[i],
  ]);

  const { user, error, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  const router = useRouter();

  // additional route protection
  if (user) {
    if (!user.email_verified) {
      router.push('/');
    }
  } else {
    // if !user
    router.push('/');
  }

  //

  if (user) {
    return (
      <PageLayout
        title={`${orderDetails.orderTitle}`}
        description='Zamówienie z wszystkimi informacjami na temat zakupionych produktów przez klienta.'
      >
        <Box py={8}>
          <Heading as='h1'>{orderDetails.orderTitle}</Heading>
          <Box>
            <Text fontWeight={500}>Etap: Przetwarzanie zamówienia 1/4</Text>
            <Progress size='xs' isIndeterminate colorScheme='teal' />
          </Box>
          <Heading mt={4} as='h2' fontSize='2xl'>
            Zakupione produkty
          </Heading>
          <Box>
            {merged.map(([title, quantity, imageUrl]) => (
              <OrderDetailsCard
                title={title}
                quantity={quantity}
                imageUrl={imageUrl}
                key={title}
              />
            ))}
            <Text fontWeight={800} fontSize={'xl'} mt={2}>
              Suma z dostawą: {orderDetails.totalPrice}PLN
            </Text>
          </Box>
          <NextLink href={`/profile/${orderDetails.userId}`} passHref>
            <Button colorScheme='gray' mt={2}>
              Powróć do listy zamówień
            </Button>
          </NextLink>
        </Box>
      </PageLayout>
    );
  }
};

export default OrderDetails;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const currentOrder = context.params.orderTitle;
    console.log('context', currentOrder);

    const query = gql`
      query ($currentOrder: String!) {
        orders(where: { orderTitle: $currentOrder }) {
          userId
          orderTitle
          productTitle
          quantity
          totalPrice
          date
          imageUrl
        }
      }
    `;
    const variables = { currentOrder };
    const order = await hygraph.request(query, variables);

    return {
      props: {
        orderDetails: order.orders[0],
      },
    };
  },
});
