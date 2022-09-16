import PageLayout from '@/components/page-layout';
import ProductCard from '@/components/product-card';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import {
  Grid,
  Box,
  Input,
  GridProps,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { motion, AnimatePresence } from 'framer-motion';
import { Search2Icon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';

const MotionGrid = motion<GridProps>(Grid);

interface SugarProductsData {
  sugars: SugarProductSchema[];
}

const requestHeaders = {
  authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
};

const fetcher = (endpoint, query, variables?, requestHeaders?) =>
  request(endpoint, query, variables, requestHeaders);

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(
    process.env.GRAPHCMS_ENDPOINT,
    `
      query getSugars {
        sugars {
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
          stock
          isNewProduct
          isOnDiscount
          discountValue
        }
      }
  `
  );
  return {
    props: {
      sugars: data.sugars,
    },
  };
};

const IndexPage = ({ sugars }: SugarProductsData) => {
  const [searchValue, setSearchValue] = useState('');

  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `query getSugars($searchValue: String) {
        sugars(where: {title_contains: $searchValue}) {
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
          stock
          isNewProduct
          isOnDiscount
          discountValue
        }
      }
      
      
  `,
      searchValue,
      requestHeaders,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue }),
    { initialData: { sugars }, revalidateOnFocus: true }
  );
  console.log('data', data);
  console.log('sugars', sugars);

  if (error) {
    return toast.error('Nie udało się pobrać danych (SWR).');
  }
  return (
    <PageLayout title='Home' description='Fake Sugar - sklep internetowy'>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Wyszukaj produkt'
            type='text'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            focusBorderColor='teal.300'
          />
        </InputGroup>
      </Box>

      <MotionGrid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <AnimatePresence>
          {data?.sugars.map((product) => (
            <Box key={product.slug}>
              <ProductCard
                title={product.title}
                brand={product.brand}
                price={product.price}
                coverImage={product.coverImage}
                id={product.id}
                slug={product.slug}
                stock={product.stock}
                isOnDiscount={product.isOnDiscount}
                discountValue={product.discountValue}
                isNewProduct={product.isNewProduct}
              />
            </Box>
          ))}
        </AnimatePresence>
      </MotionGrid>
    </PageLayout>
  );
};

export default IndexPage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await getSugarProducts();

//   return {
//     props: {
//       sugarProducts: data.sugars,
//     },
//   };
// };
