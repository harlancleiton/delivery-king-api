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

  payment() {
    return this.hasOne('App/Models/Payment')
  }

  deliveryAddress() {
    return this.hasOne('App/Models/DeliveryAddress')
  }
}

module.exports = Order
