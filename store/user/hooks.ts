import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUser } from '@/types/interfaces';

import { AppDispatch, RootState } from '../index';
import { setUser } from './userSlice';

export const getUser = (state: RootState) => state.user;

export function useUserAction() {
  const dispatch = useDispatch<AppDispatch>();

  const onSetUser = useCallback(
    (user: IUser | null) => {
      dispatch(setUser(user));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      onSetUser,
    }),
    [onSetUser],
  );
}

export function useUserState() {
  return useSelector(getUser);
}
