import * as yup from 'yup';

export const inventorySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  stock: yup
    .number()
    .required('Stock is required')
    .integer('Stock must be an integer')
    .min(0, 'Stock must be at least 0'),
});
