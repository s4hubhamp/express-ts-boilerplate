import Centre from '../interfaces/Centre'

export default interface Agent {
  _id?: string
  lakshmiCentreCode?: string
  uid?: string
  email?: string
  firstName?: string
  lastName?: string
  address?: {
    locality: string
    pincode: string
    district: string
    taluka: string
    state: string
    country: string
  }
  gender?: 'male' | 'female'
  approvalStatus: 'approved' | 'refused' | 'pending'
  profileImage?: string
  phoneNumber: string
  preferredLanguage?: 'marathi' | 'english'
  dateOfBirth?: string
  registrationDate: string
  centres?: Centre[]
}
