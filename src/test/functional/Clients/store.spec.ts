import supertest from 'supertest'
import server from '../../../app/server'
import ClientModel, { Client, Gender } from '../../../app/models/Client'
import CityModel, { CityDocument } from '../../../app/models/City'

const request = supertest(server)

let city: CityDocument

beforeAll(async () => {
  city = await CityModel.create({
    name: 'Recife',
    state: 'Pernambuco'
  })
})

afterAll(async () => {
  await CityModel.deleteMany({})
  await ClientModel.deleteMany({})
})

describe('Functional - Store Client', () => {
  it('Should create a client', async () => {
    const client: Client = {
      name: 'Matheus Campos',
      gender: Gender.Male,
      birthDate: new Date(1998, 10, 1),
      city: city._id
    }
    const response = await request
      .post('/v1/clients')
      .send(client)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      name: client.name,
      gender: client.gender,
      birthDate: client.birthDate.toJSON(),
      city: {
        _id: city.id,
        name: city.name,
        state: city.state
      }
    })
    expect(response.get('Location')).toBe(`/v1/clients/${response.body.id}`)
  })
})
