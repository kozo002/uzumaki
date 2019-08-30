import * as React from 'react'

import { formatDate } from '@/helpers/Date'

interface Props {
  start: Date
  end: Date
  total: number
}

export default function IterationHeader (props: Props) {
  return (
    <p className="font-weight-bold text-secondary d-flex justify-content-between">
      <span>
        {formatDate(props.start)} - {formatDate(props.end)}
      </span>
      <span>
        TOTAL {props.total}
      </span>
    </p>
  )
}