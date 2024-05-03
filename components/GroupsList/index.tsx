import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { ORDERS_MOCK } from '@/mock';

import ListItem from '../ListItem';
import GroupItem from './GroupItem';
import GroupOrder from './GroupOrder';

const GroupsList: FC = () => {
  return (
    <Row>
      <Col lg='6' className='d-flex flex-column gap-3'>
        {ORDERS_MOCK.map((order) => (
          <ListItem key={order.id}>
            <GroupItem order={order} />
          </ListItem>
        ))}
      </Col>

      <GroupOrder />
    </Row>
  );
};

export default GroupsList;
