'use strict'

// TODO tests with all http methods returning http code 403

const { before, test, trait } = use('Test/Suite')('Admin Product')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role')
const path = '/v1/admin/products'

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

let admin

before(async () => {
  let role = await Factory.model('Adonis/Acl/Role').make({ slug: 'admin' })
  role = await Role.findOrCreate({ slug: 'admin' }, role)
  admin = await Factory.model('App/Models/User').create()
  await admin.roles().attach([role.id])
})

test('it should return a products pagination', async ({ assert, client }) => {
  await Factory.model('App/Models/Product').create()
  const response = await client
    .get(path)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
  assert.isNotEmpty(response.body.data.data)
})

test('it should return a single product resource', async ({
  assert,
  client,
}) => {
  const product = await Factory.model('App/Models/Product').create()
  const response = await client
    .get(`${path}/${product.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
})

test('it should return http code 404 because product not found', async ({
  assert,
  client,
}) => {
  const response = await client
    .get(`${path}/9999`)
    .loginVia(admin)
    .end()
  response.assertStatus(404)
  assert.isEmpty(response.body)
})

test('it should return an new product', async ({ assert, client }) => {
  const product = await Factory.model('App/Models/Product').make()
  const categories = (await Factory.model('App/Models/Category').createMany(
    3
  )).map(cat => cat.id)
  const data = Object.assign(product.toJSON(), { categories })
  const response = await client
    .post(path)
    .loginVia(admin)
    .send(data)
    .end()
  response.assertStatus(201)
  assert.exists(response.body.data)
})

// test('it should return a validation error', async ({ assert, client }) => {
//   const product = {
//     title: 123,
//     description: '',
//     image_id: 9999,
//   }
//   const response = await client
//     .post(path)
//     .loginVia(admin)
//     .send(product)
//     .end()
//   response.assertStatus(400)
//   assert.isNotEmpty(response.body.errors)
// })

test('is should return a http code 204 when update product', async ({
  assert,
  client,
}) => {
  const product = await Factory.model('App/Models/Product').create()
  const categories = (await Factory.model('App/Models/Category').createMany(
    3
  )).map(cat => cat.id)
  const data = Object.assign(product.toJSON(), { categories })
  const response = await client
    .put(`${path}/${product.id}`)
    .loginVia(admin)
    .send(data)
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

// test('it should return a validation error when update product', async ({
//   assert,
//   client,
// }) => {
//   const title = 'Lorem Ipsum'
//   await Factory.model('App/Models/Product').create({ title })
//   const product2 = await Factory.model('App/Models/Product').create()
//   product2.title = title
//   const response = await client
//     .put(`${path}/${product2.id}`)
//     .loginVia(admin)
//     .send(product2.toJSON())
//     .end()
//   response.assertStatus(400)
//   assert.isNotEmpty(response.body.errors)
// })

test('it should return http code 404 because product not found', async ({
  assert,
  client,
}) => {
  const product = await Factory.model('App/Models/Product').make()
  const response = await client
    .put(`${path}/9999`)
    .loginVia(admin)
    .send(product.toJSON())
    .end()
  response.assertStatus(404)
  assert.isEmpty(response.body)
})

test('it should return http code 204 after delete product', async ({
  assert,
  client,
}) => {
  const product = await Factory.model('App/Models/Product').create()
  const response = await client
    .delete(`${path}/${product.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

test('it should return http code 404 because product not found', async ({
  assert,
  client,
}) => {
  const response = await client
    .delete(`${path}/9999`)
    .loginVia(admin)
    .end()
  response.assertStatus(404)
  assert.isEmpty(response.body)
})
