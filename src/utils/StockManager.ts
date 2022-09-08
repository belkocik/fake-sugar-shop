import hygraph from './graphqlRequestClient';
import { gql } from 'graphql-request';

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
    const itemFromCart = await hygraph.request(GetProductById, {
      id: theID,
    });
    //------------------------
    const productsArray: productsArray[] = await Object.values(itemFromCart);
    console.log('productsArray in stock manager', productsArray);
    //------------------------
    productsArray.map((item) => {
      if (item && item.id === theID) {
        const stock = item.stock - stockChange;
        const updateStock = hygraph.request(UpdateProductStock, {
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
      const stockChange = item.numItems;
      checkProducts(theID, stockChange);
    });
};

export default StockManager;
