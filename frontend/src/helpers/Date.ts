import format from 'date-fns/format'

const datePattern = 'yyyy/M/d(E)'

export function formatDate (date: Date): string {
  return format(date, datePattern)
}