import {Query} from 'express-serve-static-core'
import {Request} from 'express'
import TokenData from './TokenData'

interface MyRequest extends Request {
  auth?: TokenData
}
export interface TypedRequest<T extends Query, U> extends MyRequest {
  body: U
  query: T
}

export interface TypedRequestBody<T> extends MyRequest {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends MyRequest {
  query: T
}
