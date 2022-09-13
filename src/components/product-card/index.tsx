import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Icon,
  HStack,
  Tooltip,
  Flex,
  Link,
  Badge,
  Skeleton,
  IconButton,
} from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from 'src/redux/slices/cartSlice';
import useGetItemDetails from '@/utils/useGetItemDetails';

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
    <Center py={12}>
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
            backgroundImage: `url(${coverImage.url})`,
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
            rounded={'lg'}
            width={282}
            height={230}
            objectFit={'cover'}
            src={coverImage.url}
            alt={title}
            loading='lazy'
            fallbackSrc='https://via.placeholder.com/282x230'
            onLoad={() => <Skeleton height='230px' />}
          />
          {isOnDiscount && isNewProduct ? (
            <Flex
              position='absolute'
              gap={1}
              left='50%'
              transform='translateX(-50%)'
            >
              <Badge colorScheme='purple'>Nowy</Badge>
              <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
            </Flex>
          ) : isOnDiscount ? (
            <Badge
              colorScheme='red'
              position='absolute'
              left='50%'
              transform='translateX(-50%)'
            >
              Promocja -{discountValue}%
            </Badge>
          ) : isNewProduct ? (
            <Badge
              colorScheme='purple'
              position='absolute'
              left='50%'
              transform='translateX(-50%)'
            >
              Nowy
            </Badge>
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
                bg='gray.50'
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
              label='Dodaj do koszyka'
              fontSize='md'
              bg='gray.50'
              hasArrow
            >
              <Flex as='span' textAlign='center'>
                {/* <Icon
                    as={FiShoppingBag}
                    w={6}
                    h={6}
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
                  /> */}
                <IconButton
                  // disabled={true}
                  aria-label='add a product to a cart'
                  icon={<FiShoppingBag size='24' />}
                  bg='white'
                  _hover={{
                    bg: 'white',
                  }}
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
    </Center>
  );
};

export default ProductCard;
