'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up() {
    this.create('images', table => {
      table.increments()
      table.string('name')
      table
        .string('url')
        .notNull()
        .unique()
      table
        .float('size')
        .notNullable()
        .unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('images')
  }
}

module.exports = ImageSchema
