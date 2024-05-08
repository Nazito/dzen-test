import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IProduct } from '@/types/interfaces';

import { AppDispatch, RootState } from '../index';
import { setProducts } from './productsSlice';

export const getProductslist = (state: RootState) => state.products;

export function useProductsAction() {
  const dispatch = useDispatch<AppDispatch>();

  const onSetProducts = useCallback(
    (products: IProduct[]) => {
      dispatch(setProducts(products));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      onSetProducts,
    }),
    [onSetProducts],
  );
}

export function useProductsState() {
  return useSelector(getProductslist);
}
