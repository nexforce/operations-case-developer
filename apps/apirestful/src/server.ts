import './config/environment'
import app from './app'
import routes from './config/routes'
import cors from 'cors'

app.use(cors())
app.use(routes)

const SERVER_PORT = 5000

app.listen(SERVER_PORT, () => {
  console.log(`Running server on ${SERVER_PORT}`)
})
