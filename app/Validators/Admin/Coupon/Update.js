'use strict'

const Antl = use('Antl')

class AdminCouponUpdate {
  get rules() {
    return {
      'users.*': 'exists:users,id',
      'categories.*': 'exists:categories,id',
      'products.*': 'exists:products,id',
      code: 'required|unique:coupons|string',
      quantity: 'required|integer',
      valid_from: 'date',
      valid_until: 'date',
      recursive: 'boolean|required',
      discount: 'number|required',
      type: 'required|in:FREE,PERCENT,CURRENCY',
      can_use_for:
        'required|in:PRODUCT,CLIENT,CATEGORY,PRODUCT_CLIENT,CATEGORY_PRODUCT,CATEGORY_CLIENT,ALL',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

  get validateAll() {
    return true
  }

  async fails(errors) {
    return this.ctx.response.status(400).send({ errors })
  }
}

module.exports = AdminCouponUpdate
