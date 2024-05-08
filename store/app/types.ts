import { IProduct } from '@/types/interfaces';

export enum EModals {
  Confirm,
  AddOrder,
  AddProduct,
}

interface IOrderCreateData {
  title: string;
  description: string;
  products: IProduct[];
  createdAt: string; // iso date
}

interface IProductCreateData {
  title: string;
  serialNumber: string;
  guarantee: {
    start: string; // iso date
    end: string; // iso date
  };
  price: { value: string; symbol: string }[];
  createdAt: string; // iso date
}

export interface IConfirmProps {
  title?: string;
  text?: string;
  actonBtnText?: string;
  accept: () => void;
  cancel?: () => void;
}

export interface IAddOrderProps {
  accept: (order?: IOrderCreateData) => void;
  cancel?: () => void;
}

export interface IAddProductProps {
  accept: (product?: IProductCreateData) => void;
  cancel?: () => void;
}
