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

  export function toNum (day: Day): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    switch (day) {
      case Day.SUN: return 0
      case Day.MON: return 1
      case Day.TUE: return 2
      case Day.WED: return 3
      case Day.THU: return 4
      case Day.FRI: return 5
      case Day.SAT: return 6
    }
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