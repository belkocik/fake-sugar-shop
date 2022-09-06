import { GraphQLClient, gql } from 'graphql-request';
import hygraph from '@/utils/graphqlRequestClient';

// const endpoint = process.env.GRAPHCMS_ENDPOINT;
// const authToken = process.env.GRAPHCMS_TOKEN;

export const getSugarProducts = async () => {
  // const hygraph = new GraphQLClient(endpoint, {
  //   headers: {
  //     Authorization: `Bearer ${authToken}`,
  //   },
  // });

  const query = gql`
    {
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
  `;
  return await hygraph.request(query);
};
