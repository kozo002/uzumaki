import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ErrorLink } from 'apollo-link-error'

import Session from '../models/Session'

const httpLink = createHttpLink({
  uri: `${process.env.API_ORIGIN}/graphql`
})

const authLink = setContext(async (operation: any, { headers }: any): Promise<any> => {
  const token = Session.token
  if (!token) {
    return { headers }
  }
  return {
    headers: {
      ...headers,
      'Authorization': `token ${token}`,
    }
  }
})

const logoutLink = new ErrorLink((err) => {
  const unauthenticated = err.graphQLErrors.find(err => err.extensions.code === 'UNAUTHENTICATED')
  if (!unauthenticated) { return }
  Session.logout()
  window.location.reload()
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    logoutLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
})

export default client