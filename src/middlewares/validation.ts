import {NextFunction, Request, Response} from 'express-serve-static-core'
import {RequestBodyValidators, RequestQueryValidators} from '../interfaces/Validators'

import {bodyValidators, queryValidators} from '../validators'

export function validateBody(validator: keyof RequestBodyValidators) {
  if (!bodyValidators.hasOwnProperty(validator)) throw new Error(`'${validator}' validator is not exist`)

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await bodyValidators[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      next(err)
    }
  }
}

export function validateQuery(validator: keyof RequestQueryValidators) {
  if (!queryValidators.hasOwnProperty(validator)) throw new Error(`'${validator}' validator is not exist`)

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await queryValidators[validator].validateAsync(req.query)
      req.query = validated
      next()
    } catch (err) {
      next(err)
    }
  }
}
