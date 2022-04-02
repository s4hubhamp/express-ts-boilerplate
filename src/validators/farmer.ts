import Joi from 'joi'

export const createFarmer = Joi.object()
  .keys({
    _id: Joi.string().length(24),
    lakshmiCentreCode: Joi.string().min(1),
    uid: Joi.string().min(1),
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email(),
    address: Joi.object().keys({
      locality: Joi.string(),
      pincode: Joi.string(),
      district: Joi.string(),
      taluka: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
    }),
    gender: Joi.string().equal('male', 'female'),
    location: Joi.object().keys({
      home: Joi.array().items(Joi.number(), Joi.number()),
      farm: Joi.array().items(Joi.number(), Joi.number()),
    }),
    // password: Joi.string().min(5),

    profileImage: Joi.string().uri(),
    phoneNumber: Joi.string().min(10).required(),
    preferredLanguage: Joi.string().equal('english', 'marathi'),
    dateOfBirth: Joi.date().iso(),
    age: Joi.number(),
    registrationDate: Joi.date().iso(),
    activeSince: Joi.date().iso(),
    managedBy: Joi.string().equal('self', 'admin', 'agent').required(),
    coins: Joi.string(),
  })
  .unknown(false)

export const updateFarmer = Joi.object()
  .keys({
    _id: Joi.string().length(24),
    lakshmiCentreCode: Joi.string().min(1),
    uid: Joi.string().min(1),
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email(),
    address: Joi.object().keys({
      locality: Joi.string(),
      pincode: Joi.string(),
      district: Joi.string(),
      taluka: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
    }),
    gender: Joi.string().equal('male', 'female'),
    location: Joi.object().keys({
      home: Joi.array().items(Joi.number(), Joi.number()),
      farm: Joi.array().items(Joi.number(), Joi.number()),
    }),
    // password: Joi.string().min(5),

    profileImage: Joi.string().uri(),
    phoneNumber: Joi.string().min(10).required(),
    preferredLanguage: Joi.string().equal('english', 'marathi'),
    dateOfBirth: Joi.date().iso(),
    age: Joi.number(),
    registrationDate: Joi.date().iso(),
    activeSince: Joi.date().iso(),
    managedBy: Joi.string().equal('self', 'admin', 'agent').required(),
    coins: Joi.string(),
  })
  .unknown(false)
  .or('dateOfBirth', 'age')
  .nand('dateOfBirth', 'age')
