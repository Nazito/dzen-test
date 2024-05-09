import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import React, { useCallback } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import DatePickerRHF from '@/components/FormComponents/DatePickerRHF/DatePickerRHF';
import InputRHF from '@/components/FormComponents/InputRHF/InputRHF';
import SelectRHF from '@/components/FormComponents/SelectRHF/SelectRHF';
import { useAppAction, useAppState } from '@/store/app/hooks';
import { EModals } from '@/store/app/types';
import { useOrdersState } from '@/store/orders/hooks';
import { EType } from '@/types/enum';
import { addProductSchema } from '@/validation/addProductSchema';

export interface FormValues {
  title: string;
  serialNumber: string;
  type: string;
  guarantee: {
    start: Date;
    end: Date;
  };
  price: {
    usd: string;
    uah: string;
  };
}

function AddProductModal() {
  const { modals, appLoading } = useAppState();
  const { onAddProductClose } = useAppAction();
  const { selectedOrder } = useOrdersState();

  const methods = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(addProductSchema),
    defaultValues: {
      title: '',
      serialNumber: '',
      type: '',
      guarantee: {
        start: new Date(),
        end: new Date(),
      },
      price: {
        usd: '',
        uah: '',
      },
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
    onAddProductClose();
  }, [onAddProductClose]);

  const productsTypesOptions = Object.entries(EType).map(([name, value]) => ({
    value: String(value),
    label: name,
  }));

  const addProduct = (formData: FormValues) => {
    const productCreateData = {
      ...formData,
      guarantee: {
        start: formatISO(formData.guarantee.start),
        end: formatISO(formData.guarantee.end),
      },
      price: [
        { value: formData.price.usd, symbol: 'USD' },
        { value: formData.price.uah, symbol: 'UAH' },
      ],
      createdAt: formatISO(new Date()),
      order: selectedOrder,
    };

    modals[EModals.AddProduct].props.accept(productCreateData);
    reset();
  };

  if (!modals[EModals.AddProduct].active) return null;
  return (
    <Modal
      show={modals[EModals.AddProduct].active}
      onHide={closeModal}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(addProduct)}>
          <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
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
                title={'Serial Number'}
                placeholder={'... Descr'}
                name='serialNumber'
                value={formData.serialNumber}
              />
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md='12' controlId='validationCustom02'>
                <Form.Label>Type</Form.Label>
                <SelectRHF
                  options={productsTypesOptions}
                  placeholder={'...Type'}
                  name={'type'}
                  value={formData.type}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Label>Guarantee</Form.Label>
              <Form.Group as={Col} md='6' className='gap-2 d-flex align-items-center'>
                <Form.Label className='m-0'>Start</Form.Label>
                <DatePickerRHF
                  placeholder={'...Date'}
                  name={'guarantee.start'}
                  value={formData.guarantee.start}
                />
              </Form.Group>
              <Form.Group as={Col} md='6' className='gap-2 d-flex align-items-center'>
                <Form.Label className='m-0'>End</Form.Label>
                <DatePickerRHF
                  placeholder={'...Date'}
                  name={'guarantee.end'}
                  value={formData.guarantee.end}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Group as={Col} md='6'>
                <InputRHF
                  title={'USD $'}
                  placeholder={'... price'}
                  name='price.usd'
                  value={formData.price.usd}
                />
              </Form.Group>
              <Form.Group as={Col} md='6'>
                <InputRHF
                  title={'UAH ₴'}
                  placeholder={'... price'}
                  name='price.uah'
                  value={formData.price.uah}
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
              Add Product
              {appLoading && <Spinner animation='border' variant='light' size={'sm'} />}
            </Button>
          </Modal.Footer>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default AddProductModal;
