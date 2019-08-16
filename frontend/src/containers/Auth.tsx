import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Session from '../models/Session'

type Props = {
  children: React.ReactNode,
}

export default function Auth (props: Props) {
  if (!Session.isLoggedIn) {
    return <Redirect to={'/login'} />
  }
  return <>{props.children}</>
}
