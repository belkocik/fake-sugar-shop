import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
  Link,
  Box,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Flex,
} from '@chakra-ui/react';

// https://s.gravatar.com/avatar/f2d8f8d8572c510570a3cd4e49481c3e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fuk.png

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
          <Link
            href={`${user ? '/api/auth/logout' : '/api/auth/login'}`}
            style={{ textDecoration: 'none' }}
          >
            <MenuItem>{user ? 'Wyloguj się' : 'Zaloguj się'}</MenuItem>
          </Link>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default AuthLinks;
