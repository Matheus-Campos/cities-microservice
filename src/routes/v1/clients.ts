import { Router } from 'express'

import { Routes } from '../routes.types'
import ClientsController from '../../controllers/v1/Clients'

class ClientRoutes extends Routes {
  register (router: Router) {
    const fileName = __filename.slice(0, -3)
    const [apiVersion, resourceName] = fileName.split('/').slice(-2)

    router.get(`/${apiVersion}/${resourceName}`, ClientsController.index)
    router.post(`/${apiVersion}/${resourceName}`, ClientsController.store)
    router.get(`/${apiVersion}/${resourceName}/:id`, ClientsController.show)
    router.patch(`/${apiVersion}/${resourceName}/:id`, ClientsController.update)
    router.delete(`/${apiVersion}/${resourceName}/:id`, ClientsController.destroy)
  }
}

export default new ClientRoutes()
