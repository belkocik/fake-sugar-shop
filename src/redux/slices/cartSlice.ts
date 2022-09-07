import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import toast from 'react-hot-toast';

// const initialState = {
//   data: [],
//   totalAmount: 0,
//   totalCount: 0,
// };

// export const cartSlice = createSlice({
//   name: 'cart',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.data.push({ ...action.payload });
//     },
//   },
// });

interface CartState {
  title: string;
  brand?: string;
  price?: number;
  coverImage?: string;
  id: string;
  slug?: string;
  stock: number;
  isOnDiscount?: boolean;
  discountValue?: number;
  quantity?: number;
}

interface CartStateData {
  cart: CartState[];
}

const initialState: CartStateData = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // initialState: {
  //   cart: [],
  // },
  reducers: {
    addToCart: (state, action) => {
      // const findItem = state.cart.find((item) => item.id === action.payload.id);

      // if (findItem) {
      //   const tempCart = state.cart.map((cartItem) => {
      //     if (cartItem.id === action.payload.id) {
      //       let moreNumItems = findItem.quantity + 1;
      //       if (moreNumItems > cartItem.stock) {
      //         moreNumItems = cartItem.stock;
      //       }

      //       return { ...cartItem, quantity: moreNumItems };
      //     } else {
      //       return cartItem;
      //     }
      //   });

      //   return { ...state, cart: tempCart };
      // } else {
      //   return { ...state, cart: [...state.cart, action.payload] };
      // }

      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      ); // if the item in cart is the same
      const item = action.payload;
      if (itemInCart) {
        itemInCart.quantity++;
        // if (itemInCart.quantity > itemInCart.stock) {
        //   itemInCart.quantity = itemInCart.stock;
        // }
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      toast.success(`Dodano ${item.title} do koszyka`);
    },
    incrementQuantity: (state, action) => {
      // const item = state.cart.find((item) => item.id === action.payload);
      // item.quantity++;
      const item = action.payload;
      const findItem = state.cart.find((i) => i.id === item.id);
      // findItem.quantity++;

      if (findItem.quantity >= findItem.stock) {
        findItem.quantity = findItem.stock;
      } else {
        findItem.quantity++;
      }

      // if (findItem) {
      //   const tempCart = state.cart.map((cartItem) => {
      //     if (cartItem.id === item.id) {
      //       let addQuantity = findItem.quantity++;
      //       if (addQuantity > cartItem.stock) {
      //         addQuantity = cartItem.stock;
      //       }
      //       return { ...cartItem, quantity: addQuantity };
      //     } else {
      //       return cartItem;
      //     }
      //   });
      //   return { ...state, cart: tempCart };
      // }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const itemData = action.payload;
      const removeItem = state.cart.filter((item) => item.id !== itemData.id);
      state.cart = removeItem;
      toast.error(`Usunieto ${itemData.title} z koszyka`);
    },
    clearCart: (state) => {
      // toast.error('Usunięto wszystkie produkty z koszyka');
      return { ...state, cart: [] };
    },
  },
});

// action creators are genereated for each case reducer function
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// selector
export const selectAllDataFromStore = (state: RootState) => state.cart.cart;
// quantity selector

// gotta export out created slice
export default cartSlice.reducer;
