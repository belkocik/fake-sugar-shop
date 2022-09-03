// import cartReducer from 'src/redux/slices/cartSlice';
import cartReducer from 'src/redux/slices/cartSlice';

import { configureStore } from '@reduxjs/toolkit';
// ...

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
