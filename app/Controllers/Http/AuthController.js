'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role')
const Transformer = use('App/Transformers/UserTransformer')

class AuthController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async register({ request, response, transform }) {
    const { first_name, last_name, email, password, cpf } = request.all()
    const role = await Role.findByOrFail('slug', 'client')
    let user = await User.create({
      first_name,
      last_name,
      email,
      password,
      cpf,
    })
    await user.roles().attach([role.id])
    user = await transform.item(user, Transformer)
    return response.created({ data: user })
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async login({ request, response, auth }) {
    const { email, password } = request.all()
    try {
      const data = await auth.withRefreshToken().attempt(email, password)
      return response.send({ data })
    } catch (error) {
      return response
        .status(401)
        .send({ errors: [{ message: 'Usuário ou senha incorretos' }] })
    }
  }
}

module.exports = AuthController
