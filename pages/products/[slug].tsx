import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';

import PageLayout from '@/components/page-layout';
import { SugarProductSchema } from '@/types/sugar-product-schema';
import hygraph from '@/utils/graphqlRequestClient';

const ProductSlugPage = ({ product }) => {
  console.log(product.sugars[0]);
  const { title, price, description, brand, coverImage } = product.sugars[0];

  return (
    <PageLayout title='Slug page' description={`${title}`}>
      <Box>{title}</Box>
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
      }
    }
  `;
  const variables = { currentSlug };
  const product = await hygraph.request(query, variables);

  return {
    props: {
      product: product,
    },
  };
};
