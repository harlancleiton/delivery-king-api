'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up() {
    this.create('order_products', table => {
      table.increments()
      table
        .decimal('price', 7, 2)
        .unsigned()
        .notNullable()
      table
        .integer('quantity')
        .unsigned()
        .notNullable()
        .defaultTo(1)
      table
        .decimal('discount', 7, 2)
        .unsigned()
        .notNullable()
        .defaultTo(0.0)
      table.integer('product_id').unsigned()
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')
      table.integer('order_id').unsigned()
      table
        .foreign('order_id')
        .references('id')
        .inTable('orders')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('order_products')
  }
}

module.exports = OrderProductSchema
