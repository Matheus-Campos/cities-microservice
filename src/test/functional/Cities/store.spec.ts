import supertest from 'supertest'
import app from '../../../app/server'
import CityModel, { City } from '../../../app/models/City'

const request = supertest(app)

afterAll(async () => {
  await CityModel.deleteMany({})
})

describe('Functional - Cities store', () => {
  it('Should register a city', async () => {
    const city: City = {
      name: 'Natal',
      state: 'Rio Grande do Norte'
    }

    const response = await request.post('/v1/cities').send(city)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(city)
  })
})
