import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
  title: yup.string().required('validation.field_required'),
  serialNumber: yup.string().required('validation.field_required'),
  type: yup.string().required('validation.field_required'),
  guarantee: yup.object().shape({
    start: yup.date().required('validation.field_required'),
    end: yup.date().required('validation.field_required'),
  }),
  price: yup
    .object()
    .shape({
      usd: yup.string().required('validation.field_required'),
      uah: yup.string().required('validation.field_required'),
    })
    .required('validation.field_required'),
});
