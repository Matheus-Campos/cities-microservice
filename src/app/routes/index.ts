import { Router } from 'express'

import { RootRoutes } from './routes.types'
import v1Routes from './v1'

const router = Router()

class Routes extends RootRoutes {
  register (router: Router) {
    this.namespaces.forEach((namespace) => namespace.register(router))
  }
}

new Routes([v1Routes]).register(router)

export default router
