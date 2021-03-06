import * as React from 'react'

type Props = {
  children: React.ReactNode,
}

export default function MainContainer (props: Props) {
  return <main className="container pt-4">{props.children}</main>
}