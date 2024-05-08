import React, { FC } from 'react';

import { useOrdersState } from '@/store/orders/hooks';

import ListItem from '../ListItem';
import OrderItem from './OrderItem';

const OrdersList: FC = () => {
  const { orders: storeOrders } = useOrdersState();
  return (
    <div>
      <div className='w-100 d-flex flex-column gap-3'>
        {storeOrders?.map((order) => (
          <ListItem key={order.id}>
            <OrderItem order={order} />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
