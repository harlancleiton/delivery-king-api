'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product')
// TODO ProductTransform

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   * @param {Object} ctx.pagination
   */
  async index({ request, response, transform, pagination }) {
    const { search } = request.all()
    const query = Product.query()
    if (search) {
      query.where('title', 'ILIKE', `%${search}%`)
      query.orWhere('description', 'ILIKE', `%${search}%`)
    }
    const products = await query.paginate(pagination.page, pagination.limit)
    return response.send({ data: products })
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async store({ request, response, transform }) {
    const { name, description, price, image_id, categories } = request.all()
    const product = await Product.create({ name, description, price, image_id })
    if (categories && categories.length > 0)
      await product.categories().attach(categories)
    return response.created({ data: product })
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    const product = await Product.findOrFail(id)
    return response.send({ data: product })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const product = await Product.findOrFail(id)
    const { name, description, price, image_id, categories } = request.all()
    product.merge({ name, description, price, image_id })
    if (categories && categories.length > 0) {
      await product.categories().detach()
      await product.categories().attach(categories)
    }
    return response.status(204).send()
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const product = await Product.findOrFail(id)
    await product.delete()
    return response.status(204).send()
  }
}

module.exports = ProductController
