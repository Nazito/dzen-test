import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import GroupsList from '@/components/GroupsList';
import { useOrdersAction, useOrdersState } from '@/store/orders/hooks';
import { useProductsAction } from '@/store/products/hooks';
import { IOrder, IProduct } from '@/types/interfaces';

interface IPageProps {
  orders: IOrder[];
  products: IProduct[];
}

const Groups: NextPage<IPageProps> = ({ orders, products }) => {
  const { t } = useTranslation();
  const { orders: storeOrders } = useOrdersState();
  const { onSetOrders } = useOrdersAction();
  const { onSetProducts } = useProductsAction();

  useEffect(() => {
    onSetOrders(orders);
    onSetProducts(products);
  }, []);

  const ordersLength = storeOrders?.length;

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <span className='display-6'>{`${t('app.groups')} / ${ordersLength}`}</span>

      <GroupsList />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { host } = ctx.req.headers;
  const baseUrl = `http://${host}`;
  const responseOrders = await fetch(`${baseUrl}/api/orders`);
  const responseProducts = await fetch(`${baseUrl}/api/products`);
  const orders = await responseOrders.json();
  const products = await responseProducts.json();

  return {
    props: {
      orders,
      products,
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common'])),
    },
  };
}

export default Groups;
