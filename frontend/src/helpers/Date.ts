import format from 'date-fns/format'

const datePattern = 'yyyy/M/d'

export function formatDate (date: Date): string {
  return format(date, datePattern)
}