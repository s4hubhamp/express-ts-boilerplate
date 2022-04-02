import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import hpp from 'hpp'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'

import {connect, disconnect} from './databases'
import {logger, stream} from './utils/logger'
import addMorganTokens from './utils/addMorganTokens'
import validateEnv from './utils/validateEnv'

import indexRoutes from './routes'
import farmerRoutes from './routes/farmer'
import adminRoutes from './routes/admin'
import authRoutes from './routes/auth'

validateEnv()
addMorganTokens(morgan)
connect()

const app: express.Application = express()

app.use(cors({origin: '*', maxAge: 300}))
app.use(hpp())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(mongoSanitize())

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {stream}))
} else if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan(
      (tokens, req, res) =>
        [
          tokens.method(req, res),
          tokens.status(req, res),
          tokens.url(req, res),
          tokens.body(req, res),
          // tokens.headers(req, res),
        ].join(' | '),
      {stream},
    ),
  )
}

app.use('/', indexRoutes)
app.use('/farmer', farmerRoutes)
app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)

app.use('*', (req, res) => {
  res.status(404).json({message: 'not found'}).send()
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  logger.info(`🚀 App listening on the port ${process.env.PORT}`)
})

process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----')
  console.log(error)
  console.log('----- Exception origin -----')
  console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----')
  console.log(promise)
  console.log('----- Reason -----')
  console.log(reason)
})

process.on('SIGINT', code => {
  console.log('inside')
  disconnect()
})
