'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    if (ctx.request.method() === 'GET') {
      const page = Env.get('PAGINATION_PAGE', 1)
      const limit = Env.get('PAGINATION_LIMIT', 20)
      ctx.pagination = {
        page: parseInt(ctx.request.input('page', page), 10),
        limit: parseInt(ctx.request.input('limit', limit), 10),
      }
    }
    // call next to advance the request
    await next()
  }
}

module.exports = Pagination
