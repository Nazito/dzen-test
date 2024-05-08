import { format } from 'date-fns';
import Link from 'next/link';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ListUl, Trash } from 'react-bootstrap-icons';

import useApiRequest from '@/hooks/useApiRequest';
import { useAppAction } from '@/store/app/hooks';
import { useOrdersAction, useOrdersState } from '@/store/orders/hooks';
import { IOrder } from '@/types/interfaces';

import classes from './style.module.scss';

type TProps = {
  order: IOrder;
};

const OrderItem: FC<TProps> = ({ order }) => {
  const { title, createdAt, id, products } = order;

  const { sendRequest } = useApiRequest();
  const { onSetOrders } = useOrdersAction();
  const { orders: storeOrders } = useOrdersState();
  const { onConfirmOpen, onConfirmClose } = useAppAction();

  const handleDelete = () => {
    onConfirmOpen({
      title: 'Delete',
      text: 'Delete',
      actonBtnText: 'Del',
      accept: async () => {
        const options = {
          method: 'DELETE',
        };

        const response = await sendRequest(`/api/orders?orderId=${id}`, options);
        const filtredOrders = storeOrders.filter((order) => order.id !== response.orderId);
        onSetOrders(filtredOrders);
        onConfirmClose();
      },
    });
  };

  return (
    <Row className={`${classes.orderItem} align-items-center`}>
      <Col lg={'4'}>
        <p>{title}</p>
      </Col>

      <Col lg={'1'}>
        <Link href={'/groups'} className={classes.orderItem__menuIcon}>
          <ListUl size={20} color='dark' />
        </Link>
      </Col>

      <Col lg={'2'}>
        {products?.length ? (
          <>
            <p className='m-1'>{products?.length}</p>
            <p className='m-0'>Products</p>
          </>
        ) : (
          <p className='m-0'>Not added</p>
        )}
      </Col>

      <Col lg={'2'}>
        <p className='m-1'>{format(new Date(createdAt), 'HH:mm')}</p>
        <p className='m-0'>{format(new Date(createdAt), 'dd/MM/yyyy')}</p>
      </Col>

      <Col lg={'2'}>
        <p className='m-1'>2500$</p>
        <p className='m-0'>250 000.50 uah</p>
      </Col>

      <Col lg={'1'}>
        <div className={classes.orderItem__trash} onClick={handleDelete}>
          <Trash size={20} />
        </div>
      </Col>
    </Row>
  );
};

export default OrderItem;
