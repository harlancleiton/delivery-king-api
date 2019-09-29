'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderProduct extends Model {
  static get computed() {
    return ['subtotal']
  }

  getSubtotal({ quantity, price, discount }) {
    return price * quantity - discount
  }

  product() {
    return this.belongsTo('App/Models/Product')
  }

  order() {
    return this.belongsTo('App/Models/Order')
  }
}

module.exports = OrderProduct
