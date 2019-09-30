'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.resource('categories', 'CategoryController')
    .apiOnly()
    .validator(
      new Map([
        [['categories.store'], ['Admin/StoreCategory']],
        [['categories.update'], ['Admin/UpdateCategory']],
      ])
    )
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:(admin)'])
