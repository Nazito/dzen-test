import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import DateTime from '../DateTime';
import LanguagePicker from '../LanguagePicker';
import Logo from '../Logo';
import OnlineUsers from '../OnlineUsers';

const Header: FC = () => {
  return (
    <header className='shadow'>
      <Container fluid='sm'>
        <Row className='align-items-center'>
          <Col xs='12' lg='5' className='d-flex justify-content-start'>
            <Logo />
          </Col>
          <Col xs='12' lg='2' className='d-flex justify-content-center'>
            <LanguagePicker />
          </Col>
          <Col xs='12' lg='5' className='d-flex justify-content-end gap-3'>
            <DateTime />
            <OnlineUsers />
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default Header;
