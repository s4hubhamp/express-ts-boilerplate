import TokenData from '../interfaces/TokenData'
import jwt, {JsonWebTokenError, Secret} from 'jsonwebtoken'

export default function createToken(payload: TokenData) {
  try {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '60 days'})
    return token
  } catch (error) {
    throw new JsonWebTokenError('Error while signing the jwt')
  }
}
