import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export default function EmptyMessage (props: Props) {
  return <div className="py-5 text-center text-secondary">{props.children}</div>
}