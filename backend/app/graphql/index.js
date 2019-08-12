const glob = require('glob')
const path = require('path')
const fs = require('fs')
const { ApolloServer, gql } = require('apollo-server-express')
const { createContext } = require('dataloader-sequelize')

const db = require('../models')

const schemaPaths = glob.sync(path.resolve(__dirname, 'schemas/*.graphql'))
const schemas = schemaPaths.map(it => fs.readFileSync(it, { encoding: 'utf-8' })).join("\n")
const typeDefs = gql`${schemas}`

const resolverPaths = glob.sync(path.resolve(__dirname, 'resolvers/*.js'))
const resolvers = resolverPaths.reduce((acc, it) => {
  const name = path.basename(it).split('.')[0]
  return { ...acc, [name]: require(it) }
}, {})

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