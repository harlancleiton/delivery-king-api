'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.resource('coupons', 'CouponController')
    .apiOnly()
    .validator(
      new Map([
        [['coupons.store'], ['Admin/Coupon/Store']],
        [['coupons.update'], ['Admin/Coupon/Update']],
      ])
    )
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:(admin)'])
