import * as yup from 'yup';

export const addOrderSchema = yup.object().shape({
  title: yup.string().required('validation.field_required'),
  description: yup.string().required('validation.field_required'),
});
