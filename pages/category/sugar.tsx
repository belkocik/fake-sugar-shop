import PageLayout from '@/components/page-layout';
import {
  Grid,
  Box,
  GridProps,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  BoxProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { request } from 'graphql-request';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '@/components/product-card';
import Pagination from '@/components/pagination';
import { useRouter } from 'next/router';
import { SugarProductSchema } from '@/types/sugar-product-schema';

import TopBarNavigation from '@/components/top-bar-navigation';
import { useDebouncedCallback } from 'use-debounce';

interface ISugarProductsData {
  sugarCategory: SugarProductSchema[];
}

const fetcher = (endpoint, query, variables?) =>
  request(endpoint, query, variables);
const MotionGrid = motion<GridProps>(Grid);
const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

const SugarCategory = ({ sugarCategory }: ISugarProductsData) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);

  const debounced = useDebouncedCallback((searchValue) => {
    setSearchValue(searchValue);
  }, 1000);

  const router = useRouter();

  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `
         query getSugars($searchValue: String $skip: Int) {
        sugarsConnection(orderBy: createdAt_DESC, where: {title_contains: $searchValue, tags_contains_some: ["cukier"]}, first: 6, skip: $skip) {
          edges {
            node {
              title
              tags
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
          pageInfo {
            hasNextPage
            hasPreviousPage
            
          }
        }
      }
      
      
      
  `,
      searchValue,
      skip,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    {
      fallbackData: sugarCategory,
      revalidateOnFocus: true,
    }
  );

  if (error) {
    return toast.error('Nie udało się pobrać danych (SWR).');
  }
  return (
    <PageLayout
      title='Kategoria | Cukier'
      description='Kategoria cukier - wszyskie produkty'
    >
      {!data ? <Spinner /> : null}

      {/* TopBar Navigation Start*/}
      <TopBarNavigation
        sugarsConnection={data.sugarsConnection}
        setSkip={setSkip}
        skip={skip}
        categoryPath={router.pathname}
        debounced={debounced}
      />

      {/* If there is no searchValue in database \/ */}
      {data.sugarsConnection.edges.length === 0 && (
        <MotionBox
          mt={6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Alert status='info' rounded='lg'>
            <AlertIcon />
            <AlertTitle>Wyszukiwarka</AlertTitle>
            <AlertDescription>
              Szukany produkt nie istnieje w bazie danych
            </AlertDescription>
          </Alert>
        </MotionBox>
      )}

      {/* TopBar Navigation End*/}

      {/* Main content start */}

      <MotionGrid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <AnimatePresence>
          {data?.sugarsConnection?.edges?.map((product) => (
            <Box key={product.node.slug}>
              <ProductCard
                title={product.node.title}
                brand={product.node.brand}
                price={product.node.price}
                coverImage={product.node.coverImage.url}
                id={product.node.id}
                slug={product.node.slug}
                stock={product.node.stock}
                isOnDiscount={product.node.isOnDiscount}
                discountValue={product.node.discountValue}
                isNewProduct={product.node.isNewProduct}
              />
            </Box>
          ))}
        </AnimatePresence>
      </MotionGrid>

      {/* Main content end  */}

      {/* Pagination menu on the bottom for mobile devices \/ */}
      {data.sugarsConnection.edges.length > 0 && (
        <Box display={{ base: 'block', md: 'none' }}>
          <Pagination
            hasPreviousPage={data.sugarsConnection.pageInfo.hasPreviousPage}
            hasNextPage={data.sugarsConnection.pageInfo.hasNextPage}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
      )}
    </PageLayout>
  );
};

export default SugarCategory;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(
    process.env.GRAPHCMS_ENDPOINT,
    `
    query getSugars() {
      sugarsConnection(orderBy: createdAt_DESC, where: {tags_contains_some: ["cukier"]}, first: 6, skip: 0) {
        edges {
          node {
            title
            tags
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
        pageInfo {
          hasNextPage
          hasPreviousPage
          
        }
      }
    }
    
  `
  );

  return {
    props: {
      sugarCategory: data,
    },
  };
};
