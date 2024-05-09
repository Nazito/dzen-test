import { format } from 'date-fns';
import Link from 'next/link';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ListUl, Trash } from 'react-bootstrap-icons';

import useApiRequest from '@/hooks/useApiRequest';
import { useAppAction } from '@/store/app/hooks';
import { useOrdersAction, useOrdersState } from '@/store/orders/hooks';
import { IOrder, IProduct } from '@/types/interfaces';

import classes from './style.module.scss';

type TProps = {
  order: IOrder;
};

const calculateTotal = (products: IProduct[], currency: string) => {
  let total = 0;
  products.forEach((product) => {
    product.price.forEach((price) => {
      if (price.symbol === currency) {
        total += parseFloat(String(price.value));
      }
    });
  });
  return total;
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
        <p className='m-0'>{title}</p>
      </Col>

      <Col lg={'1'}>
        <Link href={'/groups'} className={classes.orderItem__menuIcon}>
          <ListUl size={20} color='dark' />
        </Link>
      </Col>

      <Col lg={'2'}>
        <p className='m-0'>Products</p>
        {products?.length ? (
          <p className='m-0'>{products?.length}</p>
        ) : (
          <p className='m-0'>not added</p>
        )}
      </Col>

      <Col lg={'2'}>
        <p className='m-0'>{format(new Date(createdAt), 'HH:mm')}</p>
        <p className='m-0'>{format(new Date(createdAt), 'dd/MM/yyyy')}</p>
      </Col>

      <Col lg={'2'}>
        {products?.length ? (
          <>
            <p className='m-0'>{`${calculateTotal(products, 'USD')} USD`}</p>
            <p className='m-0'>{`${calculateTotal(products, 'UAH')} UAH`}</p>
          </>
        ) : (
          <>
            <p className='m-0'>Products</p>
            <p className='m-0'>not added</p>
          </>
        )}
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
