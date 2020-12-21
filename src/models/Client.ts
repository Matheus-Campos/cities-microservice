import { Schema, Document, model } from 'mongoose'
import { differenceInYears } from 'date-fns'
import { CityDocument } from './City'

export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3
}

export interface Client {
  name: string,
  gender: Gender,
  birthDate: Date,
  city: Schema.Types.ObjectId | CityDocument
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
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
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
