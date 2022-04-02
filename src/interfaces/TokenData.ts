import {JwtPayload} from 'jsonwebtoken'

export default interface TokenData extends JwtPayload {
  farmerId?: string
  agentHasAccessTo?: string
  agentId?: string
  role: 'ADMIN' | 'AGENT' | 'FARMER'
  email?: string
  phoneNumber?: string
  lakshmiCentreCode?: string
}
