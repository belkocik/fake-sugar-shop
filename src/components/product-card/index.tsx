// import {
//   Box,
//   Center,
//   useColorModeValue,
//   Heading,
//   Text,
//   Stack,
//   Image,
//   Icon,
//   HStack,
//   Tooltip,
//   Flex,
// } from '@chakra-ui/react';
// import { FiShoppingBag } from 'react-icons/fi';
// // import { SugarProductSchema } from '@/types/sugar-product-schema';

// type TempProductCardSchema = {
//   title: string;
//   brand: string;
//   price: number;
//   coverImage: string;
// };

// export const ProductCard: React.FC<TempProductCardSchema> = ({
//   title,
//   brand,
//   price,
//   coverImage,
// }) => {
//   return (
//     <Center py={12}>
//       <Box
//         role={'group'}
//         p={6}
//         maxW={'330px'}
//         w={'full'}
//         bg={useColorModeValue('white', 'gray.800')}
//         boxShadow={'2xl'}
//         rounded={'lg'}
//         pos={'relative'}
//         zIndex={1}
//       >
//         <Box
//           rounded={'lg'}
//           mt={-12}
//           pos={'relative'}
//           height={'230px'}
//           _after={{
//             transition: 'all .3s ease',
//             content: '""',
//             w: 'full',
//             h: 'full',
//             pos: 'absolute',
//             top: 5,
//             left: 0,
//             backgroundImage: `url(${coverImage})`,
//             filter: 'blur(15px)',
//             zIndex: -1,
//           }}
//           _groupHover={{
//             _after: {
//               filter: 'blur(20px)',
//             },
//           }}
//         >
//           <Image
//             rounded={'lg'}
//             height={230}
//             width={282}
//             objectFit={'cover'}
//             src={coverImage}
//           />
//         </Box>
//         <Stack pt={10} align={'center'}>
//           <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
//             {brand}
//           </Text>
//           <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
//             {title}
//           </Heading>
//           <HStack>
//             <Text fontWeight={800} fontSize={'xl'}>
//               {price}PLN
//             </Text>
//             {/* <Text textDecoration={'line-through'} color={'gray.600'}>
//               $199
//             </Text> */}
//             <Tooltip
//               label='Dodaj do koszyka'
//               fontSize='md'
//               bg='gray.50'
//               hasArrow
//             >
//               <Flex as='span' textAlign='center'>
//                 <Icon as={FiShoppingBag} w={6} h={6} cursor='pointer' />
//               </Flex>
//             </Tooltip>
//           </HStack>
//         </Stack>
//       </Box>
//     </Center>
//   );
// };

// export default ProductCard;

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
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import useCartStore from 'store/zustand';
import NextLink from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export const ProductCard = ({
  title,
  brand,
  price,
  coverImage,
  id,
  slug,
  stock,
}: SugarProductSchema) => {
  // const addToCart = useCartStore((state) => state.addToCart);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleCartProducts = () => {
    addToCart(id, title, brand, coverImage, stock);
    toast.success('Dodano produkt do koszyka');
    console.log(id);
  };

  return (
    <Center py={12}>
      <Toaster />
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
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={coverImage}
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
            <Text fontWeight={800} fontSize={'xl'}>
              {price}PLN
            </Text>
            {/* <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}

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
                  onClick={() => handleCartProducts()}
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
