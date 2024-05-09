import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import React, { useCallback } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import InputRHF from '@/components/FormComponents/InputRHF/InputRHF';
import SelectRHF from '@/components/FormComponents/SelectRHF/SelectRHF';
import { useAppAction, useAppState } from '@/store/app/hooks';
import { EModals } from '@/store/app/types';
import { useProductsState } from '@/store/products/hooks';
import { IProduct } from '@/types/interfaces';
import { getEntitysByIds } from '@/utils/getEntitysByIds';
import { addOrderSchema } from '@/validation/addOrderSchema';

export interface FormValues {
  title: string;
  description: string;
  products?: string[] | [];
}

function AddOrderModal() {
  const { modals, appLoading } = useAppState();
  const { onAddOrderClose } = useAppAction();
  const { products } = useProductsState();

  const methods = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(addOrderSchema),
    defaultValues: {
      title: '',
      description: '',
      products: [],
    },
  });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = methods;

  const formData = watch();

  const closeModal = useCallback(() => {
    onAddOrderClose();
  }, [onAddOrderClose]);

  const productsOptions = products.map((product) => ({
    value: String(product.id),
    label: product.title,
  }));

  const addOrder = (formData: FormValues) => {
    modals[EModals.AddOrder].props.accept({
      ...formData,
      products: getEntitysByIds(formData.products, products) as IProduct[],
      createdAt: formatISO(new Date()),
    });
    reset();
  };

  if (!modals[EModals.AddOrder].active) return null;
  return (
    <Modal
      show={modals[EModals.AddOrder].active}
      onHide={closeModal}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(addOrder)}>
          <Modal.Header closeButton>
            <Modal.Title>Add order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='mb-3'>
              <InputRHF
                title={'Title'}
                placeholder={'... Title'}
                name='title'
                value={formData.title}
              />
            </Row>
            <Row className='mb-3'>
              <InputRHF
                title={'Descr'}
                placeholder={'... Descr'}
                name='description'
                value={formData.description}
              />
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md='12' controlId='validationCustom02'>
                <SelectRHF
                  options={productsOptions}
                  placeholder={'...Products'}
                  name={'products'}
                  value={formData?.products as string[]}
                  isMultiple
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
            <Button
              variant='danger'
              type='submit'
              className='d-flex align-items-center gap-3'
              disabled={appLoading || !isValid}
            >
              Add Order
              {appLoading && <Spinner animation='border' variant='light' size={'sm'} />}
            </Button>
          </Modal.Footer>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default AddOrderModal;
