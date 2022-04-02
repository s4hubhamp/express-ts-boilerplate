import {NextFunction, Response} from 'express'
import createError from 'http-errors'
import jwt, {Secret} from 'jsonwebtoken'
import TokenData from '../interfaces/TokenData'
import {TypedRequestBody} from '../interfaces/TypedRequest'

export default function (req: TypedRequestBody<{}>, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization
  if (!authorization) return next(new createError.Unauthorized())
  try {
    const accessTokenSecret = <Secret>process.env.ACCESS_TOKEN_SECRET
    req.auth = <TokenData>jwt.verify(authorization, accessTokenSecret)
    return next()
  } catch (error) {
    return next(error)
  }
}
