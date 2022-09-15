import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  SkeletonCircle,
} from '@chakra-ui/react';
import NextLink from 'next/link';
// import { useRouter } from 'next/router';

const AuthLinks = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <SkeletonCircle size='12' />;
  if (error) return <div>{error.message}</div>;
  // const router = useRouter();

  return (
    <Menu>
      <MenuButton>
        <Avatar src={`${user ? user.picture : null}`} bg='gray.300'>
          <AvatarBadge
            boxSize='1.25em'
            bg={`${user ? 'green.500' : 'red.500'} `}
          />
        </Avatar>
      </MenuButton>
      <MenuList alignItems='center' minW='0' h='100%' p={0}>
        <Flex justify='center' direction='column'>
          <NextLink
            href={`${user ? '/api/auth/logout' : '/api/auth/login'}`}
            passHref
          >
            <MenuItem>{user ? 'Wyloguj się' : 'Zaloguj się'}</MenuItem>
          </NextLink>
          {user && (
            <NextLink href={`/profile/${user.nickname}`} passHref>
              <MenuItem as='a'>Zamówienia</MenuItem>
            </NextLink>
          )}
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default AuthLinks;
