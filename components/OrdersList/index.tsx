import React, { FC } from 'react';

import { ORDERS_MOCK } from '@/mock';

import ListItem from '../ListItem';
import OrderItem from './OrderItem';

const OrdersList: FC = () => {
  return (
    <div>
      <div className='w-100 d-flex flex-column gap-3'>
        {ORDERS_MOCK.map((order) => (
          <ListItem key={order.id}>
            <OrderItem order={order} />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
