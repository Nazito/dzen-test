import React, { FC, useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { EType } from '@/types/enum';
import { useProductsAction, useProductsState } from '@/store/products/hooks';
import { IProduct } from '@/types/interfaces';

const FilterBar: FC = () => {
  const { onSetProducts } = useProductsAction();
  const { products: storeProducts } = useProductsState();
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>('All');

  useEffect(() => {
    if (storeProducts.length > 0 && originalProducts.length === 0) {
      setOriginalProducts(storeProducts);
    }
  }, [storeProducts, originalProducts]);

  const handleSelect = useCallback(
    (eventKey: string | null) => {
      setSelectedType(eventKey);
      if (eventKey === 'All') {
        onSetProducts(originalProducts);
      } else {
        const filteredProducts = originalProducts.filter((product) => product.type === eventKey);
        onSetProducts(filteredProducts);
      }
    },
    [onSetProducts, originalProducts],
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
