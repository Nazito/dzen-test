import React, { ChangeEvent, FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface Props {
  title: string;
  placeholder: string;
  name: string;
  value: string;
  type?: string;
}

const InputRHF: FC<Props> = ({ name, value, placeholder, title, type = 'text' }) => {
  const { setValue } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  };

  return (
    <Form.Group as={Col} md='12' controlId='validationCustom01'>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        required
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
        type={type}
      />
      {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
    </Form.Group>
  );
};

export default InputRHF;
