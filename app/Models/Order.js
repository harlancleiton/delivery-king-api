'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  products() {
    return this.hasMany('App/Models/OrderProduct')
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

  coupons() {
    return this.belongsToMany('App/Models/Coupon')
  }
}

module.exports = Order
