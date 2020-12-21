import { Schema } from 'mongoose'

export interface ErrorResponse {
  message: string
}

export interface Errors {
  errors: ErrorResponse[]
}

export interface ResourceParam {
  id: Schema.Types.ObjectId
}
