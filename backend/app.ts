import * as express from 'express'
import * as Dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  Dotenv.config({ path: '.env.dev' })
}

import cors from './config/cors'
import passport from './config/passport'

const app = express()
cors(app)
passport()

app.get('/', (req, res) => {
  res.send('OK')
})

const port = process.env.PORT || 8101
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))
