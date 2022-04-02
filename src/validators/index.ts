import {RequestBodyValidators, RequestQueryValidators} from '../interfaces/Validators'
import {adminLogin, otpLogin} from './login'
import {createFarmer, updateFarmer} from './farmer'

export const bodyValidators: RequestBodyValidators = {adminLogin, otpLogin, createFarmer, updateFarmer}

export const queryValidators: RequestQueryValidators = {}
