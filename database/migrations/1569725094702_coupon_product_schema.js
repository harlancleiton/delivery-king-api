'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponProductSchema extends Schema {
  up() {
    this.create('coupon_products', table => {
      table.increments()
      table
        .integer('coupon_id')
        .unsigned()
        .notNullable()
      table
        .foreign('coupon_id')
        .references('id')
        .inTable('coupons')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('coupon_products')
  }
}

module.exports = CouponProductSchema
