import React, { ChangeEvent, FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface Props {
  title: string;
  placeholder: string;
  name: string;
  value: string;
}

const InputRHF: FC<Props> = ({ name, value, placeholder, title }) => {
  const { setValue } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(name, e.target.value);
  };

  return (
    <Form.Group as={Col} md='12' controlId='validationCustom01'>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        required
        type='text'
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
      />
      {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
    </Form.Group>
  );
};

export default InputRHF;
