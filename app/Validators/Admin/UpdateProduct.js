'use strict'

const Antl = use('Antl')

class AdminUpdateProduct {
  get rules() {
    return {
      name: 'required|string',
      description: 'required|string',
      image_id: 'exists:images,id',
      categories: 'array',
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

module.exports = AdminUpdateProduct
