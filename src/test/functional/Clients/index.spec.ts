import supertest from 'supertest'
import server from '../../../app/server'
import ClientModel, { Client, Gender } from '../../../app/models/Client'
import CityModel from '../../../app/models/City'

const request = supertest(server)

beforeAll(async () => {
  const city = await CityModel.create({
    name: 'Recife',
    state: 'Pernambuco'
  })

  await ClientModel.create({
    name: 'Matheus Campos',
    gender: Gender.Male,
    birthDate: new Date(1998, 10, 1),
    city: city._id
  })

  await ClientModel.create({
    name: 'Cliente da Compasso',
    gender: Gender.Male,
    birthDate: new Date(1992, 2, 19),
    city: city._id
  })
})

afterAll(async () => {
  await CityModel.deleteMany({})
  await ClientModel.deleteMany({})
})

describe('Functional - List Clients', () => {
  it('Should return a list of clients', async () => {
    const response = await request.get('/v1/clients')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('clients')
    expect(response.body.clients).toHaveLength(2)
    expect(response.body.clients.every(
      (client: Client) => typeof client.city === 'object')
    ).toBeTruthy()
  })

  it('Should return a list of clients filtered by name', async () => {
    const name = 'u'
    const response = await request.get(`/v1/clients?name=${name}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('clients')
    expect(response.body.clients).toHaveLength(1)
    expect(response.body.clients[0].name).toBe('Matheus Campos')
  })
})
