import PageLayout from '@/components/page-layout';
import ProductCard from '@/components/product-card';
import { getSugarProducts } from '@/data/graphqlQueries';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import { Grid, Box } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';

interface SugarProductsData {
  sugarProducts: SugarProductSchema[];
}

const IndexPage: NextPage<SugarProductsData> = ({ sugarProducts }) => {
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
        {sugarProducts.map((product) => (
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
