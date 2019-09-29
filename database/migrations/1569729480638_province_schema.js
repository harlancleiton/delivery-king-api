'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinceSchema extends Schema {
  up() {
    this.create('provinces', table => {
      table.increments()
      table
        .string('name')
        .unique()
        .notNullable()
      table
        .string('uf', 2)
        .unique()
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('provinces')
  }
}

module.exports = ProvinceSchema
