'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Coupon = use('App/Models/Coupon')
// TODO CouponTransform
// TODO CouponService

/**
 * Resourceful controller for interacting with coupons
 */
class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   * @param {Object} ctx.pagination
   */
  async index({ request, response, transform, pagination }) {
    const { search } = request.all()
    const query = Coupon.query()
    if (search) {
      query.where('name', 'ILIKE', `%${search}%`)
      query.orWhere('description', 'ILIKE', `%${search}%`)
    }
    const coupons = await query.paginate(pagination.page, pagination.limit)
    return response.send({ data: coupons })
  }

  /**
   * Create/save a new coupon.
   * POST coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async store({ request, response, transform }) {
    const {
      code,
      valid_from,
      valid_until,
      quantity,
      type,
      recursive,
      can_use_for,
      users,
      categories,
      products,
    } = request.all()
    const coupon = await Coupon.create({
      code,
      valid_from,
      valid_until,
      quantity,
      type,
      recursive,
      can_use_for,
    })
    if (users) await coupon.users().attach(users)
    if (products) await coupon.products().attach(products)
    if (categories) await coupon.categories().attach(categories)
    return response.created({ data: coupon })
  }

  /**
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    const coupon = await Coupon.findOrFail(id)
    return response.send({ data: coupon })
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const coupon = await Coupon.findOrFail(id)
    const {
      code,
      valid_from,
      valid_until,
      quantity,
      type,
      recursive,
      can_use_for,
      users,
      categories,
      products,
    } = request.all()
    await coupon.merge({
      code,
      valid_from,
      valid_until,
      quantity,
      type,
      recursive,
      can_use_for,
    })
    if (users) await coupon.users().sync(users)
    if (products) await coupon.products().sync(products)
    if (categories) await coupon.categories().sync(categories)
    return response.status(204).send({})
  }

  /**
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const coupon = await Coupon.findOrFail(id)
    await coupon.delete()
    return response.status(204).send({})
  }
}

module.exports = CouponController
