import {Schema, model, Document} from 'mongoose'
import Agent from '../interfaces/Agent'

const agentSchema = new Schema({
  lakshmiCentreCode: {
    type: String,
  },
  uid: {type: String},
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    locality: String,
    pincode: String,
    district: String,
    taluka: String,
    state: String,
    country: String,
  },
  gender: {type: String, enum: ['male', 'female']},
  approvalStatus: {type: String, enum: ['approved', 'refused', 'pending']},
  profileImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  preferredLanguage: {
    type: String,
    enum: ['marathi', 'english'],
    default: 'marathi',
  },
  dateOfBirth: {
    type: Date,
  },
  Centres: [],
})

export default model<Agent & Document>('Agent', agentSchema)
