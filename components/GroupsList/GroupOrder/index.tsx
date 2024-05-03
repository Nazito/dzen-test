import React, { FC } from 'react';
import { Col } from 'react-bootstrap';
import { Cast, PlusCircleFill, Trash } from 'react-bootstrap-icons';

import ListItem from '@/components/ListItem';
import { PRODUCTS_MOCK } from '@/mock';

import classes from './style.module.scss';

const GroupOrder: FC = () => {
  return (
    <Col lg='6'>
      <ListItem>
        <div>
          <div className='mb-4'>
            <p className='display-7 mb-2'>Order 1</p>

            <div className='d-flex align-items-center gap-2 mb-2'>
              <PlusCircleFill className='text-success' size={25} />
              <p className='m-0'>Add product</p>
            </div>
          </div>

          <div className='d-flex flex-column gap-2 mb-2'>
            {PRODUCTS_MOCK.map((product) => (
              <ListItem key={product.id}>
                <div className='d-flex justify-content-between align-items-center text-secondary gap-2'>
                  <div>
                    <Cast size={50} />
                  </div>

                  <div>
                    <p className='mb-0'>{product.type}</p>
                    <p className='mb-0'>{product.serialNumber}</p>
                  </div>

                  <p>In service</p>

                  <div className={classes.gorupOrder__trash}>
                    <Trash size={20} />
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </div>
      </ListItem>
    </Col>
  );
};

export default GroupOrder;
