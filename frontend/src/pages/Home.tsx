import * as React from 'react'

import Session from '../models/Session'
import Header from '../components/Header'

export default function Home () {
  return (
    <>
      <Header isLoggedIn={Session.isLoggedIn} />
      <div className="container pt-3">
        Home
      </div>
    </>
  )
}