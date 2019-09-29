'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up() {
    this.create('cities', table => {
      table.increments()
      table.string('name')
      table
        .integer('province_id')
        .unsigned()
        .notNullable()
      table
        .foreign('province_id')
        .references('id')
        .inTable('provinces')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('cities')
  }
}

module.exports = CitySchema
