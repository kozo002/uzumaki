const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const app = express()
const schema = gql`
  type Hello {
    message: String
  }
  type Subscription {
    hello(name: String!): Hello
  }
  type Query {
    hoge: Hello
  }
`

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Hello() {
      return { message: 'aaa' }
    }
  },
  playground: {
    endpoint: '/graphql',
  }
})
apolloServer.applyMiddleware({ app })

const ws = createServer(app)

module.exports = {
  start (PORT) {
    ws.listen(PORT, () => {
      console.log(`WebSocket Server is running at ws://localhost:${PORT}`)
      new SubscriptionServer({
        execute,
        subscribe,
        schema
      }, {
        server: ws,
        path: '/subscriptions',
      })
    })
  }
}