import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../index';
import {
  addOrderClose,
  addOrderOpen,
  addProductClose,
  addProductOpen,
  confirmClose,
  confirmOpen,
  setAppLoading,
} from './appSlice';
import { IAddOrderProps, IAddProductProps, IConfirmProps } from './types';

export const getApp = (state: RootState) => state.app;

export function useAppAction() {
  const dispatch = useDispatch<AppDispatch>();

  const onConfirmOpen = useCallback(
    (data: IConfirmProps) => {
      dispatch(confirmOpen(data));
    },
    [dispatch],
  );

  const onConfirmClose = useCallback(() => {
    dispatch(confirmClose());
  }, [dispatch]);

  const onAddOrderOpen = useCallback(
    (data: IAddOrderProps) => {
      dispatch(addOrderOpen(data));
    },
    [dispatch],
  );

  const onAddOrderClose = useCallback(() => {
    dispatch(addOrderClose());
  }, [dispatch]);

  const onAddProductOpen = useCallback(
    (data: IAddProductProps) => {
      dispatch(addProductOpen(data));
    },
    [dispatch],
  );

  const onAddProductClose = useCallback(() => {
    dispatch(addProductClose());
  }, [dispatch]);

  const onSetAppLoading = useCallback(
    (isLoading: boolean) => {
      dispatch(setAppLoading(isLoading));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      onConfirmOpen,
      onConfirmClose,
      onAddOrderOpen,
      onAddOrderClose,
      onAddProductOpen,
      onAddProductClose,
      onSetAppLoading,
    }),
    [onConfirmOpen, onConfirmClose, onAddOrderOpen, onAddOrderClose, onSetAppLoading],
  );
}

export function useAppState() {
  return useSelector(getApp);
}
