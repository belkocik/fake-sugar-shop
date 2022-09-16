import { Button, HStack } from '@chakra-ui/react';

const Pagination = ({ hasPreviousPage, hasNextPage, setSkip, skip }) => {
  return (
    <HStack>
      <Button disabled={!hasPreviousPage} onClick={() => setSkip(skip - 9)}>
        Poprzednie produkty
      </Button>

      <Button disabled={!hasNextPage} onClick={() => setSkip(skip + 9)}>
        Następne produkty
      </Button>
    </HStack>
  );
};

export default Pagination;
