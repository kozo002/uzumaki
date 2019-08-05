import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Session from '../models/Session'

export default function Login () {
  if (Session.isLoggedIn) {
    return <Redirect to={'/'} />
  }

  return (
    <div>
      <a href={`${process.env.API_ORIGIN}/auth/github`}>login with github</a>
    </div>
  )
}