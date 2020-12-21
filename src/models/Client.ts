import { Schema, Document, model } from 'mongoose'
import { differenceInYears } from 'date-fns'

export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3
}

export interface Client {
  name: string,
  gender: Gender,
  birthDate: Date,
  cityId: number
}

export type ClientDocument = Document & Client

const ClientSchema = new Schema<Client>({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  cityId: {
    type: Schema.Types.ObjectId,
    required: true
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

ClientSchema.virtual('age').get(function (this: Client) {
  return differenceInYears(new Date(), new Date(this.birthDate))
})

export default model<ClientDocument>('Client', ClientSchema)
