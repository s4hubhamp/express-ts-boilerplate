import {NextFunction, Request, Response} from 'express'
import {Error} from 'mongoose'
import {HttpError} from 'http-errors'
import {ValidationError} from 'joi'
import {logger} from '../utils/logger'
import controllerError from '../utils/controllerError'
import {JsonWebTokenError} from 'jsonwebtoken'

export default async function (
  error: HttpError | Error | {message: string; status: number; name?: string},
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (error instanceof HttpError) {
      logger.error(`❌ HTTP Error ❌ `)
      logger.error(`${error.name} ${error.message}`)
      res.status(error.statusCode).json(error)
    } else if (error.name === 'MongoError') {
      logger.error(`❌ Mongo Error ❌ `)
      logger.error(`${error.message}`)
      res.status(500).json({message: 'Internal Server Error'})
    } else if (error instanceof controllerError) {
      logger.error(`❌ Controller Error ❌ `)
      logger.error(`${error.status} | ${error.message}`)
      res.status(error.status).json({message: error.message, data: error.data})
    } else if (error instanceof ValidationError) {
      const {details} = error
      const message = details.map(i => i.message).join(',')
      logger.error(`❌ Validation Error ❌ `)
      logger.error(`${message}`)
      res.status(422).json({message})
    } else if (error.message === undefined) {
      logger.error(`❌ Unknown Error ❌ `)
      logger.error(`${error?.toString()}`)
      res.status(500).json({message: 'Internal Server Error'})
    } else {
      logger.error(`${error.message}`)
      res.status(401).json({message: error.message})
    }
    console.dir(error, {depth: null})
  } finally {
    next(error)
  }
}
