import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import FilterBar from '@/components/FilterBar';
import ProductsList from '@/components/ProductsList';
import { useProductsAction, useProductsState } from '@/store/products/hooks';
import { IProduct } from '@/types/interfaces';

interface IPageProps {
  products: IProduct[];
}

const Groups: NextPage<IPageProps> = ({ products }) => {
  const { products: storeProducts } = useProductsState();
  const { onSetProducts } = useProductsAction();
  useEffect(() => {
    onSetProducts(products);
  }, []);
  const productsLength = storeProducts.length;

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <div className='d-flex align-items-end gap-5'>
        <span className='display-6'>Products / {productsLength}</span>
        <FilterBar />
      </div>
      <ProductsList />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { host } = ctx.req.headers;
  const baseUrl = `http://${host}`;
  const response = await fetch(`${baseUrl}/api/products`);
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
}

export default Groups;
