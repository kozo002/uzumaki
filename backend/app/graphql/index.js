const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express')

const db = require('../models')
const JWT = require('../utils/jwt')
const { readSchemas, readResolvers } = require('./helpers')

const rawSchemas = readSchemas({ ignores: ['Subscription'] })
const typeDefs = gql`${rawSchemas}`
const resolvers = readResolvers({ ignores: ['Subscription'] })

const env = process.env.NODE_ENV || 'development'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: env === 'development',
  context: async ({ req, res }) => {
    const token = (req.headers.authorization || '').split(' ')[1]
    let decoded, user

    try {
      decoded = JWT.decode(token)
      user = await db.User.findOne({ where: { id: decoded.user_id } })
    } catch (err) {
      console.error(err)
    }
    if (!user) {
      throw new AuthenticationError()
    }

    return {
      db,
      user,
    }
  }
})

module.exports = app => {
  apolloServer.applyMiddleware({ app })
}