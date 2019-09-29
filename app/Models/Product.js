'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  image() {
    return this.belongsTo('App/Models/Image')
  }

  images() {
    return this.belongsToMany('App/Models/Image').withTimestamps()
  }

  categories() {
    return this.belongsToMany('App/Models/Category').withTimestamps()
  }

  coupons() {
    return this.belongsTo('App/Models/Coupon')
  }
}

module.exports = Product
