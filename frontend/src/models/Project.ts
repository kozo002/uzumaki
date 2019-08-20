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
export namespace Day {
  export function toArray (): Day[] {
    return [
      Day.MON,
      Day.TUE,
      Day.WED,
      Day.THU,
      Day.FRI,
      Day.SAT,
      Day.SUN,
    ]
  }

  export function convert (value: string): Day {
    const index = Object.keys(Day).indexOf(value)
    return Day.toArray()[index]
  }
}

export  function convert (data: ProjectPayloadT): ProjectT {
  return {
    id: parseInt(data.id),
    name: data.name,
    description: data.description,
    startIterationsOn: Day.convert(data.startIterationsOn),
    iterationLength: data.iterationLength,
    velocity: data.velocity,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  } as ProjectT
}