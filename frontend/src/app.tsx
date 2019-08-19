import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import './styles/app.scss'
import 'bootstrap/scss/bootstrap.scss'

import client from './graphql/client'

import Auth from './containers/Auth'

import Organizations from './pages/Organizations'
import LoggedIn from './pages/LoggedIn'
import Login from './pages/Login'
import Logout from './pages/Logout'
import OrganizationNew from './pages/Organizations/New'
import OrganizationEdit from './pages/Organizations/Edit'
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
              <Route exact path="/" render={() => <Redirect to="/organizations" />} />
              <Route exact path="/organizations" component={Organizations} />
              <Route path="/organizations/new" component={OrganizationNew} />
              <Route path="/organizations/:organizationId/edit" component={OrganizationEdit} />
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