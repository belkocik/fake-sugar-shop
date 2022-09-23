import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  HStack,
  Tooltip,
  Flex,
  Link,
  Badge,
  IconButton,
  CenterProps,
  chakra,
} from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from 'src/redux/slices/cartSlice';
import useGetItemDetails from '@/utils/useGetItemDetails';
import { motion, Variants } from 'framer-motion';
import NextImage from 'next/image';

const MotionCenter = motion<CenterProps>(Center);

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

const variants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
};

export const ProductCard = ({
  title,
  brand,
  price,
  coverImage,
  id,
  slug,
  stock,
  quantity,
  isOnDiscount,
  discountValue,
  isNewProduct,
}: SugarProductSchema) => {
  const dispatch = useDispatch();

  const { discountPrice } = useGetItemDetails(price, discountValue);

  return (
    <MotionCenter
      py={12}
      layout
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
    >
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${coverImage})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            width={282}
            height={230}
            src={coverImage}
            alt={title}
            quality={50}
            rounded='lg'
            placeholder='blur'
            blurDataURL={coverImage}
            objectFit='fill'
          />
          {isOnDiscount && isNewProduct ? (
            <Flex
              position='absolute'
              gap={1}
              left='50%'
              transform='translateX(-50%)'
            >
              <Badge colorScheme='teal'>Nowy</Badge>
              <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
            </Flex>
          ) : isOnDiscount ? (
            <Flex
              position='absolute'
              gap={1}
              left='50%'
              transform='translateX(-50%)'
            >
              <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
            </Flex>
          ) : isNewProduct ? (
            <Flex
              position='absolute'
              gap={1}
              left='50%'
              transform='translateX(-50%)'
            >
              <Badge colorScheme='teal'>Nowy</Badge>
            </Flex>
          ) : null}
        </Box>

        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {brand}
          </Text>
          <NextLink href={`/products/${slug}`} passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Tooltip
                label='Wyświetl produkt'
                fontSize='md'
                bg='gray.100'
                hasArrow
                placement='top'
              >
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  {title}
                </Heading>
              </Tooltip>
            </Link>
          </NextLink>
          <HStack>
            {isOnDiscount ? (
              <Flex align='center' fontSize={'xl'} direction={'row'}>
                <Text
                  textDecoration={'line-through'}
                  color={'gray.600'}
                  fontSize='sm'
                  pt='3px'
                  pr={1}
                >
                  {price}PLN
                </Text>
                <Text fontWeight={800}>{discountPrice}PLN</Text>
              </Flex>
            ) : (
              <Text fontWeight={800} fontSize={'xl'}>
                {price}PLN
              </Text>
            )}

            <Tooltip
              label={`${stock === 0 ? 'Brak w magazynie' : 'Dodaj do koszyka'}`}
              fontSize='md'
              bg='gray.100'
              hasArrow
            >
              <Flex as='span' textAlign='center'>
                <IconButton
                  disabled={stock === 0 ? true : false}
                  aria-label='add a product to a cart'
                  icon={<FiShoppingBag size='24' />}
                  bg='white'
                  cursor='pointer'
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id,
                        title,
                        brand,
                        coverImage,
                        stock,
                        price,
                        quantity,
                        slug,
                        isOnDiscount,
                        isNewProduct,
                        discountValue,
                      })
                    )
                  }
                />
              </Flex>
            </Tooltip>
          </HStack>
        </Stack>
      </Box>
    </MotionCenter>
  );
};

export default ProductCard;
