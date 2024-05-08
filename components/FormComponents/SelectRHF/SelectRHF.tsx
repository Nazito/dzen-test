import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFormContext } from 'react-hook-form';

import { IOption } from '@/types/interfaces';
import { getEntitysByIds } from '@/utils/getEntitysByIds';

interface Props {
  options: IOption[];
  isMultiple?: boolean;
  placeholder: string;
  name: string;
  value: string[] | string;
}

const SelectRHF: FC<Props> = ({ name, value, options = [], placeholder, isMultiple = false }) => {
  const { setValue } = useFormContext();

  const handleSelect = (eventKey: string | null) => {
    if (isMultiple) {
      setValue(name, [...(value as string[]), eventKey as string]);
    } else {
      setValue(name, eventKey);
    }
  };

  const badges = getEntitysByIds(Array.isArray(value) ? value : [], options);

  return (
    <Dropdown onSelect={handleSelect} className='w-100'>
      <Dropdown.Toggle variant='light' className='w-100 d-flex align-items-center'>
        <div className='d-flex flex-wrap w-100 gap-2'>
          {isMultiple &&
            !!badges.length &&
            badges.map((entity) => {
              return (
                <Badge key={(entity as IOption)?.value} bg='info'>
                  {(entity as IOption)?.label}
                </Badge>
              );
            })}
          {!isMultiple && value && value}
          {!value?.length && placeholder}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-100'>
        {options.map((option) => {
          return (
            <Dropdown.Item
              key={option.value}
              eventKey={option.value}
              style={{
                backgroundColor: value.includes(option.value) ? 'rgba(0, 0, 0, 0.2)' : 'initial',
              }}
            >
              {option.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectRHF;
