'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponOrderSchema extends Schema {
  up() {
    this.create('coupon_orders', table => {
      table.increments()
      table.decimal('discount', 7, 2).defaultTo(0.0)
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
        .integer('order_id')
        .unsigned()
        .notNullable()
      table
        .foreign('order_id')
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('coupon_orders')
  }
}

module.exports = CouponOrderSchema
