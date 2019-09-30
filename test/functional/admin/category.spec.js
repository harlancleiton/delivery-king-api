'use strict'

// TODO tests with all http methods returning http code 403

const { before, test, trait } = use('Test/Suite')('Admin Category')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const path = '/v1/admin/categories'

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

let admin

before(async () => {
  const role = await Factory.model('Adonis/Acl/Role').create({ slug: 'admin' })
  admin = await Factory.model('App/Models/User').create()
  await admin.roles().attach([role.id])
})

test('it should return a categories pagination', async ({ assert, client }) => {
  await Factory.model('App/Models/Category').create()
  const response = await client
    .get(path)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
  assert.isNotEmpty(response.body.data.data)
})

test('it should return a single category resource', async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').create()
  const response = await client
    .get(`${path}/${category.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
})

test('it should return http code 404 because category not found', async ({
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

test('it should return an new category', async ({ assert, client }) => {
  const category = await Factory.model('App/Models/Category').make()
  const response = await client
    .post(path)
    .loginVia(admin)
    .send(category.toJSON())
    .end()
  response.assertStatus(201)
  assert.exists(response.body.data)
})

test('it should return a validation error', async ({ assert, client }) => {
  const category = {
    title: 123,
    description: '',
    image_id: 9999,
  }
  const response = await client
    .post(path)
    .loginVia(admin)
    .send(category)
    .end()
  response.assertStatus(400)
  assert.isNotEmpty(response.body.errors)
})

test('is should return a http code 204 when update category', async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').create()
  const response = await client
    .put(`${path}/${category.id}`)
    .loginVia(admin)
    .send(category.toJSON())
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

test('it should return a validation error when update category', async ({
  assert,
  client,
}) => {
  const title = 'Lorem Ipsum'
  await Factory.model('App/Models/Category').create({ title })
  const category2 = await Factory.model('App/Models/Category').create()
  category2.title = title
  const response = await client
    .put(`${path}/${category2.id}`)
    .loginVia(admin)
    .send(category2.toJSON())
    .end()
  response.assertStatus(400)
  assert.isNotEmpty(response.body.errors)
})

test('it should return http code 404 because category not found', async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').make()
  const response = await client
    .put(`${path}/9999`)
    .loginVia(admin)
    .send(category.toJSON())
    .end()
  response.assertStatus(404)
  assert.isEmpty(response.body)
})

test('it should return http code 204 after delete category', async ({
  assert,
  client,
}) => {
  const category = await Factory.model('App/Models/Category').create()
  const response = await client
    .delete(`${path}/${category.id}`)
    .loginVia(admin)
    .end()
  response.assertStatus(204)
  assert.isEmpty(response.body)
})

test('it should return http code 404 because category not found', async ({
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
