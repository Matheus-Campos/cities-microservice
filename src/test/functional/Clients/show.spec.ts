import supertest from 'supertest'
import server from '../../../app/server'
import ClientModel, { ClientDocument, Gender } from '../../../app/models/Client'
import CityModel, { CityDocument } from '../../../app/models/City'

const request = supertest(server)

let city: CityDocument
let client: ClientDocument

beforeAll(async () => {
  city = await CityModel.create({
    name: 'Recife',
    state: 'Pernambuco'
  })

  client = await ClientModel.create({
    name: 'Matheus Campos',
    gender: Gender.Male,
    birthDate: new Date(1998, 10, 1),
    city: city._id
  })
})

afterAll(async () => {
  await CityModel.deleteMany({})
  await ClientModel.deleteMany({})
})

describe('Functional - Show Client', () => {
  it('Should return a client with city', async () => {
    const response = await request.get(`/v1/clients/${client.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      name: client.name,
      gender: client.gender,
      birthDate: client.birthDate.toJSON(),
      city: {
        _id: city.id
      }
    })
  })

  it('Should return error 404', async () => {
    const response = await request.get('/v1/clients/invalidId')

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].message).toBe('Client could not be found')
  })
})
