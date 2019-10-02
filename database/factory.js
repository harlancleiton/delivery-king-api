'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    password: faker.string({ length: 8 }),
    date_birth: faker.date(),
    cpf: faker.cpf().replace(/\D/g, ''),
    ...data,
  }
})

Factory.blueprint('Adonis/Acl/Role', (faker, i, data) => {
  const { slug } = data
  switch (slug) {
    case 'admin':
      return {
        name: 'Admin',
        slug,
        description: 'System Administrator',
      }
    case 'deliveryman':
      return {
        name: 'DeliveryMan',
        slug,
        description: 'DeliveryMan Lorem Ipsum',
      }
    case 'client':
    default:
      return {
        name: 'Client',
        slug: 'client',
        description: 'Only Client',
      }
  }
})

Factory.blueprint('App/Models/Image', (faker, i, data) => {
  return {
    url: faker.url({ extensions: ['jpg', 'png'] }),
    size: faker.floating({ min: 0, max: 30 }),
    name: faker.string(),
    ...data,
  }
})

Factory.blueprint('App/Models/Category', (faker, i, data) => {
  return {
    title: faker.country({ full: true }),
    description: faker.paragraph(),
    ...data,
  }
})

Factory.blueprint('App/Models/Product', (faker, i, data) => {
  return {
    name: faker.name(),
    description: faker.paragraph(),
    price: faker.floating({ min: 1, max: 1000 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Coupon', (faker, i, data) => {
  return {
    code: faker.string({ length: 6 }),
    discount: faker.floating({ min: 10, max: 100, fixed: 2 }),
    valid_from: faker.date({ year: 2000 }),
    valid_until: faker.date({ year: 2001 }),
    quantity: faker.integer({ min: 1, max: 200 }),
    can_use_for: faker.pickone([
      'PRODUCT',
      'CLIENT',
      'CATEGORY',
      'PRODUCT_CLIENT',
      'CATEGORY_PRODUCT',
      'CATEGORY_CLIENT',
      'ALL',
    ]),
    type: faker.pickone(['FREE', 'PERCENT', 'CURRENCY']),
    recursive: faker.bool(),
    ...data,
  }
})
