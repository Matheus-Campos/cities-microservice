import { Router } from 'express'

import { Routes } from '../routes.types'
import CitiesController from '../../controllers/v1/Cities'

class CitiesRoutes extends Routes {
  register (router: Router) {
    const fileName = __filename.slice(0, -3)
    const [apiVersion, resourceName] = fileName.split('/').slice(-2)

    router.get(`/${apiVersion}/${resourceName}`, CitiesController.index)
    router.post(`/${apiVersion}/${resourceName}`, CitiesController.store)
  }
}

export default new CitiesRoutes()
