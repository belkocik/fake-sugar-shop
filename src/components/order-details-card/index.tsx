import React from 'react';
import { Box, Stack, Text, Flex, chakra, Badge } from '@chakra-ui/react';
import NextImage from 'next/image';

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
    ].includes(prop),
});

const OrderDetailsCard = ({ title, quantity, imageUrl }) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems='center'
      gap='2'
      justifyContent='center'
      bg='gray.50'
      p={8}
      rounded='xl'
      mt={2}
    >
      <Box>
        <Stack direction={{ base: 'column', md: 'row' }} align='center'>
          <Image
            rounded='lg'
            width='300px'
            height='160px'
            src={imageUrl}
            alt={title}
            draggable='false'
            loading='lazy'
            quality={50}
            placeholder='blur'
            blurDataURL={imageUrl}
            objectFit='fill'
          />
          <Box textAlign='center' justifyContent='center' width='300px'>
            <Text fontWeight='medium'>{title}</Text>
          </Box>
          <Box textAlign='center' justifyContent='center' width='300px'>
            <Badge variant='subtle' fontSize='13px'>
              sztuk: {quantity}
            </Badge>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default OrderDetailsCard;
