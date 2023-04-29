import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'

import {connect, disconnect} from './databases'
import addMorganTokens from './utils/addMorganTokens'

import indexRoutes from './routes'
import errorMiddleware from './utils/error'

addMorganTokens(morgan)

const app: express.Application = express()

app.use(cors({origin: '*', maxAge: 300}))
app.use(hpp())
app.use(helmet())
app.use(express.json())
app.use(mongoSanitize())

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan((tokens, req, res) =>
      [
        tokens.method(req, res),
        tokens.status(req, res),
        tokens.url(req, res),
        tokens.body(req, res),
        // tokens.headers(req, res),
      ].join(' | ')
    )
  )
}

app.use('/api', indexRoutes)

app.use('*', (req, res) => {
  res.status(404).json({message: 'not found'}).send()
})

app.use(errorMiddleware)

app.listen(process.env.PORT, async () => {
  console.log(`🚀 App listening on the port ${process.env.PORT}`)
  await connect()
})

const gracefulShutdown = async () => {
  console.log('Gracefully shutting down')
  await disconnect()
}

//* close the connection to the database when the app is terminated
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
process.on('unhandledRejection', gracefulShutdown)
process.on('SIGUSR2', gracefulShutdown) // Sent by nodemon
