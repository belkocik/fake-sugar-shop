import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.GRAPHCMS_ENDPOINT;
const authToken = process.env.GRAPHCMS_TOKEN;

const hygraph = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default hygraph;
