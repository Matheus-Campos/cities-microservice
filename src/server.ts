import '../config/env'

import express from 'express'
import { connect } from 'mongoose'

import routes from './routes'

const { PORT, DATABASE_URL } = process.env

connect(DATABASE_URL || '', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.use(express.json())

app.use(routes)

const serverPort = PORT || 3333

app.listen(serverPort, () => console.log(`Listing on port ${serverPort}`))
