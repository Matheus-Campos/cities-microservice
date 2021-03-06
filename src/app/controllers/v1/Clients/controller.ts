import { Request, Response } from 'express'

import ClientModel, { Client, ClientDocument } from '../../../models/Client'
import { Errors, ResourceParam } from '../../controllers.types'

import { ClientQuery, ClientUpdateBody } from './controller.params'
import { ClientsIndexResponse } from './controller.responses'

class ClientController {
  async index (req: Request<any, any, null, ClientQuery>, res: Response<ClientsIndexResponse | Errors>) {
    try {
      const query = ClientModel.find()

      if (req.query.name) {
        query.where('name', new RegExp(`.*${req.query.name}.*`, 'i'))
      }

      const clients = await query.populate('city').exec()

      return res.status(200).send({ clients })
    } catch (err) {
      return res.status(500).send({
        errors: [{
          message: 'Something went wrong'
        }]
      })
    }
  }

  async store (req: Request<any, any, Client>, res: Response<ClientDocument | Errors>) {
    try {
      let client = await ClientModel.create(req.body)
      client = await client.populate('city').execPopulate()
      res.setHeader('Location', `/v1/clients/${client.id}`)
      return res.status(201).send(client)
    } catch (err) {
      return res.status(500).send({
        errors: [{
          message: 'Something went wrong'
        }]
      })
    }
  }

  async show (req: Request<ResourceParam>, res: Response<ClientDocument | Errors>) {
    try {
      const client = await ClientModel
        .findById(req.params.id)
        .populate('city')
        .exec()

      if (!client) {
        return res.status(404).send({
          errors: [{
            message: 'Client could not be found'
          }]
        })
      }

      return res.status(200).send(client)
    } catch (err) {
      switch (err.name) {
        case 'CastError':
          return res.status(404).send({
            errors: [{
              message: 'Client could not be found'
            }]
          })
        default:
          return res.status(500).send({
            errors: [{
              message: 'Something went wrong'
            }]
          })
      }
    }
  }

  async update (req: Request<ResourceParam, any, ClientUpdateBody>, res: Response<ClientDocument | Errors>) {
    try {
      const client = await ClientModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name
        },
        { new: true }
      )

      if (!client) {
        return res.status(404).send({
          errors: [{
            message: 'Client could not be found'
          }]
        })
      }

      await client.populate('city').execPopulate()

      return res.status(200).send(client)
    } catch (err) {
      switch (err.name) {
        case 'CastError':
          return res.status(404).send({
            errors: [{
              message: 'Client could not be found'
            }]
          })
        default:
          return res.status(500).send({
            errors: [{
              message: 'Something went wrong'
            }]
          })
      }
    }
  }

  async destroy (req: Request<ResourceParam>, res: Response<ClientDocument | Errors>) {
    try {
      const client = await ClientModel.findById(req.params.id)

      if (!client) {
        return res.status(404).send({
          errors: [{
            message: 'Client could not be found'
          }]
        })
      }

      await client.delete()

      return res.status(204).send()
    } catch (err) {
      switch (err.name) {
        case 'CastError':
          return res.status(404).send({
            errors: [{
              message: 'Client could not be found'
            }]
          })
        default:
          return res.status(500).send({
            errors: [{
              message: 'Something went wrong'
            }]
          })
      }
    }
  }
}

export default new ClientController()
