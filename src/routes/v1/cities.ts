import { Router } from 'express'

import CitiesController from '../../controllers/v1/CitiesController'

const routes = Router()

routes.get('/v1/cities', CitiesController.index)
routes.post('/v1/cities', CitiesController.store)

export default routes
