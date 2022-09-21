import { Button, Stack, IconButton } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import React from 'react';

const Pagination = ({ hasPreviousPage, hasNextPage, setSkip, skip }) => {
  return (
    <Stack direction='row'>
      <IconButton
        aria-label='previous page of products'
        disabled={!hasPreviousPage}
        onClick={() => setSkip(skip - 6)}
        icon={<ArrowLeftIcon />}
      ></IconButton>
      <Button
        aria-label='start page products'
        onClick={() => setSkip(0)}
        disabled={!skip}
        bg='teal.200'
        _hover={{ bg: 'teal.300' }}
      >
        🚀
      </Button>
      <IconButton
        aria-label='next page of products'
        disabled={!hasNextPage}
        onClick={() => setSkip(skip + 6)}
        icon={<ArrowRightIcon />}
      ></IconButton>
    </Stack>
  );
};

export default React.memo(Pagination);
