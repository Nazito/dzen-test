import 'react-datepicker/dist/react-datepicker.css';

import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

interface Props {
  placeholder: string;
  name: string;
  value: Date | null | undefined;
}

const DatePickerRHF: FC<Props> = ({ name, value, placeholder }) => {
  const { setValue } = useFormContext();

  const handleChange = (date: Date) => {
    setValue(name, date);
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleChange}
      placeholderText={placeholder}
      dateFormat='dd MMM yyyy'
    />
  );
};

export default DatePickerRHF;
