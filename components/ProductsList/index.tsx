import React from 'react';

import { useProductsState } from '@/store/products/hooks';

import ListItem from '../ListItem';
import ProductItem from './ProductItem';

export const ProductsList: React.FC = () => {
  const { products: storeProducts } = useProductsState();
  return (
    <div>
      <div className='w-100 d-flex flex-column gap-3'>
        {storeProducts.map((product) => (
          <ListItem key={product.id}>
            <ProductItem product={product} />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
