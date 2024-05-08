import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder } from '@/types/interfaces';

export interface IOrdersState {
  orders: IOrder[];
  selectedOrder: IOrder | null;
}

const initialState: IOrdersState = {
  orders: [],
  selectedOrder: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { actions } = ordersSlice;
export const { setOrders, setSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
