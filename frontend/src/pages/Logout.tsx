import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Session from '../models/Session'

export default function Logout () {
  Session.logout()
  return <Redirect to="/login" />
}