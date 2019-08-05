import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Auth from './containers/Auth'

import Home from './pages/Home'
import LoggedIn from './pages/LoggedIn'
import Login from './pages/Login'
import Logout from './pages/Logout'

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/loggedIn" component={LoggedIn} />
        <Route path="/login" component={Login} />
        <Auth>
          <Route exact path="/" component={Home} />
          <Route path="/logout" component={Logout} />
        </Auth>
      </Switch>
    </Router>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const appNode = document.getElementById('app')
  ReactDOM.render(<App />, appNode)
})