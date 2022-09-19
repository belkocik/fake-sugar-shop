import PageLayout from '@/components/page-layout';
import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { GetServerSideProps } from 'next';
import hygraph from '@/utils/graphqlRequestClient';
import { gql } from 'graphql-request';
import NextLink from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const Profile = ({ order }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  // additional route protection
  if (user) {
    if (!user.email_verified) {
      router.push('/');
      toast.error('Zweryfikuj swój e-mail aby wyświetlić zamówienia!');
    }
  } else {
    // if !user
    router.push('/');
  }

  const dateFormat = (date) => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('/');
  };

  if (user) {
    return (
      <PageLayout
        title='Profil użytkownika'
        description='Profil użytkownika gdzie znajdują się informacje na temat zamówień.'
      >
        <Flex direction='column' py={8}>
          <Heading>
            Cześć{' '}
            <Box as='span' color='teal.400'>
              {user.nickname}
            </Box>
            👋
          </Heading>
          <Box>
            <Heading as='h2' fontSize='2xl' pt={4}>
              Oto twoje zamówienia
            </Heading>

            <Alert status='info' rounded='lg'>
              <AlertIcon />

              <AlertDescription>
                Zamówienie pojawi się tutaj jak zostanie zaakceptowane przez
                pracownika.
              </AlertDescription>
            </Alert>
            <Box>
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
              {order.length === 0 && (
                <Text fontWeight={500} fontSize='2xl' align='center' mt={2}>
                  Brak zamówień 🥺
                </Text>
              )}
            </Box>
          </Box>
          <Box m={4}>
            <NextLink href='/' passHref>
              <Button colorScheme='gray'>Powróć do strony głównej</Button>
            </NextLink>
          </Box>
        </Flex>
      </PageLayout>
    );
  }
};

export default Profile;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const currentUser = context.params.userId;

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
  },
});
