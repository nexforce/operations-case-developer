import './config/environment'

import express from 'express'
import routes from './config/routes'

const app = express()

app.use(express.json())
app.use(routes)

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
