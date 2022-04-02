import {Request} from 'express'

export default interface Farmer {
  _id?: string
  lakshmiCentreCode?: string
  uid?: string
  email?: string
  address?: {
    locality: string
    pincode: string
    district: string
    taluka: string
    state: string
    country: string
  }
  location?: {home: [number, number]; farm: [number, number]}
  gender?: 'male' | 'female'
  approvalStatus?: 'approved' | 'refused' | 'pending'
  firstName?: string
  lastName?: string
  profileImage?: string
  phoneNumber: string
  preferredLanguage?: 'marathi' | 'english'
  dateOfBirth?: string
  age?: number
  registrationDate?: string
  activeSince?: Date
  managedBy: 'self' | 'admin' | 'agent'
  coins?: string
  phoneOtp: {val: number; exp: number}[]
  _doc?: any
}
