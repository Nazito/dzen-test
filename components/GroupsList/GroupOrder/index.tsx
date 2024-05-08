import React, { FC } from 'react';
import { CloseButton, Col } from 'react-bootstrap';
import { Cast, PlusCircleFill, Trash } from 'react-bootstrap-icons';

import ListItem from '@/components/ListItem';
import useApiRequest from '@/hooks/useApiRequest';
import { useAppAction } from '@/store/app/hooks';
import { useOrdersAction, useOrdersState } from '@/store/orders/hooks';
import { useProductsAction, useProductsState } from '@/store/products/hooks';

import classes from './style.module.scss';

const GroupOrder: FC = () => {
  const { products: storeProducs } = useProductsState();
  const { selectedOrder, orders: storeOrders } = useOrdersState();
  const { onSetSelectedOrder, onSetOrders } = useOrdersAction();
  const { onSetProducts } = useProductsAction();
  const { sendRequest } = useApiRequest();
  const { onAddProductOpen, onAddProductClose, onConfirmOpen, onConfirmClose } = useAppAction();

  const handleCloseOrderInfo = () => {
    onSetSelectedOrder(null);
  };

  const handleAddProduct = () => {
    onAddProductOpen({
      accept: async (data) => {
        const optionsProduct = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        const responseProduct = await sendRequest('/api/products', optionsProduct);

        const optionsOrder = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedOrder,
            products: [...(selectedOrder?.products || []), responseProduct],
          }),
        };

        const responseOrder = await sendRequest(
          `/api/orders?orderId=${selectedOrder?.id}`,
          optionsOrder,
        );

        const updatedOrders = storeOrders.map((order) => {
          if (order.id === responseOrder.id) {
            return responseOrder;
          } else {
            return order;
          }
        });
        onSetOrders(updatedOrders);
        onSetProducts([...storeProducs, responseProduct]);
        onSetSelectedOrder(responseOrder);
        onAddProductClose();
      },
    });
  };

  const handleDelete = (productId: string) => () => {
    onConfirmOpen({
      title: 'Delete Product',
      text: 'Delete Product',
      actonBtnText: 'Del',
      accept: async () => {
        const options = {
          method: 'DELETE',
        };

        const response = await sendRequest(`/api/products?productId=${productId}`, options);
        const filtredProducts = storeProducs.filter((product) => product.id !== response.productId);
        onSetProducts(filtredProducts);

        const optionsOrder = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedOrder,
            products: selectedOrder?.products.filter(
              (product) => String(product.id) !== String(productId),
            ),
          }),
        };

        const responseOrder = await sendRequest(
          `/api/orders?orderId=${selectedOrder?.id}`,
          optionsOrder,
        );
        onSetSelectedOrder(responseOrder);

        const updatedOrders = storeOrders.map((order) => {
          if (order.id === responseOrder.id) {
            return responseOrder;
          } else {
            return order;
          }
        });
        onSetOrders(updatedOrders);
        onConfirmClose();
      },
    });
  };

  if (!selectedOrder) {
    return null;
  }

  return (
    <Col lg='6'>
      <ListItem>
        <div className={classes.gorupOrder}>
          <div className={classes.gorupOrder__close} onClick={handleCloseOrderInfo}>
            <CloseButton />
          </div>
          <div className='mb-4'>
            <p className='display-7 mb-2'>{selectedOrder?.title}</p>

            <div
              className='d-flex align-items-center gap-2 mb-2'
              style={{ cursor: 'pointer' }}
              onClick={handleAddProduct}
            >
              <PlusCircleFill className='text-success' size={25} />
              <p className='m-0'>Add product</p>
            </div>
          </div>

          <div className='d-flex flex-column gap-2 mb-2'>
            {selectedOrder?.products.map((product) => (
              <ListItem key={product.id}>
                <div className='d-flex justify-content-between align-items-center text-secondary gap-2'>
                  <div>
                    <Cast size={50} />
                  </div>

                  <div>
                    <p className='mb-0'>{product.type}</p>
                    <p className='mb-0'>{product.serialNumber}</p>
                  </div>

                  <p>In service</p>

                  <div
                    className={classes.gorupOrder__trash}
                    onClick={handleDelete(String(product.id))}
                  >
                    <Trash size={20} />
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </div>
      </ListItem>
    </Col>
  );
};

export default GroupOrder;
