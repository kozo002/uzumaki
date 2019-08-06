const { ApolloServer, gql } = require('apollo-server-express')
const { createContext } = require('dataloader-sequelize')

const db = require('../models')

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    githubId: Int!
    email: String!
    accessTokens: [AccessToken]
    createdAt: Date
    updatedAt: Date
  }

  type AccessToken {
    token: String!
    user: User!
    provider: String!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`

const resolvers = {
  User: require('./resolvers/User'),
  AccessToken: require('./resolvers/AccessToken'),
  Query: require('./resolvers/Query'),
  Date: require('./resolvers/Date'),
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
    eok: createContext(db.sequelize),
  }
})

module.exports = app => {
  apolloServer.applyMiddleware({ app })
}