import express from 'express'
import routes from './config/routes'
import './config/environment'

const app = express()

app.use(routes)

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
