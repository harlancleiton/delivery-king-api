'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RoleSeeder {
  async run() {
    await Factory.model('Adonis/Acl/Role').create()
    await Factory.model('Adonis/Acl/Role').create({ slug: 'deliveryman' })
    await Factory.model('Adonis/Acl/Role').create({ slug: 'admin' })
  }
}

module.exports = RoleSeeder
