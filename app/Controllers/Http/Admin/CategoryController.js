'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category')
// TODO CategoryTransform

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   * @param {Object} ctx.pagination
   */
  async index({ request, response, transform, pagination }) {
    const { search } = request.all()
    const query = Category.query()
    if (search) {
      query.where('title', 'ILIKE', `%${search}%`)
      query.orWhere('description', 'ILIKE', `%${search}%`)
    }
    const categories = await query.paginate(pagination.page, pagination.limit)
    return response.send({ data: categories })
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async store({ request, response, transform }) {
    const { title, description, image_id } = request.all()
    const category = await Category.create({ title, description, image_id })
    return response.created({ data: category })
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    const category = await Category.findOrFail(id)
    return response.send({ data: category })
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const category = await Category.findOrFail(id)
    const { title, description, image_id } = request.all()
    await category.merge({ title, description, image_id })
    return response.status(204).send({})
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const category = await Category.findOrFail(id)
    await category.delete()
    return response.status(204).send({})
  }
}

module.exports = CategoryController
