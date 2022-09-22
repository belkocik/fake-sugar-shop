import PageLayout from '@/components/page-layout';
import ProductCard from '@/components/product-card';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import { Grid, Box, GridProps, Spinner } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/pagination';

import TopBarNavigation from '@/components/top-bar-navigation';
import DataNotFound from '@/components/data-not-found';
import { useDebouncedCallback } from 'use-debounce';

const MotionGrid = motion<GridProps>(Grid);

interface ISugarProductsData {
  sugars: SugarProductSchema[];
}

const fetcher = (endpoint, query, variables?) =>
  request(endpoint, query, variables);

const IndexPage = ({ sugars }: ISugarProductsData) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);
  const router = useRouter();

  const debounced = useDebouncedCallback((searchValue) => {
    setSearchValue(searchValue);
  }, 1000);

  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `
         query getSugars($searchValue: String $skip: Int) {
        sugarsConnection(orderBy: createdAt_DESC, where: {title_contains: $searchValue}, first: 6, skip: $skip) {
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
      fallbackData: sugars,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );

  if (error) {
    return toast.error('Nie udało się pobrać danych z serwera.');
  }

  return (
    <PageLayout title='Home' description='Fake Sugar - sklep internetowy'>
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
      <DataNotFound sugarsConnection={data.sugarsConnection.edges} />

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
                coverImage={product.node.coverImage}
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

      {/* Main content end */}

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

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(
    process.env.GRAPHCMS_ENDPOINT,
    `
    query getSugars() {
      sugarsConnection(orderBy: createdAt_DESC, first: 6, skip: 0) {
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
          pageSize
        }
      }
    }
    
  `
  );

  return {
    props: {
      sugars: data,
    },
  };
};
