import * as path from 'path';
import * as express from 'express';
const app = express()

const indexHTMLFile = path.resolve(__dirname, '../frontend/dist/index.html')

// route for static files
app.use(express.static('./frontend/dist'))

// route for fallback index.html
app.use((req, res) => {
  res.status(200).sendFile(indexHTMLFile)
})

const port = process.env.PORT || 8101
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))
