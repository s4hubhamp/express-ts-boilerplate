import {Request, Response} from 'express'
import {Morgan} from 'morgan'

export default function addMorganTokens(morgan: Morgan<Request, Response>) {
  morgan.token('body', req => 'Body: ' + JSON.stringify(req.body))
  morgan.token('query', req => 'Query: ' + JSON.stringify(req.query))
  morgan.token('params', req => 'Params: ' + JSON.stringify(req.params))
  //   morgan.token(
  //     'headers',
  //     (req, res) =>
  //       '\n\nRequest Headers: ' +
  //       JSON.stringify(req.headers) +
  //       '\n\nResponse Headers: ' +
  //       JSON.stringify(res.getHeaders()),
  //   )
}
