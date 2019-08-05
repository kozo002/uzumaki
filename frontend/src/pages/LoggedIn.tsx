import * as React from 'react'
import { Redirect } from 'react-router-dom'

import QueryParameters from '../helpers/QueryParameters'
import Session from '../models/Session'

export default function LoggedIn () {
  const { token } = QueryParameters.decode()
  if (!token) {
    return <div>error</div>
  }

  Session.login(token)

  return (
    <Redirect to={'/'} />
  )
}