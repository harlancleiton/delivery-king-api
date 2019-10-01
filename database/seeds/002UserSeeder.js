'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('adonis-acl/src/Models/Role')} */
const Role = use('Role')

class UserSeeder {
  async run() {
    const role = await Role.findByOrFail('slug', 'client')
    const users = await Factory.model('App/Models/User').createMany(5)
    await Promise.all(
      // eslint-disable-next-line no-return-await
      users.map(async user => await user.roles().attach([role.id]))
    )

    const admin = await Factory.model('App/Models/User').create({
      first_name: 'Harlan',
      last_name: 'Cleiton',
      email: 'harlancleiton@gmail.com',
      password: 'admin',
    })
    const adminRole = await Role.findByOrFail('slug', 'admin')
    await admin.roles().attach([adminRole.id])
  }
}

module.exports = UserSeeder
