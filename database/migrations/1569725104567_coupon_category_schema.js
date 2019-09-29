'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponCategorySchema extends Schema {
  up() {
    this.create('coupon_categories', table => {
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
        .integer('category_id')
        .unsigned()
        .notNullable()
      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('coupon_categories')
  }
}

module.exports = CouponCategorySchema
