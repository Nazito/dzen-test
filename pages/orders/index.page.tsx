import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';

import OrdersList from '@/components/OrdersList';
import useApiRequest from '@/hooks/useApiRequest';
import { useAppAction } from '@/store/app/hooks';
import { useOrdersAction, useOrdersState } from '@/store/orders/hooks';
import { useProductsAction } from '@/store/products/hooks';
import { IOrder, IProduct } from '@/types/interfaces';

interface IPageProps {
  orders: IOrder[];
  products: IProduct[];
}

const Orders: NextPage<IPageProps> = ({ orders, products }: IPageProps) => {
  const { orders: storeOrders } = useOrdersState();
  const { sendRequest } = useApiRequest();
  const { onSetOrders } = useOrdersAction();
  const { onSetProducts } = useProductsAction();
  const { onAddOrderOpen, onAddOrderClose } = useAppAction();

  const handleAddOrder = () => {
    onAddOrderOpen({
      accept: async (data) => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        const responseOrder = await sendRequest('/api/orders', options);
        onSetOrders([responseOrder, ...storeOrders]);
        onAddOrderClose();
      },
    });
  };

  useEffect(() => {
    onSetOrders(orders);
    onSetProducts(products);
  }, []);

  const ordersLength = storeOrders?.length;

  return (
    <Container fluid className='p-5 d-flex flex-column gap-5'>
      <div className='d-flex align-items-center gap-2 mb-2'>
        <div style={{ cursor: 'pointer' }} onClick={handleAddOrder}>
          <PlusCircleFill className='text-success' size={25} />
        </div>
        <span className='display-6'>Orders / {ordersLength}</span>
      </div>

      <OrdersList />
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
    },
  };
}

export default Orders;
