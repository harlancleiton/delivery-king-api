'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.resource('products', 'ProductController')
    .apiOnly()
    .validator(
      new Map([
        [['products.store'], ['Admin/StoreProduct']],
        [['products.update'], ['Admin/UpdateProduct']],
      ])
    )
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:(admin)'])
