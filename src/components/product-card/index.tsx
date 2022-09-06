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
} from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { SugarProductSchema } from '@/types/sugar-product-schema';

import NextLink from 'next/link';
// import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment, selectValue } from 'src/redux/slices/cartSlice';
import { addToCart, selectAllDataFromStore } from 'src/redux/slices/cartSlice';
import { insertDecimal } from '@/utils/insertDecimal';
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
  // const count = useSelector(selectValue);
  // const dispatch = useDispatch();
  // console.log(title);

  // const selectIdOfTheProduct = useSelector(selectAllDataFromStore);
  // console.log(selectIdOfTheProduct);
  const dispatch = useDispatch();
  // const handleAddToCart = (id, title) => {
  //   dispatch(
  //     addToCart({ id, title, brand, coverImage, stock, price, quantity })
  //   );
  //   console.log(id);
  //   // toast.success('Dodano produkt do koszyka');
  // };

  // const discountPrice = insertDecimal(price - price * (discountValue / 100));

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
            height={230}
            width={282}
            objectFit={'cover'}
            src={coverImage.url}
          />
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
                placement='left'
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
                  pt='1px'
                  pr={1}
                >
                  {price}PLN
                </Text>
                <Text fontWeight={800}>{discountPrice}PLN</Text>
              </Flex>
            ) : isNewProduct ? (
              <>
                <Badge colorScheme='pink' mt='2px'>
                  New
                </Badge>
                <Text fontWeight={800} fontSize={'xl'}>
                  {price}PLN
                </Text>
              </>
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
                <Icon
                  as={FiShoppingBag}
                  w={6}
                  h={6}
                  cursor='pointer'
                  // onClick={() => handleAddToCart(id, title)}
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
