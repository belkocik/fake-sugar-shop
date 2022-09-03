import { TbPaperBag } from 'react-icons/tb';
import { Icon, Flex, Heading, Link, Box, HStack } from '@chakra-ui/react';

import NextLink from 'next/link';
import { NodeNextRequest } from 'next/dist/server/base-http/node';

const Logo = () => {
  return (
    <NextLink href='/' passHref>
      <Link style={{ textDecoration: 'none' }}>
        <Flex fontSize='4xl' fontWeight={500}>
          <Icon as={TbPaperBag} />

          <Heading as='h1' display={{ base: 'none', sm: 'inline-block' }}>
            drogi-cukier
          </Heading>
        </Flex>
      </Link>
    </NextLink>
  );
};

export default Logo;
