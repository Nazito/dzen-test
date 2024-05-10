import { motion } from 'framer-motion';
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
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <AsideBar />
            </motion.div>
          </Col>
          <Col xs lg='10' className='h-100 pb-3'>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              {children}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Layout;
