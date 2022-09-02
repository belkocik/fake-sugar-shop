import { HStack, Spacer } from '@chakra-ui/react';
import CartIcon from './cart-icon';
import Logo from './logo';

const Header = () => {
  return (
    <HStack
      as='header'
      position='fixed'
      top='0'
      p={8}
      zIndex='tooltip'
      w='100%'
    >
      <Logo />
      <Spacer />
      <CartIcon />
    </HStack>
  );
};

export default Header;
