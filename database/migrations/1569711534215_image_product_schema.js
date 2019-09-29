'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageProductSchema extends Schema {
  up() {
    this.create('image_products', table => {
      table.increments()
      table.integer('image_id').unsigned()
      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')
      table.integer('product_id').unsigned()
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('image_products')
  }
}

module.exports = ImageProductSchema
