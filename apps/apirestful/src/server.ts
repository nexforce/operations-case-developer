import express from 'express'

const app = express()

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log('Running server on ${SERVER_PORT}')
})
