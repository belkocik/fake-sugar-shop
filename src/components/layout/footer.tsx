import { Box, VStack, Link, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion<BoxProps>(Box);

const Footer = () => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <VStack
        align='center'
        opacity={{ base: '0.6', lg: '0.7' }}
        fontSize='sm'
        as='footer'
        pt={{ base: '36', md: '6' }}
        pb={6}
      >
        <Box>
          &copy; {new Date().getFullYear()} sklep internetowy drogi-cukier
        </Box>

        <Box>
          Built with{' '}
          <Box as='span' color='red'>
            ♥
          </Box>{' '}
          and{' '}
          <Link
            href='https://nextjs.org/'
            isExternal
            display='inline-block'
            position='relative'
            _focus={{
              WebkitTapHighlightColor: 'transparent',
            }}
            _after={{
              content: `""`,
              position: 'absolute',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0087ca',
              transformOrigin: 'bottom right',
              transition: 'transform 0.25s ease-out',
            }}
            _hover={{
              _after: {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left',
              },
            }}
            color='blue.500'
          >
            Next.js
          </Link>{' '}
          by{' '}
          <Link
            href='https://www.marcinniedbalec.xyz/'
            isExternal
            _focus={{
              WebkitTapHighlightColor: 'transparent',
            }}
            _hover={{
              textDecor: 'none',
              color: 'cyan.400',
            }}
            color='teal.900'
            textDecoration='none'
            transition='0.25s ease-out'
          >
            Marcin Niedbalec
          </Link>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default Footer;
