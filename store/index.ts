import { configureStore } from '@reduxjs/toolkit';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { load, save } from 'redux-localstorage-simple';

import appSlice, { AppState } from './app/appSlice';
import ordersSlice, { IOrdersState } from './orders/ordersSlice';
import productsSlice, { IProductsState } from './products/productsSlice';

type MergedState = {
  app: AppState;
  orders: IOrdersState;
  products: IProductsState;
};

const PERSISTED_KEYS: string[] = [''];
const loadedState = load({ states: PERSISTED_KEYS }) as MergedState;
export const store = configureStore({
  reducer: {
    app: appSlice,
    orders: ordersSlice,
    products: productsSlice,
  },
  preloadedState: loadedState,
  devTools: true,
  middleware: (getDefaultMiddleware: GetDefaultMiddleware<MergedState>) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(save({ states: PERSISTED_KEYS })),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
