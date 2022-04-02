import {Response, NextFunction, Request} from 'express'
import createHttpError from 'http-errors'
import {TypedRequestBody} from '../interfaces/TypedRequest'
import FarmerModel from '../models/Farmer'

import controllerError from '../utils/controllerError'
import createApprovalRequest from '../utils/create-approval-request'
import createToken from '../utils/createToken'
import generatePhoneOtp from '../utils/generate-phone-otp'
import HttpResponse from '../utils/http-response'

export async function adminLogin(req: TypedRequestBody<{email: string; password: string}>, res: Response) {
  let email = 'admin.123@gmail.com'
  let password = 'admin@123'

  if (email === req.body.email && password === req.body.password) {
    const jwtToken = createToken({role: 'ADMIN', email})
    return res.json(new HttpResponse(true, {jwtToken})).send()
  }
  throw new controllerError('Invalid Credentials', 401)
}

export async function generateOTP(req: TypedRequestBody<{phoneNumber: string}>, res: Response) {
  if (!req.body.phoneNumber) throw new controllerError('Please provide phone number.', 422)

  let farmer = await FarmerModel.findOne({phoneNumber: req.body.phoneNumber})
  if (!farmer) {
    // this farmer will have approvalStatus null
    farmer = new FarmerModel({phoneNumber: req.body.phoneNumber, managedBy: 'self'})
  }
  if (farmer?.approvalStatus === 'refused') throw new createHttpError.Forbidden()
  const newOtp = await generatePhoneOtp(req.body.phoneNumber)
  farmer.phoneOtp = [...(farmer.phoneOtp || []), newOtp]
  await farmer.save()
  return res.json(new HttpResponse(true, {exp: newOtp.exp})).send()
}

export async function verifyOTP(req: TypedRequestBody<{phoneNumber: string; otp: number}>, res: Response) {
  if (!req.body.phoneNumber) throw new controllerError('Please provide your phone number.', 422)
  if (!req.body.otp) throw new controllerError('Please provide 4 digit OTP number.', 422)

  const farmer = await FarmerModel.findOne({phoneNumber: req.body.phoneNumber})
  if (!farmer) throw new controllerError('Farmer with given mobile number is not present', 422)
  if (!farmer.phoneOtp?.some(el => el.val === req.body.otp && new Date(el.exp) >= new Date()))
    throw new controllerError('otp is incorrect or it is expired', 400)
  if (farmer.approvalStatus !== 'refused') {
    await createApprovalRequest(req.body.phoneNumber)
    farmer.approvalStatus = 'pending'
  }
  farmer.phoneOtp = []
  if (!farmer.registrationDate) farmer.registrationDate = new Date().toISOString()
  const f = await farmer.save()
  const jwtToken = createToken({role: 'FARMER', phoneNumber: req.body.phoneNumber, farmerId: farmer._id})
  return res.send(new HttpResponse(true, {farmer: {...f._doc, phoneOtp: null}, jwtToken}))
}
