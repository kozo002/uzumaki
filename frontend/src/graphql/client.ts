import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ErrorLink } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getOperationAST, OperationDefinitionNode } from 'graphql'

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
  const errors = err.graphQLErrors || []
  console.log(err)
  const unauthenticated = errors.find(err => err.extensions.code === 'UNAUTHENTICATED')
  if (!unauthenticated) { return }
  Session.logout()
  window.location.reload()
})

const subscriptionClient = new SubscriptionClient('ws://localhost:9101/', {
  reconnect: true,
  connectionParams () {
    return { authToken: Session.token }
  },
})
subscriptionClient.use([{
  applyMiddleware (options, next) {
    options.authToken = Session.token
    next()
  }
}])
const wsLink = new WebSocketLink(subscriptionClient)

const connectionLink = ApolloLink.split(
  ({ query }) => {
    const subscriptionDef = query.definitions.find(it => {
      return it.kind === 'OperationDefinition' && it.operation === 'subscription'
    })
    return Boolean(subscriptionDef)
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    logoutLink,
    // wsLink,
    connectionLink,
  ]),
  cache: new InMemoryCache(),
})

export default client