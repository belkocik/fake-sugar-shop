import PageLayout from '@/components/page-layout';
import { Button, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

const NotFoundPage = () => {
  return (
    <PageLayout title='404' description='Not Found'>
      <VStack spacing={2} justify='center' h='50vh'>
        <Heading>404 Not found</Heading>
        <Divider />
        <Text>Nie znaleziono takiej strony.</Text>
        <NextLink href='/' passHref>
          <Button size='md'>Wróc na strone główną</Button>
        </NextLink>
      </VStack>
    </PageLayout>
  );
};

export default NotFoundPage;
