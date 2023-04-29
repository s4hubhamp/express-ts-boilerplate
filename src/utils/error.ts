import {NextFunction, Request, Response} from 'express'

export default async function errorMiddleware(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(`${error.message}`)
    res.status(500).json({message: error.message})
  } finally {
    next(error)
  }
}
