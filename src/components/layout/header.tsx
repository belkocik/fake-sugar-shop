import { HStack, Spacer, Container, Box } from '@chakra-ui/react';
import CartIcon from './cart-icon';
import Logo from './logo';

const Header = () => {
  return (
    <Box
      as='header'
      position='fixed'
      top='0'
      p={8}
      zIndex='tooltip'
      w='100%'
      sx={{
        backdropFilter: 'blur(5px)',
      }}
    >
      <Box w='100%' left={0} top={0}>
        <Container maxW='8xl'>
          <HStack w='100%' justify='space-between'>
            <Logo />
            <Spacer />
            <CartIcon />
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
