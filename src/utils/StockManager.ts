import { GraphQLClient, gql } from 'graphql-request';

const hygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  }
);

const GetProductById = gql`
  query GetProductById($id: ID!) {
    sugar(where: { id: $id }) {
      id
      stock
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: ID!, $stock: Int) {
    updateSugar(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishSugar(to: PUBLISHED, where: { id: $id }) {
      id
    }
  }
`;

interface productsArray {
  id: string;
  stock: number;
}

const StockManager = (cart) => {
  //-------------------------------
  const checkProducts = async (theID: string, stockChange: number) => {
    console.log('stockChange is:', stockChange);
    const itemFromCart = await hygraphClient.request(GetProductById, {
      id: theID,
    });
    //------------------------
    const productsArray: productsArray[] = await Object.values(itemFromCart);
    console.log('productsArray in stock manager', productsArray);
    //------------------------
    productsArray.map((item) => {
      if (item && item.id === theID) {
        const stock = item.stock - stockChange;

        const updateStock = hygraphClient.request(UpdateProductStock, {
          id: theID,
          stock: stock,
        });
        console.log('updateStock is ', updateStock);
      }
    });

    //------------------------
  };

  cart &&
    cart.map((item, idx) => {
      const theID = item.id;
      const stockChange = item.quantity;
      checkProducts(theID, stockChange);
    });
};

export default StockManager;
