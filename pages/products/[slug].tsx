import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Icon,
  Tooltip,
  Spacer,
  Button,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';

import PageLayout from '@/components/page-layout';

import hygraph from '@/utils/graphqlRequestClient';
import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import NextLink from 'next/link';

import { addToCart } from 'src/redux/slices/cartSlice';
import useGetItemDetails from '@/utils/useGetItemDetails';

const ProductSlugPage = ({ product }) => {
  // console.log(product.sugars[0]);
  // const { title, price, description, brand, coverImage } = product.sugars[0];
  console.log(product);
  const {
    id,
    title,
    brand,
    description,
    coverImage,
    stock,
    price,
    quantity,
    slug,
    isOnDiscount,
    isNewProduct,
    discountValue,
  } = product;
  const dispatch = useDispatch();

  const { discountPrice } = useGetItemDetails(price, discountValue);

  return (
    <PageLayout title='Slug page' description={`xd`}>
      <Flex
        direction={{ base: 'column' }}
        bg='gray.50'
        p={6}
        rounded='lg'
        w='100%'
        textAlign='left'
      >
        <Box>
          <Image src={coverImage.url} rounded='lg' />
        </Box>

        <Box p={6}>
          <Heading
            as='h1'
            fontSize={'4xl'}
            fontFamily={'body'}
            fontWeight={500}
          >
            {title}
          </Heading>
          <Box
            textAlign='center'
            justifyContent='center'
            width='300px'
            mb={2}
            mt={2}
          >
            <HStack align='center'>
              {isOnDiscount && isNewProduct ? (
                <Flex gap={1}>
                  <Badge colorScheme='purple'>Nowy</Badge>
                  <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
                </Flex>
              ) : isOnDiscount ? (
                <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
              ) : isNewProduct ? (
                <Badge colorScheme='purple'>Nowy</Badge>
              ) : null}
            </HStack>
          </Box>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {brand}
          </Text>

          <RichText
            content={description.raw}
            renderers={{
              h1: ({ children }) => <h1 className='text-normal'>{children}</h1>,
              h2: ({ children }) => <h2 className='text-normal'>{children}</h2>,
              h3: ({ children }) => <h3 className='text-normal'>{children}</h3>,
              h4: ({ children }) => <h4 className='text-normal'>{children}</h4>,
              p: ({ children }) => <p className='text-normal'>{children}</p>,
              bold: ({ children }) => (
                <strong className='text-bold'>{children}</strong>
              ),
              italic: ({ children }) => (
                <span className='text-italic'>{children}</span>
              ),
            }}
          />
        </Box>
      </Flex>
      <Flex
        justify='space-between'
        w='100%'
        bg='gray.50'
        rounded='lg'
        p={2}
        mt={2}
        align='center'
      >
        <Box>
          <NextLink href='/' passHref>
            <Button>Kontynuuj zakupy</Button>
          </NextLink>
        </Box>
        <Spacer />
        <Box>
          <HStack>
            <Text mb={1} fontWeight={800} fontSize={'xl'}>
              {isOnDiscount ? discountPrice : price}PLN
            </Text>
            <Tooltip
              label='Dodaj do koszyka'
              fontSize='md'
              bg='gray.50'
              hasArrow
            >
              <Box as='span' textAlign='center'>
                <Icon
                  as={FiShoppingBag}
                  w={8}
                  h={8}
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
              </Box>
            </Tooltip>
          </HStack>
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default ProductSlugPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentSlug = context.params.slug;
  // console.log(currentSlug);

  const query = gql`
    query ($currentSlug: String!) {
      sugars(where: { slug: $currentSlug }) {
        title
        description {
          raw
        }
        id
        slug
        coverImage {
          url
        }
        price
        brand
        isOnDiscount
        isNewProduct
        discountValue
      }
    }
  `;
  const variables = { currentSlug };
  const product = await hygraph.request(query, variables);

  return {
    props: {
      product: product.sugars[0],
    },
  };
};
