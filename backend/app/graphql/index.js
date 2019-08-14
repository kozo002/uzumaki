const glob = require('glob')
const path = require('path')
const fs = require('fs')
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express')
const { createContext } = require('dataloader-sequelize')

const db = require('../models')
const JWT = require('../utils/jwt')

const schemaPaths = glob.sync(path.resolve(__dirname, 'schemas/*.graphql'))
const schemas = schemaPaths.map(it => fs.readFileSync(it, { encoding: 'utf-8' })).join("\n")
const typeDefs = gql`${schemas}`

const resolverPaths = glob.sync(path.resolve(__dirname, 'resolvers/*.js'))
const resolvers = resolverPaths.reduce((acc, it) => {
  const name = path.basename(it).split('.')[0]
  return { ...acc, [name]: require(it) }
}, {})

const env = process.env.NODE_ENV || 'development'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
      eok: createContext(db.sequelize),
      user,
    }
  }
})

module.exports = app => {
  apolloServer.applyMiddleware({ app })
}