import { Request, Response } from 'express'

import CityModel, { City, CityDocument } from '../../../models/City'
import { CitiesIndexResponse } from './controller.responses'

class CitiesController {
  async index (req: Request<any, any, null, City>, res: Response<CitiesIndexResponse>) {
    const query = CityModel.find()

    if (req.query.name) {
      query.where('name', new RegExp(`.*${req.query.name}.*`, 'i'))
    }

    if (req.query.state) {
      query.where('state', req.query.state)
    }

    const cities = await query.exec()

    return res.status(200).send({ cities })
  }

  async store (req: Request<any, any, City>, res: Response<CityDocument>) {
    const city = await CityModel.create(req.body)
    return res.status(201).send(city)
  }
}

export default new CitiesController()
