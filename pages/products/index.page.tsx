import { NextPage } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

import FilterBar from '@/components/FilterBar';
import ProductsList from '@/components/ProductsList';
import { PRODUCTS_MOCK } from '@/mock';

const Groups: NextPage = () => {
  const ordersLength = PRODUCTS_MOCK.length;

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <div className='d-flex align-items-end gap-5'>
        <span className='display-6'>Products / {ordersLength}</span>
        <FilterBar />
      </div>
      <ProductsList />
    </Container>
  );
};

export default Groups;
