import {Schema, model, Document} from 'mongoose'
import Centre from '../interfaces/Centre'

const centreSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {type: String, required: true},
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'down'],
      default: 'active',
    },
    agents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
      },
    ],
  },
  {timestamps: true},
)

export default model<Centre & Document>('Centre', centreSchema)
