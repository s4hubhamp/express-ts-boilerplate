import Joi from 'joi'

export const adminLogin = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
})

export const otpLogin = Joi.object().keys({
  phoneNumber: Joi.string().min(10).required(),
  otp: Joi.number()
    .required()
    .custom((value, helpers) => {
      return String(value).length === 4 ? value : helpers.message({custom: 'OTP must be exactly 4 digits number.'})
    }),
})
