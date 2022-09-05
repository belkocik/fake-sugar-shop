import { TbPaperBag } from 'react-icons/tb';
import { Icon, Flex, Heading, Link, Box } from '@chakra-ui/react';
// import styled from '@emotion/styled';
import NextLink from 'next/link';

// const LogoBox = styled.span`
//   svg {
//     transition: 200ms ease;
//   }
//   &:hover svg {
//     transform: rotate(20deg);
//   }
// `;

const Logo = () => {
  return (
    // <LogoBox>
    <Box id='logo-box'>
      <NextLink href='/' passHref>
        <Link style={{ textDecoration: 'none' }}>
          <Flex fontSize='4xl' fontWeight={500}>
            <Icon
              as={TbPaperBag}
              _hover={{
                transform: 'rotate(20deg)',
              }}
              id='logo-box-child'
            />

            <Heading as='h1' display={{ base: 'none', sm: 'inline-block' }}>
              drogi-cukier
            </Heading>
          </Flex>
        </Link>
      </NextLink>
    </Box>
    // </LogoBox>
  );
};

export default Logo;
