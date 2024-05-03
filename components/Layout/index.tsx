import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import AsideBar from '../AsideBar';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container fluid className='p-0 h-100 d-flex flex-column'>
      <Header />
      <Container as='main' fluid className='p-0 h-100'>
        <Row className='p-0 h-100'>
          <Col xs lg='2' className='shadow p-5'>
            <AsideBar />
          </Col>
          <Col xs lg='10'>
            {children}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Layout;
