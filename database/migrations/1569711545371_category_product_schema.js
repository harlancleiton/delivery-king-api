'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryProductSchema extends Schema {
  up() {
    this.create('category_product', table => {
      table.increments()
      table.integer('product_id').unsigned()
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('category_id').unsigned()
      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('category_product')
  }
}

module.exports = CategoryProductSchema
