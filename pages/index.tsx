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
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { motion, AnimatePresence } from 'framer-motion';
import { Search2Icon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/pagination';
import { useRef } from 'react';
import { useKeyPressEvent } from 'react-use';

const MotionGrid = motion<GridProps>(Grid);

interface SugarProductsData {
  sugars: SugarProductSchema[];
}

const fetcher = (endpoint, query, variables?) =>
  request(endpoint, query, variables);

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(
    process.env.GRAPHCMS_ENDPOINT,
    `
    query getSugars() {
      sugarsConnection(orderBy: createdAt_DESC, first: 6, skip: 0) {
        edges {
          node {
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
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
    
  `
  );
  console.log('data from ddd', data);
  return {
    props: {
      sugars: data,
    },
  };
};

const IndexPage = ({ sugars }: SugarProductsData) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);
  const inputRef = useRef();

  // search input focus start

  useKeyPressEvent((e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      inputRef.current.focus();
    }
    return true;
  });

  const resetInputRef = () => {
    // @ts-ignore
    inputRef.current.blur();
  };

  useKeyPressEvent('Escape', resetInputRef);

  // search input focus end

  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `
         query getSugars($searchValue: String $skip: Int) {
        sugarsConnection(orderBy: createdAt_DESC, where: {title_contains: $searchValue}, first: 6, skip: $skip) {
          edges {
            node {
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
    }
  );

  if (!data) return <Spinner />;

  if (error) {
    return toast.error('Nie udało się pobrać danych (SWR).');
  }

  return (
    <PageLayout title='Home' description='Fake Sugar - sklep internetowy'>
      {!data ? <Spinner /> : null}

      <Box mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>

          <Input
            placeholder='Wyszukaj produkt (ctrl+k)'
            type='text'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            focusBorderColor='teal.300'
            disabled={skip === 0 ? false : true}
            ref={inputRef}
          />
        </InputGroup>
      </Box>

      {data.sugarsConnection.edges.length > 0 && (
        <Pagination
          hasPreviousPage={data.sugarsConnection.pageInfo.hasPreviousPage}
          hasNextPage={data.sugarsConnection.pageInfo.hasNextPage}
          skip={skip}
          setSkip={setSkip}
        />
      )}

      {data.sugarsConnection.edges.length === 0 && (
        <Box mt={6}>
          <Alert status='info' rounded='lg'>
            <AlertIcon />
            <AlertTitle>Wyszukiwarka</AlertTitle>
            <AlertDescription>
              Szukany produkt nie istnieje w bazie danych
            </AlertDescription>
          </Alert>
        </Box>
      )}

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
