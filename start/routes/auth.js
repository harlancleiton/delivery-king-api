'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'AuthController.register').as('auth.register')
  // .validator('Auth/Register')
  Route.post('login', 'AuthController.login')
    .as('auth.login')
    .validator('Auth/Login')
}).prefix('v1/auth')
