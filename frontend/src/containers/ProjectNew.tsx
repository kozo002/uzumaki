import * as React from 'react'

type Props = {
  children: Function,
}

export default function ProjectNew (props: Props) {
  return (
    <div>
      {props.children}
    </div>
  )
}