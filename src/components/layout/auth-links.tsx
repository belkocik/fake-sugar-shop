import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
  Link,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const AuthLinks = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <Menu>
      <MenuButton>
        <Avatar src={`${user ? user.picture : null}`}>
          <AvatarBadge
            boxSize='1.25em'
            bg={`${user ? 'green.500' : 'red.500'} `}
          />
        </Avatar>
      </MenuButton>
      <MenuList alignItems='center' minW='0' h='100%' p={0}>
        <Flex justify='center'>
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
