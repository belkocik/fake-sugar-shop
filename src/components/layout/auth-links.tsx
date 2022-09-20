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

const AuthLinks = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <SkeletonCircle size='12' />;
  if (error) return <div>{error.message}</div>;

  return (
    <Menu>
      <MenuButton aria-label='Avatar of profile account'>
        <Avatar
          src={`${user ? user.picture : null}`}
          bg='gray.300'
          name='profile avatar'
        >
          <AvatarBadge
            boxSize='1.25em'
            bg={`${user ? 'green.500' : 'red.500'} `}
          />
        </Avatar>
      </MenuButton>
      <MenuList alignItems='center' minW='0' h='100%' p={0}>
        <Flex justify='center' direction='column'>
          {user && (
            <NextLink href={`/profile/${user.nickname}`} passHref>
              <MenuItem as='a'>Zamówienia</MenuItem>
            </NextLink>
          )}
          <NextLink
            href={`${user ? '/api/auth/logout' : '/api/auth/login'}`}
            passHref
          >
            <MenuItem>{user ? 'Wyloguj się' : 'Zaloguj się'}</MenuItem>
          </NextLink>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default AuthLinks;
