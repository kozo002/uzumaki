import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import './styles/app.scss'
import 'bootstrap/scss/bootstrap.scss'

import client from './graphql/client'

import Auth from './containers/Auth'

import Home from './pages/Home'
import LoggedIn from './pages/LoggedIn'
import Login from './pages/Login'
import Logout from './pages/Logout'
import ProjectNew from './pages/Organizations/Projects/New'
import ProjectEdit from './pages/Organizations/Projects/Edit'

import Header from './components/Header'
import Session from './models/Session'

function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header isLoggedIn={Session.isLoggedIn} />
        <Switch>
          <Route path="/loggedIn" component={LoggedIn} />
          <Route path="/login" component={Login} />
          <Auth>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/organizations/:organizationId/projects/new" component={ProjectNew} />
              <Route path="/organizations/:organizationId/projects/:projectId/edit" component={ProjectEdit} />
              <Route path="/logout" component={Logout} />
            </Switch>
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