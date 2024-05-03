import React, { FC } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import Logo from '../Logo';
import { TopMenu } from '../TopMenu';

const Header: FC = () => {
  return (
    <header className='shadow'>
      <Container fluid='sm'>
        <Row className='align-items-center'>
          <Col xs='12' lg='5' className='d-flex justify-content-start'>
            <Logo />
          </Col>
          <Col xs='12' lg='2' className='d-flex justify-content-center'>
            <Form.Control type='text' placeholder='...Search' />
          </Col>
          <Col xs='12' lg='5' className='d-flex justify-content-end'>
            <TopMenu />
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default Header;
