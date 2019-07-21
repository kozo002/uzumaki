import * as path from 'path'
import * as express from 'express'

import cors from './config/cors'

const app = express()
cors(app)

app.get('/', (req, res) => {
  res.send('OK')
})

const port = process.env.PORT || 8101
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))
