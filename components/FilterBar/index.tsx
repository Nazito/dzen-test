import React, { FC, useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { EType } from '@/types/enum';
import { useProductsAction, useProductsState } from '@/store/products/hooks';
import { IProduct } from '@/types/interfaces';

const FilterBar: FC = () => {
  const { onSetProducts } = useProductsAction();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>('All');
  const { products: storeProducts } = useProductsState();

  useEffect(() => {
    setAllProducts(storeProducts);
  }, []);

  const handleSelect = useCallback(
    (eventKey: string | null) => {
      setSelectedType(eventKey);
      if (eventKey === 'All') {
        onSetProducts(allProducts);
      } else {
        const filteredProducts = allProducts?.filter((product) => product.type === eventKey);
        onSetProducts(filteredProducts);
      }
    },
    [allProducts, onSetProducts],
  );

  return (
    <div className='d-flex gap-3'>
      <div className='d-flex align-items-center gap-2'>
        Type:
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant='success'>{selectedType}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item key='All' eventKey='All'>
              All
            </Dropdown.Item>
            {Object.entries(EType).map(([name, value]) => (
              <Dropdown.Item key={name} eventKey={value}>
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FilterBar;
