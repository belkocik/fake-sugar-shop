import PageLayout from '@/components/page-layout';
import {
  Grid,
  Box,
  Input,
  GridProps,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  BoxProps,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { request } from 'graphql-request';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '@/components/product-card';
import Pagination from '@/components/pagination';
import { Search2Icon, ArrowBackIcon } from '@chakra-ui/icons';
import { useKeyPressEvent } from 'react-use';
import NextLink from 'next/link';
import { SugarProductSchema } from '@/types/sugar-product-schema';

interface SugarProductsData {
  sugarCategory: SugarProductSchema[];
}

const fetcher = (endpoint, query, variables?) =>
  request(endpoint, query, variables);
const MotionGrid = motion<GridProps>(Grid);
const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

const SugarCategory = ({ sugarCategory }: SugarProductsData) => {
  // console.log('sugar category data', sugarCategory);
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

  if (!data) return <Spinner />;

  if (error) {
    return toast.error('Nie udało się pobrać danych (SWR).');
  }
  return (
    <PageLayout
      title='Kategoria | Cukier'
      description='Kategoria cukier - wszyskie produkty'
    >
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
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              focusBorderColor='teal.300'
              // disabled={skip === 0 ? false : true}
              ref={inputRef}
              onClick={() => setSkip(0)}
              onFocus={() => setSkip(0)}
            />
          </InputGroup>
        </Box>

        <HStack>
          <NextLink href='/' passHref>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='gray'
              cursor='pointer'
              _hover={{ bg: 'gray.100' }}
              transition='300ms'
            >
              <TagLeftIcon as={ArrowBackIcon} />
              <TagLabel>Strona główna</TagLabel>
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
