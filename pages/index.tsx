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
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  HStack,
  BoxProps,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React, { useState, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { motion, AnimatePresence } from 'framer-motion';
import { Search2Icon, ArrowForwardIcon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/pagination';
import { useKeyPressEvent } from 'react-use';
import NextLink from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

const MotionGrid = motion<GridProps>(Grid);
const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

interface SugarProductsData {
  sugars: SugarProductSchema[];
}

const fetcher = (endpoint, query, variables?) =>
  request(endpoint, query, variables);

const IndexPage = ({ sugars }: SugarProductsData) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);

  const debounced = useDebouncedCallback(
    useCallback((searchValue) => {
      setSearchValue(searchValue);
    }, []),
    500,
    { maxWait: 4000 }
  );

  const inputRef = useRef();

  // search input focus start

  useKeyPressEvent((e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      inputRef.current.focus();
    }
    return false;
  });

  useKeyPressEvent((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      inputRef.current.blur();
    }
    return false;
  });

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

  if (!data) return <Spinner />;

  if (error) {
    return toast.error('Nie udało się pobrać danych (SWR).');
  }

  return (
    <PageLayout title='Home' description='Fake Sugar - sklep internetowy'>
      {!data ? <Spinner /> : null}

      <Stack
        justify='space-between'
        w='100%'
        direction={{ base: 'column', md: 'row' }}
        align='center'
      >
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Search2Icon color='gray.300' />
            </InputLeftElement>

            <Input
              placeholder='Wyszukaj produkt (ctrl+k)'
              type='text'
              onChange={(event) => debounced(event.target.value)}
              focusBorderColor='teal.300'
              ref={inputRef}
              onClick={() => setSkip(0)}
              onFocus={() => setSkip(0)}
            />
          </InputGroup>
        </Box>

        <HStack>
          <NextLink href='/category/sugar' passHref>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='teal'
              cursor='pointer'
              _hover={{ bg: 'teal.100' }}
              transition='300ms'
            >
              <TagLabel>Cukier</TagLabel>
              <TagRightIcon as={ArrowForwardIcon} />
            </Tag>
          </NextLink>
          <NextLink href='/category/coal' passHref>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='teal'
              cursor='pointer'
              _hover={{ bg: 'teal.100' }}
              transition='300ms'
            >
              <TagLabel>Węgiel</TagLabel>
              <TagRightIcon as={ArrowForwardIcon} />
            </Tag>
          </NextLink>
        </HStack>
        <Box>
          {data.sugarsConnection.edges.length >= 0 && (
            <Pagination
              hasPreviousPage={data.sugarsConnection.pageInfo.hasPreviousPage}
              hasNextPage={data.sugarsConnection.pageInfo.hasNextPage}
              skip={skip}
              setSkip={setSkip}
            />
          )}
        </Box>
      </Stack>

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
