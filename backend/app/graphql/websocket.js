const express = require('express')
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const db = require('../models')
const JWT = require('../utils/jwt')
const { readSchemas, readResolvers } = require('./helpers')

const app = express()
const rawSchemas = readSchemas({ ignores: ['Mutation'] })
const typeDefs = gql`${rawSchemas}`
const resolvers = readResolvers({ ignores: ['Mutation'] })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
})

module.exports = {
  start (PORT) {
    apolloServer.applyMiddleware({ app })
    const ws = createServer(app)

    ws.listen(PORT, () => {
      console.log(`WebSocket Server is running at ws://localhost:${PORT}`)
      new SubscriptionServer({
        execute,
        subscribe,
        schema: makeExecutableSchema({ typeDefs: rawSchemas, resolvers }),
        async onOperation (message, params) {
          const { authToken } = message.payload
          let decoded, user

          try {
            decoded = JWT.decode(authToken)
            user = await db.User.findOne({ where: { id: decoded.user_id } })
          } catch (err) {
            console.error(err)
          }
          if (!user) {
            throw new AuthenticationError()
          }

          return {
            ...params,
            context: {
              ...params.context,
              db,
              user,
            },
          }
        },
      }, {
        server: ws,
        path: '/',
      })
    })
  }
}