import PageLayout from '@/components/page-layout';
import { Box, Heading, Text, HStack, Badge } from '@chakra-ui/react';
import React from 'react';
import { GetServerSideProps } from 'next';
import hygraph from '@/utils/graphqlRequestClient';
import { gql } from 'graphql-request';
import NextLink from 'next/link';

const Profile = ({ order }) => {
  const username = order[0].userId;

  const dateFormat = (date) => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('/');
  };

  return (
    <PageLayout
      title='Profil użytkownika'
      description='Profil użytkownika gdzie znajdują się informacje na temat zamówień.'
    >
      <Box py={8}>
        <Heading>
          Cześć{' '}
          <Box as='span' color='teal.400'>
            {username}
          </Box>
          👋
        </Heading>
        <Box>
          <Heading as='h2' fontSize='2xl' pt={4}>
            Oto twoje zamówienia
          </Heading>
          <Badge colorScheme='blue' fontSize='14px'>
            Zamówienie pojawi się tutaj jak zostanie zaakceptowane przez
            pracownika
          </Badge>

          {order.map((item) => (
            <Box key={item.orderTitle}>
              <NextLink href={`/profile/orders/${item.orderTitle}`}>
                <HStack
                  bg='gray.50'
                  p={6}
                  m={4}
                  justify='space-between'
                  rounded='lg'
                  cursor='pointer'
                  _hover={{
                    bg: 'gray.100',
                  }}
                >
                  <Text>{item.orderTitle}</Text>
                  <Text>{dateFormat(item.date)}</Text>
                </HStack>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentUser = context.params.userId;
  console.log('context', currentUser);

  const query = gql`
    query ($currentUser: String!) {
      orders(where: { userId: $currentUser }) {
        userId
        orderTitle
        date
      }
    }
  `;
  const variables = { currentUser };
  const order = await hygraph.request(query, variables);

  return {
    props: {
      order: order.orders,
    },
  };
};
