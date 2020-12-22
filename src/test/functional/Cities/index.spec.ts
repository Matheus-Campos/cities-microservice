/* eslint-disable no-undef */

import supertest from 'supertest'
import server from '../../../app/server'
import CityModel, { City } from '../../../app/models/City'

const request = supertest(server)

beforeAll(async () => {
  await CityModel.create({
    name: 'Recife',
    state: 'Pernambuco'
  })

  await CityModel.create({
    name: 'Jaboatão dos Guararapes',
    state: 'Pernambuco'
  })

  await CityModel.create({
    name: 'Rio de janeiro',
    state: 'Rio de janeiro'
  })
})

afterAll(async () => {
  await CityModel.deleteMany({})
})

describe('Functional - List Cities', () => {
  it('Should return a list of cities', async () => {
    const response = await request.get('/v1/cities')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('cities')
    expect(response.body.cities).toHaveLength(3)
  })

  it('Should return a list of cities filtered by state', async () => {
    const state = 'Pernambuco'
    const response = await request.get(`/v1/cities?state=${state}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('cities')
    expect(response.body.cities).toHaveLength(2)
    expect(response.body.cities.every((city: City) => city.state === state))
      .toBeTruthy()
  })

  it('Should return a list of cities filtered by name', async () => {
    const search = 'a'
    const response = await request.get(`/v1/cities?name=${search}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('cities')
    expect(response.body.cities).toHaveLength(2)
    expect(response.body.cities[0].state !== response.body.cities[1].state).toBeTruthy()
  })
})
