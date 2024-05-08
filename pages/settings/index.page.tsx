import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const Groups: NextPage = () => {
  const { t } = useTranslation();

  return <div>{t('app.settings')}</div>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common'])),
    },
  };
}

export default Groups;
