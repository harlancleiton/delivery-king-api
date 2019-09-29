'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments()
      table.decimal('total', 7, 2).notNullable()
      table
        .enu('status', ['PENDING', 'CANCELLED', 'SHIPPED', 'PAID', 'FINISHED'])
        .notNullable()
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
    this.drop('orders')
  }
}

module.exports = OrderSchema
