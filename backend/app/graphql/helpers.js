const glob = require('glob')
const path = require('path')
const fs = require('fs')

module.exports.readSchemas = ({ ignores = [] } = {}) => {
  let paths = glob.sync(path.resolve(__dirname, `schemas/*.graphql`))
  if (ignores.length > 0) {
    const ignoreRxp = new RegExp(ignores.map(it => `schemas/${it}.graphql`).join('|'))
    paths = paths.filter(it => !ignoreRxp.test(it))
  }
  return paths.map(it => fs.readFileSync(it, { encoding: 'utf-8' })).join("\n")
}

module.exports.readResolvers = ({ ignores = [] } = {}) => {
  let paths = glob.sync(path.resolve(__dirname, 'resolvers/*.js'))
  if (ignores.length > 0) {
    const ignoreRxp = new RegExp(ignores.join('|'))
    paths = paths.filter(it => !ignoreRxp.test(it))
  }
  return paths.reduce((acc, it) => {
    const name = path.basename(it).split('.')[0]
    return { ...acc, [name]: require(it) }
  }, {})
}