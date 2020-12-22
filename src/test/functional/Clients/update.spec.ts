import supertest from 'supertest'
import server from '../../../app/server'
import ClientModel, { ClientDocument, Gender } from '../../../app/models/Client'
import CityModel, { CityDocument } from '../../../app/models/City'
import { ClientUpdateBody } from '../../../app/controllers/v1/Clients'

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

describe('Functional - Update Client', () => {
  it('Should return a updated client with city', async () => {
    const newName = 'Bruno'
    const response = await request
      .patch(`/v1/clients/${client.id}`)
      .send({ name: newName } as ClientUpdateBody)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      name: newName,
      gender: client.gender,
      birthDate: client.birthDate.toJSON(),
      city: {
        _id: city.id
      }
    })
  })

  it('Should return error 404', async () => {
    const response = await request
      .patch('/v1/clients/invalidId')
      .send({ name: 'should throw an error anyway' } as ClientUpdateBody)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].message).toBe('Client could not be found')
  })
})
