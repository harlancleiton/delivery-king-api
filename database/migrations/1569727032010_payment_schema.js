'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up() {
    this.create('payments', table => {
      table.increments()
      table
        .decimal('amount', 7, 2)
        .unsigned()
        .notNullable()
      table
        .enu('status', [
          'PENDING',
          'PAID',
          'CANCELED',
          'PARTIALLY_PAID',
          'REFUNDED',
          'EXPIRED',
          'IN_PROTEST',
          'CHARGE_BACK',
        ])
        .notNullable()
        .defaultTo('PENDING')
      table
        .string('iugu')
        .notNullable()
        .unique()
      table
        .string('url')
        .notNullable()
        .unique()
      table.timestamps()
    })

    this.alter('orders', table => {
      table
        .integer('payment_id')
        .unsigned()
        .notNullable()
      table
        .foreign('payment_id')
        .references('id')
        .inTable('payments')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.table('orders', table => {
      table.dropForeign('payment_id')
    })

    this.drop('payments')
  }
}

module.exports = PaymentSchema
