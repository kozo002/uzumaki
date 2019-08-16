const glob = require('glob')
const path = require('path')
const fs = require('fs')

const mutationPaths = glob.sync(path.resolve(__dirname, 'Mutation/*.js'))
const mutations = mutationPaths.reduce((acc, it) => {
  const name = path.basename(it).split('.')[0]
  return { ...acc, [name]: require(it) }
}, {})

module.exports = mutations