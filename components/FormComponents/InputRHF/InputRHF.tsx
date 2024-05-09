import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { FieldError, useFormContext } from 'react-hook-form';

import { getNestedProperty } from '@/utils/getNestedProperty';

interface Props {
  title: string;
  placeholder: string;
  name: string;
  value: string;
  type?: string;
}

const InputRHF: FC<Props> = ({ name, value, placeholder, title, type = 'text' }) => {
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
    trigger(name);
  };

  const fieldError = getNestedProperty(errors, name) as FieldError;

  return (
    <Form.Group as={Col} md='12'>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        required
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
        type={type}
      />

      {fieldError && (
        <Form.Control.Feedback type='invalid' className='d-flex'>
          {t(fieldError?.message as string)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default InputRHF;
