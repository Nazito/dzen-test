import React from 'react';

import { PRODUCTS_MOCK } from '@/mock';

import ListItem from '../ListItem';
import ProductItem from './ProductItem';

export const ProductsList: React.FC = () => {
  return (
    <div>
      <div className='w-100 d-flex flex-column gap-3'>
        {PRODUCTS_MOCK.map((product) => (
          <ListItem key={product.id}>
            <ProductItem product={product} />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
