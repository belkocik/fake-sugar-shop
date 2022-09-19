import {
  Box,
  Heading,
  Flex,
  Text,
  Tooltip,
  Spacer,
  Button,
  Badge,
  HStack,
  Stack,
  chakra,
  IconButton,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import PageLayout from '@/components/page-layout';
import hygraph from '@/utils/graphqlRequestClient';
import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { addToCart } from 'src/redux/slices/cartSlice';
import useGetItemDetails from '@/utils/useGetItemDetails';

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

const ProductSlugPage = ({ product }) => {
  const {
    id,
    title,
    subtitle,
    brand,
    description,
    coverImage,
    price,
    stock,
    slug,
    isOnDiscount,
    isNewProduct,
    discountValue,
  } = product;
  const dispatch = useDispatch();

  const { discountPrice } = useGetItemDetails(price, discountValue);

  return (
    <PageLayout title={title} description={subtitle}>
      <Flex
        direction={{ base: 'column' }}
        bg={{ base: 'white', lg: 'gray.50' }}
        p={{ base: 2, lg: 6 }}
        rounded='lg'
        w='100%'
        textAlign='left'
        align='center'
      >
        <Box p={6}>
          <Stack
            align={{ base: 'left', lg: 'center' }}
            justify='center'
            bg='gray.100'
            p={6}
            rounded='lg'
            mb={4}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box>
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
                      <Badge colorScheme='teal'>Nowy</Badge>
                      <Badge colorScheme='red'>
                        Promocja -{discountValue}%
                      </Badge>
                    </Flex>
                  ) : isOnDiscount ? (
                    <Badge colorScheme='red'>Promocja -{discountValue}%</Badge>
                  ) : isNewProduct ? (
                    <Badge colorScheme='teal'>Nowy</Badge>
                  ) : null}
                </HStack>
              </Box>
            </Box>

            <Stack fontWeight={700} p={{ base: 0, md: 6 }}>
              <Text
                color={'gray.500'}
                fontSize={'sm'}
                textTransform={'uppercase'}
              >
                {brand}
              </Text>
              <Text color='blue.400'>Dostępność: {stock}</Text>
            </Stack>
          </Stack>
          <Box mb={4}>
            <Image
              src={coverImage.url}
              width={1200}
              height={900}
              quality={50}
              rounded='lg'
              placeholder='blur'
              blurDataURL={coverImage.url}
              objectFit='fill'
              alt={title}
            />
          </Box>

          <RichText
            content={description.raw}
            renderers={{
              h1: ({ children }) => (
                <Heading as='h1' color='teal'>
                  {children}
                </Heading>
              ),
              h2: ({ children }) => <Heading as='h2'>{children}</Heading>,
              h3: ({ children }) => <Heading as='h3'>{children}</Heading>,
              h4: ({ children }) => <Heading as='h4'>{children}</Heading>,
              p: ({ children }) => <Text>{children}</Text>,
              bold: ({ children }) => <Text as='b'>{children}</Text>,
              italic: ({ children }) => <Text as='i'>{children}</Text>,
              blockquote: ({ children }) => <Text as='u'>{children}</Text>,
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
            <Text fontWeight={800} fontSize={'xl'}>
              {isOnDiscount ? discountPrice : price}PLN
            </Text>
            <Tooltip
              label={`${stock === 0 ? 'Brak w magazynie' : 'Dodaj do koszyka'}`}
              fontSize='md'
              bg='gray.100'
              hasArrow
            >
              <Box as='span' textAlign='center'>
                <IconButton
                  disabled={stock === 0 ? true : false}
                  aria-label='add a product to a cart'
                  icon={<FiShoppingBag size='24' />}
                  bg='gray.50'
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
        stock
        subtitle
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
