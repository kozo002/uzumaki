const express = require('express')
const passport = require('passport')

if (process.env.NODE_ENV !== 'production') {
  const Dotenv = require('dotenv')
  Dotenv.config({ path: '.env.dev' })
}

const cors = require('./config/cors')
const passportConfig = require('./config/passport')
const authController = require('./app/controllers/authController')
const GraphQL = require('./app/graphql')
const WebSocketServer = require('./app/graphql/websocket')

const app = express()
cors(app)
passportConfig()
GraphQL(app)

app.use(passport.initialize())
app.use(passport.session())
app.use(authController)
app.get('/', (req, res) => {
  res.send('OK')
})


const port = process.env.PORT || 8101
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))

WebSocketServer.start(process.env.PORT_WS || 9101)