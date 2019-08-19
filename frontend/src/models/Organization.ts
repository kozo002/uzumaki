import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
})