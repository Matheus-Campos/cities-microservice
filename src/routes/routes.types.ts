import { Router } from 'express'

export abstract class Routes {
  abstract register (router: Router): void
}

export abstract class NamespaceRoutes {
  constructor (routes: Routes[]) {
    this.routes = routes
  }

  routes: Routes[]
  abstract register (router: Router): void
}

export abstract class RootRoutes {
  constructor (namespaces: NamespaceRoutes[]) {
    this.namespaces = namespaces
  }

  namespaces: NamespaceRoutes[]
  abstract register (router: Router): void
}
