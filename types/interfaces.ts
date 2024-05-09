export interface IOrder {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  products: IProduct[];
}

interface IGuarantee {
  start: string;
  end: string;
}

interface IPrice {
  value: number;
  symbol: string;
  isDefault: number;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IProduct {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: IPrice[];
  order: IOrder;
  createdAt: string;
}

export interface IUser {
  username?: string;
  coords: [number, number];
}
