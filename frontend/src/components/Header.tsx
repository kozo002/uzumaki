import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  isLoggedIn: boolean,
}

export default function Header (props: Props) {
  return (
    <div className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">🌀Uzumaki</Link>

      {props.isLoggedIn && <Link to="/logout">Logout</Link>}
      {!props.isLoggedIn && <Link to="/login">Login</Link>}
    </div>
  )
}