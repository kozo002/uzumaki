import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import 'bootstrap/scss/bootstrap.scss'

import client from './graphql/client'

import Auth from './containers/Auth'

import Home from './pages/Home'
import LoggedIn from './pages/LoggedIn'
import Login from './pages/Login'
import Logout from './pages/Logout'

function App () {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const appNode = document.getElementById('app')
  ReactDOM.render(<App />, appNode)
})