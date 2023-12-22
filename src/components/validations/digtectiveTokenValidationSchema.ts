import * as yup from 'yup';

export const digtectiveTokenValidationSchema = () => yup.object({
  token: yup
    .string()
    .required("Input is required"),
});
