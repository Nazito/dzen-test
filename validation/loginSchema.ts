import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('validation.field_required'),
  password: yup.string().required('validation.field_required'),
});
