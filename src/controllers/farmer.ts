import {Response, NextFunction, Request} from 'express'
import createError from 'http-errors'
import Farmer from '../interfaces/Farmer'
import {TypedRequestBody} from '../interfaces/TypedRequest'
import FarmerModel from '../models/Farmer'
import HttpResponse from '../utils/http-response'
import controllerError from '../utils/controllerError'
import {calculateAge, calculateDOB} from '../utils/dob-age-helper'

export async function getFarmers(req: TypedRequestBody<{}>, res: Response, next: NextFunction) {
  const {role, lakshmiCentreCode} = req.auth!
  if (role === 'ADMIN') {
    const farmers = await FarmerModel.find().select('-phoneOtp')
    res.send(new HttpResponse(true, {farmers}))
  } else {
    const farmers = await FarmerModel.find({lakshmiCentreCode}).select('-phoneOtp')
    res.send(new HttpResponse(true, {farmers}))
  }
}

export async function getFarmerById(req: Request, res: Response) {
  const {farmerId} = req.params
  const farmer = await FarmerModel.findById(farmerId).select('-phoneOtp')
  res.send(new HttpResponse(true, {farmer}))
}

export async function createFarmer(req: TypedRequestBody<Farmer>, res: Response) {
  const alreadyPresentFarmer = await FarmerModel.findOne({phoneNumber: req.body.phoneNumber})
  if (alreadyPresentFarmer) return res.status(422).json({message: 'Farmer is present with given mobile number.'}).send()
  const farmer = await FarmerModel.create({...req.body, approvalStatus: 'approved'})
  return res.json(new HttpResponse(true, {farmer})).send()
}

export async function updateFarmerById(req: Request, res: Response) {
  const {farmerId} = req.params
  if (!farmerId || farmerId.length !== 24) throw new createError.UnprocessableEntity('Please send valid farmer id')

  if (req.body.age) {
    req.body.dateOfBirth = calculateDOB(req.body.age)
  } else {
    req.body.age = calculateAge(req.body.dateOfBirth)
  }
  let farmer = await FarmerModel.findByIdAndUpdate(farmerId, req.body, {new: true})
  res.send(new HttpResponse(true, {farmer}))
}

export async function deleteFarmerById(req: Request, res: Response) {
  const {farmerId} = req.params
  if (!farmerId || farmerId.length !== 24) throw new createError.UnprocessableEntity('Please send valid farmer id')

  const _r = await FarmerModel.findByIdAndDelete(farmerId)
  if (_r) res.json(new HttpResponse(true, {farmerId}))
  throw new createError.UnprocessableEntity('Cannot delete farmer, check the farmer id or farmer is already deleted')
}
