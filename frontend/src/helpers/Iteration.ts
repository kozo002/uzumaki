import startOfWeek from 'date-fns/startOfWeek'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'

import Day from '@/models/Day'

interface IterationDataI {
  startDay: Date
  endDay: Date
  iterationsCount: number
}

export const calcIteration = (project: ProjectT): IterationDataI => {
  const now = new Date()
  const weekStartsOn = Day.toNum(project.startIterationsOn)
  const firstIterationStartDay = startOfWeek(project.createdAt, { weekStartsOn })
  const iterationDaysCount = project.iterationLength * 7 - 1
  let endDay = addDays(firstIterationStartDay, iterationDaysCount)
  let iterationsCount = 1
  while (true) {
    if (endDay.getTime() > now.getTime()) { break }
    endDay = addDays(endDay, iterationDaysCount + 1)
    iterationsCount++
  }
  const startDay = subDays(endDay, iterationDaysCount)
  return {
    startDay,
    endDay,
    iterationsCount,
  } as IterationDataI
}