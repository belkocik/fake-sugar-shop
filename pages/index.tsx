import PageLayout from '@/components/page-layout';
import ProductCard from '@/components/product-card';
import { getSugarProducts } from '@/data/graphqlQueries';
// import { ProductCardType } from '@/types/product-card-type';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { selectId } from 'src/redux/slices/cartSlice';
import { RootState } from 'src/redux/store';

import { Grid, Box, Button, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const IndexPage = ({ sugarProducts }) => {
  console.log(sugarProducts);
  // const count = useSelector(selectValue);
  // const dispatch = useDispatch();
  let quantity = 1;

  return (
    <PageLayout title='Home' description='Fake Sugar - sklep internetowy'>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {/* <Box>
          <Button onClick={() => dispatch(increment())}>+</Button>
          <Text>{count}</Text>
          <Button onClick={() => dispatch(decrement())}>-</Button>
        </Box> */}
        {sugarProducts.map((product) => (
          <Box key={product.slug}>
            <ProductCard
              title={product.title}
              brand={product.brand}
              price={product.price}
              coverImage={product.coverImage.url}
              id={product.id}
              slug={product.slug}
              stock={product.stock}
              quantity={product.quantity}
            />
          </Box>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getSugarProducts();

  return {
    props: {
      sugarProducts: data.sugars,
    },
  };
};
