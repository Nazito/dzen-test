import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';

import { EType } from '@/types/enum';

const FilterBar: FC = () => {
  return (
    <div className='d-flex gap-3'>
      <div className='d-flex align-items-center gap-2'>
        Type:
        <Dropdown>
          <Dropdown.Toggle variant='success'>Выберите что-то</Dropdown.Toggle>
          <Dropdown.Menu>
            {/* [name, value] */}
            {Object.entries(EType).map(([name], idx) => (
              <Dropdown.Item key={name} eventKey={`action-${idx}`}>
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
