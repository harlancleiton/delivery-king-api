'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.create('addresses', table => {
      table.increments()
      table.string('street').notNullable()
      table.string('district').notNullable()
      table
        .integer('number')
        .notNullable()
        .unsigned()
      table.string('cep', 8).notNullable()
      table.string('complement')
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
      table
        .foreign('city_id')
        .references('id')
        .inTable('cities')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
