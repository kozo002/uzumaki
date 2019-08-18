import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client