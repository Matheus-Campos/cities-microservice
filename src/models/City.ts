import { Schema, Document, model } from 'mongoose'

export interface City {
  name: string,
  state: string
}

export type CityDocument = Document & City

const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export default model<CityDocument>('City', CitySchema)
