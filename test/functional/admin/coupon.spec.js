'use strict'

// TODO tests with all http methods returning http code 403

const { before, test, trait } = use('Test/Suite')('Admin Coupon')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role')
const path = '/v1/admin/coupons'

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

test('it should return a coupons pagination', async ({ assert, client }) => {
  await Factory.model('App/Models/Coupon').create()
  const response = await client
    .get(path)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
  assert.isNotEmpty(response.body.data.data)
})

test('it should return a single coupon resource', async ({
  assert,
  client,
}) => {
  const coupon = await Factory.model('App/Models/Coupon').create()
  const response = await client
    .get(`${path}/${coupon.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
})

test('it should return http code 404 because coupon not found', async ({
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

test('it should return an new coupon', async ({ assert, client }) => {
  const coupon = await Factory.model('App/Models/Coupon').make()
  const categories = (await Factory.model('App/Models/Category').createMany(
    3
  )).map(cat => cat.id)
  const products = (await Factory.model('App/Models/Product').createMany(
    3
  )).map(prod => prod.id)
  const users = (await Factory.model('App/Models/User').createMany(3)).map(
    u => u.id
  )
  const data = Object.assign(coupon.toJSON(), { categories, products, users })
  const response = await client
    .post(path)
    .loginVia(admin)
    .send(data)
    .end()
  response.assertStatus(201)
  assert.exists(response.body.data)
})

test('it should return a validation error', async ({ assert, client }) => {
  const coupon = {
    type: 'TYPE',
    recursive: 'test',
    code: '',
    quantity: 'one',
    discount: 'free',
    can_use_for: 'SYSTEM',
    users: [999, 998, 777],
    categories: [999, 998],
    products: [999],
  }
  const response = await client
    .post(path)
    .loginVia(admin)
    .send(coupon)
    .end()
  response.assertStatus(400)
  assert.strictEqual(response.body.errors.length, 12)
  assert.isNotEmpty(response.body.errors)
})

test('is should return a http code 204 when update coupon', async ({
  assert,
  client,
}) => {
  const coupon = await Factory.model('App/Models/Coupon').create()
  const coupon2 = await Factory.model('App/Models/Coupon').make()
  const categories = (await Factory.model('App/Models/Category').createMany(
    3
  )).map(cat => cat.id)
  const data = Object.assign(coupon2.toJSON(), { categories })
  const response = await client
    .put(`${path}/${coupon.id}`)
    .loginVia(admin)
    .send(data)
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

test('it should return a validation error when update coupon', async ({
  assert,
  client,
}) => {
  const coupon = await Factory.model('App/Models/Coupon').create()
  coupon.code = ''
  coupon.type = 'TYPE'
  coupon.recursive = 'test'
  coupon.discount = 'free'
  coupon.can_use_for = 'SYSTEM'
  coupon.quantity = 'one'
  coupon.users = [999, 998, 777]
  coupon.categories = [999, 998]
  coupon.products = [999]
  const response = await client
    .put(`${path}/${coupon.id}`)
    .loginVia(admin)
    .send(coupon.toJSON())
    .end()
  response.assertStatus(400)
  assert.strictEqual(response.body.errors.length, 12)
  assert.isNotEmpty(response.body.errors)
})

test('it should return http code 404 because coupon not found', async ({
  assert,
  client,
}) => {
  const coupon = await Factory.model('App/Models/Coupon').make()
  const response = await client
    .put(`${path}/9999`)
    .loginVia(admin)
    .send(coupon.toJSON())
    .end()
  response.assertStatus(404)
  assert.isEmpty(response.body)
})

test('it should return http code 204 after delete coupon', async ({
  assert,
  client,
}) => {
  const coupon = await Factory.model('App/Models/Coupon').create()
  const response = await client
    .delete(`${path}/${coupon.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

test('it should return http code 404 because coupon not found', async ({
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
