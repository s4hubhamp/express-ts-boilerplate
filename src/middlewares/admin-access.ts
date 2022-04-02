import createError from 'http-errors'
import TokenData from '../interfaces/TokenData'

export default function ({role}: TokenData): boolean | Error {
  if (role !== 'ADMIN') throw new createError.Forbidden('Unauthorized to access Admin routes')
  return true
}

// import {NextFunction, Request, Response} from 'express'
// import createError from 'http-errors'
// import TokenData from '../interfaces/TokenData'
// import jwt, {Secret} from 'jsonwebtoken'
// import {TypedRequestBody} from '../interfaces/TypedRequest'

// export default function (req: TypedRequestBody<{}>, res: Response, next: NextFunction) {
//   try {
//     const {role} = req.auth!
//     if (role !== 'ADMIN') return next(new createError.Forbidden('Unauthorized to access Admin routes'))
//   } catch (error) {
//     return next(error)
//   }
//   return next()
// }
