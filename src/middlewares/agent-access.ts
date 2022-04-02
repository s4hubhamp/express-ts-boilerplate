import createError from 'http-errors'
import TokenData from '../interfaces/TokenData'

export default function ({role}: TokenData): boolean | Error {
  if (role !== 'AGENT') throw new createError.Forbidden('Unauthorized to access Agent routes')
  return true
}

// import {NextFunction, Request, Response} from 'express'
// import createError from 'http-errors'
// import TokenData from '../interfaces/TokenData'
// import jwt, {Secret} from 'jsonwebtoken'

// export default function (_req: Request, res: Response, next: NextFunction) {
//   const authorization = _req.headers.authorization
//   try {
//     const accessTokenSecret = <Secret>process.env.ACCESS_TOKEN_SECRET
//     const data = jwt.verify(authorization!, accessTokenSecret)
//     console.dir(data, {depth: null})
//     // if (role !== 'ADMIN') return next(new createError.Forbidden('Unauthorized to access Admin routes'))
//   } catch (error) {
//     return next(error)
//   }
//   return next()
// }
