import {Request, Response} from 'express'

export default async function index(req: Request, res: Response) {
  res.send('OK')
}
