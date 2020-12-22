import '../config/env'

import express from 'express'
import morgan from 'morgan'
import { connect } from 'mongoose'

import routes from './routes'

const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL } = process.env

const databaseConnectionUrl = NODE_ENV === 'test'
  ? TEST_DATABASE_URL
  : DATABASE_URL

connect(databaseConnectionUrl || '', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(routes)

export default app
