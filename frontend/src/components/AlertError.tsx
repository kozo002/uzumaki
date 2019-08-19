import * as React from 'react'

type Props = {
  children: React.ReactNode,
}

export default function AlertError (props: Props) {
  return <div className="alert alert-danger">{props.children}</div>
}