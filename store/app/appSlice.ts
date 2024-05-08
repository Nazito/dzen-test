import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EModals, IAddOrderProps, IAddProductProps, IConfirmProps } from './types';

export interface AppState {
  appLoading: boolean;
  modals: {
    [EModals.Confirm]: {
      active: boolean;
      props: IConfirmProps;
    };
    [EModals.AddOrder]: {
      active: boolean;
      props: IAddOrderProps;
    };
    [EModals.AddProduct]: {
      active: boolean;
      props: IAddProductProps;
    };
  };
}

const initialState: AppState = {
  appLoading: false,
  modals: {
    [EModals.Confirm]: {
      active: false,
      props: {
        title: '',
        text: '',
        actonBtnText: '',
        accept: () => {},
        cancel: () => {},
      },
    },
    [EModals.AddOrder]: {
      active: false,
      props: {
        accept: () => {},
        cancel: () => {},
      },
    },
    [EModals.AddProduct]: {
      active: false,
      props: {
        accept: () => {},
        cancel: () => {},
      },
    },
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    confirmOpen: (state, action: PayloadAction<IConfirmProps>) => {
      state.modals[EModals.Confirm].props.title = action.payload.title;
      state.modals[EModals.Confirm].props.text = action.payload.text;
      state.modals[EModals.Confirm].props.actonBtnText = action.payload.actonBtnText;
      state.modals[EModals.Confirm].props.accept = action.payload.accept;
      state.modals[EModals.Confirm].props.cancel = action.payload.cancel;
      state.modals[EModals.Confirm].active = true;
    },
    confirmClose: (state) => {
      state.modals[EModals.Confirm].active = false;
    },
    addOrderOpen: (state, action: PayloadAction<IAddOrderProps>) => {
      state.modals[EModals.AddOrder].props.accept = action.payload.accept;
      state.modals[EModals.AddOrder].props.cancel = action.payload.cancel;
      state.modals[EModals.AddOrder].active = true;
    },
    addOrderClose: (state) => {
      state.modals[EModals.AddOrder].active = false;
    },
    addProductOpen: (state, action: PayloadAction<IAddOrderProps>) => {
      state.modals[EModals.AddProduct].props.accept = action.payload.accept;
      state.modals[EModals.AddProduct].props.cancel = action.payload.cancel;
      state.modals[EModals.AddProduct].active = true;
    },
    addProductClose: (state) => {
      state.modals[EModals.AddProduct].active = false;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
  },
});

export const {
  confirmClose,
  confirmOpen,
  addOrderOpen,
  addOrderClose,
  addProductOpen,
  addProductClose,
  setAppLoading,
} = appSlice.actions;
export default appSlice.reducer;
