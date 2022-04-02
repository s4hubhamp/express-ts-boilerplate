import {NextFunction, Response} from 'express'
import createError from 'http-errors'
import TokenData from '../interfaces/TokenData'
import {TypedRequest} from '../interfaces/TypedRequest'
import jwt from 'jsonwebtoken'

// export default function (req: TypedRequestBody<{}>, res: Response, next: NextFunction) {
//   try {
//     const tokenData = req.auth
//     const role = tokenData?.role
//     if (role !== 'ADMIN') return next(new createError.Forbidden('Unauthorized to access Admin routes'))
//   } catch (error) {
//     return next(error)
//   }
//   return next()
// }

export default function executeSingle(
  func: (auth: TokenData, req: TypedRequest<{}, {}>, data?: any) => boolean | Error,
) {
  return async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
    const {auth} = req
    try {
      func(auth!, req)
    } catch (error) {
      return next(error)
    }
    return next()
  }
}

export function executeMultiWithAnd(
  functions: Array<(auth: TokenData, req: TypedRequest<{}, {}>, data?: any) => boolean | Error>,
  relation: 'OR' | 'AND',
) {
  return async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
    const {auth} = req
    functions.forEach(func => {
      try {
        func(auth!, req)
      } catch (error) {
        return next(error)
      }
    })
    return next()
  }
}

export function executeMultiWithOr(
  functions: Array<(auth: TokenData, req: TypedRequest<{}, {}>, data?: any) => boolean | Error>,
) {
  return async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
    const {auth} = req
    const _r = functions.some(func => {
      try {
        return func(auth!, req)
      } catch (error) {
        return false
      }
    })
    return _r ? next() : next(new createError.Forbidden())
  }
}
