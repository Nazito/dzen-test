import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import FilterBar from '@/components/FilterBar';
import ProductsList from '@/components/ProductsList';
import { useProductsAction, useProductsState } from '@/store/products/hooks';
import { IProduct } from '@/types/interfaces';

interface IPageProps {
  products: IProduct[];
}

const Products: NextPage<IPageProps> = ({ products }) => {
  const { t } = useTranslation();

  const { products: storeProducts } = useProductsState();
  const { onSetProducts } = useProductsAction();
  useEffect(() => {
    onSetProducts(products);
  }, [products]);
  const productsLength = storeProducts.length;
  console.log(products.length, 'products NextPage');
  console.log(storeProducts, 'storeProducts');
  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <div className='d-flex align-items-end gap-5'>
        <span className='display-6'>{`${t('app.products')} / ${productsLength}`}</span>
        <FilterBar />
      </div>
      <ProductsList />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader('Cache-Control', 'no-store');
  const { host } = ctx.req.headers;
  const baseUrl = `http://${host}`;
  const response = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store',
    next: {
      revalidate: 1,
    },
  });
  const products = await response.json();

  console.log(products.length, 'products getServerSideProps');
  return {
    props: {
      products: products || [],
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common'])),
    },
  };
}

export default Products;
