import { deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import InputGeocoder from '@/components/GeocoderInput/InputGeocoderRHF';
import Map from '@/components/Map';
import useApiRequest from '@/hooks/useApiRequest';
import { useUserAction, useUserState } from '@/store/user/hooks';

const Groups: NextPage = () => {
  const router = useRouter();
  const { sendRequest } = useApiRequest();
  const { onSetUser } = useUserAction();
  const { user } = useUserState();
  const { t } = useTranslation();

  console.log(user, 'user');

  const fetchUser = async () => {
    const optionsProduct = {
      method: 'GET',
    };
    const response = await sendRequest('/api/auth/me', optionsProduct);
    onSetUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    deleteCookie('token');
    onSetUser(null);
    router.push('/');
  };

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <span className='display-6'>{t('app.settings')}</span>
      <Row>
        <Col lg='2'>
          {user && <p>Welcome, {user?.username}!</p>}
          <Button onClick={handleLogout} className='d-flex align-items-center gap-3'>
            Logout
          </Button>
        </Col>
        <Col lg='10'>
          <Row>
            <Col lg='4'>
              <InputGeocoder />
            </Col>
            <Col lg='6'>
              <Map />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common'])),
    },
  };
}

export default Groups;
