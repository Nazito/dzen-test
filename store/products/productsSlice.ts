import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '@/types/interfaces';

export interface IProductsState {
  products: IProduct[];
}

const initialState: IProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { actions } = productsSlice;
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
