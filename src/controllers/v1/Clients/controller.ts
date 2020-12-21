import { Request, Response } from 'express'
import ClientModel, { Client, ClientDocument } from '../../../models/Client'

import { ClientQuery } from './controller.params'

class ClientController {
  async index (req: Request<any, any, null, ClientQuery>, res: Response<ClientDocument[]>) {
    const query = ClientModel.find()

    if (req.query.name) {
      query.where('name', new RegExp(`.*${req.query.name}.*`, 'i'))
    }

    const clients = await query.exec()

    return res.status(200).send(clients)
  }

  async store (req: Request<any, any, Client>, res: Response<ClientDocument>) {
    const client = await ClientModel.create(req.body)
    res.setHeader('Location', `/v1/clients/${client.id}`)
    return res.status(201).send(client)
  }
}

export default new ClientController()
