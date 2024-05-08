import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { useOrdersState } from '@/store/orders/hooks';

import GroupItem from './GroupItem';
import GroupOrder from './GroupOrder';

const GroupsList: FC = () => {
  const { orders: storeOrders, selectedOrder } = useOrdersState();
  return (
    <Row>
      <Col lg='6' className='d-flex flex-column gap-3'>
        {storeOrders?.map((order) => <GroupItem key={order.id} order={order} />)}
      </Col>
      {selectedOrder && <GroupOrder />}
    </Row>
  );
};

export default GroupsList;
