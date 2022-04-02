import createError from 'http-errors'
import TokenData from '../interfaces/TokenData'
import {TypedRequest} from '../interfaces/TypedRequest'

export default function ({role, agentHasAccessTo, farmerId}: TokenData, req: TypedRequest<{}, {}>): boolean | Error {
  if (
    role === 'ADMIN' ||
    (role === 'FARMER' && req.params.farmerId === farmerId) ||
    (role === 'AGENT' && agentHasAccessTo === req.params.farmerId)
  ) {
    return true
  }
  throw new createError.Forbidden('Unauthorized to edit farmer info')
}
