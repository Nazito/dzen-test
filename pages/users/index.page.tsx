import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Col, Container } from 'react-bootstrap';

import Graphic from '@/components/Graphic';
import ListItem from '@/components/ListItem';

const Groups: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <span className='display-6'>{t('app.users')}</span>

      <Col lg='6'>
        <ListItem>
          <Graphic />
        </ListItem>
      </Col>
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
