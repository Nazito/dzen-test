import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IOrder } from '@/types/interfaces';

import { AppDispatch, RootState } from '../index';
import { setOrders, setSelectedOrder } from './ordersSlice';

export const getOrderslist = (state: RootState) => state.orders;

export function useOrdersAction() {
  const dispatch = useDispatch<AppDispatch>();

  const onSetOrders = useCallback(
    (orders: IOrder[]) => {
      dispatch(setOrders(orders));
    },
    [dispatch],
  );

  const onSetSelectedOrder = useCallback(
    (order: IOrder | null) => {
      dispatch(setSelectedOrder(order));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      onSetOrders,
      onSetSelectedOrder,
    }),
    [onSetOrders, onSetSelectedOrder],
  );
}

export function useOrdersState() {
  return useSelector(getOrderslist);
}
