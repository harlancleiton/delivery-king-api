'use strict'

const { before, test, trait } = use('Test/Suite')('Register')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

before(async () => {
  await Factory.model('Adonis/Acl/Role').create()
})

test('it should return an new user when user register', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').make()
  const response = await client
    .post('/v1/auth/register')
    .send(user.toJSON())
    .end()
  response.assertStatus(201)
  assert.exists(response.body.data)
  assert.isUndefined(response.body.data.password)
})

test('it should return a validation error in field email', async ({
  assert,
  client,
}) => {
  const response = await client
    .post('/v1/auth/register')
    .send({
      first_name: 'Lorem',
      last_name: 'Ipsum',
      email: 'examplemail.com',
      password: 'loremipsum',
    })
    .end()
  response.assertStatus(400)
  assert.exists(response.body.errors)
  assert.equal(response.body.errors[0].field, 'email')
  assert.equal(response.body.errors[0].validation, 'email')
})

test('it should return a validation error in field email as it must be unique', async ({
  assert,
  client,
}) => {
  const payload = {
    first_name: 'Lorem',
    last_name: 'Ipsum',
    email: 'example@mail.com',
    password: 'loremipsum',
  }
  await Factory.model('App/Models/User').create(payload)
  const response = await client
    .post('/v1/auth/register')
    .send(payload)
    .end()
  response.assertStatus(400)
  assert.exists(response.body.errors)
  assert.equal(response.body.errors[0].field, 'email')
  assert.equal(response.body.errors[0].validation, 'unique')
})
