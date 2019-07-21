import { Express } from 'express'

const devCORSOrigins = ['http://localhost:8080']
const prodCORSOrigins = ['https://uzumaki.zochang.com']
const CORSOrigins = process.env.NODE_ENV === 'production' ? prodCORSOrigins : devCORSOrigins

export function cors (app: Express) {
  app.use(function(req, res, next) {
    let result = 'null'
    const { origin } = req.headers
    if (origin != null && CORSOrigins.includes(origin.toString())) {
      result = origin.toString()
    }
    res.header("Access-Control-Allow-Origin", result)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
}