'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeliveryAddressSchema extends Schema {
  up() {
    this.create('delivery_addresses', table => {
      table.increments()
      table.string('cep', 8).notNullable()
      table
        .integer('number', 5)
        .notNullable()
        .unsigned()
      table.string('complement')
      table.timestamps()
    })

    this.alter('orders', table => {
      table
        .integer('delivery_address_id')
        .unsigned()
        .notNullable()
      table
        .foreign('delivery_address_id')
        .references('id')
        .inTable('delivery_addresses')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.table('orders', table => {
      table.dropForeign('delivery_address_id')
    })

    this.drop('delivery_addresses')
  }
}

module.exports = DeliveryAddressSchema
