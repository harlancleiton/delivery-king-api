'use strict'

/*
|--------------------------------------------------------------------------
| CategoryProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CategoryProductSeeder {
  async run() {
    // TODO ProductSeed
    await Factory.model('App/Models/Category').createMany(25)
  }
}

module.exports = CategoryProductSeeder
