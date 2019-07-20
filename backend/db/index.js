const { Client } = require('pg')
const config = require('../config/database.development.json')

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})
client.connect()

module.exports.client = client
