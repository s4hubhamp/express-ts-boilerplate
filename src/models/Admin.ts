import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
})
