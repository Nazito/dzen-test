import { NextPage } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

import OrdersList from '@/components/OrdersList';
import { ORDERS_MOCK } from '@/mock';

const Groups: NextPage = () => {
  const ordersLength = ORDERS_MOCK.length;

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <span className='display-6'>Orders / {ordersLength}</span>

      <OrdersList />
    </Container>
  );
};

export default Groups;