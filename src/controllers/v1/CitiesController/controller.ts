import { Request, Response } from 'express'

import CityModel, { City, CityDocument } from '../../../models/City'

class CitiesController {
  async index (req: Request<any, any, null, City>, res: Response<CityDocument[]>) {
    const query = CityModel.find()

    if (req.query.name) {
      query.where('name', `/${req.query.name}/`)
    }

    if (req.query.state) {
      query.where('state', req.query.state)
    }

    const cities = await query.exec()

    return res.status(200).send(cities)
  }

  async store (req: Request<any, any, City>, res: Response<CityDocument>) {
    const city = await CityModel.create(req.body)
    res.setHeader('Location', `/v1/cities/${city.id}`)
    return res.status(201).send(city)
  }
}

export default new CitiesController()