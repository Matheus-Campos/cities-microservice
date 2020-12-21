import { Router } from 'express'
import { NamespaceRoutes } from '../routes.types'

import CitiesRoutes from './cities'
import ClientsRoutes from './clients'

class V1Routes extends NamespaceRoutes {
  register (router: Router) {
    this.routes.forEach((route) => route.register(router))
  }
}

export default new V1Routes([
  CitiesRoutes,
  ClientsRoutes
])
