import {ObjectSchema} from 'joi'

export interface RequestBodyValidators {
  adminLogin: ObjectSchema
  otpLogin: ObjectSchema
  createFarmer: ObjectSchema
  updateFarmer: ObjectSchema
}

export interface RequestQueryValidators {
  [key: string]: ObjectSchema
}
