import * as yup from 'yup'

import Day from '@/models/Day'

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
})

export default class Project {
  readonly id: number
  readonly name: string
  readonly description: string | null
  readonly startIterationsOn: Day
  readonly iterationLength: number
  readonly velocity: number
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor (data: ProjectPayloadT) {
    this.id = parseInt(data.id)
    this.name = data.name
    this.description = data.description
    this.startIterationsOn = Day.convert(data.startIterationsOn)
    this.iterationLength = data.iterationLength
    this.velocity = data.velocity
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}