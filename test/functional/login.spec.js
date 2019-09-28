'use strict'

const { test, trait } = use('Test/Suite')('Login')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return JWT token when upon login', async ({
  assert,
  client,
}) => {
  const payload = { email: 'email@example.com', password: '123456' }
  await Factory.model('App/Models/User').create(payload)
  const response = await client
    .post('/v1/auth/login')
    .send(payload)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.data)
})

test('it should return an unauthorization error', async ({
  assert,
  client,
}) => {
  const payload = { email: 'email@example.com', password: '123456' }
  await Factory.model('App/Models/User').create(payload)
  const response = await client
    .post('/v1/auth/login')
    .send({ email: 'email@example.com', password: '1234567' })
    .end()
  response.assertStatus(401)
  assert.exists(response.body.errors)
})

test('it should return a validation error in field email', async ({
  assert,
  client,
}) => {
  const payload = { email: 'emailexample.com', password: '123456' }
  const response = await client
    .post('/v1/auth/login')
    .send(payload)
    .end()
  response.assertStatus(400)
  assert.exists(response.body.errors)
  assert.equal(response.body.errors[0].field, 'email')
})

test('it should return a validation error in field password', async ({
  assert,
  client,
}) => {
  const payload = { email: 'email@example.com', password: '' }
  const response = await client
    .post('/v1/auth/login')
    .send(payload)
    .end()
  response.assertStatus(400)
  assert.exists(response.body.errors)
  assert.equal(response.body.errors[0].field, 'password')
})
