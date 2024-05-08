import { format } from 'date-fns';
import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ChevronRight, ListUl } from 'react-bootstrap-icons';

import { useOrdersAction } from '@/store/orders/hooks';
import { IOrder } from '@/types/interfaces';

import classes from './style.module.scss';

type TProps = {
  order: IOrder;
};

const GroupItem: FC<TProps> = ({ order }) => {
  const { onSetSelectedOrder } = useOrdersAction();
  const { createdAt, products } = order;

  const handleClickOrder = () => {
    onSetSelectedOrder(order);
  };

  return (
    <Card body className={classes.orderItem} onClick={handleClickOrder}>
      <Row className={` align-items-center`}>
        <Col lg={'2'}>
          <div className={classes.orderItem__menuIcon}>
            <ListUl size={20} color='dark' />
          </div>
        </Col>

        <Col lg={'4'}>
          {products?.length ? (
            <>
              <p className='m-1'>{products.length}</p>
              <p className='m-0'>Products</p>
            </>
          ) : (
            <p className='m-0'>Not added</p>
          )}
        </Col>

        <Col lg={'4'}>
          <p className='m-1'>{format(new Date(createdAt), 'HH:mm')}</p>
          <p className='m-0'>{format(new Date(createdAt), 'dd/MM/yyyy')}</p>
        </Col>

        <div className={classes.orderItem__chevron}>
          <ChevronRight size={30} className='text-light' />
        </div>
      </Row>
    </Card>
  );
};

export default GroupItem;
