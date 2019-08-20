import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
})

export enum Day {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}