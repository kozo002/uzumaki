import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Session from '../models/Session'

type Props = {
  children: React.ReactNode,
}
type State = {
  isAuthenticated: boolean,
}

export default class Auth extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isAuthenticated: false,
    } as State
  }

  componentWillMount () {
    this.checkAccessToken()
  }

  componentWillUpdate () {
    this.checkAccessToken()
  }

  checkAccessToken () {
    this.setState({ isAuthenticated: Session.isLoggedIn });
  }

  render () {
    if (this.state.isAuthenticated) {
      return <Route children={this.props.children} />
    } else {
      return <Redirect to="/login" />
    }
  }
}
